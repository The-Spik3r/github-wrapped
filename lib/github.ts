import "server-only";

import { Octokit } from "octokit";

import type {
  AuthoredCommitPoint,
  CommitActivityWeek,
  GitHubWrappedRawData,
  PushEventSummary,
  RateLimitInfo,
  RepoLanguageMap,
} from "@/lib/types";

const MAX_REPOS = 100;
const MAX_LANGUAGE_REPOS = 18;
const MAX_COMMIT_ACTIVITY_REPOS = 10;
const MAX_COMMIT_REPOS = 15;
const MAX_COMMIT_PAGES_PER_REPO = 2;

export class GitHubUserNotFoundError extends Error {
  constructor(username: string) {
    super(`User ${username} not found`);
    this.name = "GitHubUserNotFoundError";
  }
}

export class GitHubRateLimitError extends Error {
  readonly resetAt: string | null;

  constructor(resetAt: string | null) {
    super("GitHub API rate limit reached");
    this.name = "GitHubRateLimitError";
    this.resetAt = resetAt;
  }
}

function getOctokit(): Octokit {
  const auth = process.env.GITHUB_TOKEN?.trim() || undefined;

  return new Octokit({
    auth,
    userAgent: "github-wrapped/1.0.0",
    request: {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  });
}

function getHeaderValue(
  headers: Record<string, string | number | string[] | undefined>,
  key: string,
): string | null {
  const value = headers[key];
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0];
  }
  return null;
}

function parseRateLimit(headers: Record<string, string | number | string[] | undefined>): RateLimitInfo {
  const limit = getHeaderValue(headers, "x-ratelimit-limit");
  const remaining = getHeaderValue(headers, "x-ratelimit-remaining");
  const reset = getHeaderValue(headers, "x-ratelimit-reset");
  const resetSeconds = reset ? Number.parseInt(reset, 10) : Number.NaN;

  return {
    limit: limit ? Number.parseInt(limit, 10) : null,
    remaining: remaining ? Number.parseInt(remaining, 10) : null,
    resetAt:
      Number.isFinite(resetSeconds) && resetSeconds > 0
        ? new Date(resetSeconds * 1000).toISOString()
        : null,
  };
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parsePushEvent(event: unknown): PushEventSummary | null {
  if (!isObjectRecord(event)) {
    return null;
  }

  const type = event.type;
  if (type !== "PushEvent") {
    return null;
  }

  const createdAt = event.created_at;
  const repo = event.repo;
  const payload = event.payload;

  if (typeof createdAt !== "string" || !isObjectRecord(repo)) {
    return null;
  }

  const repoName = repo.name;
  if (typeof repoName !== "string") {
    return null;
  }

  let commitCount = 0;
  if (isObjectRecord(payload)) {
    const commits = payload.commits;
    if (Array.isArray(commits)) {
      commitCount = commits.length;
    }
  }

  return {
    createdAt,
    repoName,
    commitCount,
  };
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getCommitActivityStats(
  octokit: Octokit,
  owner: string,
  repo: string,
): Promise<CommitActivityWeek[]> {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await octokit.rest.repos.getCommitActivityStats({ owner, repo });

    if (response.status === 202) {
      await wait(300 * (attempt + 1));
      continue;
    }

    if (!Array.isArray(response.data)) {
      return [];
    }

    return response.data.map((week) => ({
      week: week.week,
      total: week.total,
      days: week.days,
    }));
  }

  return [];
}

function splitRepoName(fullName: string): { owner: string; repo: string } | null {
  const [owner, repo] = fullName.split("/");
  if (!owner || !repo) {
    return null;
  }

  return { owner, repo };
}

async function getAuthoredCommitsForRepo(
  octokit: Octokit,
  owner: string,
  repo: string,
  author: string,
  since: string,
  until: string,
): Promise<AuthoredCommitPoint[]> {
  const commits: AuthoredCommitPoint[] = [];

  try {
    const iterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, {
      owner,
      repo,
      author,
      since,
      until,
      per_page: 100,
    });

    let pageCount = 0;
    for await (const { data } of iterator) {
      pageCount += 1;

      for (const item of data) {
        const committedAt = item.commit.author?.date ?? item.commit.committer?.date;
        if (!committedAt) {
          continue;
        }

        commits.push({
          committedAt,
          repoName: `${owner}/${repo}`,
        });
      }

      if (pageCount >= MAX_COMMIT_PAGES_PER_REPO) {
        break;
      }
    }
  } catch {
    return [];
  }

  return commits;
}

export async function getGitHubWrappedRawData(username: string): Promise<GitHubWrappedRawData> {
  const octokit = getOctokit();

  let userResponse: Awaited<ReturnType<typeof octokit.rest.users.getByUsername>>;
  try {
    userResponse = await octokit.rest.users.getByUsername({ username });
  } catch (error: unknown) {
    const status = isObjectRecord(error) ? error.status : undefined;
    const headers = isObjectRecord(error) ? error.response : undefined;
    const resetAt =
      isObjectRecord(headers) && isObjectRecord(headers.headers)
        ? String(headers.headers["x-ratelimit-reset"] ?? "")
        : "";

    if (status === 404) {
      throw new GitHubUserNotFoundError(username);
    }

    if (status === 403) {
      throw new GitHubRateLimitError(resetAt ? new Date(Number(resetAt) * 1000).toISOString() : null);
    }

    throw error;
  }

  const [reposResponse, eventsResponse] = await Promise.all([
    octokit.rest.repos.listForUser({
      username,
      per_page: MAX_REPOS,
      sort: "updated",
    }),
    octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    }),
  ]);

  const pushEvents = eventsResponse.data
    .map((event) => parsePushEvent(event))
    .filter((event): event is PushEventSummary => event !== null);

  const pushedRepoNames = new Set(pushEvents.map((event) => event.repoName));
  const listedRepoNames = reposResponse.data.map((repo) => repo.full_name);
  const repoNames = Array.from(new Set([...pushedRepoNames, ...listedRepoNames]));

  const languageRepoNames = repoNames.slice(0, MAX_LANGUAGE_REPOS);
  const commitActivityRepoNames = repoNames.slice(0, MAX_COMMIT_ACTIVITY_REPOS);
  const commitRepoNames = repoNames.slice(0, MAX_COMMIT_REPOS);
  const since = new Date(Date.UTC(new Date().getUTCFullYear(), 0, 1)).toISOString();
  const until = new Date(Date.UTC(new Date().getUTCFullYear() + 1, 0, 1)).toISOString();

  const languageEntries = await Promise.all(
    languageRepoNames.map(async (fullName) => {
      const split = splitRepoName(fullName);
      if (!split) {
        return [fullName, {}] as const;
      }

      try {
        const languageResponse = await octokit.rest.repos.listLanguages({
          owner: split.owner,
          repo: split.repo,
        });
        return [fullName, languageResponse.data as RepoLanguageMap] as const;
      } catch {
        return [fullName, {}] as const;
      }
    }),
  );

  const commitActivityEntries = await Promise.all(
    commitActivityRepoNames.map(async (fullName) => {
      const split = splitRepoName(fullName);
      if (!split) {
        return [fullName, []] as const;
      }

      try {
        const stats = await getCommitActivityStats(octokit, split.owner, split.repo);
        return [fullName, stats] as const;
      } catch {
        return [fullName, []] as const;
      }
    }),
  );

  const authoredCommitEntries = await Promise.all(
    commitRepoNames.map(async (fullName) => {
      const split = splitRepoName(fullName);
      if (!split) {
        return [] as AuthoredCommitPoint[];
      }

      return getAuthoredCommitsForRepo(octokit, split.owner, split.repo, username, since, until);
    }),
  );

  return {
    user: {
      login: userResponse.data.login,
      name: userResponse.data.name,
      bio: userResponse.data.bio,
      avatarUrl: userResponse.data.avatar_url,
      htmlUrl: userResponse.data.html_url,
    },
    repos: listedRepoNames,
    repoLanguages: Object.fromEntries(languageEntries),
    commitActivity: Object.fromEntries(commitActivityEntries),
    pushEvents,
    authoredCommits: authoredCommitEntries.flat(),
    rateLimit: parseRateLimit(userResponse.headers),
  };
}

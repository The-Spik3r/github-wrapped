import type {
  CodingSchedule,
  CommitActivityWeek,
  GitHubWrappedRawData,
  TimeBucket,
  TopLanguage,
  TopRepo,
  WrappedStats,
} from "@/lib/types";

const BUCKET_ORDER: TimeBucket[] = ["madrugada", "manana", "tarde", "noche"];

function getBucketByHour(hourUtc: number): TimeBucket {
  if (hourUtc >= 0 && hourUtc < 6) {
    return "madrugada";
  }
  if (hourUtc < 12) {
    return "manana";
  }
  if (hourUtc < 19) {
    return "tarde";
  }
  return "noche";
}

function calculateTopLanguages(rawData: GitHubWrappedRawData): TopLanguage[] {
  const bytesByLanguage = new Map<string, number>();

  for (const repoLanguages of Object.values(rawData.repoLanguages)) {
    for (const [language, bytes] of Object.entries(repoLanguages)) {
      bytesByLanguage.set(language, (bytesByLanguage.get(language) ?? 0) + bytes);
    }
  }

  const totalBytes = Array.from(bytesByLanguage.values()).reduce((sum, value) => sum + value, 0);
  if (totalBytes === 0) {
    return [];
  }

  return Array.from(bytesByLanguage.entries())
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 3);
}

function calculateCodingSchedule(rawData: GitHubWrappedRawData, year: number): CodingSchedule[] {
  const commitTotals = new Map<TimeBucket, number>(BUCKET_ORDER.map((bucket) => [bucket, 0]));

  const commitsWithTime = rawData.authoredCommits.filter(
    (commit) => new Date(commit.committedAt).getUTCFullYear() === year,
  );

  if (commitsWithTime.length > 0) {
    for (const commit of commitsWithTime) {
      const date = new Date(commit.committedAt);
      const bucket = getBucketByHour(date.getUTCHours());
      commitTotals.set(bucket, (commitTotals.get(bucket) ?? 0) + 1);
    }

    const totalCommits = commitsWithTime.length;
    return BUCKET_ORDER.map((bucket) => {
      const commits = commitTotals.get(bucket) ?? 0;
      return {
        bucket,
        commits,
        percentage: totalCommits > 0 ? Number(((commits / totalCommits) * 100).toFixed(1)) : 0,
      };
    });
  }

  for (const event of rawData.pushEvents) {
    const date = new Date(event.createdAt);
    if (date.getUTCFullYear() !== year || event.commitCount <= 0) {
      continue;
    }

    const bucket = getBucketByHour(date.getUTCHours());
    commitTotals.set(bucket, (commitTotals.get(bucket) ?? 0) + event.commitCount);
  }

  const totalCommits = Array.from(commitTotals.values()).reduce((sum, value) => sum + value, 0);

  return BUCKET_ORDER.map((bucket) => {
    const commits = commitTotals.get(bucket) ?? 0;
    return {
      bucket,
      commits,
      percentage: totalCommits > 0 ? Number(((commits / totalCommits) * 100).toFixed(1)) : 0,
    };
  });
}

function calculateLongestStreak(rawData: GitHubWrappedRawData, year: number): number {
  const daysWithCommits = new Set<string>();

  const authoredCommitsByYear = rawData.authoredCommits.filter(
    (commit) => new Date(commit.committedAt).getUTCFullYear() === year,
  );

  if (authoredCommitsByYear.length > 0) {
    for (const commit of authoredCommitsByYear) {
      const date = new Date(commit.committedAt);
      daysWithCommits.add(date.toISOString().slice(0, 10));
    }
  } else {
    for (const event of rawData.pushEvents) {
      if (event.commitCount <= 0) {
        continue;
      }

      const date = new Date(event.createdAt);
      if (date.getUTCFullYear() !== year) {
        continue;
      }

      daysWithCommits.add(date.toISOString().slice(0, 10));
    }
  }

  const sortedDays = Array.from(daysWithCommits).sort();
  if (sortedDays.length === 0) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (let index = 1; index < sortedDays.length; index += 1) {
    const previousDate = new Date(sortedDays[index - 1]);
    const currentDate = new Date(sortedDays[index]);

    const diffMs = currentDate.getTime() - previousDate.getTime();
    const dayDiff = Math.round(diffMs / 86_400_000);

    if (dayDiff === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

function calculateTopRepo(rawData: GitHubWrappedRawData, year: number): TopRepo | null {
  const repoTotals = new Map<string, number>();

  const authoredCommitsByYear = rawData.authoredCommits.filter(
    (commit) => new Date(commit.committedAt).getUTCFullYear() === year,
  );

  if (authoredCommitsByYear.length > 0) {
    for (const commit of authoredCommitsByYear) {
      repoTotals.set(commit.repoName, (repoTotals.get(commit.repoName) ?? 0) + 1);
    }
  } else {
    for (const event of rawData.pushEvents) {
      const date = new Date(event.createdAt);
      if (date.getUTCFullYear() !== year || event.commitCount <= 0) {
        continue;
      }

      repoTotals.set(event.repoName, (repoTotals.get(event.repoName) ?? 0) + event.commitCount);
    }

    if (repoTotals.size === 0) {
      for (const [repoName, weeks] of Object.entries(rawData.commitActivity)) {
        const yearlyTotal = getCommitActivityTotalByYear(weeks, year);
        if (yearlyTotal > 0) {
          repoTotals.set(repoName, yearlyTotal);
        }
      }
    }
  }

  if (repoTotals.size === 0) {
    return null;
  }

  const [name, commits] = Array.from(repoTotals.entries()).sort((a, b) => b[1] - a[1])[0];
  return { name, commits };
}

function calculateTotalCommits(rawData: GitHubWrappedRawData, year: number): number {
  const fromAuthoredCommits = rawData.authoredCommits.filter(
    (commit) => new Date(commit.committedAt).getUTCFullYear() === year,
  ).length;

  if (fromAuthoredCommits > 0) {
    return fromAuthoredCommits;
  }

  const fromPushEvents = rawData.pushEvents
    .filter((event) => new Date(event.createdAt).getUTCFullYear() === year)
    .reduce((sum, event) => sum + event.commitCount, 0);

  if (fromPushEvents > 0) {
    return fromPushEvents;
  }

  let fromCommitActivity = 0;
  for (const weeks of Object.values(rawData.commitActivity)) {
    for (const week of weeks) {
      const weekYear = new Date(week.week * 1000).getUTCFullYear();
      if (weekYear === year) {
        fromCommitActivity += week.total;
      }
    }
  }

  return fromCommitActivity;
}

function getCommitActivityTotalByYear(weeks: CommitActivityWeek[], year: number): number {
  let total = 0;
  for (const week of weeks) {
    const weekYear = new Date(week.week * 1000).getUTCFullYear();
    if (weekYear === year) {
      total += week.total;
    }
  }
  return total;
}

export function calculateWrappedStats(rawData: GitHubWrappedRawData, year: number): WrappedStats {
  const totalCommits = calculateTotalCommits(rawData, year);
  const topLanguages = calculateTopLanguages(rawData);
  const codingSchedule = calculateCodingSchedule(rawData, year);
  const longestStreak = calculateLongestStreak(rawData, year);
  const topRepo = calculateTopRepo(rawData, year);

  return {
    year,
    totalCommits,
    topLanguages,
    codingSchedule,
    longestStreak,
    topRepo,
    summary: {
      totalCommits,
      longestStreak,
      topLanguage: topLanguages[0] ?? null,
      topRepo,
    },
  };
}

export type TimeBucket = "madrugada" | "manana" | "tarde" | "noche";

export interface UserProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  htmlUrl: string;
}

export interface RepoLanguageMap {
  [language: string]: number;
}

export interface CommitActivityWeek {
  week: number;
  total: number;
  days: number[];
}

export interface PushEventSummary {
  createdAt: string;
  repoName: string;
  commitCount: number;
}

export interface AuthoredCommitPoint {
  committedAt: string;
  repoName: string;
}

export interface RateLimitInfo {
  limit: number | null;
  remaining: number | null;
  resetAt: string | null;
}

export interface GitHubWrappedRawData {
  user: UserProfile;
  repos: string[];
  repoLanguages: Record<string, RepoLanguageMap>;
  commitActivity: Record<string, CommitActivityWeek[]>;
  pushEvents: PushEventSummary[];
  authoredCommits: AuthoredCommitPoint[];
  rateLimit: RateLimitInfo;
}

export interface TopLanguage {
  language: string;
  bytes: number;
  percentage: number;
}

export interface CodingSchedule {
  bucket: TimeBucket;
  commits: number;
  percentage: number;
}

export interface TopRepo {
  name: string;
  commits: number;
}

export interface WrappedSummary {
  totalCommits: number;
  longestStreak: number;
  topLanguage: TopLanguage | null;
  topRepo: TopRepo | null;
}

export interface WrappedStats {
  year: number;
  totalCommits: number;
  topLanguages: TopLanguage[];
  codingSchedule: CodingSchedule[];
  longestStreak: number;
  topRepo: TopRepo | null;
  summary: WrappedSummary;
}

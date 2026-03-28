import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import type { Metadata } from "next";

import { CardCarousel } from "@/components/CardCarousel";
import { CodingScheduleCard } from "@/components/cards/CodingScheduleCard";
import { LongestStreakCard } from "@/components/cards/LongestStreakCard";
import { SummaryCard } from "@/components/cards/SummaryCard";
import { TopLanguagesCard } from "@/components/cards/TopLanguagesCard";
import { TopRepoCard } from "@/components/cards/TopRepoCard";
import { TotalCommitsCard } from "@/components/cards/TotalCommitsCard";
import {
  getGitHubWrappedRawData,
  GitHubRateLimitError,
  GitHubUserNotFoundError,
} from "@/lib/github";
import { calculateWrappedStats } from "@/lib/stats";

const currentYear = new Date().getUTCFullYear();

type WrappedPageProps = {
  params: Promise<{ username: string }>;
};

const getWrappedData = cache(async (username: string) => {
  const rawData = await getGitHubWrappedRawData(username);
  const stats = calculateWrappedStats(rawData, currentYear);
  return {
    rawData,
    stats,
  };
});

type WrappedPageResult =
  | {
      status: "ok";
      rawData: Awaited<ReturnType<typeof getWrappedData>>["rawData"];
      stats: Awaited<ReturnType<typeof getWrappedData>>["stats"];
      username: string;
    }
  | {
      status: "not_found";
      username: string;
    }
  | {
      status: "rate_limit";
      resetAt: string | null;
    };

async function resolveWrappedPage(username: string): Promise<WrappedPageResult> {
  try {
    const { rawData, stats } = await getWrappedData(username);
    return {
      status: "ok",
      rawData,
      stats,
      username,
    };
  } catch (error: unknown) {
    if (error instanceof GitHubUserNotFoundError) {
      return {
        status: "not_found",
        username,
      };
    }

    if (error instanceof GitHubRateLimitError) {
      return {
        status: "rate_limit",
        resetAt: error.resetAt,
      };
    }

    throw error;
  }
}

export async function generateMetadata(props: WrappedPageProps): Promise<Metadata> {
  const { username } = await props.params;
  const normalizedUsername = username.trim();

  return {
    title: `${normalizedUsername}'s GitHub Wrapped ${currentYear}`,
    description: `Resumen visual anual de la actividad de ${normalizedUsername} en GitHub.`,
    openGraph: {
      title: `${normalizedUsername}'s GitHub Wrapped ${currentYear}`,
      description: `Commits, lenguajes top y racha de coding de ${normalizedUsername}.`,
      images: [`/api/og/${encodeURIComponent(normalizedUsername)}`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${normalizedUsername}'s GitHub Wrapped ${currentYear}`,
      description: `Commits, lenguajes top y racha de coding de ${normalizedUsername}.`,
      images: [`/api/og/${encodeURIComponent(normalizedUsername)}`],
    },
  };
}

export default async function WrappedPage(props: WrappedPageProps) {
  const { username } = await props.params;
  const normalizedUsername = username.trim().replace(/^@/, "");
  const result = await resolveWrappedPage(normalizedUsername);

  if (result.status === "not_found") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-1 items-center justify-center px-6">
        <div className="w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-[0_14px_40px_rgba(1,4,9,0.45)]">
          <p className="text-sm uppercase tracking-[0.2em] text-foreground-muted">Ups</p>
          <h1 className="mt-2 text-3xl font-black text-foreground-strong">Usuario no encontrado</h1>
          <p className="mt-3 text-foreground">
            No encontramos a <span className="font-semibold text-foreground-strong">@{result.username}</span>. Verifica el username
            e intenta de nuevo.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  if (result.status === "rate_limit") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-1 items-center justify-center px-6">
        <div className="w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-[0_14px_40px_rgba(1,4,9,0.45)]">
          <h1 className="text-3xl font-black text-foreground-strong">Rate limit de GitHub alcanzado</h1>
          <p className="mt-3 text-foreground">
            Si agregas <code>GITHUB_TOKEN</code> en tu entorno vas a tener un limite mucho mas alto.
          </p>
          {result.resetAt ? (
            <p className="mt-2 text-sm text-foreground-muted">Reset estimado: {new Date(result.resetAt).toLocaleString()}</p>
          ) : null}
          <Link
            href="/"
            className="mt-6 inline-flex rounded-lg border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  const { rawData, stats } = result;
  const cards = [
    {
      id: "total-commits",
      node: <TotalCommitsCard year={stats.year} totalCommits={stats.totalCommits} />,
    },
    {
      id: "top-languages",
      node: <TopLanguagesCard topLanguages={stats.topLanguages} />,
    },
    {
      id: "coding-schedule",
      node: <CodingScheduleCard schedule={stats.codingSchedule} />,
    },
    {
      id: "longest-streak",
      node: <LongestStreakCard streak={stats.longestStreak} />,
    },
    {
      id: "top-repo",
      node: <TopRepoCard topRepo={stats.topRepo} />,
    },
    {
      id: "summary",
      node: <SummaryCard username={rawData.user.login} stats={stats} />,
    },
  ];

  return (
    <main className="page-enter mx-auto flex min-h-screen w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
      <header className="rounded-2xl border border-border bg-surface p-6 shadow-[0_14px_38px_rgba(1,4,9,0.35)]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={rawData.user.avatarUrl}
              alt={rawData.user.login}
              width={72}
              height={72}
              className="rounded-xl border border-border"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">GitHub Wrapped</p>
              <h1 className="text-3xl font-black text-foreground-strong sm:text-4xl">@{rawData.user.login}</h1>
              <p className="max-w-xl text-sm text-foreground">{rawData.user.bio ?? "Sin bio publica"}</p>
            </div>
          </div>

          <div className="space-y-1 text-sm text-foreground">
            <p>
              Year: <span className="font-semibold text-foreground-strong">{stats.year}</span>
            </p>
            <p>
              Rate limit: <span className="font-semibold text-foreground-strong">{rawData.rateLimit.remaining ?? "?"}</span> /{" "}
              {rawData.rateLimit.limit ?? "?"}
            </p>
            <Link href="/" className="inline-block text-accent transition-colors hover:text-accent-hover">
              Buscar otro perfil
            </Link>
          </div>
        </div>
      </header>

      <CardCarousel cards={cards} username={rawData.user.login} />
    </main>
  );
}

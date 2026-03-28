import type { WrappedStats } from "@/lib/types";
import { CardShell } from "@/components/cards/CardShell";

interface SummaryCardProps {
  username: string;
  stats: WrappedStats;
}

export function SummaryCard({ username, stats }: SummaryCardProps) {
  return (
    <CardShell title="Summary" subtitle="Tu GitHub Wrapped en una sola vista">
      <p className="text-3xl font-black leading-tight text-foreground-strong sm:text-4xl">
        @{username}, este ano metiste {stats.totalCommits} commits, tu mejor racha fue de {stats.longestStreak} dias
        y {stats.summary.topLanguage?.language ?? "tu stack principal"} marco el ritmo.
      </p>
      <p className="text-sm text-foreground-muted sm:text-base">
        Top repo: {stats.summary.topRepo?.name ?? "Sin datos"}. Compartilo y comparalo con tu squad.
      </p>
    </CardShell>
  );
}

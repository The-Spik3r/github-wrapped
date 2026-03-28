import { CardShell } from "@/components/cards/CardShell";

interface TotalCommitsCardProps {
  year: number;
  totalCommits: number;
}

export function TotalCommitsCard({ year, totalCommits }: TotalCommitsCardProps) {
  return (
    <CardShell title="Total Commits" subtitle={`Actividad registrada durante ${year}`}>
      <p className="text-6xl font-black tracking-tight text-white sm:text-7xl">{totalCommits}</p>
      <p className="max-w-lg text-sm text-zinc-300 sm:text-base">
        Cada push cuenta una parte del año. Este es tu volumen total de commits detectado en eventos
        publicos y stats de repos.
      </p>
    </CardShell>
  );
}

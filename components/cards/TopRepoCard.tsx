import type { TopRepo } from "@/lib/types";
import { CardShell } from "@/components/cards/CardShell";

interface TopRepoCardProps {
  topRepo: TopRepo | null;
}

export function TopRepoCard({ topRepo }: TopRepoCardProps) {
  return (
    <CardShell title="Top Repo" subtitle="Repositorio con mayor volumen de commits">
      {topRepo ? (
        <>
          <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">{topRepo.name}</p>
          <p className="text-lg text-zinc-200">{topRepo.commits} commits en el ano</p>
        </>
      ) : (
        <p className="text-zinc-300">No se encontro un repositorio dominante este ano.</p>
      )}
    </CardShell>
  );
}

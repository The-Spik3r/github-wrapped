import type { TopLanguage } from "@/lib/types";
import { CardShell } from "@/components/cards/CardShell";

interface TopLanguagesCardProps {
  topLanguages: TopLanguage[];
}

export function TopLanguagesCard({ topLanguages }: TopLanguagesCardProps) {
  return (
    <CardShell title="Top Languages" subtitle="Lenguajes por bytes de codigo en repos publicos">
      {topLanguages.length > 0 ? (
        <div className="space-y-4">
          {topLanguages.map((item, index) => (
            <div key={item.language} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">#{index + 1} {item.language}</span>
                <span className="text-sm font-semibold text-zinc-300">{item.percentage}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-green"
                  style={{ width: `${Math.max(item.percentage, 6)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-300">No hubo suficiente data para calcular lenguajes top.</p>
      )}
    </CardShell>
  );
}

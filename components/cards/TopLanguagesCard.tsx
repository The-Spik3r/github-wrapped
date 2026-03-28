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
                <span className="text-2xl font-bold text-foreground-strong">#{index + 1} {item.language}</span>
                <span className="text-sm font-semibold text-foreground-muted">{item.percentage}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${Math.max(item.percentage, 6)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-foreground-muted">No hubo suficiente data para calcular lenguajes top.</p>
      )}
    </CardShell>
  );
}

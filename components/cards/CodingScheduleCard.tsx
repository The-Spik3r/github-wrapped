import type { CodingSchedule, TimeBucket } from "@/lib/types";
import { CardShell } from "@/components/cards/CardShell";

interface CodingScheduleCardProps {
  schedule: CodingSchedule[];
}

const LABELS: Record<TimeBucket, string> = {
  madrugada: "Madrugada",
  manana: "Manana",
  tarde: "Tarde",
  noche: "Noche",
};

export function CodingScheduleCard({ schedule }: CodingScheduleCardProps) {
  const topWindow = [...schedule].sort((a, b) => b.commits - a.commits)[0];

  return (
    <CardShell
      title="Coding Schedule"
      subtitle={topWindow ? `Tu ventana mas activa: ${LABELS[topWindow.bucket]}` : "Sin actividad detectada"}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {schedule.map((entry) => (
          <div key={entry.bucket} className="rounded-xl border border-border bg-surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground-muted">
              {LABELS[entry.bucket]}
            </p>
            <p className="mt-1 text-3xl font-black text-foreground-strong">{entry.commits}</p>
            <p className="text-sm text-foreground-muted">{entry.percentage}% del total anual</p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

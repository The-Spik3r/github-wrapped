import { CardShell } from "@/components/cards/CardShell";

interface LongestStreakCardProps {
  streak: number;
}

export function LongestStreakCard({ streak }: LongestStreakCardProps) {
  return (
    <CardShell title="Longest Streak" subtitle="Dias consecutivos con al menos un commit">
      <p className="text-6xl font-black tracking-tight text-foreground-strong sm:text-7xl">{streak} dias</p>
      <p className="max-w-lg text-sm text-foreground-muted sm:text-base">
        La constancia gana. Esta fue tu racha mas larga de actividad seguida en el ano.
      </p>
    </CardShell>
  );
}

import { ReactNode } from "react";

interface CardShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function CardShell({ title, subtitle, children }: CardShellProps) {
  return (
    <article className="relative w-full overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/5 p-6 shadow-[0_22px_75px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-violet/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-accent-cyan/20 blur-3xl" />

      <div className="relative space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">{title}</h2>
        {subtitle ? <p className="text-sm text-zinc-300">{subtitle}</p> : null}
        {children}
      </div>
    </article>
  );
}

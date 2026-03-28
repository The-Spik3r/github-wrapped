import { ReactNode } from "react";

interface CardShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function CardShell({ title, subtitle, children }: CardShellProps) {
  return (
    <article className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-[0_16px_44px_rgba(1,4,9,0.35)] sm:p-8">
      <div className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-muted">{title}</h2>
        {subtitle ? <p className="text-sm text-foreground-muted">{subtitle}</p> : null}
        {children}
      </div>
    </article>
  );
}

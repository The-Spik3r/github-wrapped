"use client";

import Link from "next/link";

export default function WrappedError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-1 items-center justify-center px-6">
      <div className="w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-[0_14px_40px_rgba(1,4,9,0.45)]">
        <h1 className="text-3xl font-black text-foreground-strong">No pudimos generar el Wrapped</h1>
        <p className="mt-3 text-foreground">{error.message || "Ocurrio un error inesperado."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-lg border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

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
      <div className="w-full rounded-3xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-xl">
        <h1 className="text-3xl font-black text-white">No pudimos generar el Wrapped</h1>
        <p className="mt-3 text-zinc-300">{error.message || "Ocurrio un error inesperado."}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}

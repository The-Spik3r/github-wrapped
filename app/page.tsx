import { UsernameInput } from "@/components/UsernameInput";

export default function Home() {
  return (
    <main className="page-enter mx-auto flex min-h-screen w-full max-w-6xl flex-1 items-center justify-center px-6 py-14">
      <section className="w-full max-w-3xl rounded-[1.6rem] border border-border bg-surface p-8 shadow-[0_20px_60px_rgba(1,4,9,0.45)] sm:p-12">
        <div className="space-y-8">
          <span className="fade-up inline-flex items-center rounded-md border border-border bg-surface-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            GitHub Wrapped
          </span>

          <div className="space-y-4 fade-up [animation-delay:120ms]">
            <h1 className="text-4xl font-black leading-tight text-foreground-strong sm:text-6xl">
              Tu actividad de GitHub, con un resumen claro y elegante.
            </h1>
            <p className="max-w-2xl text-base text-foreground-muted sm:text-lg">
              Ingresa cualquier username publico para ver commits, rachas, lenguajes y horarios de codigo
              con una experiencia visual inspirada en GitHub.
            </p>
          </div>

          <div className="fade-up [animation-delay:220ms]">
            <UsernameInput />
          </div>
        </div>
      </section>
    </main>
  );
}

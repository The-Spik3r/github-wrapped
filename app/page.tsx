import { UsernameInput } from "@/components/UsernameInput";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-1 items-center justify-center px-6 py-14">
      <section className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-8 shadow-[0_22px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-accent-violet/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-accent-cyan/20 blur-3xl" />

        <div className="relative space-y-8">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            GitHub Wrapped
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-tight text-white sm:text-6xl">
              Tu año en código, contado como un wrapped visual.
            </h1>
            <p className="max-w-2xl text-base text-foreground-muted sm:text-lg">
              Ingresá cualquier username público de GitHub y generá cards animadas con commits, rachas,
              lenguajes top y horarios de coding.
            </p>
          </div>

          <UsernameInput />
        </div>
      </section>
    </main>
  );
}

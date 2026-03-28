export default function LoadingWrapped() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-10 sm:px-8 sm:py-14">
      <div className="h-32 animate-pulse rounded-2xl border border-border bg-surface" />
      <div className="h-[420px] animate-pulse rounded-2xl border border-border bg-surface" />
    </main>
  );
}

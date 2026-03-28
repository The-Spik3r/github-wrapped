"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function UsernameInput() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleaned = username.trim().replace(/^@/, "");
    if (!cleaned) {
      return;
    }

    router.push(`/${encodeURIComponent(cleaned)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="sr-only" htmlFor="github-username">
        GitHub username
      </label>
      <div className="rounded-3xl border border-white/20 bg-black/35 p-2 backdrop-blur-md">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="github-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="octocat"
            className="h-12 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 text-base text-white outline-none ring-accent-violet/60 placeholder:text-zinc-400 focus:ring-2"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-2xl bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-green px-6 text-sm font-bold text-white transition hover:opacity-95"
          >
            Generate my Wrapped
          </button>
        </div>
      </div>
    </form>
  );
}

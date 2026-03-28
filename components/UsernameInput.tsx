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
      <div className="rounded-xl border border-border bg-surface-soft p-2">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="github-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            placeholder="octocat"
            className="h-12 flex-1 rounded-lg border border-border bg-background px-4 text-base text-foreground-strong outline-none ring-accent/35 placeholder:text-foreground-muted transition focus:border-accent focus:ring-2"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-lg border border-accent-hover bg-accent px-6 text-sm font-bold text-white transition duration-200 hover:bg-accent-hover"
          >
            Generate my Wrapped
          </button>
        </div>
      </div>
    </form>
  );
}

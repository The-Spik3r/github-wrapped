import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { getGitHubWrappedRawData, GitHubUserNotFoundError } from "@/lib/github";
import { calculateWrappedStats } from "@/lib/stats";

export const runtime = "nodejs";

const currentYear = new Date().getUTCFullYear();

type RouteParams = {
  params: Promise<{ username: string }>;
};

export async function GET(_request: Request, context: RouteParams) {
  const { username } = await context.params;
  const normalizedUsername = username.trim().replace(/^@/, "");

  try {
    const [rawData, fontData] = await Promise.all([
      getGitHubWrappedRawData(normalizedUsername),
      readFile(path.join(process.cwd(), "public", "fonts", "Geist-Regular.ttf")),
    ]);

    const stats = calculateWrappedStats(rawData, currentYear);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #05040d 0%, #1a0533 60%, #0d1f2f 100%)",
            padding: "56px",
            color: "white",
            fontFamily: "Geist",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rawData.user.avatarUrl}
              alt={rawData.user.login}
              width={96}
              height={96}
              style={{ borderRadius: 24, border: "2px solid rgba(255,255,255,0.25)" }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 24, opacity: 0.85 }}>GitHub Wrapped</span>
              <span style={{ fontSize: 52, fontWeight: 700 }}>@{rawData.user.login}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 18 }}>
            <Stat label="Total commits" value={String(stats.totalCommits)} accent="#1DB954" />
            <Stat
              label="Top lenguaje"
              value={stats.topLanguages[0]?.language ?? "N/A"}
              accent="#8B5CF6"
            />
            <Stat label="Racha maxima" value={`${stats.longestStreak} dias`} accent="#06B6D4" />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist",
            data: fontData,
            weight: 400,
            style: "normal",
          },
        ],
      },
    );
  } catch (error: unknown) {
    if (error instanceof GitHubUserNotFoundError) {
      return new Response("Usuario no encontrado", { status: 404 });
    }
    return new Response("No se pudo generar la OG image", { status: 500 });
  }
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "20px 22px",
        borderRadius: 20,
        background: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <span style={{ fontSize: 24, color: "rgba(255,255,255,0.82)" }}>{label}</span>
      <span style={{ fontSize: 36, fontWeight: 700, color: accent }}>{value}</span>
    </div>
  );
}

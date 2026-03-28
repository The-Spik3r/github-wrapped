"use client";

import { RefObject, useState } from "react";
import { toPng } from "html-to-image";

interface ShareButtonsProps {
  targetRef: RefObject<HTMLElement | null>;
  username: string;
}

export function ShareButtons({ targetRef, username }: ShareButtonsProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const openTwitterShare = () => {
    const currentUrl = window.location.href;
    const tweetText = encodeURIComponent(`Mi GitHub Wrapped esta listo. Miralo aca: ${currentUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank", "noopener,noreferrer");
  };

  const openLinkedInShare = () => {
    const currentUrl = window.location.href;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async () => {
    if (!targetRef.current) {
      return;
    }

    setIsDownloading(true);
    try {
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `${username}-github-wrapped.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleDownload}
        className="rounded-lg border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
      >
        {isDownloading ? "Generando..." : "Descargar como imagen"}
      </button>

        <button
        type="button"
        className="rounded-lg border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
        onClick={openTwitterShare}
      >
        Compartir en Twitter
      </button>

      <button
        type="button"
        className="rounded-lg border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-foreground-strong"
        onClick={openLinkedInShare}
      >
        Compartir en LinkedIn
      </button>
    </div>
  );
}

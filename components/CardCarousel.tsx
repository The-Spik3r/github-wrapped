"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ShareButtons } from "@/components/ShareButtons";

interface CarouselCard {
  id: string;
  node: ReactNode;
}

interface CardCarouselProps {
  cards: CarouselCard[];
  username: string;
}

const swipeThreshold = 80;

export function CardCarousel({ cards, username }: CardCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const captureRef = useRef<HTMLDivElement>(null);

  const total = cards.length;
  const currentCard = cards[index];

  const setCard = (next: number) => {
    const wrapped = (next + total) % total;
    setDirection(wrapped >= index ? 1 : -1);
    setIndex(wrapped);
  };

  const move = (step: number) => {
    setDirection(step > 0 ? 1 : -1);
    setIndex((prev) => (prev + step + total) % total);
  };

  const jumpNext = () => move(1);
  const jumpPrev = () => move(-1);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setDirection(1);
        setIndex((prev) => (prev + 1) % total);
      }
      if (event.key === "ArrowLeft") {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + total) % total);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  const variants = useMemo(
    () => ({
      enter: (customDirection: number) => ({
        y: 28,
        opacity: 0,
        x: customDirection > 0 ? 36 : -36,
      }),
      center: {
        y: 0,
        x: 0,
        opacity: 1,
      },
      exit: (customDirection: number) => ({
        y: -22,
        opacity: 0,
        x: customDirection > 0 ? -36 : 36,
      }),
    }),
    [],
  );

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          Card {index + 1} / {total}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={jumpPrev}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            ←
          </button>
          <button
            type="button"
            onClick={jumpNext}
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            →
          </button>
        </div>
      </div>

      <div ref={captureRef}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentCard.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > swipeThreshold) {
                jumpPrev();
              }
              if (info.offset.x < -swipeThreshold) {
                jumpNext();
              }
            }}
          >
            {currentCard.node}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        {cards.map((card, dotIndex) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setCard(dotIndex)}
            className={`h-2 rounded-full transition ${dotIndex === index ? "w-9 bg-accent-cyan" : "w-2 bg-white/30"}`}
            aria-label={`Ir a card ${dotIndex + 1}`}
          />
        ))}
      </div>

      <ShareButtons targetRef={captureRef} username={username} />
    </section>
  );
}

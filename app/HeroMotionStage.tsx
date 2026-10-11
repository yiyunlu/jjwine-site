"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteHeroMotionCopy } from "./content";

const HERO_VIDEO_SRC = "/media/hero/hero-loop.mp4";
const HERO_POSTER_SRC = "/media/hero/hero-poster.png";

type Props = {
  copy: SiteHeroMotionCopy;
};

export function HeroMotionStage({ copy }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [inView, setInView] = useState(false);
  const shouldLoadVideo = inView && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReduced = () => setReducedMotion(media.matches);
    syncReduced();
    media.addEventListener("change", syncReduced);

    const node = rootRef.current;
    if (!node) {
      return () => media.removeEventListener("change", syncReduced);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.12 },
    );
    observer.observe(node);

    return () => {
      media.removeEventListener("change", syncReduced);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || !shouldLoadVideo) {
      return;
    }

    const shouldPlay = inView && !paused;
    if (shouldPlay) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, paused, reducedMotion, shouldLoadVideo]);

  const isPaused = paused || !inView;
  const showPauseControl = !reducedMotion;

  return (
    <div
      className={[
        "motion-stage",
        "hero-motion-stage",
        reducedMotion ? "is-reduced-motion" : "",
        isPaused ? "is-paused" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={rootRef}
    >
      {showPauseControl ? (
        <button
          aria-label={isPaused ? copy.play : copy.pause}
          className="hero-motion-pause"
          onClick={() => setPaused((value) => !value)}
          type="button"
        >
          {isPaused ? "▶" : "❚❚"}
        </button>
      ) : null}

      <video
        aria-hidden="true"
        className="hero-motion-media"
        loop={!reducedMotion}
        muted
        playsInline
        poster={HERO_POSTER_SRC}
        preload="none"
        ref={videoRef}
        src={shouldLoadVideo ? HERO_VIDEO_SRC : undefined}
        tabIndex={-1}
      />
    </div>
  );
}

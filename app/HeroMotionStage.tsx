"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteHeroMotionCopy } from "./content";

type Props = {
  copy: SiteHeroMotionCopy;
  formatLabels: [string, string, string];
};

export function HeroMotionStage({ copy, formatLabels }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

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
        if (entry) setOffscreen(!entry.isIntersecting);
      },
      { threshold: 0.12 },
    );
    observer.observe(node);

    return () => {
      media.removeEventListener("change", syncReduced);
      observer.disconnect();
    };
  }, []);

  const isPaused = paused || offscreen;
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
          {isPaused ? copy.play : copy.pause}
        </button>
      ) : null}

      <svg aria-hidden="true" className="hero-motion-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path
            d="M 72 292 C 120 248, 168 220, 208 196 S 296 132, 328 108"
            id="hero-motion-route-path"
            pathLength={1}
          />
        </defs>

        <g className="hero-motion-grid">
          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`v-${index}`}
              x1={40 + index * 40}
              x2={40 + index * 40}
              y1={48}
              y2={352}
            />
          ))}
          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`h-${index}`}
              x1={40}
              x2={360}
              y1={48 + index * 38}
              y2={48 + index * 38}
            />
          ))}
        </g>

        <use className="hero-motion-route" href="#hero-motion-route-path" />

        <g className="hero-motion-beat hero-motion-beat--source">
          <circle className="hero-motion-node-ring" cx="72" cy="292" r="28" />
          <text className="hero-motion-beat-label" x="72" y="338">{copy.source}</text>
          <text className="hero-motion-metric" x="72" y="358">{copy.metric}</text>
        </g>

        <g className="hero-motion-beat hero-motion-beat--produce">
          <circle className="hero-motion-node-ring" cx="208" cy="196" r="28" />
          <text className="hero-motion-beat-label" x="208" y="242">{copy.produce}</text>
          <text className="hero-motion-metric" x="208" y="262">{copy.metric}</text>
          <path className="hero-motion-bridge" d="M 236 196 L 288 150" pathLength={1} />
        </g>

        <g className="hero-motion-beat hero-motion-beat--deliver">
          <circle className="hero-motion-node-ring" cx="328" cy="108" r="28" />
          <text className="hero-motion-beat-label" x="328" y="154">{copy.deliver}</text>

          <g className="hero-motion-formats">
            <g className="hero-motion-format hero-motion-format--bottle" transform="translate(248 52)">
              <path
                d="M 18 8 L 22 8 L 24 18 L 24 52 L 12 52 L 12 18 L 14 8 Z"
                pathLength={1}
              />
              <text x="18" y="68">{formatLabels[0]}</text>
            </g>
            <g className="hero-motion-format hero-motion-format--can" transform="translate(288 48)">
              <path
                d="M 10 6 L 26 6 Q 30 6 30 12 L 30 48 Q 30 54 26 54 L 10 54 Q 6 54 6 48 L 6 12 Q 6 6 10 6 Z"
                pathLength={1}
              />
              <text x="18" y="68">{formatLabels[1]}</text>
            </g>
            <g className="hero-motion-format hero-motion-format--bib" transform="translate(328 50)">
              <path d="M 4 14 L 32 14 L 32 52 L 4 52 Z M 18 6 L 22 14" pathLength={1} />
              <text x="18" y="68">{formatLabels[2]}</text>
            </g>
          </g>

          <g className="hero-motion-container" transform="translate(302 78)">
            <path d="M 0 10 L 36 10 L 42 22 L 42 46 L 0 46 Z" pathLength={1} />
          </g>
          <text className="hero-motion-metric hero-motion-metric--deliver" x="328" y="188">
            {copy.metric}
          </text>
        </g>

        <circle className="hero-motion-flow-dot" cx="72" cy="292" r="5" />
      </svg>
    </div>
  );
}

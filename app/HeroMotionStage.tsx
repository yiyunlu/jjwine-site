"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteHeroMotionCopy } from "./content";

type Props = {
  copy: SiteHeroMotionCopy;
};

export function HeroMotionStage({ copy }: Props) {
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
          {isPaused ? "▶" : "❚❚"}
        </button>
      ) : null}

      <svg aria-hidden="true" className="hero-motion-svg" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path d="M 44 248 L 476 248" id="hero-motion-route-path" pathLength={1} />
          <marker id="hero-motion-arrowhead" markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill="#f3eee5" />
          </marker>
        </defs>

        <g className="hero-motion-grid">
          {Array.from({ length: 12 }, (_, index) => (
            <line key={`v-${index}`} x1={24 + index * 40} x2={24 + index * 40} y1={36} y2={268} />
          ))}
          {Array.from({ length: 7 }, (_, index) => (
            <line key={`h-${index}`} x1={24} x2={496} y1={36 + index * 38} y2={36 + index * 38} />
          ))}
        </g>

        <g className="hero-motion-ghost">
          <ellipse cx="80" cy="188" rx="22" ry="30" />
          <rect height="52" rx="4" width="34" x="63" y="162" />
          <rect height="58" rx="5" width="42" x="234" y="138" />
          <path d="M 276 168 L 302 168 L 302 198 L 276 198" />
          <line x1="338" x2="452" y1="210" y2="210" />
          <path d="M 348 148 L 354 132 L 360 148 L 360 188 L 348 188 Z" />
          <rect height="40" rx="3" width="22" x="378" y="148" />
          <rect height="36" width="28" x="412" y="152" />
          <path d="M 448 162 L 488 162 L 494 176 L 494 214 L 448 214 Z" />
        </g>

        <use className="hero-motion-route hero-motion-route--base" href="#hero-motion-route-path" />
        <path
          className="hero-motion-route hero-motion-route--extend"
          d="M 476 248 L 504 248"
          pathLength={1}
        />

        <g className="hero-motion-station hero-motion-station--source">
          <text className="hero-motion-station-id" x="80" y="118">{copy.source}</text>
          <text className="hero-motion-metric hero-motion-metric--source" x="80" y="102">
            {copy.metricSource}
          </text>
          <path
            className="hero-motion-draw"
            d="M 68 128 C 72 120, 78 116, 84 118 C 90 120, 94 128, 92 134 C 88 142, 76 142, 72 134 C 70 130, 68 128, 68 128 Z"
            pathLength={1}
          />
          <path
            className="hero-motion-draw"
            d="M 63 162 H 97 V 214 H 63 V 162 Z"
            pathLength={1}
          />
          <rect
            className="hero-motion-liquid-fill hero-motion-liquid-fill--source"
            fill="#b3263b"
            height="40"
            width="30"
            x="65"
            y="174"
          />
        </g>

        <g className="hero-motion-station hero-motion-station--produce">
          <text className="hero-motion-station-id" x="260" y="118">{copy.produce}</text>
          <text className="hero-motion-metric hero-motion-metric--produce" x="260" y="102">
            {copy.metricProduce}
          </text>
          <path
            className="hero-motion-draw"
            d="M 234 143 Q 234 138 239 138 H 271 Q 276 138 276 143 V 196 Q 276 201 271 201 H 239 Q 234 201 234 196 V 143 Z"
            pathLength={1}
          />
          <path className="hero-motion-draw" d="M 276 168 L 318 168 L 318 176" pathLength={1} />
          <path className="hero-motion-draw" d="M 318 176 L 318 198 L 276 198 L 276 176 Z" pathLength={1} />
          <path className="hero-motion-draw" d="M 286 198 L 286 214 L 292 222 L 298 214 L 298 198" pathLength={1} />
          <path className="hero-motion-draw" d="M 304 198 L 304 212 L 308 218 L 312 212 L 312 198" pathLength={1} />
          <rect
            className="hero-motion-liquid-fill hero-motion-liquid-fill--produce"
            fill="#b3263b"
            height="36"
            opacity="0.85"
            width="34"
            x="238"
            y="160"
          />
          <path
            className="hero-motion-bridge"
            d="M 318 176 L 352 168"
            markerEnd="url(#hero-motion-arrowhead)"
            pathLength={1}
          />
        </g>

        <g className="hero-motion-station hero-motion-station--deliver">
          <text className="hero-motion-station-id" x="404" y="118">{copy.deliver}</text>
          <text className="hero-motion-metric hero-motion-metric--deliver" x="404" y="102">
            {copy.metricDeliver}
          </text>

          <line className="hero-motion-draw hero-motion-tray" pathLength={1} x1="338" x2="452" y1="210" y2="210" />

          <g className="hero-motion-format hero-motion-format--bottle" transform="translate(340 148)">
            <path
              className="hero-motion-draw"
              d="M 10 2 L 14 2 L 15 10 L 15 14 L 18 18 L 18 48 L 6 48 L 6 18 L 9 14 L 9 10 L 10 2 Z"
              pathLength={1}
            />
            <text className="hero-motion-format-label" x="12" y="62">{copy.formatBottle}</text>
          </g>

          <g className="hero-motion-format hero-motion-format--can" transform="translate(378 144)">
            <path
              className="hero-motion-draw"
              d="M 4 8 L 18 8 M 4 44 L 18 44 M 6 8 L 6 44 Q 6 48 11 48 L 15 48 Q 20 48 20 44 L 20 8 Q 20 4 15 4 L 11 4 Q 6 4 6 8 Z M 11 2 L 13 6"
              pathLength={1}
            />
            <text className="hero-motion-format-label" x="11" y="62">{copy.formatCan}</text>
          </g>

          <g className="hero-motion-format hero-motion-format--bib" transform="translate(408 146)">
            <path
              className="hero-motion-draw"
              d="M 2 12 L 30 12 L 30 48 L 2 48 Z M 16 4 L 20 12 M 8 20 L 24 20"
              pathLength={1}
            />
            <path className="hero-motion-draw hero-motion-bib-inner" d="M 6 24 L 26 24" pathLength={1} />
            <path className="hero-motion-draw hero-motion-bib-tap" d="M 14 48 L 14 54 L 18 54 L 18 48" pathLength={1} />
            <text className="hero-motion-format-label" x="16" y="66">{copy.formatBib}</text>
          </g>

          <g className="hero-motion-container" transform="translate(448 158)">
            <path
              className="hero-motion-draw"
              d="M 0 8 L 40 8 L 46 22 L 46 52 L 0 52 Z"
              pathLength={1}
            />
          </g>
        </g>

        <circle className="hero-motion-flow-dot" cx="44" cy="248" r="4" />
      </svg>
    </div>
  );
}

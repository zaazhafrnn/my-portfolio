"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const BIG_TEXT = "portfolio.";
const CURVE_TEXT = "welcome to my";

export const WelcomeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigSpansRef = useRef<HTMLSpanElement[]>([]);
  const smallSpansRef = useRef<SVGTextPathElement[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const animate = (spans: (HTMLElement | SVGTextPathElement)[]) => {
        spans.forEach((span) => {
          const rect = (span as HTMLElement).getBoundingClientRect?.();
          if (!rect) return;

          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          const dx = e.clientX - x;
          const dy = e.clientY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;

          const weight =
            distance < maxDistance
              ? 400 + (1 - distance / maxDistance) * 400
              : 400;

          gsap.to(span, {
            fontVariationSettings: `"wght" ${weight}`,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      };

      animate(bigSpansRef.current);
      animate(smallSpansRef.current);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="select-none font-sans variable-text relative w-full flex flex-col items-center justify-center"
    >
      <div className="absolute -top-22">
        <svg viewBox="0 0 300 100" className="w-[280px] h-[100px]">
          <path id="curve" d="M 10 90 Q 150 70 290 90" fill="transparent" />
          <text fontSize="24">
            {CURVE_TEXT.split("").map((char, i) => (
              <textPath
                key={i}
                xlinkHref="#curve"
                startOffset={`${(i / CURVE_TEXT.length) * 100}%`}
                ref={(el) => {
                  if (el) smallSpansRef.current[i] = el;
                }}
              >
                {char === " " ? "\u00A0" : char}
              </textPath>
            ))}
          </text>
        </svg>
      </div>

      <div className="text-[64px] md:text-[88px] font-semibold z-10">
        {BIG_TEXT.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) bigSpansRef.current[i] = el;
            }}
            className="font-playfair italic px-[2px]"
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

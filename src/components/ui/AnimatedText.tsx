"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const BIG_TEXT = "portfolio✨";
const CURVE_TEXT = "welcome to my";

export const WelcomeText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigSpansRef = useRef<HTMLSpanElement[]>([]);
  const smallSpansRef = useRef<SVGTextPathElement[]>([]);
  const shimmerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const shimmerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const intro = gsap.timeline();

    if (bigSpansRef.current.length > 0) {
      intro.fromTo(
        bigSpansRef.current,
        { y: -50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "bounce.out",
          stagger: 0.05,
        },
      );
    }

    if (smallSpansRef.current.length > 0) {
      intro.fromTo(
        smallSpansRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.03,
          delay: 0.2,
        },
        "<",
      );
    }

    intro.call(() => {
      const shimmerWave = () => {
        gsap.fromTo(
          bigSpansRef.current,
          { opacity: 1 },
          {
            opacity: 0.4,
            duration: 0.6,
            ease: "sine.inOut",
            stagger: {
              each: 0.08,
              yoyo: true,
              repeat: 1,
            },
          },
        );
      };

      shimmerIntervalRef.current = setInterval(shimmerWave, 11000);
      shimmerTimeoutRef.current = setTimeout(shimmerWave, 11000); // first shimmer after intro
    });

    return () => {
      if (shimmerIntervalRef.current) {
        clearInterval(shimmerIntervalRef.current);
      }
      if (shimmerTimeoutRef.current) {
        clearTimeout(shimmerTimeoutRef.current);
      }
    };
  }, []);

  // Mouse move font-weight animation
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
      className="select-none font-sans variable-text relative w-full flex flex-col items-center justify-center -translate-x-6.5"
    >
      <div className="absolute bottom-26 translate-x-3/18">
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

      <div className="text-[64px] md:text-[88px] font-semibold translate-x-14 z-10">
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

"use client";

import { useEffect, useRef } from "react";
import { loadGsap, EASE } from "@/lib/gsap";

interface HeroVideoProps {
  src?:         string;
  scrollHeight?: string;
  headline?:    string;
  subline?:     string;
  overlayColor?: string;
}

export default function HeroVideo({
  src           = "/hero.mp4",
  scrollHeight  = "400vh",
  headline      = "Brighter skin.\nProven results.",
  subline       = "15% Vitamin C · Clinically proven in 4 weeks",
  overlayColor  = "rgba(44,24,16,0.38)",
}: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const lines        = headline.split("\n");

  useEffect(() => {
    let ctx: { revert(): void } | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g) return;
      const { gsap, ScrollTrigger } = g;

      const video     = videoRef.current;
      const container = containerRef.current;
      if (!video || !container) return;

      ctx = gsap.context(() => {

        // ── 1. Scroll-synced video scrub ──────────────────────────────
        const initScrub = () => {
          ScrollTrigger.create({
            trigger:  container,
            start:    "top top",
            end:      "bottom bottom",
            scrub:    0.9,
            onUpdate: (self) => {
              if (video.readyState >= 2 && video.duration) {
                video.currentTime = self.progress * video.duration;
              }
            },
          });
        };

        if (video.readyState >= 1) {
          initScrub();
        } else {
          video.addEventListener("loadedmetadata", initScrub, { once: true });
        }

        // ── 2. Cinematic mount animation ──────────────────────────────
        // All hero text starts hidden — set before first paint via layout
        gsap.set([".hero-line-bar", ".hero-h1", ".hero-sub", ".hero-scroll-ind"], {
          opacity: 0,
        });
        gsap.set(".hero-h1",        { y: 70 });
        gsap.set(".hero-sub",       { y: 28 });
        gsap.set(".hero-scroll-ind",{ y: 16 });

        const tl = gsap.timeline({ delay: 0.15 });

        // Orange bar: scale from 0
        tl.to(".hero-line-bar", {
          opacity:   1,
          scaleX:    1,
          duration:  1.1,
          ease:      "expo.inOut",
        })
        // Headline lines stagger up
        .to(".hero-h1", {
          opacity:  1,
          y:        0,
          stagger:  0.13,
          duration: 1.05,
          ease:     EASE,
        }, "-=0.65")
        // Subline
        .to(".hero-sub", {
          opacity:  1,
          y:        0,
          duration: 0.85,
          ease:     EASE,
        }, "-=0.6")
        // Scroll indicator last
        .to(".hero-scroll-ind", {
          opacity:  1,
          y:        0,
          duration: 0.8,
          ease:     EASE,
        }, "-=0.4");

      }, container);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ height: scrollHeight, position: "relative" }}
      aria-label="Hero video"
    >
      {/* ── Sticky viewport wrapper ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Video */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden
          style={{
            position:   "absolute",
            inset:       0,
            background: `linear-gradient(to bottom,
              ${overlayColor} 0%,
              rgba(44,24,16,0.05) 45%,
              rgba(44,24,16,0.65) 100%)`,
          }}
        />

        {/* ── Headline copy ── */}
        <div
          style={{
            position:       "absolute",
            inset:           0,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "flex-start",
            justifyContent: "flex-end",
            padding:        "0 clamp(24px, 6vw, 96px) clamp(64px, 9vh, 112px)",
            pointerEvents:  "none",
          }}
        >
          {/* Orange accent bar */}
          <div
            className="hero-line-bar g-hide"
            style={{
              width:          80,
              height:         1,
              background:     "var(--orange)",
              marginBottom:   28,
              transformOrigin:"left center",
              transform:      "scaleX(0)",
            }}
          />

          {/* Headline */}
          {lines.map((line, i) => (
            <h1
              key={i}
              className="hero-h1 g-hide"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 300,
                fontSize:   "clamp(48px, 8vw, 116px)",
                lineHeight: 0.98,
                color:      "var(--cream)",
                margin:     0,
                fontStyle:  i === 1 ? "italic" : "normal",
              }}
            >
              {line}
            </h1>
          ))}

          {/* Subline */}
          <p
            className="hero-sub g-hide"
            style={{
              marginTop:     24,
              fontFamily:    "var(--font-sans)",
              fontWeight:    300,
              fontSize:      11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color:         "rgba(250,247,242,0.65)",
            }}
          >
            {subline}
          </p>

          {/* Scroll indicator */}
          <div
            className="hero-scroll-ind g-hide"
            style={{
              position:      "absolute",
              bottom:         clamp(28),
              right:          clamp(40),
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              gap:             10,
            }}
          >
            <span
              style={{
                fontFamily:    "var(--font-sans)",
                fontWeight:    300,
                fontSize:       9,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color:          "rgba(250,247,242,0.45)",
                writingMode:    "vertical-rl",
              }}
            >
              Scroll
            </span>
            <div
              style={{
                width:      1,
                height:     52,
                background: "linear-gradient(to bottom, rgba(250,247,242,0.45), transparent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// tiny helper to keep inline styles tidy
function clamp(n: number) { return `clamp(${Math.round(n * 0.6)}px, ${n / 16}vw, ${n}px)`; }

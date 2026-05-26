"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { loadGsap, EASE } from "@/lib/gsap";

/**
 * Label order (clockwise from top, 45° each):
 *   0 →   0°  top           "Brighter Skin"
 *   1 →  45°  top-right     "Pore Minimising"
 *   2 →  90°  right         "24h Hydration"
 *   3 → 135°  bottom-right  "Clinically Proven"
 *   4 → 180°  bottom        "Fragrance Free"
 *   5 → 225°  bottom-left   "Dermatologist Tested"
 *   6 → 270°  left          "Anti-Aging"
 *   7 → 315°  top-left      "Vitamin C 15%"
 *
 * Positioning: clock-hand CSS technique —
 *   rotate(N deg) translateY(-R px) rotate(-N deg) translate(-50%,-50%)
 *   Each label translates outward along the rotated Y axis, then is
 *   counter-rotated so the text stays perfectly horizontal and readable.
 *
 * Animation: all 8 simultaneously, each sliding from its own screen direction.
 */

const LABELS = [
  "Brighter Skin",        //   0° top
  "Pore Minimising",      //  45° top-right
  "24h Hydration",        //  90° right
  "Clinically Proven",    // 135° bottom-right
  "Fragrance Free",       // 180° bottom
  "Dermatologist Tested", // 225° bottom-left
  "Anti-Aging",           // 270° left
  "Vitamin C 15%",        // 315° top-left
];

// Each label's entrance slide direction (screen space, px)
// Matches the label's clock position so it slides in from the outside
const FROM_X = [  0,  20,  28,  20,   0, -20, -28, -20 ];
const FROM_Y = [ -28, -20,   0,  20,  28,  20,   0, -20 ];

const CIRCLE_D = 360;  // circle image diameter (px)
const ORBIT_R  = 300;  // orbit radius — at 90° gives 38px clear of 180px circle edge
const WRAP_W   = 840;  // wrapper size — fits all labels with padding

export default function CircleSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert(): void } | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = g;

      ctx = gsap.context(() => {
        // Target the INNER animation divs (not the outer positioning shells)
        const allLabels = Array.from(
          sectionRef.current!.querySelectorAll<HTMLElement>(".circ-label")
        );

        // ── Initial hidden states ─────────────────────────────────────
        gsap.set(".circ-logo", { opacity: 0, y: -22 });
        gsap.set(".circ-img",  { opacity: 0, scale: 0.88 });
        allLabels.forEach((el, i) => {
          gsap.set(el, { opacity: 0, x: FROM_X[i], y: FROM_Y[i] });
        });

        // ── Scroll trigger → all labels at once ──────────────────────
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:   "top 62%",
          once:    true,
          onEnter: () => {
            const tl = gsap.timeline({ defaults: { ease: EASE } });

            tl.to(".circ-logo", { opacity: 1, y: 0, duration: 0.7 })
              .to(".circ-img",  { opacity: 1, scale: 1, duration: 1.0 }, "-=0.4")
              // All 8 labels simultaneously — each slides from its own direction
              .to(allLabels,    { opacity: 1, x: 0, y: 0, duration: 0.85 }, "-=0.2");
          },
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="circle"
      ref={sectionRef}
      style={{
        background:     "#F0E8DC",
        padding:        "clamp(40px, 6vh, 80px) clamp(20px, 5vw, 80px)",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
      }}
    >
      {/* ── ● clera logo ── */}
      <div
        className="circ-logo g-hide"
        style={{
          display:      "flex",
          alignItems:   "center",
          gap:          9,
          marginBottom: "clamp(36px, 5vh, 56px)",
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "var(--orange)", display: "inline-block", flexShrink: 0,
        }} />
        <span style={{
          fontFamily:    "var(--font-sans)",
          fontWeight:    200,
          fontSize:      28,
          letterSpacing: "0.32em",
          textTransform: "lowercase",
          color:         "var(--brown)",
          lineHeight:    1,
        }}>
          clera
        </span>
      </div>

      {/* ── Orbit container ── */}
      <div
        className="circ-orbit"
        style={{ position: "relative", width: WRAP_W, height: WRAP_W }}
      >
        {/* Circle image — centred */}
        <div
          className="circ-img g-hide"
          style={{
            position:     "absolute",
            top:          "50%",
            left:         "50%",
            transform:    "translate(-50%, -50%)",
            width:        CIRCLE_D,
            height:       CIRCLE_D,
            borderRadius: "50%",
            overflow:     "hidden",
            border:       "1px solid rgba(44,24,16,0.08)",
          }}
        >
          <Image
            src="/circle.jpg.png"
            alt="Clera Vitamin C Serum"
            fill
            style={{ objectFit: "cover" }}
            sizes={`${CIRCLE_D}px`}
          />
        </div>

        {/* ── Orbital benefit labels ──
            Each uses the clock-hand technique:
              1. rotate(N)        — face the clock position
              2. translateY(-R)   — move outward along the rotated Y-axis
              3. rotate(-N)       — counter-rotate so text is horizontal
              4. translate(-50%,-50%) — centre on the orbit point

            The outer shell handles only CSS positioning.
            The inner .circ-label div is the GSAP animation target.
        ── */}
        {LABELS.map((label, i) => {
          const angle = i * 45; // 0, 45, 90 … 315 degrees
          return (
            <div
              key={label}
              aria-hidden="false"
              style={{
                position:  "absolute",
                left:      "50%",
                top:       "50%",
                // Clock-hand transform — pure CSS positioning, no GSAP
                transform: `rotate(${angle}deg) translateY(-${ORBIT_R}px) rotate(-${angle}deg) translate(-50%, -50%)`,
              }}
            >
              {/* GSAP animation target — coordinates are screen-space after counter-rotation */}
              <div
                className="circ-label g-hide"
                style={{
                  display:    "flex",
                  alignItems: "center",
                  gap:        8,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: "var(--orange)", flexShrink: 0,
                }} />
                <span style={{
                  fontFamily:    "var(--font-sans)",
                  fontWeight:    300,
                  fontSize:      16,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color:         "var(--brown)",
                }}>
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

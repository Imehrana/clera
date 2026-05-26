"use client";

import { useEffect, useRef, useState } from "react";
import { loadGsap, EASE, DUR, Y_LG, Y_MD, Y_SM, STAG, START } from "@/lib/gsap";

interface BenefitCard {
  number:      string;
  title:       string;
  description: string;
}

interface BenefitsProps {
  eyebrow?: string;
  headline?: string;
  cards?:    BenefitCard[];
  bgColor?:  string;
}

const DEFAULT_CARDS: BenefitCard[] = [
  {
    number:      "01",
    title:       "Skin that glows from within.",
    description: "Our 15% stabilised Vitamin C visibly brightens dark spots and evens your complexion — clinically proven in 4 weeks.",
  },
  {
    number:      "02",
    title:       "Confidence you can feel.",
    description: "Niacinamide 3% refines pores and smooths texture so your skin feels as flawless as it looks.",
  },
  {
    number:      "03",
    title:       "Deeply hydrated all day.",
    description: "Triple Hyaluronic Acid penetrates three skin layers simultaneously, locking moisture for full 24-hour hydration.",
  },
];

/* ── Individual Card keeps only the hover colour-swap via useState ── */
function Card({ card, index }: { card: BenefitCard; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      className={`ben-card ben-card-${index}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border:        `1px solid ${hovered ? "var(--orange)" : "rgba(44,24,16,0.1)"}`,
        padding:       "48px 40px",
        background:    hovered ? "var(--orange)" : "transparent",
        transition:    "background 0.3s ease, border-color 0.3s ease",
        cursor:        "default",
        display:       "flex",
        flexDirection: "column",
        gap:            20,
      }}
    >
      <span style={{
        fontFamily:  "var(--font-serif)", fontWeight: 300,
        fontSize: 13, letterSpacing: "0.2em",
        color: hovered ? "rgba(250,247,242,0.5)" : "var(--orange)",
        transition: "color 0.3s",
      }}>
        {card.number}
      </span>

      <div style={{
        width: 40, height: 1,
        background: hovered ? "rgba(250,247,242,0.25)" : "rgba(44,24,16,0.12)",
        transition: "background 0.3s",
      }} />

      <h3 style={{
        fontFamily: "var(--font-serif)", fontWeight: 300,
        fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.2,
        color: hovered ? "var(--cream)" : "var(--brown)",
        margin: 0, transition: "color 0.3s",
      }}>
        {card.title}
      </h3>

      <p style={{
        fontFamily: "var(--font-sans)", fontWeight: 300,
        fontSize: 14, lineHeight: 1.8,
        color: hovered ? "rgba(250,247,242,0.8)" : "rgba(44,24,16,0.6)",
        margin: 0, transition: "color 0.3s",
      }}>
        {card.description}
      </p>

      {/* Arrow */}
      <svg width="32" height="10" viewBox="0 0 32 10" fill="none"
        style={{ marginTop: "auto", opacity: hovered ? 0.7 : 0.3, transition: "opacity 0.3s" }}>
        <path d="M1 5H31M27 1L31 5L27 9"
          stroke={hovered ? "var(--cream)" : "var(--brown)"}
          strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </article>
  );
}

export default function Benefits({
  eyebrow = "Why Clera",
  headline = "Three ingredients.\nInfinite clarity.",
  cards    = DEFAULT_CARDS,
  bgColor  = "var(--cream)",
}: BenefitsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lines      = headline.split("\n");

  useEffect(() => {
    let ctx: import("gsap").Context | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = g;

      ctx = gsap.context(() => {
        // ── Initial states ──────────────────────────────────────────
        gsap.set(".ben-eyebrow",  { opacity: 0, y: Y_SM });
        gsap.set(".ben-headline", { opacity: 0, y: Y_LG });
        gsap.set(".ben-body",     { opacity: 0, y: Y_MD });
        gsap.set(".ben-card",     { opacity: 0, y: Y_MD });

        // ── Header: eyebrow → headline → body copy ──────────────────
        ScrollTrigger.create({
          trigger: ".ben-header",
          start:   START,
          once:    true,
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(".ben-eyebrow",  { opacity: 1, y: 0, duration: 0.75, ease: EASE })
              .to(".ben-headline", { opacity: 1, y: 0, duration: DUR, stagger: STAG, ease: EASE }, "-=0.45")
              .to(".ben-body",     { opacity: 1, y: 0, duration: 0.85, ease: EASE }, "-=0.55");
          },
        });

        // ── Cards: stagger slide-up ──────────────────────────────────
        ScrollTrigger.create({
          trigger: ".ben-grid",
          start:   "top 82%",
          once:    true,
          onEnter: () => {
            gsap.to(".ben-card", {
              opacity: 1, y: 0,
              duration: DUR, stagger: STAG * 1.2, ease: EASE,
            });
          },
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      style={{ background: bgColor, padding: "clamp(64px,10vh,120px) clamp(20px,5vw,80px)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div
          className="ben-header"
          style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "clamp(40px,6vh,72px)",
            flexWrap: "wrap", gap: 24,
          }}
        >
          <div>
            <span className="ben-eyebrow g-hide" style={{
              display: "block", fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--orange)", marginBottom: 16,
            }}>
              {eyebrow}
            </span>

            {lines.map((line, i) => (
              <h2 key={i} className="ben-headline g-hide" style={{
                fontFamily: "var(--font-serif)", fontWeight: 300,
                fontSize: "clamp(34px, 5vw, 64px)", lineHeight: 1.08,
                color: "var(--brown)", margin: 0,
                fontStyle: i === 1 ? "italic" : "normal",
              }}>
                {line}
              </h2>
            ))}
          </div>

          <p className="ben-body g-hide" style={{
            fontFamily: "var(--font-sans)", fontWeight: 300,
            fontSize: 14, lineHeight: 1.8,
            color: "rgba(44,24,16,0.55)", maxWidth: 320,
          }}>
            Each formulated at the concentration proven to work — not just enough to appear on the label.
          </p>
        </div>

        {/* Cards */}
        <div
          className="ben-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {cards.map((card, i) => (
            <Card key={card.number} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

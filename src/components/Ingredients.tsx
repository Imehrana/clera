"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { loadGsap, EASE, DUR, Y_LG, Y_MD, Y_SM, START } from "@/lib/gsap";

interface Ingredient {
  name:        string;
  percentage:  string;
  description: string;
  imageSrc?:   string;
  imageAlt?:   string;
}

interface IngredientsProps {
  eyebrow?:     string;
  headline?:    string;
  ingredients?: Ingredient[];
  bgColor?:     string;
}

const DEFAULT_INGREDIENTS: Ingredient[] = [
  {
    name: "Vitamin C", percentage: "15%",
    description: "Stabilised L-Ascorbic Acid at clinical dose. Neutralises free radicals, fades hyperpigmentation, and stimulates collagen synthesis for lasting radiance.",
  },
  {
    name: "Niacinamide", percentage: "3%",
    description: "Vitamin B3 at optimal synergistic concentration. Minimises pore appearance, regulates sebum, and strengthens the skin barrier without irritation.",
  },
  {
    name: "Triple Hyaluron", percentage: "×3",
    description: "Three molecular weights of Hyaluronic Acid. Each targets a different skin depth — surface, mid-dermis, deep — for all-day moisture lock.",
  },
];

/* ── Ingredient SVG icons ── */
const ICONS = [
  /* Vitamin C — orbiting sun */
  <svg key="vc" viewBox="0 0 120 120" fill="none" style={{ width: "58%", opacity: 0.55 }}>
    <circle cx="60" cy="60" r="26" stroke="var(--orange)" strokeWidth="1.4"/>
    <circle cx="60" cy="60" r="6"  fill="var(--orange)"  opacity="0.6"/>
    {[0,45,90,135,180,225,270,315].map((deg) => {
      const r = (deg * Math.PI) / 180;
      return <line key={deg}
        x1={60 + 33 * Math.cos(r)} y1={60 + 33 * Math.sin(r)}
        x2={60 + 44 * Math.cos(r)} y2={60 + 44 * Math.sin(r)}
        stroke="var(--orange)" strokeWidth="1.3" strokeLinecap="round"/>;
    })}
  </svg>,
  /* Niacinamide — hexagon */
  <svg key="ni" viewBox="0 0 120 120" fill="none" style={{ width: "55%", opacity: 0.55 }}>
    <polygon points="60,16 100,38 100,82 60,104 20,82 20,38"
      stroke="var(--cream)" strokeWidth="1.3"/>
    <polygon points="60,34 82,46 82,74 60,86 38,74 38,46"
      stroke="var(--cream)" strokeWidth="1" opacity="0.45"/>
    <circle cx="60" cy="60" r="7" fill="var(--orange)" opacity="0.65"/>
  </svg>,
  /* Hyaluron — water drop */
  <svg key="hy" viewBox="0 0 120 120" fill="none" style={{ width: "55%", opacity: 0.55 }}>
    <path d="M60 20C60 20 28 52 28 72C28 89.673 42.327 104 60 104C77.673 104 92 89.673 92 72C92 52 60 20 60 20Z"
      stroke="var(--cream)" strokeWidth="1.3"/>
    <path d="M44 72C44 63.163 51.163 56 60 56"
      stroke="var(--cream)" strokeWidth="1.1" strokeLinecap="round" opacity="0.45"/>
    <circle cx="60" cy="72" r="4.5" fill="var(--orange)" opacity="0.65"/>
  </svg>,
];

function IngredientImage({ src, alt, index }: { src?: string; alt: string; index: number }) {
  return (
    <div style={{
      width: 160, height: 160, borderRadius: "50%",
      border: "1px solid rgba(250,247,242,0.15)",
      background: "rgba(250,247,242,0.05)",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", flexShrink: 0,
    }}>
      {src ? (
        <Image src={src} alt={alt} fill
          style={{ objectFit: "cover", borderRadius: "50%" }} sizes="160px"/>
      ) : ICONS[index] ?? ICONS[0]}
    </div>
  );
}

export default function Ingredients({
  eyebrow     = "What's inside",
  headline    = "Pure. Potent. Proven.",
  ingredients = DEFAULT_INGREDIENTS,
  bgColor     = "var(--brown)",
}: IngredientsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: import("gsap").Context | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = g;

      ctx = gsap.context(() => {
        // Initial states
        gsap.set(".ing-eyebrow",  { opacity: 0, y: Y_SM });
        gsap.set(".ing-headline", { opacity: 0, y: Y_LG });

        // Each ingredient row slides from its respective side
        ingredients.forEach((_, i) => {
          const dir = i % 2 === 0 ? -60 : 60;
          gsap.set(`.ing-row-${i}`, { opacity: 0, x: dir });
        });

        // ── Header ──────────────────────────────────────────────────
        ScrollTrigger.create({
          trigger: ".ing-header",
          start:   START,
          once:    true,
          onEnter: () => {
            gsap.timeline()
              .to(".ing-eyebrow",  { opacity: 1, y: 0, duration: 0.75, ease: EASE })
              .to(".ing-headline", { opacity: 1, y: 0, duration: DUR,  ease: EASE }, "-=0.45");
          },
        });

        // ── Each ingredient row — staggered by scroll position ──────
        ingredients.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: `.ing-row-${i}`,
            start:   "top 85%",
            once:    true,
            onEnter: () => {
              gsap.to(`.ing-row-${i}`, {
                opacity: 1, x: 0,
                duration: 1.05, ease: EASE,
              });
            },
          });
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, [ingredients]);

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      style={{
        background: bgColor,
        padding: "clamp(64px,10vh,120px) clamp(20px,5vw,80px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div className="ing-header" style={{ marginBottom: "clamp(48px,7vh,80px)" }}>
          <span className="ing-eyebrow g-hide" style={{
            display: "block", fontFamily: "var(--font-sans)", fontWeight: 300,
            fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "var(--orange)", marginBottom: 16,
          }}>
            {eyebrow}
          </span>
          <h2 className="ing-headline g-hide" style={{
            fontFamily: "var(--font-serif)", fontWeight: 300,
            fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.08,
            color: "var(--cream)", margin: 0,
          }}>
            {headline}
          </h2>
        </div>

        {/* Ingredient rows */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ingredients.map((ing, i) => (
            <div key={ing.name}>
              <div style={{ height: 1, background: "rgba(250,247,242,0.08)" }} />

              <div
                className={`ing-row-${i} g-hide ing-row-grid${i % 2 !== 0 ? " ing-row-grid--rtl" : ""}`}
              >
                {/* Text */}
                <div style={{ direction: "ltr" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                    <span style={{
                      fontFamily: "var(--font-serif)", fontWeight: 300,
                      fontSize: "clamp(28px, 3.5vw, 50px)", color: "var(--cream)", lineHeight: 1,
                    }}>
                      {ing.name}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-serif)", fontWeight: 300,
                      fontSize: "clamp(20px, 2.5vw, 34px)", color: "var(--orange)", lineHeight: 1,
                    }}>
                      {ing.percentage}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-sans)", fontWeight: 300,
                    fontSize: 14, lineHeight: 1.82,
                    color: "rgba(250,247,242,0.5)", maxWidth: 500,
                  }}>
                    {ing.description}
                  </p>
                </div>

                {/* Arrow */}
                <div style={{ direction: "ltr", display: "flex", justifyContent: "center" }}>
                  <svg width="56" height="16" viewBox="0 0 56 16" fill="none"
                    style={{ opacity: 0.35, transform: i % 2 === 0 ? "none" : "scaleX(-1)" }}>
                    <path d="M1 8H52M46 2L52 8L46 14"
                      stroke="var(--orange)" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Round image */}
                <div style={{
                  direction: "ltr",
                  display: "flex",
                  justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                }}>
                  <IngredientImage src={ing.imageSrc} alt={ing.imageAlt ?? ing.name} index={i}/>
                </div>
              </div>
            </div>
          ))}
          <div style={{ height: 1, background: "rgba(250,247,242,0.08)" }} />
        </div>
      </div>

    </section>
  );
}

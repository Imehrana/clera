"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { loadGsap, EASE, DUR, Y_LG, Y_MD, Y_SM, STAG, START } from "@/lib/gsap";

interface SocialCard {
  imageSrc?:  string;
  imageAlt?:  string;
  handle:     string;
  caption:    string;
  likes?:     string;
}

interface SocialProofProps {
  eyebrow?: string;
  headline?: string;
  cards?:   SocialCard[];
  bgColor?: string;
}

const DEFAULT_CARDS: SocialCard[] = [
  {
    handle:  "@sophiem_skin",
    caption: "Week 4 update — I cannot believe the difference. My dark spots are literally gone. Clera changed my skin. ✨",
    likes:   "1.4k",
  },
  {
    handle:  "@jk.skincare",
    caption: "My dermatologist asked what I was using because my pores looked so much smaller. The answer is always Clera.",
    likes:   "2.1k",
  },
  {
    handle:  "@elena.glows",
    caption: "Sensitive skin girlies — this is your sign. Zero irritation, maximum glow. Vitamin C that actually works 🍊",
    likes:   "987",
  },
];

function InstagramCard({ card, index }: { card: SocialCard; index: number }) {
  const initial = card.handle.replace("@", "")[0].toUpperCase();
  return (
    <article
      className={`soc-card soc-card-${index} g-hide`}
      style={{
        background: "var(--cream)", border: "1px solid rgba(44,24,16,0.08)",
        overflow: "hidden", display: "flex", flexDirection: "column",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 20px 56px rgba(44,24,16,0.1)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {/* Image */}
      <div style={{
        aspectRatio: "1 / 1", background: "var(--beige)",
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {card.imageSrc ? (
          <Image src={card.imageSrc} alt={card.imageAlt ?? card.handle}
            fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 33vw"/>
        ) : (
          <>
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(145deg, var(--beige) 0%, var(--sand) 100%)",
            }}/>
            <svg viewBox="0 0 200 200" fill="none"
              style={{ width: "48%", position: "relative", opacity: 0.28 }}>
              <circle cx="100" cy="78" r="34" stroke="var(--brown)" strokeWidth="1.2"/>
              <path d="M50 180C50 154.147 72.147 132 98 132H102C127.853 132 150 154.147 150 180"
                stroke="var(--brown)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <div aria-hidden style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 56,
              background: "linear-gradient(to top, rgba(44,24,16,0.1), transparent)",
            }}/>
          </>
        )}

        {/* Likes */}
        {card.likes && (
          <div style={{
            position: "absolute", bottom: 12, right: 12,
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(250,247,242,0.92)", backdropFilter: "blur(4px)",
            padding: "5px 10px",
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 10.5C6 10.5 1 7.5 1 4C1 2.343 2.343 1 4 1C5 1 5.868 1.5 6 2C6.132 1.5 7 1 8 1C9.657 1 11 2.343 11 4C11 7.5 6 10.5 6 10.5Z"
                fill="var(--orange)"/>
            </svg>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 300, fontSize: 10, color: "var(--brown)" }}>
              {card.likes}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "24px 24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--orange)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-serif)", fontSize: 14,
            color: "var(--cream)", fontWeight: 300, flexShrink: 0,
          }}>
            {initial}
          </div>
          <span style={{
            fontFamily: "var(--font-sans)", fontWeight: 300,
            fontSize: 12, letterSpacing: "0.04em", color: "var(--brown)",
          }}>
            {card.handle}
          </span>
          {/* Verified badge */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
            style={{ marginLeft: "auto", flexShrink: 0 }}>
            <circle cx="7" cy="7" r="7" fill="var(--orange)"/>
            <path d="M4.5 7L6.5 9L9.5 5"
              stroke="var(--cream)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: 13, lineHeight: 1.72, color: "rgba(44,24,16,0.72)", margin: 0,
        }}>
          {card.caption}
        </p>
      </div>
    </article>
  );
}

export default function SocialProof({
  eyebrow  = "As seen on Instagram",
  headline = "Real skin. Real results.",
  cards    = DEFAULT_CARDS,
  bgColor  = "var(--beige)",
}: SocialProofProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: import("gsap").Context | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = g;

      ctx = gsap.context(() => {
        gsap.set(".soc-eyebrow",  { opacity: 0, y: Y_SM });
        gsap.set(".soc-headline", { opacity: 0, y: Y_LG });
        gsap.set(".soc-cta",      { opacity: 0, y: Y_SM });
        gsap.set(".soc-card",     { opacity: 0, y: Y_MD });

        // Header
        ScrollTrigger.create({
          trigger: ".soc-header",
          start:   START,
          once:    true,
          onEnter: () => {
            gsap.timeline()
              .to(".soc-eyebrow",  { opacity: 1, y: 0, duration: 0.75, ease: EASE })
              .to(".soc-headline", { opacity: 1, y: 0, duration: DUR,  ease: EASE }, "-=0.45")
              .to(".soc-cta",      { opacity: 1, y: 0, duration: 0.75, ease: EASE }, "-=0.5");
          },
        });

        // Cards stagger
        ScrollTrigger.create({
          trigger: ".soc-grid",
          start:   "top 80%",
          once:    true,
          onEnter: () => {
            gsap.to(".soc-card", {
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
      id="social"
      ref={sectionRef}
      style={{
        background: bgColor,
        padding: "clamp(64px,10vh,100px) clamp(20px,5vw,80px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div className="soc-header" style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: "clamp(36px,5vh,56px)",
          flexWrap: "wrap", gap: 20,
        }}>
          <div>
            <span className="soc-eyebrow g-hide" style={{
              display: "block", fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--orange)", marginBottom: 14,
            }}>
              {eyebrow}
            </span>
            <h2 className="soc-headline g-hide" style={{
              fontFamily: "var(--font-serif)", fontWeight: 300,
              fontSize: "clamp(30px, 4vw, 54px)", color: "var(--brown)", margin: 0,
            }}>
              {headline}
            </h2>
          </div>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="soc-cta g-hide"
            style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--brown)", textDecoration: "none",
              display: "flex", alignItems: "center", gap: 8,
              opacity: 0.5, transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.5")}
          >
            Follow @clera
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 5H15M11 1L15 5L11 9"
                stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Grid */}
        <div className="soc-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}>
          {cards.map((card, i) => (
            <InstagramCard key={card.handle} card={card} index={i}/>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { loadGsap, EASE, DUR, Y_LG, Y_MD, Y_SM, STAG, START } from "@/lib/gsap";

type ImageFormat = "natural" | "square" | "portrait" | "landscape";
const formatAspect: Record<ImageFormat, string> = {
  natural:   "auto",
  square:    "1 / 1",
  portrait:  "3 / 4",
  landscape: "4 / 3",
};

interface SplitSectionProps {
  eyebrow?:        string;
  headline?:       string;
  headlineItalic?: string;
  body?:           string;
  ctaLabel?:       string;
  ctaHref?:        string;
  imageSrc?:       string;
  imageAlt?:       string;
  imageFormat?:    ImageFormat;
  imageLeft?:      boolean;
  bgColor?:        string;
  textColor?:      string;
  accentColor?:    string;
}

export default function SplitSection({
  eyebrow        = "The Clera Difference",
  headline       = "Skincare backed",
  headlineItalic = "by real science.",
  body           = "Every ingredient in Clera Serum is selected at the exact clinical concentration proven in peer-reviewed trials. No marketing claims without the data.",
  ctaLabel       = "Explore the formula →",
  ctaHref        = "#ingredients",
  imageSrc,
  imageAlt       = "Clera product",
  imageFormat    = "portrait",
  imageLeft      = true,
  bgColor        = "var(--cream)",
  textColor      = "var(--brown)",
  accentColor    = "var(--orange)",
}: SplitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: import("gsap").Context | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = g;

      ctx = gsap.context(() => {
        // Initial states
        gsap.set(".spl-img",      { opacity: 0, x: imageLeft ? -56 : 56 });
        gsap.set(".spl-eyebrow",  { opacity: 0, y: Y_SM });
        gsap.set(".spl-headline", { opacity: 0, y: Y_LG });
        gsap.set(".spl-body",     { opacity: 0, y: Y_MD });
        gsap.set(".spl-stat",     { opacity: 0, y: Y_SM });
        gsap.set(".spl-cta",      { opacity: 0, y: Y_SM });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:   START,
          once:    true,
          onEnter: () => {
            const tl = gsap.timeline();

            // Image slides in from its side
            tl.to(".spl-img", {
              opacity: 1, x: 0,
              duration: 1.15, ease: EASE,
            })
            .to(".spl-eyebrow", {
              opacity: 1, y: 0,
              duration: 0.75, ease: EASE,
            }, "-=0.85")
            .to(".spl-headline", {
              opacity: 1, y: 0,
              duration: DUR, ease: EASE,
            }, "-=0.55")
            .to(".spl-body", {
              opacity: 1, y: 0,
              duration: 0.9, ease: EASE,
            }, "-=0.6")
            .to(".spl-stat", {
              opacity: 1, y: 0,
              duration: 0.8, stagger: STAG, ease: EASE,
            }, "-=0.55")
            .to(".spl-cta", {
              opacity: 1, y: 0,
              duration: 0.75, ease: EASE,
            }, "-=0.5");
          },
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, [imageLeft]);

  /* ── Image column ── */
  const imgCol = (
    <div
      className="spl-img g-hide"
      style={{
        aspectRatio: formatAspect[imageFormat],
        background:  "var(--beige)",
        position:    "relative",
        overflow:    "hidden",
        border:      "1px solid rgba(44,24,16,0.08)",
        minHeight:   imageFormat === "natural" ? 480 : undefined,
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
      }}
    >
      {imageSrc ? (
        <Image src={imageSrc} alt={imageAlt} fill
          style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 50vw" />
      ) : (
        /* SVG bottle placeholder */
        <svg viewBox="0 0 400 520" fill="none"
          style={{ width: "58%", opacity: 0.3 }}
          aria-label="Product image placeholder">
          <rect x="120" y="80" width="160" height="340" rx="16"
            stroke="var(--brown)" strokeWidth="1.2"/>
          <rect x="150" y="50" width="100" height="36" rx="6"
            stroke="var(--brown)" strokeWidth="1.2"/>
          <circle cx="200" cy="68" r="14"
            stroke="var(--brown)" strokeWidth="1.2"/>
          <rect x="138" y="170" width="124" height="180" rx="6"
            fill="var(--cream)" opacity="0.75"/>
          <circle cx="200" cy="210" r="8" fill="var(--orange)" opacity="0.55"/>
          <rect x="148" y="232" width="104" height="2" rx="1"
            fill="var(--brown)" opacity="0.2"/>
          <rect x="156" y="244" width="88" height="2" rx="1"
            fill="var(--brown)" opacity="0.15"/>
          <rect x="148" y="270" width="104" height="1.5" rx="1"
            fill="var(--brown)" opacity="0.1"/>
          <rect x="148" y="282" width="72" height="1.5" rx="1"
            fill="var(--brown)" opacity="0.1"/>
        </svg>
      )}
    </div>
  );

  /* ── Text column ── */
  const textCol = (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, padding: "40px 0" }}>
      <span className="spl-eyebrow g-hide" style={{
        fontFamily: "var(--font-sans)", fontWeight: 300,
        fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
        color: accentColor,
      }}>
        {eyebrow}
      </span>

      <h2 className="spl-headline g-hide" style={{
        fontFamily: "var(--font-serif)", fontWeight: 300,
        fontSize: "clamp(30px, 3.8vw, 54px)", lineHeight: 1.15,
        color: textColor, margin: 0,
      }}>
        {headline} <em>{headlineItalic}</em>
      </h2>

      <p className="spl-body g-hide" style={{
        fontFamily: "var(--font-sans)", fontWeight: 300,
        fontSize: 15, lineHeight: 1.85,
        color: textColor, opacity: 0.62, maxWidth: 440,
      }}>
        {body}
      </p>

      {/* Stats */}
      <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
        {[
          { val: "94%",   lbl: "Brighter skin" },
          { val: "4 wks", lbl: "Visible results" },
          { val: "pH 3.2",lbl: "Optimal absorption" },
        ].map((s) => (
          <div key={s.lbl} className="spl-stat g-hide"
            style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{
              fontFamily: "var(--font-serif)", fontWeight: 300,
              fontSize: 26, color: textColor, lineHeight: 1,
            }}>
              {s.val}
            </span>
            <span style={{
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
              color: textColor, opacity: 0.4,
            }}>
              {s.lbl}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={ctaHref}
        className="spl-cta g-hide"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
          color: accentColor, textDecoration: "none",
          borderBottom: `1px solid ${accentColor}`,
          paddingBottom: 4, width: "fit-content",
          transition: "gap 0.2s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "16px")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "8px")}
      >
        {ctaLabel}
      </a>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      style={{ background: bgColor, padding: "0 clamp(20px,5vw,80px)" }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 80, alignItems: "center",
        padding: "clamp(64px,9vh,100px) 0",
      }}>
        {imageLeft ? imgCol : textCol}
        {imageLeft ? textCol : imgCol}
      </div>
    </section>
  );
}

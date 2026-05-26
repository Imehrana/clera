"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { loadGsap, EASE, DUR, Y_LG, Y_MD, Y_SM, START } from "@/lib/gsap";

export interface GalleryImage {
  src: string;
  alt?: string;
}

interface FullWidthBannerProps {
  // ── Gallery mode (images take over, text hidden) ──
  galleryImages?: GalleryImage[];

  // ── Text mode ──
  imageSrc?:       string;
  imageAlt?:       string;
  headline?:       string;
  headlineItalic?: string;
  subline?:        string;
  ctaLabel?:       string;
  ctaHref?:        string;
  overlayOpacity?: number;
  overlayColor?:   string;
  textAlign?:      "left" | "center" | "right";
  height?:         string;
  bgColor?:        string;
}

export default function FullWidthBanner({
  galleryImages,
  imageSrc,
  imageAlt       = "Clera banner",
  headline       = "Clear. Bright.",
  headlineItalic = "Undeniably radiant.",
  subline        = "Start your 4-week transformation — join 10,000+ customers.",
  ctaLabel       = "Shop Clera Serum",
  ctaHref        = "#benefits",
  overlayOpacity = 0,
  overlayColor   = "var(--brown)",
  textAlign      = "center",
  height         = "72vh",
  bgColor        = "var(--brown)",
}: FullWidthBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (galleryImages && galleryImages.length > 0) return; // no animations in gallery mode

    let ctx: import("gsap").Context | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = g;

      ctx = gsap.context(() => {
        gsap.set(".ban-eyebrow",   { opacity: 0, y: Y_SM });
        gsap.set(".ban-h1",        { opacity: 0, y: Y_LG });
        gsap.set(".ban-h1-italic", { opacity: 0, y: Y_LG });
        gsap.set(".ban-sub",       { opacity: 0, y: Y_MD });
        gsap.set(".ban-cta",       { opacity: 0, y: Y_SM });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:   "top 80%",
          once:    true,
          onEnter: () => {
            gsap.timeline()
              .to(".ban-eyebrow",   { opacity: 1, y: 0, duration: 0.7,  ease: EASE })
              .to(".ban-h1",        { opacity: 1, y: 0, duration: DUR,  ease: EASE }, "-=0.45")
              .to(".ban-h1-italic", { opacity: 1, y: 0, duration: DUR,  ease: EASE }, "-=0.75")
              .to(".ban-sub",       { opacity: 1, y: 0, duration: 0.85, ease: EASE }, "-=0.6")
              .to(".ban-cta",       { opacity: 1, y: 0, duration: 0.75, ease: EASE }, "-=0.5");
          },
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, [galleryImages]);

  /* ── GALLERY MODE ── */
  if (galleryImages && galleryImages.length > 0) {
    return (
      <section
        ref={sectionRef}
        style={{
          background: `linear-gradient(160deg, #160a05 0%, var(--brown) 45%, #1f0e07 100%)`,
          padding:    "clamp(28px,4vh,48px) clamp(20px,4vw,48px)",
        }}
      >
        <div style={{
          maxWidth:              1360,
          margin:                "0 auto",
          display:               "grid",
          gridTemplateColumns:   "1fr 1fr 1fr",
          gap:                   "clamp(8px,1.5vw,18px)",
          height:                "clamp(380px,60vh,620px)",
        }}>
          {galleryImages.map((img, i) => (
            <div
              key={i}
              style={{
                position:     "relative",
                borderRadius: 10,
                overflow:     "hidden",
              }}
            >
              <Image
                src={img.src}
                alt={img.alt ?? `Clera gallery ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 33vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ── TEXT MODE (original) ── */
  const jc = textAlign === "left"  ? "flex-start"
           : textAlign === "right" ? "flex-end"
           : "center";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative", height,
        display: "flex", alignItems: "center", justifyContent: jc,
        overflow: "hidden", background: bgColor,
        minHeight: 480,
      }}
    >
      {/* Background */}
      {imageSrc ? (
        <Image src={imageSrc} alt={imageAlt} fill
          style={{ objectFit: "cover" }} priority={false} sizes="100vw" />
      ) : (
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(140deg, var(--brown) 0%, #3d2015 40%, var(--orange) 100%)`,
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }}
            preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 800">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 160} y1="0" x2={i * 160} y2="800"
                stroke="var(--cream)" strokeWidth="1"/>
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 133} x2="1440" y2={i * 133}
                stroke="var(--cream)" strokeWidth="1"/>
            ))}
          </svg>
        </div>
      )}

      {/* Overlay */}
      {overlayOpacity > 0 && (
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: overlayColor, opacity: overlayOpacity,
        }} />
      )}

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 1,
        textAlign, padding: "0 clamp(24px,6vw,96px)",
        width: "100%",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: jc, gap: 8, marginBottom: 28 }}>
          <span aria-hidden style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />
          <span className="ban-eyebrow g-hide" style={{
            fontFamily: "var(--font-sans)", fontWeight: 300,
            fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(250,247,242,0.55)",
          }}>
            Clera Serum
          </span>
        </div>

        <h2 className="ban-h1 g-hide" style={{
          fontFamily: "var(--font-serif)", fontWeight: 400,
          fontSize: "clamp(44px, 8vw, 118px)", lineHeight: 0.97,
          color: "var(--cream)", margin: "0 0 8px",
        }}>
          {headline}
        </h2>

        <h2 className="ban-h1-italic g-hide" style={{
          fontFamily: "var(--font-serif)", fontWeight: 400, fontStyle: "italic",
          fontSize: "clamp(44px, 8vw, 118px)", lineHeight: 0.97,
          color: "var(--orange)", margin: "0 0 40px",
        }}>
          {headlineItalic}
        </h2>

        <p className="ban-sub g-hide" style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: 14, letterSpacing: "0.04em",
          color: "rgba(250,247,242,0.55)", marginBottom: 44,
        }}>
          {subline}
        </p>

        <a
          href={ctaHref}
          className="ban-cta g-hide"
          style={{
            display: "inline-flex", alignItems: "center",
            padding: "18px 52px",
            background: "var(--cream)", color: "var(--brown)",
            fontFamily: "var(--font-sans)", fontWeight: 300,
            fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            textDecoration: "none",
            border: "1px solid var(--cream)",
            transition: "background 0.25s, color 0.25s, border-color 0.25s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--orange)";
            el.style.color = "var(--cream)";
            el.style.borderColor = "var(--orange)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "var(--cream)";
            el.style.color = "var(--brown)";
            el.style.borderColor = "var(--cream)";
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { loadGsap, EASE, DUR, Y_LG, Y_MD, Y_SM, START } from "@/lib/gsap";

interface NewsletterProps {
  eyebrow?:     string;
  headline?:    string;
  subtext?:     string;
  placeholder?: string;
  buttonLabel?: string;
  disclaimer?:  string;
  bgColor?:     string;
  accentColor?: string;
}

export default function Newsletter({
  eyebrow      = "Clera Edit",
  headline     = "Join the clarity edit.",
  subtext      = "Early access to new launches, expert skin tips, and exclusive member-only offers.",
  placeholder  = "Your email address",
  buttonLabel  = "Subscribe",
  disclaimer   = "No spam. Unsubscribe at any time.",
  bgColor      = "var(--cream)",
  accentColor  = "var(--orange)",
}: NewsletterProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState(false);

  useEffect(() => {
    let ctx: import("gsap").Context | undefined;

    (async () => {
      const g = await loadGsap();
      if (!g || !sectionRef.current) return;
      const { gsap, ScrollTrigger } = g;

      ctx = gsap.context(() => {
        gsap.set(".nl-eyebrow",  { opacity: 0, y: Y_SM });
        gsap.set(".nl-headline", { opacity: 0, y: Y_LG });
        gsap.set(".nl-sub",      { opacity: 0, y: Y_MD });
        gsap.set(".nl-perks",    { opacity: 0, y: Y_SM });
        gsap.set(".nl-form",     { opacity: 0, y: Y_MD });
        gsap.set(".nl-note",     { opacity: 0 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:   "top 82%",
          once:    true,
          onEnter: () => {
            gsap.timeline()
              .to(".nl-eyebrow",  { opacity: 1, y: 0, duration: 0.7,  ease: EASE })
              .to(".nl-headline", { opacity: 1, y: 0, duration: DUR,  ease: EASE }, "-=0.45")
              .to(".nl-sub",      { opacity: 1, y: 0, duration: 0.85, ease: EASE }, "-=0.6")
              .to(".nl-perks",    { opacity: 1, y: 0, duration: 0.75, ease: EASE }, "-=0.55")
              .to(".nl-form",     { opacity: 1, y: 0, duration: 0.85, ease: EASE }, "-=0.5")
              .to(".nl-note",     { opacity: 1,        duration: 0.7,  ease: EASE }, "-=0.4");
          },
        });
      }, sectionRef.current);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      style={{
        background: bgColor,
        padding: "clamp(64px,10vh,120px) clamp(20px,5vw,80px)",
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>

        {/* Eyebrow */}
        <div className="nl-eyebrow g-hide" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 8, marginBottom: 24,
        }}>
          <span aria-hidden style={{
            width: 5, height: 5, borderRadius: "50%", background: accentColor,
          }}/>
          <span style={{
            fontFamily: "var(--font-sans)", fontWeight: 300,
            fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase",
            color: accentColor,
          }}>
            {eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h2 className="nl-headline g-hide" style={{
          fontFamily: "var(--font-serif)", fontWeight: 300,
          fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.12,
          color: "var(--brown)", margin: "0 0 16px",
        }}>
          {headline}
        </h2>

        {/* Subtext */}
        <p className="nl-sub g-hide" style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: 15, lineHeight: 1.78,
          color: "rgba(44,24,16,0.55)", margin: "0 0 36px",
        }}>
          {subtext}
        </p>

        {/* Perks */}
        <div className="nl-perks g-hide" style={{
          display: "flex", justifyContent: "center", gap: 28,
          marginBottom: 40, flexWrap: "wrap",
        }}>
          {["Early access", "Expert skin tips", "Exclusive offers"].map((perk) => (
            <span key={perk} style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: 12, color: "rgba(44,24,16,0.48)",
            }}>
              <span aria-hidden style={{
                width: 4, height: 4, borderRadius: "50%",
                background: accentColor, flexShrink: 0,
              }}/>
              {perk}
            </span>
          ))}
        </div>

        {/* Form */}
        <div className="nl-form g-hide">
          {submitted ? (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 12, border: "1px solid rgba(44,24,16,0.1)",
              padding: "22px 32px",
              fontFamily: "var(--font-sans)", fontWeight: 300,
              fontSize: 14, color: "var(--brown)",
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                background: accentColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--cream)", fontSize: 11, flexShrink: 0,
              }}>✓</span>
              Welcome to the edit. Check your inbox.
            </div>
          ) : (
            <form
              className="nl-form"
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubmitted(true); }}
              style={{
                display: "flex",
                border: `1px solid ${focused ? "var(--brown)" : "rgba(44,24,16,0.2)"}`,
                background: "#fff",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: focused ? "0 4px 24px rgba(44,24,16,0.06)" : "none",
                marginBottom: 12,
              }}
            >
              <input
                className="nl-form-input"
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder} required
                aria-label="Email address"
                style={{
                  flex: 1, border: "none", background: "transparent",
                  padding: "18px 24px",
                  fontFamily: "var(--font-sans)", fontWeight: 300,
                  fontSize: 14, color: "var(--brown)", outline: "none", minWidth: 0,
                }}
              />
              <button
                className="nl-form-submit"
                type="submit"
                style={{
                  background: "var(--brown)", color: "var(--cream)",
                  border: "none", padding: "18px 32px",
                  fontFamily: "var(--font-sans)", fontWeight: 300,
                  fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
                  cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap",
                  transition: "background 0.25s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = accentColor)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--brown)")}
              >
                {buttonLabel}
              </button>
            </form>
          )}
        </div>

        {/* Disclaimer */}
        <p className="nl-note g-hide" style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: 11, color: "rgba(44,24,16,0.3)", marginTop: 12,
        }}>
          · {disclaimer}
        </p>

      </div>

    </section>
  );
}

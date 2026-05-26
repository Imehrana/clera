/**
 * GSAP singleton — loads once, registers ScrollTrigger once.
 * All components import loadGsap() so the plugin is never double-registered.
 */

type GsapBundle = {
  gsap: typeof import("gsap").default;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let bundle: Promise<GsapBundle> | null = null;

export function loadGsap(): Promise<GsapBundle | null> {
  if (typeof window === "undefined") return Promise.resolve(null);

  if (!bundle) {
    bundle = (async (): Promise<GsapBundle> => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      // ── Global animation defaults (Apple-style) ──
      gsap.defaults({
        ease:     "expo.out",
        duration: 1.0,
      });

      // Refresh on font/image load so trigger positions are correct
      ScrollTrigger.config({ ignoreMobileResize: true });
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

      return { gsap, ScrollTrigger };
    })();
  }

  return bundle;
}

// ── Reusable animation presets ──────────────────────────────────────────────

export const EASE   = "expo.out";        // cinematic, Apple-style
export const DUR    = 1.0;               // base duration (s)
export const Y_SM   = 28;               // small offset — labels, captions
export const Y_MD   = 48;               // medium — body paragraphs, cards
export const Y_LG   = 70;               // large — hero / section headlines
export const STAG   = 0.12;             // stagger between siblings
export const START  = "top 88%";        // when 12 % of element enters viewport

import Navbar          from "@/components/Navbar";
import HeroVideo        from "@/components/HeroVideo";
import HeroTransition   from "@/components/HeroTransition";
import SplitSection     from "@/components/SplitSection";
import Benefits         from "@/components/Benefits";
import CircleSection    from "@/components/CircleSection";
import FullWidthBanner  from "@/components/FullWidthBanner";
import Ingredients      from "@/components/Ingredients";
import SocialProof      from "@/components/SocialProof";
import CleraMarquee     from "@/components/CleraMarquee";
import Newsletter       from "@/components/Newsletter";
import Footer           from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* ── 1. Navigation ── */}
      <Navbar
        logoText="clera"
        links={[
          { label: "Shop",        href: "#benefits" },
          { label: "Science",     href: "#ingredients" },
          { label: "Community",   href: "#social" },
          { label: "Newsletter",  href: "#newsletter" },
        ]}
      />

      {/* ── 2. Cinematic Hero — scroll-synced video ── */}
      <HeroVideo
        src="/hero.mp4"
        scrollHeight="400vh"
        headline={"Brighter skin.\nProven results."}
        subline="15% Vitamin C · Clinically proven in 4 weeks"
      />

      {/* ── 3. Liquid serum drip transition ── */}
      <HeroTransition />

      {/* ── 4. Split Section — lifestyle image ── */}
      <SplitSection
        eyebrow="The Clera Difference"
        headline="Skincare backed"
        headlineItalic="by real science."
        body="Every ingredient in Clera Serum is selected at the exact clinical concentration proven in peer-reviewed trials. No marketing claims without the data to back them."
        ctaLabel="Explore the formula →"
        ctaHref="#ingredients"
        imageSrc="/lifestyle.png"
        imageAlt="Clera lifestyle — glowing skin"
        imageFormat="portrait"
        imageLeft={true}
        bgColor="var(--cream)"
      />

      {/* ── 5. Benefits — 3 cards ── */}
      <Benefits
        eyebrow="Why Clera"
        headline={"Three ingredients.\nInfinite clarity."}
        bgColor="var(--cream)"
        cards={[
          {
            number:      "01",
            title:       "Skin that glows from within.",
            description:
              "Our 15% stabilised Vitamin C visibly brightens dark spots and evens your complexion — clinically proven in 4 weeks.",
          },
          {
            number:      "02",
            title:       "Confidence you can feel.",
            description:
              "Niacinamide 3% refines pores and smooths texture so your skin feels as flawless as it looks.",
          },
          {
            number:      "03",
            title:       "Deeply hydrated all day.",
            description:
              "Triple Hyaluronic Acid penetrates three skin layers simultaneously, locking moisture for full 24-hour hydration.",
          },
        ]}
      />

      {/* ── 6. Circle Section — orbital benefit labels ── */}
      <CircleSection />

      {/* ── 7. Full Width Banner — 3 portrait images ── */}
      <FullWidthBanner
        galleryImages={[
          { src: "/banner1.jpg.png", alt: "Clera serum — glowing skin" },
          { src: "/banner2.jpg.png", alt: "Clera serum — lifestyle" },
          { src: "/banner3.jpg.png", alt: "Clera serum — texture" },
        ]}
      />

      {/* ── 8. Ingredients — with product images ── */}
      <Ingredients
        eyebrow="What's inside"
        headline="Pure. Potent. Proven."
        bgColor="var(--brown)"
        ingredients={[
          {
            name:        "Vitamin C",
            percentage:  "15%",
            description:
              "Stabilised L-Ascorbic Acid at clinical dose. Neutralises free radicals, fades hyperpigmentation, and stimulates collagen synthesis for lasting radiance.",
            imageSrc: "/ing3.jpg",
            imageAlt: "Vitamin C serum — orange",
          },
          {
            name:        "Niacinamide",
            percentage:  "3%",
            description:
              "Vitamin B3 at optimal synergistic concentration. Minimises pore appearance, regulates sebum, strengthens the skin barrier without irritation.",
            imageSrc: "/ing2.jpg",
            imageAlt: "Niacinamide — green leaf",
          },
          {
            name:        "Triple Hyaluron",
            percentage:  "×3",
            description:
              "Three molecular weights of Hyaluronic Acid. Each targets a different skin depth — surface, mid-dermis, deep — for all-day moisture lock.",
            imageSrc: "/ing1.jpg",
            imageAlt: "Hyaluronic Acid — water drops",
          },
        ]}
      />

      {/* ── 9. Social Proof — Instagram cards ── */}
      <SocialProof
        eyebrow="As seen on Instagram"
        headline="Real skin. Real results."
        bgColor="var(--beige)"
        cards={[
          {
            handle:   "@sophiem_skin",
            caption:  "Week 4 update — I cannot believe the difference. My dark spots are literally gone. Clera changed my skin. ✨",
            likes:    "1.4k",
            imageSrc: "/social1.png",
            imageAlt: "@sophiem_skin Clera result",
          },
          {
            handle:   "@jk.skincare",
            caption:  "My dermatologist asked what I was using because my pores looked so much smaller. The answer is always Clera.",
            likes:    "2.1k",
            imageSrc: "/social2.png",
            imageAlt: "@jk.skincare Clera result",
          },
          {
            handle:   "@elena.glows",
            caption:  "Sensitive skin girlies — this is your sign. Zero irritation, maximum glow. Vitamin C that actually works 🍊",
            likes:    "987",
            imageSrc: "/social3.png",
            imageAlt: "@elena.glows Clera result",
          },
        ]}
      />

      {/* ── 10. Marquee ── */}
      <CleraMarquee
        items={[
          "Brighter skin",
          "Proven results",
          "Vitamin C 15%",
          "Niacinamide 3%",
          "Triple Hyaluron",
          "Fragrance Free",
          "Cruelty Free",
          "Clera",
        ]}
        bgColor="var(--orange)"
        textColor="var(--cream)"
        dotColor="var(--cream)"
        speed={28}
      />

      {/* ── 11. Newsletter ── */}
      <Newsletter
        eyebrow="Clera Edit"
        headline="Join the clarity edit."
        subtext="Early access to new launches, expert skin tips, and exclusive member-only offers."
        placeholder="Your email address"
        buttonLabel="Subscribe"
        disclaimer="No spam. Unsubscribe at any time."
        bgColor="var(--cream)"
      />

      {/* ── 12. Footer ── */}
      <Footer
        storeName="clera"
        tagline="Advanced skincare. Proven results."
        bgColor="var(--brown)"
        links={[
          { label: "Privacy",   href: "/privacy" },
          { label: "Terms",     href: "/terms" },
          { label: "Refunds",   href: "/refunds" },
          { label: "Contact",   href: "/contact" },
          { label: "Instagram", href: "https://instagram.com" },
        ]}
      />
    </>
  );
}

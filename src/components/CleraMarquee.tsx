interface CleraMarqueeProps {
  items?:    string[];
  bgColor?:  string;
  textColor?: string;
  dotColor?:  string;
  fontSize?:  number;
  speed?:     number; /* seconds for one full cycle */
}

export default function CleraMarquee({
  items = [
    "Brighter skin",
    "Proven results",
    "Vitamin C 15%",
    "Niacinamide 3%",
    "Triple Hyaluron",
    "Fragrance Free",
    "Cruelty Free",
    "Clera",
  ],
  bgColor   = "var(--orange)",
  textColor = "var(--cream)",
  dotColor  = "var(--cream)",
  fontSize  = 12,
  speed     = 28,
}: CleraMarqueeProps) {
  /* Duplicate items so the seam is invisible at -50% */
  const allItems = [...items, ...items];

  return (
    <div
      aria-label="Brand claims"
      style={{
        background:  bgColor,
        padding:     "18px 0",
        overflow:    "hidden",
        fontFamily:  "var(--font-sans)",
        position:    "relative",
      }}
    >
      {/* Edge fade masks */}
      <div
        aria-hidden
        style={{
          position:   "absolute",
          left:        0,
          top:         0,
          bottom:      0,
          width:       80,
          background: `linear-gradient(to right, ${bgColor}, transparent)`,
          zIndex:      2,
          pointerEvents:"none",
        }}
      />
      <div
        aria-hidden
        style={{
          position:   "absolute",
          right:       0,
          top:         0,
          bottom:      0,
          width:       80,
          background: `linear-gradient(to left, ${bgColor}, transparent)`,
          zIndex:      2,
          pointerEvents:"none",
        }}
      />

      {/* Track */}
      <div
        className="clera-marquee-track"
        style={{
          display:    "flex",
          width:      "max-content",
          animationDuration: `${speed}s`,
        }}
      >
        {allItems.map((item, i) => (
          <span
            key={i}
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           16,
              padding:       "0 24px",
              whiteSpace:    "nowrap",
              flexShrink:    0,
            }}
          >
            <span
              style={{
                width:  5,
                height: 5,
                borderRadius:"50%",
                background: dotColor,
                opacity:    0.6,
                flexShrink: 0,
              }}
              aria-hidden
            />
            <span
              style={{
                fontWeight:    300,
                fontSize,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color:         textColor,
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

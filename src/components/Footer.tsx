interface FooterProps {
  storeName?: string;
  tagline?:   string;
  bgColor?:   string;
  textColor?: string;
  links?: {
    label: string;
    href:  string;
  }[];
}

export default function Footer({
  storeName = "clera",
  tagline   = "Advanced skincare. Proven results.",
  bgColor   = "var(--brown)",
  textColor = "var(--cream)",
  links = [
    { label: "Privacy",    href: "/privacy" },
    { label: "Terms",      href: "/terms" },
    { label: "Refunds",    href: "/refunds" },
    { label: "Contact",    href: "/contact" },
    { label: "Instagram",  href: "https://instagram.com" },
  ],
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background:     bgColor,
        color:          textColor,
        fontFamily:     "var(--font-sans)",
        padding:        "64px 40px 40px",
        textAlign:      "center",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        gap:            36,
      }}
    >
      {/* Logo */}
      <a
        href="/"
        aria-label={storeName}
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:             7,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            width: 7, height: 7,
            borderRadius: "50%",
            background: "var(--orange)",
            display: "inline-block",
          }}
          aria-hidden
        />
        <span
          style={{
            fontFamily:    "var(--font-sans)",
            fontWeight:    200,
            fontSize:      18,
            letterSpacing: "0.32em",
            textTransform: "lowercase",
            color:         textColor,
            lineHeight:    1,
          }}
        >
          {storeName}
        </span>
      </a>

      {/* Tagline */}
      <p
        style={{
          fontWeight:  300,
          fontSize:    13,
          letterSpacing:"0.04em",
          color:       "rgba(250,247,242,0.4)",
          maxWidth:    300,
          lineHeight:  1.6,
          margin:      0,
        }}
      >
        {tagline}
      </p>

      {/* Divider */}
      <div
        style={{
          width:      64,
          height:     1,
          background: "rgba(250,247,242,0.12)",
        }}
        aria-hidden
      />

      {/* Nav links */}
      <nav aria-label="Footer navigation">
        <ul
          style={{
            display:  "flex",
            gap:       28,
            listStyle: "none",
            flexWrap:  "wrap",
            justifyContent:"center",
            margin:    0,
            padding:   0,
          }}
        >
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="clera-footer-link"
                style={{
                  fontWeight:    300,
                  fontSize:      10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration:"none",
                  transition:    "color 0.2s",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Copyright */}
      <p
        style={{
          fontWeight:  300,
          fontSize:    10,
          letterSpacing:"0.15em",
          textTransform:"uppercase",
          color:       "rgba(250,247,242,0.2)",
          margin:      0,
        }}
      >
        © {year} CLERA · All rights reserved
      </p>
    </footer>
  );
}

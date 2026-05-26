"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NavbarProps {
  logoText?: string;
  links?: { label: string; href: string }[];
}

export default function Navbar({
  logoText = "clera",
  links = [
    { label: "Shop",       href: "#benefits" },
    { label: "Science",    href: "#ingredients" },
    { label: "Community",  href: "#social" },
    { label: "Newsletter", href: "#newsletter" },
  ],
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Sync with current scroll position immediately on mount
    setScrolled(window.scrollY > 40);

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = `clera-nav${scrolled ? " clera-nav--scrolled" : ""}`;

  return (
    <nav aria-label="Main navigation" className={navClass} suppressHydrationWarning>
      <div className="clera-nav__inner">

        {/* Nav links — left */}
        <ul className="clera-nav__links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="clera-nav__link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo — absolutely centred */}
        <Link href="/" aria-label="Clera home" className="clera-nav__logo">
          <span className="clera-nav__logo-dot" aria-hidden />
          <span className="clera-nav__logo-text">{logoText}</span>
        </Link>

        {/* Right side — shop CTA */}
        <div className="clera-nav__right">
          <a href="#benefits" className="clera-nav__cta">
            Shop Now
          </a>
        </div>
      </div>
    </nav>
  );
}

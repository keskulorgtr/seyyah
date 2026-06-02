"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="hero-nav"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        transition: "background 0.3s, box-shadow 0.3s",
      }}
    >
      <div className="hero-nav__inner">
        {/* Logo */}
        <Link href="/" className="hero-nav__logo" aria-label="Seyyah Home">
          <Image
            src="/images/seyyah-logo-new.png"
            alt="Seyyah Travel"
            width={180}
            height={65}
            priority
            className="hero-nav__logo-img object-contain"
          />
        </Link>

        {/* Desktop menu links */}
        <ul className="hero-nav__links">
          <li><Link href="/#destinations">Destinations</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/tours">Tours</Link></li>
          <li><Link href="/stories">Stories</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>

        {/* Right side: language + CTA */}
        <div className="hero-nav__right">
          <button className="hero-nav__lang" aria-label="Language selector">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            EN
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <Link href="/#contact" className="hero-nav__cta">Plan Your Journey</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hero-nav__hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hero-nav__hamburger-line ${mobileMenuOpen ? "hero-nav__hamburger-line--open1" : ""}`} />
          <span className={`hero-nav__hamburger-line ${mobileMenuOpen ? "hero-nav__hamburger-line--open2" : ""}`} />
          <span className={`hero-nav__hamburger-line ${mobileMenuOpen ? "hero-nav__hamburger-line--open3" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown menu with animation */}
      <div
        style={{
          maxHeight: mobileMenuOpen ? "400px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease-in-out",
        }}
      >
        <div className="hero-nav__mobile-menu">
          <Link href="/#destinations" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
          <Link href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link href="/tours" onClick={() => setMobileMenuOpen(false)}>Tours</Link>
          <Link href="/stories" onClick={() => setMobileMenuOpen(false)}>Stories</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <Link href="/#contact" className="hero-nav__mobile-cta" onClick={() => setMobileMenuOpen(false)}>Plan Your Journey</Link>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import StoryHighlights from "./StoryHighlights";
import Navbar from "./Navbar";

/* ─── background slide data ─── */
const slides = [
  {
    id: "morocco",
    ghostText: "MOROCCO",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
  },
  {
    id: "al-quds",
    ghostText: "AL-QUDS",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
  },
  {
    id: "bosnia",
    ghostText: "BOSNIA",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
  },
  {
    id: "andalusia",
    ghostText: "ANDALUSIA",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
  },
];


/* ─── trust micro-point data ─── */
const trustPoints = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    label: "Sacred & cultural routes",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    label: "Trusted local guidance",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    ),
    label: "Tailor-made group journeys",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
    ),
    label: "End-to-end travel support",
  },
];

/* ─── stats data ─── */
const stats = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
    value: "12+",
    label: "Destinations",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    ),
    value: "Tailor-made",
    label: "Tours",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    value: "Local",
    label: "Guidance",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    value: "Trusted",
    label: "Group Journeys",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ghostRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  /* auto-play background slides */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  /* GSAP parallax for ghost text */
  useEffect(() => {
    if (!ghostRef.current) return;

    gsap.fromTo(
      ghostRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 0.7, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(ghostRef.current, {
      x: "+=60",
      duration: 8,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [activeIndex]);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      {/* ═══ BACKGROUND ═══ */}
      <div className="hero-bg">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-bg__slide ${idx === activeIndex ? "hero-bg__slide--active" : ""}`}
          >
            <Image
              src={slide.img}
              alt={slide.id}
              fill
              priority={idx === 0}
              className="hero-bg__img"
              sizes="100vw"
              unoptimized
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
        {/* bright overlay keeping left-side readable */}
        <div className="hero-bg__overlay" />

        {/* ═══ GHOST HEADLINE ═══ */}
        <div ref={ghostRef} className="hero-ghost-text" key={`ghost-${activeIndex}`}>
          {slides[activeIndex].ghostText}
        </div>
      </div>

      {/* ═══ VERTICAL DISCOVER TEXT ═══ */}
      <div className="hero-vertical">
        <span className="hero-vertical__text">Discover</span>
        <span className="hero-vertical__line" />
        <span className="hero-vertical__arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--sy-primary)", opacity: 0.6 }}>
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </span>
      </div>

      {/* ═══ NAVBAR ═══ */}
      <Navbar />

      {/* ═══ HERO MAIN CONTENT ═══ */}
      <div className="hero-content">
        {/* Left column – headline, copy, CTA, trust */}
        <div className="hero-content__left">
          {/* eyebrow */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow__line" />
            <span className="hero-eyebrow__text">EXPLORE THE WORLD</span>
          </div>

          {/* headline */}
          <h1 className="hero-headline">
            Authentic <em>Journeys,</em>
            <br />
            Curated for You
          </h1>

          {/* paragraph */}
          <p className="hero-paragraph">
            Boutique travel experiences across sacred cities, cultural routes and meaningful journeys — designed with care, guidance and trusted organisation.
          </p>

          {/* CTA buttons */}
          <div className="hero-ctas">
            <a href="#destinations" className="hero-btn hero-btn--primary">
              EXPLORE DESTINATIONS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#contact" className="hero-btn hero-btn--secondary">
              PLAN YOUR JOURNEY
            </a>
          </div>

          {/* trust micro-points */}
          <div className="hero-trust-points">
            {trustPoints.map((tp, i) => (
              <div key={i} className="hero-trust-point">
                <span className="hero-trust-point__icon">{tp.icon}</span>
                <span className="hero-trust-point__label">{tp.label}</span>
              </div>
            ))}

            {/* AR Floating Button — mobile only */}
            <a href="/ar-explore" className="hero-ar-btn" aria-label="3D AR ile keşfet">
              <span className="hero-ar-btn__pulse" />
              <svg className="hero-ar-btn__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span className="hero-ar-btn__label">3D</span>
            </a>
          </div>
        </div>

        {/* Right column – floating trust card */}
        <div className="hero-content__right">
          <div className="hero-trust-card">
            <div className="hero-trust-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="hero-trust-card__title">
              Trusted boutique
              <br />
              travel planning
            </h3>
            <p className="hero-trust-card__body">
              Carefully curated routes, reliable local partners and end-to-end support for every journey.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ STORY HIGHLIGHTS (BANNER INTEGRATED) ═══ */}
      <div className="hero-highlights">
        <StoryHighlights isIntegrated={true} />
      </div>

      {/* ═══ STATS ROW ═══ */}
      <div className="hero-stats">
        {stats.map((s, i) => (
          <div key={i} className="hero-stat">
            <span className="hero-stat__icon">{s.icon}</span>
            <div className="hero-stat__text">
              <span className="hero-stat__value">{s.value}</span>
              <span className="hero-stat__label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

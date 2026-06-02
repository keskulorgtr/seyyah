"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const journeys = [
  {
    id: "sacred",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: "Sacred Journeys",
    text: "Umrah and Al-Quds programs designed with spiritual sensitivity, trusted guidance and thoughtful organisation.",
  },
  {
    id: "cultural",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Cultural Routes",
    text: "From Morocco to Bosnia, Andalusia and beyond — journeys shaped around history, architecture and local life.",
  },
  {
    id: "aid",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: "Aid & Discovery",
    text: "Meaningful travel experiences that combine discovery, awareness and social good across selected destinations.",
  },
];

export default function SignatureJourneys() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".sig-journey-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sig-journeys-section">
      <div className="sig-journeys-inner">
        {/* Header */}
        <div className="sig-journeys-header">
          <span className="sig-journeys-eyebrow">TRAVEL WITH MEANING</span>
          <h2 className="sig-journeys-title">Signature Journeys</h2>
          <p className="sig-journeys-desc">
            Three ways to experience the world with Seyyah Travel.
          </p>
        </div>

        {/* Cards */}
        <div className="sig-journeys-grid">
          {journeys.map((j) => (
            <div key={j.id} className="sig-journey-card">
              <div className="sig-journey-card__icon">
                {j.icon}
              </div>
              <h3 className="sig-journey-card__title">{j.title}</h3>
              <p className="sig-journey-card__text">{j.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const programs = [
  {
    id: "umrah",
    title: "Umrah Program",
    meta: "Makkah & Madinah",
    description: "A guided spiritual journey planned with care, comfort and reliable organisation.",
  },
  {
    id: "al-quds",
    title: "Al-Quds Tour",
    meta: "Sacred city experience",
    description: "A meaningful route through one of the most important spiritual and historical cities.",
  },
  {
    id: "morocco",
    title: "Morocco Tour",
    meta: "Marrakech, Casablanca, Rabat, Fes",
    description: "A colorful cultural journey through medinas, architecture and local traditions.",
  },
  {
    id: "bosnia",
    title: "Bosnia Tour",
    meta: "Sarajevo, Mostar and Ottoman heritage",
    description: "A journey shaped by history, nature, memory and Balkan culture.",
  },
];

export default function UpcomingJourneys() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".upcoming-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="upcoming-section">
      <div className="upcoming-inner">
        {/* Header */}
        <div className="upcoming-header">
          <span className="upcoming-eyebrow">AVAILABLE PROGRAMS</span>
          <h2 className="upcoming-title">Upcoming Journeys</h2>
          <p className="upcoming-desc">
            Explore our upcoming group programs and request availability.
          </p>
        </div>

        {/* Program List */}
        <div className="upcoming-list">
          {programs.map((p) => (
            <div key={p.id} className="upcoming-item">
              <div className="upcoming-item__left">
                <div className="upcoming-item__meta">{p.meta}</div>
                <h3 className="upcoming-item__title">{p.title}</h3>
                <p className="upcoming-item__desc">{p.description}</p>
              </div>
              <div className="upcoming-item__right">
                <span className="upcoming-item__avail">Request availability</span>
                <a href="#contact" className="upcoming-item__btn">
                  REQUEST DETAILS
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

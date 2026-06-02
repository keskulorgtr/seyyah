"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const galleryItems = [
  {
    id: 1,
    category: "Al-Quds",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
    style: "rm-item--tall",
  },
  {
    id: 2,
    category: "Morocco",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
    style: "rm-item--wide",
  },
  {
    id: 3,
    category: "Umrah",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/f3e59801-d8f5-46f8-4890-361d0c370a00/public",
    style: "",
  },
  {
    id: 4,
    category: "Bosnia",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
    style: "",
  },
  {
    id: 5,
    category: "Africa",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/3db16821-8274-422d-c4fc-f2854022ca00/public",
    style: "rm-item--wide",
  },
  {
    id: 6,
    category: "Black Sea",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
    style: "rm-item--tall",
  },
];

export default function RealMoments() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".rm-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            delay: (i % 3) * 0.1,
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
    <section ref={sectionRef} className="rm-section">
      <div className="rm-inner">
        {/* Header */}
        <div className="rm-header">
          <span className="rm-eyebrow">FROM OUR JOURNEYS</span>
          <h2 className="rm-title">Real Moments</h2>
          <p className="rm-desc">
            A glimpse into the people, places and stories we have shared along the way.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="rm-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className={`rm-item ${item.style}`}>
              <Image
                src={item.img}
                alt={item.category}
                fill
                className="rm-item__img"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <div className="rm-item__overlay">
                <span className="rm-item__category">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View Gallery CTA */}
        <div className="rm-cta-wrap">
          <a href="/gallery" className="rm-cta">
            VIEW GALLERY
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

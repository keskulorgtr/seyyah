"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const destinations = [
  {
    id: 1,
    name: "Al-Quds",
    subtitle: "Sacred Heritage",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
    style: "md:col-span-8 md:row-span-2 h-[60vh]",
  },
  {
    id: 2,
    name: "Umrah",
    subtitle: "Sacred Journey",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/f3e59801-d8f5-46f8-4890-361d0c370a00/public",
    style: "md:col-span-4 md:row-span-1 h-[30vh]",
  },
  {
    id: 3,
    name: "Morocco",
    subtitle: "Colors of the Medina",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
    style: "md:col-span-4 md:row-span-1 h-[30vh]",
  },
  {
    id: 4,
    name: "Bosnia",
    subtitle: "Ottoman Legacy",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
    style: "md:col-span-4 md:row-span-2 h-[60vh] md:-mt-10",
  },
  {
    id: 5,
    name: "Andalusia",
    subtitle: "Legacy of Civilization",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
    style: "md:col-span-8 md:row-span-1 h-[40vh]",
  },
];


export default function DestinationCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".dest-card-grid");

      cards.forEach((card) => {
        const img = card.querySelector(".dest-img");

        gsap.fromTo(card,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );

        if (img) {
          gsap.fromTo(img,
            { scale: 1.3 },
            {
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="destinations" className="relative w-full">
      {/* Smooth transition gradient from white to dark */}
      <div className="w-full h-32 bg-gradient-to-b from-white to-brand-anthracite" />

      <div className="w-full bg-brand-anthracite py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col items-center text-center">
            <span className="font-sans text-[10px] tracking-[0.3em] text-brand-turquoise uppercase mb-4">CURATED EXPERIENCES</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white">Our Destinations</h2>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 auto-rows-min">
            {destinations.map((dest) => (
              <div key={dest.id} className={`dest-card-grid relative overflow-hidden group cursor-pointer rounded-xl ${dest.style}`}>
                <div className="absolute inset-0 bg-brand-anthracite/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-anthracite/90 via-transparent to-transparent z-10" />

                <div
                  className="dest-img w-full h-full bg-cover bg-center origin-center"
                  style={{ backgroundImage: `url(${dest.img})` }}
                />

                <div className="absolute bottom-0 left-0 p-8 z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">{dest.name}</h3>
                    <p className="font-sans text-xs tracking-widest text-white/70 uppercase">{dest.subtitle}</p>
                  </div>
                  <a
                    href="#contact"
                    className="font-sans text-[10px] tracking-[0.2em] text-white border border-white/30 px-6 py-3 rounded hover:bg-white hover:text-brand-anthracite transition-all whitespace-nowrap self-start md:self-auto backdrop-blur-sm"
                  >
                    EXPRESS INTEREST
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smooth transition gradient from dark to white */}
      <div className="w-full h-32 bg-gradient-to-b from-brand-anthracite to-white" />
    </section>
  );
}

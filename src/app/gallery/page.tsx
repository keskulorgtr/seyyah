"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── SVG Icons ─── */
const MapPinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
  </svg>
);

/* ─── Filter data ─── */
const filters = [
  { id: "all",      label: "All",            icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
  { id: "sacred",   label: "Sacred Journeys",icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { id: "cultural", label: "Cultural Routes", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
  { id: "nature",   label: "Nature & Scenic", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg> },
  { id: "group",    label: "Group Moments",   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { id: "aid",      label: "Aid & Discovery", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
];

/* ─── Gallery data ─── */
type GalleryItem = {
  id: number;
  title: string;
  location: string;
  category: string;
  type: string;
  img: string;
  alt: string;
  featured?: boolean;
  gridClass: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Al-Quds",
    location: "Palestine",
    category: "Sacred Journeys",
    type: "sacred",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
    alt: "Al-Quds sacred journey with Seyyah Travel",
    gridClass: "gl-card--tall",
  },
  {
    id: 2,
    title: "Umrah",
    location: "Saudi Arabia",
    category: "Sacred Journeys",
    type: "sacred",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/f3e59801-d8f5-46f8-4890-361d0c370a00/public",
    alt: "Umrah spiritual journey with Seyyah Travel",
    gridClass: "",
  },
  {
    id: 3,
    title: "Morocco",
    location: "North Africa",
    category: "Cultural Routes",
    type: "cultural",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
    alt: "Morocco cultural route with Seyyah Travel",
    gridClass: "",
  },
  {
    id: 4,
    title: "Bosnia",
    location: "Balkans",
    category: "Cultural Routes",
    type: "cultural",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
    alt: "Bosnia Ottoman legacy tour with Seyyah Travel",
    gridClass: "",
  },
  {
    id: 5,
    featured: true,
    title: "Paths of Meaning,\nMoments of Light",
    location: "",
    category: "",
    type: "all",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
    alt: "Featured story — Seyyah Travel curated journeys",
    gridClass: "gl-card--featured",
  },
  {
    id: 6,
    title: "Africa",
    location: "East Africa",
    category: "Aid & Discovery",
    type: "aid",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/3db16821-8274-422d-c4fc-f2854022ca00/public",
    alt: "Africa aid and discovery journey with Seyyah Travel",
    gridClass: "",
  },
  {
    id: 7,
    title: "Andalusia",
    location: "Spain",
    category: "Cultural Routes",
    type: "cultural",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
    alt: "Andalusia legacy of civilization with Seyyah Travel",
    gridClass: "",
  },
  {
    id: 8,
    title: "Black Sea",
    location: "Türkiye",
    category: "Nature & Scenic",
    type: "nature",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
    alt: "Black Sea nature route with Seyyah Travel",
    gridClass: "gl-card--wide",
  },
  {
    id: 9,
    title: "Jordan",
    location: "Middle East",
    category: "Cultural Routes",
    type: "cultural",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
    alt: "Jordan desert wonders with Seyyah Travel",
    gridClass: "",
  },
];

/* ─── Trust strip data ─── */
const trustItems = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    value: "12+ Destinations",
    label: "Across 3 Continents",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    value: "Curated Group Journeys",
    label: "Small groups. Meaningful experiences.",
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    value: "Trusted Local Guidance",
    label: "Verified partners. Peace of mind.",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "all" || item.type === activeFilter || item.featured
  );

  return (
    <div className="gl-page">

      {/* ═══ NAVBAR ═══ */}
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="gl-hero" aria-label="Gallery hero">
        <Image
          src="https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public"
          alt="Sacred cities and cultural routes — Seyyah Travel gallery"
          fill
          priority
          className="gl-hero__img"
          unoptimized
        />
        <div className="gl-hero__overlay" />

        <div className="gl-hero__content">
          {/* Breadcrumb */}
          <nav className="gl-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="gl-breadcrumb__link">HOME</Link>
            <span className="gl-breadcrumb__sep">•</span>
            <span className="gl-breadcrumb__current">GALLERY</span>
          </nav>

          <h1 className="gl-hero__title">Gallery</h1>
          <div className="gl-hero__desc-wrap">
            <span className="gl-hero__accent-line" aria-hidden="true" />
            <p className="gl-hero__desc">
              Curated moments from sacred routes, cultural journeys and unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FILTER BAR ═══ */}
      <div className="gl-filter-bar" role="navigation" aria-label="Gallery filters">
        <div className="gl-filter-bar__inner">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`gl-filter-pill ${activeFilter === f.id ? "gl-filter-pill--active" : ""}`}
              aria-pressed={activeFilter === f.id}
            >
              <span className="gl-filter-pill__icon" aria-hidden="true">{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ GALLERY SECTION ═══ */}
      <section className="gl-section" aria-label="Gallery grid">
        <div className="gl-section__inner">

          {/* Editorial intro */}
          <aside className="gl-intro">
            <span className="gl-intro__eyebrow">REAL MOMENTS FROM OUR JOURNEYS</span>
            <h2 className="gl-intro__title">Stories captured.<br />Memories preserved.</h2>
            <p className="gl-intro__text">
              From timeless cities to remote landscapes, each image reflects the beauty of places and the spirit of the journeys we create.
            </p>
            <span className="gl-intro__rule" aria-hidden="true" />
          </aside>

          {/* Masonry grid */}
          <div className="gl-grid" aria-label="Gallery images">
            {filteredItems.length === 0 ? (
              <div className="gl-grid__empty">
                <p>No images found for this category.</p>
              </div>
            ) : (
              filteredItems.map((item) =>
                item.featured ? (
                  /* Featured story card */
                  <article key={item.id} className="gl-card gl-card--featured" aria-label="Featured story">
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      className="gl-card__img"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      unoptimized
                      loading="lazy"
                    />
                    <div className="gl-card__featured-overlay" />
                    <div className="gl-card__featured-body">
                      <span className="gl-card__featured-label">FEATURED STORY</span>
                      <h3 className="gl-card__featured-title">
                        {item.title.split("\n").map((line, i) => (
                          <span key={i}>{line}{i === 0 && <br />}</span>
                        ))}
                      </h3>
                      <p className="gl-card__featured-text">
                        A collection of moments that speak of faith, culture, connection and discovery.
                      </p>
                      <Link href="#contact" className="gl-card__featured-btn">
                        Explore Story <ArrowRightIcon />
                      </Link>
                    </div>
                  </article>
                ) : (
                  /* Standard card */
                  <article key={item.id} className={`gl-card ${item.gridClass}`} aria-label={item.title}>
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      className="gl-card__img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      loading="lazy"
                    />
                    <div className="gl-card__overlay" />
                    <div className="gl-card__caption">
                      <h3 className="gl-card__name">{item.title}</h3>
                      <div className="gl-card__loc">
                        <MapPinIcon />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </article>
                )
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section className="gl-trust" aria-label="Trust indicators">
        <div className="gl-trust__inner">
          {trustItems.map((t, i) => (
            <div key={i} className="gl-trust__item">
              <span className="gl-trust__icon" aria-hidden="true">{t.icon}</span>
              <div className="gl-trust__text">
                <strong className="gl-trust__value">{t.value}</strong>
                <span className="gl-trust__label">{t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}

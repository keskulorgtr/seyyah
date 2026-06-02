import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us — Seyyah Travel",
  description: "Learn about Seyyah Travel & Organisation. Authentic boutique travel experiences from Switzerland to the world.",
};

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    ),
    title: "Authentic Experiences",
    desc: "We don't do mass tourism. Every route is handpicked, every guide is local, and every moment is genuine.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    title: "End-to-End Support",
    desc: "From the first inquiry to the last goodbye, our team is with you at every step of the journey.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: "Local Expertise",
    desc: "Our partners live where you travel. They share insider knowledge no guidebook can offer.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
    ),
    title: "Tailor-Made Itineraries",
    desc: "No two travelers are the same. We design every tour around your preferences and schedule.",
  },
];

const milestones = [
  { event: "Founded in Switzerland" },
  { event: "First Egypt & Morocco tours" },
  { event: "European destinations added" },
  { event: "Digital-first approach launched" },
  { event: "Switzerland premium tours" },
  { event: "12+ active destinations" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop"
          alt="Seyyah Travel"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-16 pb-12">
          <div className="flex items-center gap-2 font-sans text-[11px] tracking-widest text-slate-500 uppercase mb-4">
            <Link href="/" className="hover:text-brand-turquoise transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <span className="text-brand-turquoise font-semibold">About</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 mb-4">
            About <em className="italic text-brand-turquoise">Seyyah</em>
          </h1>
          <p className="font-sans text-sm md:text-base text-slate-600 max-w-lg leading-relaxed border-l-2 border-brand-turquoise pl-4">
            Where authenticity meets modern travel. We curate boutique journeys that create lasting memories.
          </p>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[2px] bg-brand-turquoise rounded" />
              <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase">Our Story</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
              Born from a passion for <em className="italic text-brand-turquoise">authentic</em> exploration
            </h2>
            <p className="font-sans text-sm text-slate-600 leading-relaxed mb-4">
              Seyyah was founded in Switzerland with a simple belief: travel should be personal, meaningful, and transformative. 
              We rejected the one-size-fits-all approach and built a company around curating boutique experiences.
            </p>
            <p className="font-sans text-sm text-slate-600 leading-relaxed mb-4">
              The name &ldquo;Seyyah&rdquo; comes from the Ottoman-Turkish word for &ldquo;traveler&rdquo; — a nod to our heritage 
              and the timeless spirit of exploration that drives everything we do.
            </p>
            <p className="font-sans text-sm text-slate-600 leading-relaxed">
              Today, we operate across 12+ destinations, blending the authenticity of the Orient with the precision of 
              Swiss design to deliver truly premium journeys.
            </p>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800&auto=format&fit=crop"
              alt="Seyyah journey"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-2xl text-white mb-1">Authentic yet Modern</p>
              <p className="font-sans text-xs text-white/70 tracking-widest uppercase">Since 2014</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="py-20 px-6 md:px-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase block mb-4">
              What Defines Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg hover:border-brand-turquoise/30 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-brand-turquoise/8 flex items-center justify-center text-brand-turquoise mb-6 group-hover:bg-brand-turquoise/15 transition-colors">
                  {v.icon}
                </div>
                <h3 className="font-sans text-base font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="font-sans text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase block mb-4">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Milestones</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 md:-translate-x-[0.5px]" />
            
            {milestones.map((m, i) => (
              <div key={i} className={`relative flex items-center mb-8 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-brand-turquoise rounded-full -translate-x-1/2 z-10 ring-4 ring-white" />
                
                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"}`}>
                  <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <p className="font-sans text-sm text-slate-700 font-medium">{m.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LOCATION ═══ */}
      <section className="py-20 px-6 md:px-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase block mb-4">
              Where We Are
            </span>
            <h2 className="font-serif text-3xl text-slate-900 mb-6">Our Office</h2>
            <address className="font-sans text-sm text-slate-600 not-italic leading-relaxed mb-6">
              Atatürk Mahallesi, Estergon Caddesi no:24<br />
              Suryap Exen Kule Rezidans F Blok, Daire:18<br />
              Ümraniye / İstanbul
            </address>
            <a href="mailto:info@seyyah.ch" className="font-sans text-sm text-brand-turquoise font-semibold hover:text-brand-petrol transition-colors">
              info@seyyah.ch
            </a>
          </div>
          <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop"
              alt="İstanbul"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="font-sans text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
            Let us craft a personalized tour that matches your travel style. No generic packages — just authentic experiences.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand-turquoise text-white font-sans text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 rounded-lg hover:bg-brand-petrol transition-all shadow-lg shadow-brand-turquoise/20"
          >
            Plan Your Journey
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryHighlights from "@/components/StoryHighlights";
import { stories } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Travel Stories — Seyyah Travel",
  description: "Discover the experiences and journeys that inspire our travelers. Visual stories from Egypt, Switzerland, Morocco, and beyond.",
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative py-24 md:py-32 px-6 md:px-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Ghost text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(80px, 16vw, 260px)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(12, 123, 138, 0.05)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          STORIES
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 font-sans text-[11px] tracking-widest text-slate-500 uppercase mb-6">
            <Link href="/" className="hover:text-brand-turquoise transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <span className="text-brand-turquoise font-semibold">Stories</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-slate-900 mb-6">
            Travel <em className="italic text-brand-turquoise">Stories</em>
          </h1>
          <p className="font-sans text-sm md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            Discover the experiences and journeys that inspire our travelers. 
            Each story is a window into authentic moments from around the world.
          </p>
        </div>
      </section>

      {/* ═══ STORIES SECTION ═══ */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <StoryHighlights isIntegrated={false} />
        </div>
      </section>

      {/* ═══ FEATURED ARTICLES ═══ */}
      <section className="py-16 px-6 md:px-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase block mb-3">
              From Our Journal
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Travel Insights</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((article, i) => (
              <Link href={`/stories/${article.slug}`} key={i} className="block group">
                <div className="bg-white rounded-xl border border-slate-200 p-8 hover:shadow-lg hover:border-brand-turquoise/30 transition-all duration-300 h-full flex flex-col cursor-pointer">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-sans text-[10px] font-bold tracking-widest text-brand-turquoise uppercase bg-brand-turquoise/8 px-3 py-1 rounded-full">
                      {article.tag}
                    </span>
                    <span className="font-sans text-[10px] text-slate-400">{article.date}</span>
                  </div>
                  <h3 className="font-serif text-xl text-slate-900 mb-3 group-hover:text-brand-turquoise transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed mb-4 flex-grow">
                    {article.excerpt}
                  </p>
                  <span className="font-sans text-xs font-bold text-brand-turquoise tracking-widest uppercase flex items-center gap-1 mt-auto">
                    Read More
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">
            Ready to Create Your Own Story?
          </h2>
          <p className="font-sans text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
            Join us on a journey to discover authentic experiences and unforgettable moments.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-brand-turquoise text-white font-sans text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 rounded-lg hover:bg-brand-petrol transition-all shadow-lg shadow-brand-turquoise/20"
          >
            Start Your Journey
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

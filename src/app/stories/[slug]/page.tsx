import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStoryBySlug, stories } from "@/lib/stories";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Generate static params for build time optimization
export function generateStaticParams() {
  return stories.map((story) => ({
    slug: story.slug,
  }));
}

// Dynamic metadata based on story
export function generateMetadata({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title} — Seyyah Travel Stories`,
    description: story.excerpt,
  };
}

export default function StoryDetailPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-16">
          <div className="flex items-center gap-2 font-sans text-[11px] tracking-widest text-white/60 uppercase mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link href="/stories" className="hover:text-white transition-colors">Stories</Link>
            <span>&rsaquo;</span>
            <span className="text-brand-turquoise font-semibold">{story.tag}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 max-w-4xl leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center gap-6 text-white/70 font-sans text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative border border-white/20">
                <Image src={story.author.avatar} alt={story.author.name} fill className="object-cover" unoptimized />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">{story.author.name}</p>
                <p className="text-xs text-white/50">{story.author.role}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-left">
              <p>{story.date}</p>
              <p className="text-xs text-brand-turquoise">{story.readTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          {/* We use a simple global styles approach for the rich text via tailwind typography or custom classes */}
          <article 
            className="prose prose-lg prose-slate max-w-none 
                       prose-headings:font-serif prose-headings:text-slate-900 prose-headings:font-medium
                       prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                       prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                       prose-p:font-sans prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                       prose-a:text-brand-turquoise prose-a:no-underline hover:prose-a:underline
                       prose-li:text-slate-600 prose-li:font-sans
                       prose-strong:text-slate-900 prose-strong:font-bold"
            dangerouslySetInnerHTML={{ __html: story.content }}
          />

          <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
            <Link href="/stories" className="inline-flex items-center gap-2 font-sans text-xs font-bold tracking-widest text-slate-500 uppercase hover:text-brand-turquoise transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
              Back to Stories
            </Link>
            
            <button className="font-sans text-xs font-bold tracking-widest text-brand-turquoise uppercase border border-brand-turquoise/30 px-6 py-3 rounded-full hover:bg-brand-turquoise hover:text-white transition-colors">
              Share Article
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

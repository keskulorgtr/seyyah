import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Ghost 404 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(180px, 30vw, 500px)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "2px rgba(12, 123, 138, 0.06)",
          lineHeight: 1,
        }}
      >
        404
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-[2px] bg-brand-turquoise rounded" />
          <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase">
            Page Not Found
          </span>
          <span className="w-8 h-[2px] bg-brand-turquoise rounded" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-4">
          Lost in the <em className="text-brand-turquoise italic font-medium">Journey?</em>
        </h1>

        <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed mb-10 max-w-md mx-auto">
          The page you&apos;re looking for seems to have wandered off the trail. 
          Let us guide you back to the right path.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-turquoise text-white font-sans text-xs font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-lg hover:bg-brand-petrol transition-all shadow-md shadow-brand-turquoise/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Back to Home
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-gray-700 font-sans text-xs font-bold tracking-[0.1em] uppercase px-8 py-4 rounded-lg border-2 border-gray-200 hover:border-brand-turquoise hover:text-brand-turquoise transition-all"
          >
            Explore Tours
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";

interface TourDay {
  day: number;
  title: string;
  desc: string;
}

interface TourInfo {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gallery: string[];
  highlights: string[];
  itinerary: TourDay[];
  duration: string;
  price: string;
  groupSize: string;
  includes: string[];
}

const tourData: Record<string, TourInfo> = {
  egypt: {
    title: "Egypt",
    subtitle: "Ancient Wonders & Curated Culture",
    description:
      "Journey through the land of Pharaohs with our curated Egypt tours. From the Great Pyramids to hidden temples along the Nile, every moment is crafted for authenticity and wonder.",
    image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
    gallery: [
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539760397268-33f5112f94bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=800&auto=format&fit=crop",
    ],
    highlights: ["Pyramids of Giza", "Valley of the Kings", "Luxor Temple", "Nile River Cruise", "Local Market Experiences"],
    itinerary: [
      { day: 1, title: "Arrival in Cairo", desc: "Airport transfer, hotel check-in, welcome dinner at a rooftop restaurant overlooking the Pyramids." },
      { day: 2, title: "Pyramids & Sphinx", desc: "Private guided tour of Giza Plateau, including the Great Pyramids, Sphinx, and the Solar Boat Museum." },
      { day: 3, title: "Cairo Cultural Day", desc: "Egyptian Museum, Khan el-Khalili Bazaar, traditional lunch at a local family home." },
      { day: 4, title: "Fly to Luxor", desc: "Karnak Temple and Luxor Temple visits. Evening felucca ride on the Nile." },
      { day: 5, title: "Valley of the Kings", desc: "West Bank exploration: Valley of the Kings, Hatshepsut Temple, Colossi of Memnon." },
      { day: 6, title: "Nile Cruise", desc: "Board a premium dahabiya. Sail towards Edfu with stops at riverside temples." },
      { day: 7, title: "Aswan & Departure", desc: "Philae Temple visit, traditional Nubian village experience, airport transfer." },
    ],
    duration: "7-10 days",
    price: "From $3,500",
    groupSize: "2-8 guests",
    includes: ["Domestic flights", "5-star accommodation", "Private guides", "All entrance fees", "Airport transfers", "Daily breakfast & select meals"],
  },
  switzerland: {
    title: "Switzerland",
    subtitle: "Alpine Elegance & Refined Escapes",
    description:
      "Discover the Swiss Alps through curated experiences that blend stunning landscapes with refined comfort. From mountaintop lodges to lakeside villages, every detail is perfection.",
    image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
    gallery: [
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    ],
    highlights: ["Jungfrau Region", "Swiss Alps Hiking", "Lake Lucerne", "Zurich City Tour", "Swiss Cuisine Experience"],
    itinerary: [
      { day: 1, title: "Zurich Arrival", desc: "Private airport transfer, check-in to your boutique hotel, evening lake walk." },
      { day: 2, title: "Lucerne & Lake", desc: "Chapel Bridge, Lion Monument, scenic boat cruise on Lake Lucerne." },
      { day: 3, title: "Jungfraujoch", desc: "Train to the Top of Europe, panoramic views, snow experience, local alpine lunch." },
      { day: 4, title: "Interlaken", desc: "Paragliding option, lakeside exploration, Swiss fondue dinner." },
      { day: 5, title: "Departure", desc: "Leisurely morning, gift shopping, airport transfer." },
    ],
    duration: "5-8 days",
    price: "From $4,200",
    groupSize: "2-6 guests",
    includes: ["Swiss Travel Pass", "4-5 star hotels", "Private guides", "Scenic train tickets", "Airport transfers", "Daily breakfast"],
  },
  europe: {
    title: "Europe",
    subtitle: "Handpicked Cultural Journeys",
    description: "Explore the heart of European culture with multi-city itineraries designed around art, history, and local living.",
    image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
    gallery: [],
    highlights: ["Paris & Versailles", "Rome & Vatican", "Barcelona Architecture", "Amsterdam Canals", "Cultural Heritage Sites"],
    itinerary: [
      { day: 1, title: "Paris Arrival", desc: "Eiffel Tower views, Seine cruise, check-in to a boutique Marais hotel." },
      { day: 2, title: "Louvre & Montmartre", desc: "Guided Louvre tour, lunch in Montmartre, Sacré-Cœur." },
      { day: 3, title: "Train to Rome", desc: "Colosseum, Roman Forum, evening trastevere dinner." },
      { day: 4, title: "Vatican & Art", desc: "Vatican Museums, Sistine Chapel, St. Peter's Basilica." },
      { day: 5, title: "Barcelona", desc: "Sagrada Família, Park Güell, Gothic Quarter tapas tour." },
    ],
    duration: "10-14 days",
    price: "From $4,800",
    groupSize: "2-8 guests",
    includes: ["Inter-city trains", "Boutique hotels", "Skip-the-line tickets", "Local guides", "Airport transfers", "Daily breakfast"],
  },
  morocco: {
    title: "Morocco",
    subtitle: "Colors, Heritage, and Local Charm",
    description: "Immerse yourself in the vibrant souks, stunning riads, and the golden sands of the Sahara Desert.",
    image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
    gallery: [],
    highlights: ["Marrakech Medina", "Sahara Desert", "Fes Tanneries", "Atlas Mountains", "Coastal Essaouira"],
    itinerary: [
      { day: 1, title: "Marrakech Arrival", desc: "Riad check-in, Jemaa el-Fnaa square, welcome tea ceremony." },
      { day: 2, title: "Medina & Souks", desc: "Guided medina walk, Bahia Palace, spice markets, cooking class." },
      { day: 3, title: "Atlas Mountains", desc: "Day trip to Ourika Valley, Berber village visit, waterfall hike." },
      { day: 4, title: "To the Sahara", desc: "Drive through Ait Benhaddou, arrive at desert camp, sunset camel ride." },
      { day: 5, title: "Fes", desc: "Al-Qarawiyyin, tanneries, ceramic workshops, traditional dinner." },
      { day: 6, title: "Departure", desc: "Morning at leisure, airport transfer." },
    ],
    duration: "6-9 days",
    price: "From $2,800",
    groupSize: "2-8 guests",
    includes: ["4WD desert transport", "Riad accommodation", "Camel trek", "Local guides", "Airport transfers", "Breakfast & select dinners"],
  },
  tunisia: {
    title: "Tunisia",
    subtitle: "Mediterranean Discovery",
    description: "Experience a blend of ancient ruins, blue-washed villages, and pristine Mediterranean coastlines.",
    image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/3db16821-8274-422d-c4fc-f2854022ca00/public",
    gallery: [],
    highlights: ["Tunis Medina", "Carthage Ruins", "Djerba Island", "Sahara Oasis", "Sidi Bou Said"],
    itinerary: [
      { day: 1, title: "Tunis Arrival", desc: "Hotel check-in, Medina walk, welcome dinner." },
      { day: 2, title: "Carthage & Sidi Bou Said", desc: "Ancient Carthage ruins, blue-white village of Sidi Bou Said." },
      { day: 3, title: "Djerba Island", desc: "Ferry crossing, beach exploration, El Ghriba Synagogue." },
      { day: 4, title: "Sahara Gateway", desc: "Tozeur oasis, Chebika and Tamerza canyons, desert sunset." },
      { day: 5, title: "Departure", desc: "Morning at leisure, airport transfer." },
    ],
    duration: "5-7 days",
    price: "From $2,400",
    groupSize: "2-10 guests",
    includes: ["Domestic transport", "3-4 star hotels", "Local guides", "Entrance fees", "Airport transfers", "Daily breakfast"],
  },
  algeria: {
    title: "Algeria",
    subtitle: "Hidden Gems and Authentic Routes",
    description: "Traverse the untouched landscapes and historic sites of North Africa's largest treasure.",
    image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/f3e59801-d8f5-46f8-4890-361d0c370a00/public",
    gallery: [],
    highlights: ["Algiers Casbah", "Tlemcen Historic Sites", "Sahara Desert", "Oran Beaches", "Traditional Culture"],
    itinerary: [
      { day: 1, title: "Algiers Arrival", desc: "Hotel check-in, Casbah walking tour, Notre Dame d'Afrique." },
      { day: 2, title: "Roman Ruins", desc: "Tipaza and Djemila UNESCO sites, coastal drive." },
      { day: 3, title: "Constantine", desc: "Bridge city, Ahmed Bey Palace, traditional cuisine." },
      { day: 4, title: "Tlemcen", desc: "Great Mosque, Mansourah ruins, artisan workshops." },
      { day: 5, title: "Departure", desc: "Morning at leisure, airport transfer." },
    ],
    duration: "7-10 days",
    price: "From $2,600",
    groupSize: "2-8 guests",
    includes: ["Domestic flights", "Hotel accommodation", "Local guides", "Entrance fees", "Airport transfers", "Daily breakfast"],
  },
};

export default function TourDetailPage() {
  const params = useParams();
  const destination = params.destination as string;
  const tour = tourData[destination];
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);

  if (!tour) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 px-6">
          <h1 className="text-4xl font-serif text-gray-800 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-8">The tour you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/tours" className="bg-brand-turquoise text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-sans font-semibold text-sm">
            View All Tours
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Generate Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": `${tour.title} Boutique Tour`,
    "description": tour.description,
    "touristType": [
      "Leisure",
      "Cultural"
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": tour.price.replace(/[^0-9.]/g, ""), // Extracts numbers
      "availability": "https://schema.org/InStock"
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": tour.itinerary.map((day, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "TouristAttraction",
          "name": day.title,
          "description": day.desc
        }
      }))
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative w-full h-[65vh] min-h-[450px] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          priority
          unoptimized
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        {/* Ghost text */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(80px, 18vw, 280px)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.08)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {tour.title}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-12">
          <div className="flex items-center gap-2 font-sans text-[11px] tracking-widest text-white/60 uppercase mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link href="/tours" className="hover:text-white transition-colors">Tours</Link>
            <span>&rsaquo;</span>
            <span className="text-brand-turquoise font-semibold">{tour.title}</span>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-3">{tour.title}</h1>
          <p className="font-sans text-base md:text-lg text-white/80 max-w-lg">{tour.subtitle}</p>
        </div>
      </section>

      {/* ═══ QUICK STATS ═══ */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200">
          {[
            { label: "Duration", value: tour.duration, icon: "⏱️" },
            { label: "Starting From", value: tour.price, icon: "💎" },
            { label: "Group Size", value: tour.groupSize, icon: "👥" },
            { label: "Tour Type", value: "Boutique", icon: "✨" },
          ].map((stat, i) => (
            <div key={i} className="py-6 px-6 text-center">
              <span className="text-2xl mb-2 block">{stat.icon}</span>
              <p className="font-sans text-[10px] tracking-widest text-slate-400 uppercase mb-1">{stat.label}</p>
              <p className="font-serif text-lg text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DESCRIPTION ═══ */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-brand-turquoise rounded" />
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase">About This Tour</span>
          </div>
          <p className="font-sans text-base text-slate-600 leading-relaxed max-w-2xl">{tour.description}</p>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      {tour.gallery.length > 0 && (
        <section className="pb-16 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden mb-4 shadow-xl">
              <Image
                src={tour.gallery[activeGalleryIdx]}
                alt={`${tour.title} gallery ${activeGalleryIdx + 1}`}
                fill
                className="object-cover transition-opacity duration-500"
                unoptimized
              />
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {tour.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGalleryIdx(i)}
                  className={`relative w-20 h-16 md:w-28 md:h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === activeGalleryIdx ? "border-brand-turquoise shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ITINERARY ═══ */}
      <section className="py-16 px-6 md:px-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase block mb-3">Day by Day</span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Itinerary</h2>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-slate-200" />

            {tour.itinerary.map((day) => (
              <div key={day.day} className="relative pl-16 pb-8 last:pb-0">
                {/* Day badge */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-white border-2 border-brand-turquoise flex items-center justify-center z-10">
                  <span className="font-sans text-xs font-bold text-brand-turquoise">{day.day}</span>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-serif text-xl text-slate-900 mb-2">{day.title}</h3>
                  <p className="font-sans text-sm text-slate-500 leading-relaxed">{day.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HIGHLIGHTS + INCLUDES ═══ */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Highlights */}
          <div>
            <h3 className="font-serif text-2xl text-slate-900 mb-6">Highlights</h3>
            <ul className="space-y-3">
              {tour.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-turquoise/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-turquoise"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <span className="font-sans text-sm text-slate-700">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Includes */}
          <div>
            <h3 className="font-serif text-2xl text-slate-900 mb-6">What&apos;s Included</h3>
            <ul className="space-y-3">
              {tour.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-brand-gold"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </span>
                  <span className="font-sans text-sm text-slate-700">{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 px-6 md:px-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-sans text-[11px] font-bold tracking-[0.2em] text-brand-turquoise uppercase block mb-3">Questions & Answers</span>
            <h2 className="font-serif text-3xl md:text-4xl text-slate-900">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion />
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-brand-turquoise/5 to-brand-gold/5 border border-brand-turquoise/20 rounded-2xl p-10 md:p-14 text-center">
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-turquoise uppercase block mb-4">Ready to Explore?</span>
            <h3 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">
              Book Your {tour.title} Journey
            </h3>
            <p className="font-sans text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
              This is a curated boutique tour. We don&apos;t offer instant booking. Submit a request and let us organize the perfect experience for you.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-brand-turquoise text-white font-sans text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 rounded-lg hover:bg-brand-petrol transition-all shadow-lg shadow-brand-turquoise/20"
            >
              Request This Tour
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

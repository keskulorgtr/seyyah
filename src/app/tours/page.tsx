"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tours = [
  {
    id: "egypt",
    name: "Egypt",
    tag: "Signature",
    desc: "Ancient wonders & curated culture",
    icon: "🏛️",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
  },
  {
    id: "switzerland",
    name: "Switzerland",
    tag: "Scenic",
    desc: "Alpine elegance & refined escapes",
    icon: "🏔️",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
  },
  {
    id: "europe",
    name: "Europe",
    tag: "Boutique",
    desc: "Handpicked cultural journeys",
    icon: "🏰",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
  },
  {
    id: "morocco",
    name: "Morocco",
    tag: "Cultural",
    desc: "Colors, heritage, and local charm",
    icon: "🕌",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
  },
  {
    id: "tunisia",
    name: "Tunisia",
    tag: "Upcoming",
    desc: "Mediterranean discovery",
    icon: "☀️",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/3db16821-8274-422d-c4fc-f2854022ca00/public",
  },
  {
    id: "algeria",
    name: "Algeria",
    tag: "Boutique",
    desc: "Hidden gems and authentic routes",
    icon: "🌿",
    img: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/f3e59801-d8f5-46f8-4890-361d0c370a00/public",
  },
];

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl text-gray-800 mb-4">Our Tours</h1>
          <p className="font-sans text-lg text-gray-600">
            Explore our curated collection of boutique tours designed for authentic experiences.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={tour.img}
                    alt={tour.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-brand-turquoise/90 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {tour.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{tour.icon}</span>
                    <h3 className="font-serif text-2xl text-gray-800">{tour.name}</h3>
                  </div>
                  <p className="font-sans text-sm text-gray-600 mb-4">{tour.desc}</p>
                  <div className="flex items-center gap-2 text-brand-turquoise font-semibold text-sm group-hover:gap-3 transition-all">
                    Explore Tour
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-gray-800 mb-4">Don't See Your Dream Destination?</h2>
          <p className="font-sans text-gray-600 mb-8">
            We create custom tours tailored to your interests. Contact us to plan your perfect journey.
          </p>
          <Link 
            href="/#contact"
            className="inline-block bg-brand-turquoise text-white px-8 py-3 font-sans font-semibold rounded hover:opacity-90 transition"
          >
            Request Custom Tour
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

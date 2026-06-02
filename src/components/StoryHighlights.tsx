"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
);
const ChevronLeftIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);
const ChevronRightIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

interface StorySlide {
  image: string;
  eyebrow: string;
  headline: string;
  text: string;
  ctaLabel?: string;
  ctaLink?: string;
}

interface Story {
  id: string;
  title: string;
  thumbnail: string;
  slides: StorySlide[];
}

const stories: Story[] = [
  {
    id: "umrah",
    title: "UMRAH",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/f3e59801-d8f5-46f8-4890-361d0c370a00/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/f3e59801-d8f5-46f8-4890-361d0c370a00/public",
        eyebrow: "UMRAH",
        headline: "A Sacred Journey, Carefully Planned",
        text: "Guided Umrah programs designed with spiritual sensitivity, comfort and trusted end-to-end organisation.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
  {
    id: "al-quds",
    title: "AL-QUDS",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
        eyebrow: "AL-QUDS",
        headline: "Sacred Heritage of Jerusalem",
        text: "A meaningful route through one of the most important spiritual and historical cities in the world.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
  {
    id: "morocco",
    title: "MOROCCO",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
        eyebrow: "MOROCCO",
        headline: "Colors of the Medina",
        text: "A colorful cultural journey through medinas, architecture and local traditions across Marrakech, Fes and beyond.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
  {
    id: "bosnia",
    title: "BOSNIA",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/1afb262b-9d95-4bed-12b5-31d83a54d700/public",
        eyebrow: "BOSNIA",
        headline: "Ottoman Legacy & Balkan Beauty",
        text: "A journey shaped by history, nature, memory and Balkan culture through Sarajevo and Mostar.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
  {
    id: "africa",
    title: "AFRICA",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/3db16821-8274-422d-c4fc-f2854022ca00/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/3db16821-8274-422d-c4fc-f2854022ca00/public",
        eyebrow: "AFRICA",
        headline: "Safari & Meaningful Discovery",
        text: "Meaningful travel experiences that combine discovery, awareness and social good across selected African destinations.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
  {
    id: "black-sea",
    title: "BLACK SEA",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d73b8bfa-b159-4eb4-d34d-8cd6e1791500/public",
        eyebrow: "BLACK SEA",
        headline: "Nature Routes Along the Coast",
        text: "Discover the lush highlands, coastal villages and authentic local life of the Black Sea region.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
  {
    id: "andalusia",
    title: "ANDALUSIA",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/d021f16a-8d45-434b-5e40-0e1fb5b74b00/public",
        eyebrow: "ANDALUSIA",
        headline: "Legacy of Civilization",
        text: "Walk through the Islamic heritage of Córdoba, Granada and Seville — a journey through history, architecture and culture.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
  {
    id: "jordan",
    title: "JORDAN",
    thumbnail: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
    slides: [
      {
        image: "https://imagedelivery.net/EDcvEUy2F2CJpIzjIkCF7Q/c34fba9c-e290-42d8-001f-4c097af0ee00/public",
        eyebrow: "JORDAN",
        headline: "Desert Wonders & Ancient Cities",
        text: "From Petra to Wadi Rum — discover the ancient beauty, desert landscapes and sacred sites of Jordan.",
        ctaLabel: "Request Details",
        ctaLink: "#contact",
      },
    ],
  },
];

export default function StoryHighlights({ isIntegrated = false }: { isIntegrated?: boolean }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  const closeStory = useCallback(() => {
    setActiveStoryIndex(null);
    setActiveSlideIndex(0);
    setIsPaused(false);
  }, []);

  const nextSlide = useCallback(() => {
    if (activeStoryIndex === null) return;
    const currentStory = stories[activeStoryIndex];

    if (activeSlideIndex < currentStory.slides.length - 1) {
      setActiveSlideIndex(prev => prev + 1);
    } else {
      if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex(prev => prev! + 1);
        setActiveSlideIndex(0);
      } else {
        closeStory();
      }
    }
  }, [activeStoryIndex, activeSlideIndex, closeStory]);

  const prevSlide = useCallback(() => {
    if (activeStoryIndex === null) return;

    if (activeSlideIndex > 0) {
      setActiveSlideIndex(prev => prev - 1);
    } else {
      if (activeStoryIndex > 0) {
        const prevStory = stories[activeStoryIndex - 1];
        setActiveStoryIndex(prev => prev! - 1);
        setActiveSlideIndex(prevStory.slides.length - 1);
      }
    }
  }, [activeStoryIndex, activeSlideIndex]);

  // Autoplay
  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeStoryIndex, activeSlideIndex, isPaused, nextSlide]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeStory, nextSlide, prevSlide]);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setActiveSlideIndex(0);
    setViewedStories(prev => new Set(prev).add(stories[index].id));
  };

  return (
    <section className={`w-full ${isIntegrated ? 'py-8' : 'py-20 bg-white border-t border-gray-100'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Header */}
        <div className={`mb-8 text-center`}>
          <h2 className={`font-serif ${isIntegrated ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} text-slate-900 mb-2`}>
            Curated Story Highlights
          </h2>
          <p className="font-sans text-xs md:text-sm text-slate-500 max-w-2xl leading-relaxed mx-auto">
            Discover our journeys through sacred routes, cultural experiences and real moments from our previous groups.
          </p>
        </div>

        {/* Story Bubble Row */}
        <div className="flex gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide w-full justify-start md:justify-center px-4">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => openStory(index)}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer"
            >
              <div className={`relative p-1 rounded-full border-2 transition-all duration-300 ${viewedStories.has(story.id) ? 'border-gray-200' : 'border-[#0C7B8A]'} group-hover:scale-105`}>
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <span className="mt-3 font-sans text-[10px] font-semibold tracking-widest text-slate-700 uppercase">
                {story.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && activeStory && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-slate-950/95 flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-sm"
          onClick={closeStory}
        >
          {/* Close Button */}
          <button
            onClick={closeStory}
            className="absolute top-6 right-6 z-[100000] text-white/70 hover:text-white p-2 transition-colors cursor-pointer"
            aria-label="Close story"
          >
            <XIcon size={32} />
          </button>

          {/* Side Controls (Desktop Only) */}
          <div className="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 px-12 justify-between z-[100000] pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto"
            >
              <ChevronLeftIcon size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all pointer-events-auto"
            >
              <ChevronRightIcon size={28} />
            </button>
          </div>

          {/* Story Content Area */}
          <div
            className="relative w-full max-w-[420px] h-[85vh] md:h-[80vh] bg-slate-900 md:rounded-2xl overflow-hidden shadow-2xl z-[100001]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Overlay (Inside the story area) */}
            <div className="absolute inset-0 z-[100002] flex">
              <div
                className="w-1/3 h-full cursor-pointer"
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              />
              <div
                className="w-2/3 h-full cursor-pointer"
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              />
            </div>
            {/* Progress Bars */}
            <div className="absolute top-4 inset-x-4 z-[100003] flex gap-1.5">
              {activeStory.slides.map((_, i) => (
                <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-white transition-all ease-linear ${i < activeSlideIndex ? 'w-full' :
                        i === activeSlideIndex ? 'animate-progress-grow' : 'w-0'
                      }`}
                    style={{ animationDuration: '5s', animationPlayState: isPaused ? 'paused' : 'running' }}
                  />
                </div>
              ))}
            </div>

            {/* Slide Image */}
            <div className="absolute inset-0">
              <Image
                src={activeStory.slides[activeSlideIndex].image}
                alt={activeStory.slides[activeSlideIndex].headline}
                fill
                className="object-cover transition-opacity duration-500"
                priority
                unoptimized
              />
              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
            </div>

            {/* Slide Content */}
            <div className="absolute inset-x-0 bottom-0 p-8 pb-12 z-[100001] text-white">
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#0C7B8A] uppercase font-bold mb-4 block">
                {activeStory.slides[activeSlideIndex].eyebrow}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
                {activeStory.slides[activeSlideIndex].headline}
              </h3>
              <p className="font-sans text-sm text-white/80 leading-relaxed mb-8">
                {activeStory.slides[activeSlideIndex].text}
              </p>

              {activeStory.slides[activeSlideIndex].ctaLabel && (
                <a
                  href={activeStory.slides[activeSlideIndex].ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C7B8A] text-white font-sans text-xs font-bold tracking-widest uppercase rounded hover:bg-[#0b6b78] transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  {activeStory.slides[activeSlideIndex].ctaLabel}
                  <ChevronRightIcon size={16} />
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

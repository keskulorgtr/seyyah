import HeroSection from "@/components/HeroSection";
import DestinationCards from "@/components/DestinationCards";
import SignatureJourneys from "@/components/SignatureJourneys";
import UpcomingJourneys from "@/components/UpcomingJourneys";
import RealMoments from "@/components/RealMoments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* 1. Hero (includes Navbar, StoryHighlights, Stats) */}
      <HeroSection />

      {/* 2. Our Destinations */}
      <DestinationCards />

      {/* 3. Signature Journeys */}
      <SignatureJourneys />

      {/* 4. Upcoming Journeys */}
      <UpcomingJourneys />

      {/* 5. Real Moments */}
      <RealMoments />

      {/* 6. Footer / Start Your Journey */}
      <Footer />
    </main>
  );
}

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const stories: Story[] = [
  {
    slug: "why-boutique-travel-is-the-future",
    title: "Why Boutique Travel Is the Future",
    excerpt: "Mass tourism is fading. Discover why personalized, small-group journeys are becoming the gold standard for modern travelers.",
    content: `
      <p>The era of 50-person tour buses and crowded generic hotels is slowly coming to an end. Today’s travelers are seeking something far more elusive: <strong>authenticity</strong>.</p>
      
      <h2>The Shift in Values</h2>
      <p>Over the last decade, we've seen a massive shift in what people value when they travel. It’s no longer about checking boxes on a list of monuments. It's about how a place makes you feel. Boutique travel focuses on the micro-experiences: the conversation with a local artisan, the smell of spices in a hidden market, the quiet morning coffee overlooking an untouched landscape.</p>
      
      <h2>Why Go Boutique?</h2>
      <ul>
        <li><strong>Personalization:</strong> Every detail is tailored to your pace and interests.</li>
        <li><strong>Local Impact:</strong> Boutique tours often partner with family-owned riads, local guides, and small businesses, ensuring your money supports the local economy.</li>
        <li><strong>Flexibility:</strong> See something interesting off the path? You have the freedom to stop.</li>
      </ul>
      
      <p>At Seyyah, we’ve built our entire philosophy around this concept. We believe that to truly see a country, you must travel it intimately. The world is too beautiful to be rushed.</p>
    `,
    tag: "Insight",
    date: "May 12, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Elif Yılmaz",
      role: "Lead Curator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    }
  },
  {
    slug: "guide-to-egyptian-cuisine",
    title: "A Guide to Egyptian Cuisine",
    excerpt: "From koshari to ful medames, explore the rich culinary traditions that make Egyptian food unforgettable.",
    content: `
      <p>Egypt's history isn't just in its stones and monuments; it's deeply ingrained in its food. Egyptian cuisine is a rich tapestry of flavors influenced by centuries of history, combining Middle Eastern spices with Mediterranean freshness.</p>
      
      <h2>Must-Try Dishes</h2>
      <p>When you visit Egypt with Seyyah, we ensure you taste the real Egypt, far from generic hotel buffets.</p>
      
      <h3>1. Koshari</h3>
      <p>The ultimate street food. A comforting bowl of lentils, macaroni, rice, and chickpeas, topped with a spicy tomato sauce and crispy fried onions. It sounds chaotic, but it is culinary harmony.</p>
      
      <h3>2. Ful Medames</h3>
      <p>The breakfast of champions. Slow-cooked fava beans seasoned with olive oil, cumin, garlic, and lemon juice, usually served with warm pita bread. It has been eaten in Egypt since the time of the Pharaohs.</p>
      
      <h3>3. Om Ali</h3>
      <p>A traditional dessert that translates to "Ali's Mother". It's a bread pudding made with puff pastry, milk, sugar, vanilla, raisins, coconut flakes, and various nuts.</p>
      
      <p>Food is the fastest way to understand a culture. Join our Egypt tours and let us take you on a culinary journey through the heart of Cairo and beyond.</p>
    `,
    tag: "Culture",
    date: "April 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1539760397268-33f5112f94bb?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Ahmed Hassan",
      role: "Local Expert - Egypt",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    }
  },
  {
    slug: "best-time-to-visit-morocco",
    title: "Best Time to Visit Morocco",
    excerpt: "Planning a trip to the Sahara? Here's our expert guide on seasons, festivals, and the ideal travel windows.",
    content: `
      <p>Morocco is a country of extreme geographical diversity. From the snowy peaks of the Atlas Mountains to the scorching sands of the Sahara and the breezy Atlantic coast, the "best time" to visit depends entirely on what you want to experience.</p>
      
      <h2>Spring (Mid-March to May)</h2>
      <p>This is arguably the best time to visit Morocco. The country is lush and green after the winter rains. The temperatures are comfortably warm in the south and perfect for exploring the medinas of Marrakech and Fes without the oppressive summer heat.</p>
      
      <h2>Autumn (September to November)</h2>
      <p>Another fantastic window. The summer heat begins to fade, making it the perfect time for desert treks and sleeping under the stars in the Sahara.</p>
      
      <h2>What About Summer and Winter?</h2>
      <p><strong>Summer (June-August):</strong> It gets incredibly hot, especially inland. However, this is the perfect time to visit coastal cities like Essaouira or Tangier.</p>
      <p><strong>Winter (December-February):</strong> The days are crisp and sunny, but nights can be freezing, especially in the desert and mountains. It's a great time for crowd-free exploration if you pack warm layers.</p>
    `,
    tag: "Planning",
    date: "March 15, 2026",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1200&auto=format&fit=crop",
    author: {
      name: "Elif Yılmaz",
      role: "Lead Curator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    }
  }
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

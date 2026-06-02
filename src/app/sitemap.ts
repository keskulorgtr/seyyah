import { MetadataRoute } from 'next';
import { stories } from '@/lib/stories';

const baseUrl = 'https://www.seyyah.ch';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/tours', '/gallery', '/stories'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    })
  );

  const tourRoutes = ['egypt', 'switzerland', 'europe', 'morocco', 'tunisia', 'algeria'].map(
    (destination) => ({
      url: `${baseUrl}/tours/${destination}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })
  );

  const storyRoutes = stories.map((story) => ({
    url: `${baseUrl}/stories/${story.slug}`,
    lastModified: new Date(story.date).toISOString(),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));

  return [...routes, ...tourRoutes, ...storyRoutes];
}

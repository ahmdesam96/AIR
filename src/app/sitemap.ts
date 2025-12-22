import { MetadataRoute } from 'next';
import { posts, tools, systems, courses } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://arabic-ai-blog.vercel.app';

    const staticRoutes = [
        '',
        '/about',
        '/blog',
        '/tools',
        '/glossary',
        '/systems',
        '/academy',
        '/pricing',
        '/consultancy',
        '/media-kit',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const systemRoutes = (typeof systems !== 'undefined' ? (systems as any[]) : []).map((system) => ({
        url: `${baseUrl}/systems/${system.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const academyRoutes = (typeof courses !== 'undefined' ? (courses as any[]) : []).map((course) => ({
        url: `${baseUrl}/academy/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes, ...toolRoutes, ...systemRoutes, ...academyRoutes];
}

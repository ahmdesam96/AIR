import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/private/',
                '/admin/',
                '/api/',
                '/checkout/',
                '/*?q=', // Disallow internal search query strings to prevent thin content indexing
            ],
        },
        sitemap: 'https://arabic-ai-blog.vercel.app/sitemap.xml',
    };
}

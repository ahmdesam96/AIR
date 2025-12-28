// Site-wide constants
export const SITE_CONFIG = {
    name: 'ذكاء عملي',
    nameEn: 'Zakaa Amaly',
    logo: '/images/logo.png', // Added logo path
    userCount: '+1,200',
    url: 'https://arabic-ai-blog.vercel.app',
    description: 'منصة عربية تنفيذية تعلمك كيفية تحويل الذكاء الاصطناعي من مجرد أداة للتجربة إلى نظام عملي يوفر لك الإنتاجية، الوقت، والمال.',
    descriptionEn: 'A practical Arabic platform that teaches you how to transform AI from an experimental tool into a working system that saves you productivity, time, and money.',
    author: 'Ahmed Esam',
    twitterHandle: '@zakaa_ai',
    email: 'hello@zakaa.ai',
} as const;

export const SOCIAL_LINKS = {
    twitter: 'https://x.com/zakaa_ai',
    linkedin: 'https://linkedin.com/company/zakaa-ai',
    email: 'mailto:hello@zakaa.ai',
} as const;

export const NAV_ITEMS = [
    { href: '/blog', label: 'المدونة التقنية' },
    { href: '/systems', label: 'الأنظمة الجاهزة' },
    { href: '/tools', label: 'دليل الأدوات' },
    { href: '/consultancy', label: 'استشارات ونماذج', isBold: true },
    { href: '/about', label: 'من نحن' },
] as const;

export const FOOTER_LINKS = [
    ...NAV_ITEMS,
    { href: '/media-kit', label: 'مركز المعلنين (Media Kit)', isBold: true, isPrimary: true },
] as const;

// Categories
export const BLOG_CATEGORIES = ['الكل', 'ذكاء اصطناعي', 'إنتاجية', 'أخبار'] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

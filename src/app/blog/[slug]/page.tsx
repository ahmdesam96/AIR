import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Zap } from "lucide-react";
import { posts, systems } from "@/lib/data";
import { formatDateArabic, toArabicNumerals } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { PremiumGate } from "@/components/ui/PremiumGate";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const post = posts.find((p) => p.slug === decodedSlug);

    if (!post) {
        return { title: 'مقال غير موجود' };
    }

    return {
        title: post.seo.metaTitle,
        description: post.seo.metaDescription,
        keywords: post.seo.keywords,
        openGraph: {
            title: post.seo.metaTitle,
            description: post.seo.metaDescription,
            type: 'article',
            authors: [post.author.name],
        }
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const post = posts.find((p) => p.slug === decodedSlug);

    if (!post) {
        notFound();
    }

    const relatedSystem = post.relatedSystem ? systems.find(s => s.slug === post.relatedSystem) : null;

    // JSON-LD for Google Rich Results
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo.metaDescription,
        image: [post.image],
        datePublished: post.date,
        dateModified: post.date,
        author: [{
            "@type": "Person",
            name: post.author.name,
            jobTitle: post.author.role,
            url: `https://arabic-ai-blog.vercel.app/author/${post.author.name}` // Placeholder
        }],
        publisher: {
            "@type": "Organization",
            "name": "ذكاء عملي",
            "logo": {
                "@type": "ImageObject",
                "url": "https://arabic-ai-blog.vercel.app/logo.png"
            }
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://arabic-ai-blog.vercel.app/blog/${post.slug}`
        }
    };

    return (
        <article className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link href="/blog">
                        <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
                            &rarr; العودة للمدونة
                        </Button>
                    </Link>

                    {/* Meta Row */}
                    <div className="flex flex-wrap gap-3 mb-6 items-center">
                        <Badge variant="primary" className="text-sm px-3 py-1">{post.category}</Badge>
                        {post.isSponsored && (
                            <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 text-primary bg-primary/5 font-bold">
                                محتوى ممول {post.sponsorName && `بواسطة ${post.sponsorName}`}
                            </Badge>
                        )}
                        <span className="flex items-center gap-1 text-sm text-muted-foreground bg-secondary/5 px-2 py-1 rounded-md">
                            ⏱️ {toArabicNumerals(post.readingTime)} قراءة
                        </span>
                        <span className="text-sm text-muted-foreground">• {formatDateArabic(post.date)}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Actionable Result Box */}
                    <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border-r-4 border-primary">
                        <span className="block text-primary font-bold mb-2 text-sm uppercase tracking-wider">النتيجة المتوقعة:</span>
                        <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
                            {post.excerpt}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 p-8 rounded-2xl bg-muted/30 border border-border/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
                        <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={80}
                            height={80}
                            className="rounded-full border-4 border-background shadow-lg shrink-0"
                        />
                        <div className="flex-1 text-center md:text-right">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                <div>
                                    <p className="font-bold text-xl">{post.author.name}</p>
                                    <p className="text-sm text-primary font-medium">{post.author.role}</p>
                                </div>
                                <div className="flex items-center justify-center md:justify-end gap-3">
                                    {post.author.twitter && (
                                        <a href={`https://x.com/${post.author.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background border border-border hover:text-primary transition-colors shadow-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                        </a>
                                    )}
                                    {post.author.linkedin && (
                                        <a href={`https://linkedin.com/in/${post.author.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background border border-border hover:text-primary transition-colors shadow-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {post.author.bio || "خبير متخصص في مجالات التقنية والذكاء الاصطناعي."}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="aspect-video bg-muted rounded-xl w-full relative overflow-hidden mb-12 shadow-2xl ring-1 ring-white/10">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    />
                </div>

                {/* Main Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-3xl prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border">
                    <PremiumGate isPremium={post.isPremium}>
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </PremiumGate>
                </div>

                {/* Article Footer */}
                <div className="mt-16 pt-8 border-t border-border">

                    {/* Related System Promo */}
                    {relatedSystem && (
                        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-secondary/5 to-background border border-border/50 shadow-sm relative overflow-hidden group hover:border-primary/20 transition-all text-right">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4 text-primary font-bold text-sm tracking-wide uppercase">
                                    <Zap className="w-4 h-4 fill-current" />
                                    انتقل للمستوى التالي
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                                    {relatedSystem.title}
                                </h3>
                                <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-xl ml-auto">
                                    {relatedSystem.description}
                                </p>
                                <Link href={`/systems/${relatedSystem.slug}`}>
                                    <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 text-lg h-12 px-8">
                                        استكشف النظام الكامل <ArrowLeft className="w-5 h-5 mr-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    <div className="mb-12">
                        <h3 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider">المواضيع ذات الصلة:</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm bg-secondary/10 hover:bg-secondary/20 cursor-pointer transition-colors">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Fixed CTA */}
                    <ArticleCTA />
                </div>
            </div>
        </article>
    );
}

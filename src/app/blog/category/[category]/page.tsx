import { posts } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/Button";
import { formatDateArabic } from "@/lib/formatters";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

interface Props {
    params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    // Check if category exists
    const categories = Array.from(new Set(posts.map(p => p.category)));
    if (!categories.includes(decodedCategory)) return { title: 'قسم غير موجود' };

    return {
        title: `مقالات ${decodedCategory} | ذكاء عملي`,
        description: `تصفح أحدث المقالات والنصائح في قسم ${decodedCategory} على منصة ذكاء عملي.`,
    };
}

export async function generateStaticParams() {
    const categories = Array.from(new Set(posts.map(p => p.category)));
    return categories.map(category => ({
        category: encodeURIComponent(category),
    }));
}

export default async function CategoryPage({ params }: Props) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);

    const filteredPosts = posts.filter(p => p.category === decodedCategory);

    if (filteredPosts.length === 0) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 text-right" dir="rtl">
            <div className="max-w-6xl mx-auto">
                <Link href="/blog" className="inline-flex items-center text-primary font-bold mb-8 hover:underline gap-2">
                    <ArrowLeft className="w-5 h-5" />
                    العودة لكل المقالات
                </Link>

                <header className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        قسم <span className="text-gradient-gold">{decodedCategory}</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        مجموعة من أفضل المقالات والشروحات العملية المتخصصة في {decodedCategory}.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group h-full block">
                            <SpotlightCard className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-white/10 dark:border-white/5 overflow-hidden">
                                <div className="aspect-video bg-muted w-full relative overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <CardHeader className="pt-4 pb-2">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                                        <span>{formatDateArabic(post.date)}</span>
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <span>{post.readingTime} قراءة</span>
                                    </div>
                                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                </CardHeader>
                                <CardContent className="flex-1 pb-4 text-sm text-muted-foreground line-clamp-3">
                                    {post.excerpt}
                                </CardContent>
                                <CardFooter className="border-t border-border/50 pt-4 mt-auto flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                            <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                                        </div>
                                        <span className="text-xs text-muted-foreground">{post.author.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-primary font-bold p-0 h-auto">
                                        اقرأ المزيد &larr;
                                    </Button>
                                </CardFooter>
                            </SpotlightCard>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

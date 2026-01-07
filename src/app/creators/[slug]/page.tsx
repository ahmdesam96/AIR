import { Metadata } from "next";
import { creators } from "@/lib/data/creators";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Youtube, Twitter, Linkedin, Globe, Mail, ExternalLink, ArrowRight, Check, X, Calendar } from "lucide-react";
import { Creator, PlatformType } from "@/lib/types/creators";

interface PageProps {
    params: { slug: string };
}

// Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const creator = creators.find((c) => c.slug === params.slug);
    if (!creator) return { title: "صانع محتوى غير موجود" };

    return {
        title: `${creator.name.ar} | دليل صُنّاع المحتوى`,
        description: creator.bio,
    };
}

// Generate Static Params
export async function generateStaticParams() {
    return creators.map((creator) => ({
        slug: creator.slug,
    }));
}

const PlatformIcons: Record<string, any> = {
    youtube: Youtube,
    x: Twitter,
    linkedin: Linkedin,
    blog: Globe,
    newsletter: Mail,
};

const CategoryIcons: Record<string, string> = {
    education: "🎓",
    reviews: "⭐",
    business: "💼",
    programming: "💻",
    design: "🎨",
    news: "📰",
};

export default function CreatorDetailPage({ params }: PageProps) {
    const creator = creators.find((c) => c.slug === params.slug);

    if (!creator) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-8">
                <Link href="/creators" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
                    <ArrowRight className="w-4 h-4 ml-2" />
                    العودة للدليل
                </Link>
            </div>

            {/* Hero Header */}
            <div className="container mx-auto px-4 mb-16">
                <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-blue-500" />

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 border-4 border-background shadow-xl flex items-center justify-center text-4xl overflow-hidden">
                                {creator.image ? (
                                    <img src={creator.image} alt={creator.name.ar} className="w-full h-full object-cover" />
                                ) : (
                                    <span>{CategoryIcons[creator.category] || "👤"}</span>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-2 border border-border shadow-md">
                                {creator.platforms[0] && (() => {
                                    const I = PlatformIcons[creator.platforms[0].type];
                                    return I ? <I className="w-5 h-5 text-primary" /> : null;
                                })()}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl md:text-5xl font-black tracking-tight">{creator.name.ar}</h1>
                                {creator.name.en && <span className="text-xl text-muted-foreground font-medium">({creator.name.en})</span>}
                                {creator.badge === "featured" && (
                                    <Badge variant="secondary" className="text-sm bg-amber-500/10 text-amber-600 border-amber-500/20 px-3 py-1">
                                        مميز 🌟
                                    </Badge>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-2 text-sm">
                                <Badge variant="outline" className="h-7 px-3 text-base">{creator.category}</Badge>
                                <span className="flex items-center text-muted-foreground px-2">
                                    <span className="ml-2">📍</span> {creator.location?.country || "غير محدد"}
                                </span>
                                <span className="flex items-center text-muted-foreground px-2 border-r border-border/50 mr-2 pr-4">
                                    مستوى المحتوى: {creator.level === "beginner" ? "مبتدؤ" : creator.level === "intermediate" ? "متوسط" : "متقدم"}
                                </span>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                {creator.bio}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 w-full md:w-auto mt-4 md:mt-0">
                            {creator.platforms.map((p) => {
                                const Icon = PlatformIcons[p.type] || ExternalLink;
                                return (
                                    <Link key={p.type} href={p.url} target="_blank">
                                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl hover:text-primary hover:border-primary/50 transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Main Content) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Top Works */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-1 h-8 bg-primary rounded-full" />
                                أبرز الأعمال
                            </h2>
                            <div className="grid gap-4">
                                {creator.topWorks.map((work, idx) => (
                                    <Link key={idx} href={work.url} target="_blank" className="block group">
                                        <div className="bg-card border border-border rounded-xl p-5 flex items-center justify-between hover:border-primary/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                                    {work.type === "video" ? "📺" : work.type === "article" ? "📄" : "🧵"}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{work.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {work.type === "video" ? "فيديو" : work.type === "article" ? "مقال" : "سلسلة تغريدات"}
                                                    </p>
                                                </div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        {/* Detailed Analysis (Mocked for now based on 'bestFor') */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                                    <Check className="w-5 h-5" />
                                    مثالي لـ
                                </h3>
                                <ul className="space-y-3">
                                    {creator.bestFor.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {creator.notSuitableFor && creator.notSuitableFor.length > 0 && (
                                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
                                    <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                                        <X className="w-5 h-5" />
                                        قد لا يناسب
                                    </h3>
                                    <ul className="space-y-3">
                                        {creator.notSuitableFor.map((item) => (
                                            <li key={item} className="flex items-start gap-2 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                            <h3 className="font-bold mb-4 text-lg">معلومات إضافية</h3>
                            <div className="space-y-4 divide-y divide-border/50">
                                <div className="flex justify-between py-2">
                                    <span className="text-muted-foreground">تاريخ آخر تحديث</span>
                                    <span className="font-medium flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {creator.updatedAt}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-muted-foreground">اللغة الأساسية</span>
                                    <span className="font-medium">
                                        {creator.language === "ar" ? "العربية 🇸🇦" : creator.language === "en" ? "الإنجليزية 🇺🇸" : "مختلط 🌍"}
                                    </span>
                                </div>
                                <div className="pt-4">
                                    <p className="text-xs text-muted-foreground mb-2">المنصات النشطة</p>
                                    <div className="flex flex-wrap gap-2">
                                        {creator.platforms.map(p => (
                                            <Badge key={p.type} variant="secondary" className="text-xs">
                                                {p.type} {p.followers && `(${p.followers})`}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

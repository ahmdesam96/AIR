import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Zap } from "lucide-react";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { systems } from "@/lib/data";
import { Metadata } from "next";
import { CopyButton } from "@/components/ui/CopyButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const system = systems.find(s => s.slug === decodedSlug);
    if (!system) return {};

    return {
        title: `${system.title} | ذكاء`,
        description: system.description,
    };
}

export function generateStaticParams() {
    return systems.map(system => ({
        slug: system.slug,
    }));
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const system = systems.find(s => s.slug === decodedSlug);

    if (!system) notFound();

    // JSON-LD for System
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: system.title,
        description: system.description,
        image: system.image,
        step: system.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            itemListElement: [{
                "@type": "HowToDirection",
                text: step.description
            }]
        })),
        totalTime: "PT30M", // From system stats if available
        publisher: {
            "@type": "Organization",
            "name": "ذكاء عملي",
            "logo": {
                "@type": "ImageObject",
                "url": "https://arabic-ai-blog.vercel.app/logo.png"
            }
        }
    };

    return (
        <div className="min-h-screen bg-background text-right" dir="rtl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Hero Header */}
            <header className="relative pt-32 pb-20 px-4 overflow-hidden bg-secondary/5 border-b border-border">
                <div className="absolute inset-0 bg-system-grid opacity-30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                <div className="container mx-auto max-w-5xl relative z-10">
                    <Link href="/systems">
                        <Button variant="ghost" size="sm" className="mb-6 hover:bg-background/50 gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            العودة للأنظمة
                        </Button>
                    </Link>

                    <CopyButton
                        text={`${system.title}\n\n${system.description}`}
                        label="نسخ فكرة النظام"
                        variant="secondary"
                        className="mb-6 mr-4 font-bold"
                    />

                    <div className="flex flex-wrap gap-3 mb-6">
                        <Badge variant="outline" className="bg-background/50 backdrop-blur border-primary/20 text-primary gap-1">
                            <Zap className="w-3 h-3 fill-current" />
                            نظام جاهز
                        </Badge>
                        <Badge variant="secondary" className="bg-background/50">{system.toolsUsed.length} أدوات</Badge>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        {system.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
                        {system.subtitle}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
                        {system.stats.map((stat, i) => (
                            <div key={i} className="p-4 rounded-xl bg-background border border-border shadow-sm">
                                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                                <div className="font-bold text-lg text-primary">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Problem / Result Split */}
            <section className="py-20 container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10">
                        <h3 className="text-2xl font-bold text-red-600 mb-4">المشكلة</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {system.problem}
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/10 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-green-500/10 rounded-br-full -ml-4 -mt-4" />
                        <h3 className="text-2xl font-bold text-green-600 mb-4">النتيجة</h3>
                        <p className="text-foreground leading-relaxed text-lg mb-4">
                            {system.result}
                        </p>
                    </div>
                </div>
            </section>

            {/* Implementation Steps */}
            <section className="py-20 bg-secondary/5 border-y border-border/50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl font-bold mb-12 text-center">كيف يعمل النظام؟</h2>
                    <div className="space-y-12 relative before:absolute before:right-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-border/50 h-full">
                        {system.steps.map((step, i) => (
                            <div key={i} className="relative flex gap-8">
                                <div className="flex-none w-16 h-16 rounded-2xl bg-background border border-border shadow-sm flex items-center justify-center font-bold text-2xl text-primary z-10 relative">
                                    {i + 1}
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold">{step.title}</h3>
                                        {step.tool && (
                                            <Badge variant="outline" className="text-xs font-normal opacity-70">
                                                {step.tool}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <div className="container mx-auto px-4 max-w-4xl py-20">
                <ArticleCTA />
            </div>

        </div>
    );
}

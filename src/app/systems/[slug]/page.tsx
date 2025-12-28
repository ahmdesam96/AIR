import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Zap } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { ArticleCTA } from "@/components/blog/ArticleCTA";
import { systems } from "@/lib/data";
import { Metadata } from "next";
import { CopyButton } from "@/components/ui/CopyButton";
import { SystemSuccessMetrics } from "@/components/systems/SystemSuccessMetrics";
import { TemplateLibrary } from "@/components/systems/TemplateLibrary";
import { SystemLessons } from "@/components/systems/SystemLessons";
import { VisualComparison } from "@/components/systems/VisualComparison";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { MidPageCTA } from "@/components/ui/MidPageCTA";

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
                        <TrustBadge />
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

            {/* Problem / Result Split (Using VisualComparison) */}
            <section className="py-20 container mx-auto px-4 max-w-5xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">لماذا تحتاج هذا النظام؟</h2>
                    <p className="text-muted-foreground">الفرق بين الطريقة التقليدية والنظام المؤتمت</p>
                </div>

                <VisualComparison
                    before={{
                        title: "الطريقة التقليدية (المشكلة)",
                        description: system.problem,
                        stats: [
                            { label: "الجهد", value: "يدوي ومرهق" },
                            { label: "المخاطرة", value: "خطأ بشري وارد" }
                        ]
                    }}
                    after={{
                        title: "مع نظام ذكاء (النتيجة)",
                        description: system.result,
                        stats: [
                            { label: "الجهد", value: "آلي بالكامل" },
                            { label: "الدقة", value: "100%" }
                        ]
                    }}
                />

                {/* Success Metrics (Phase 4) */}
                {system.valueIdentity && (
                    <div className="mt-16">
                        <SystemSuccessMetrics valueIdentity={system.valueIdentity} />
                    </div>
                )}
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

                    {/* Templates & Lessons (Phase 4) */}
                    {system.templates && (
                        <TemplateLibrary templates={system.templates} />
                    )}
                    {system.lessons && (
                        <SystemLessons lessons={system.lessons} />
                    )}
                </div>
            </section>

            {/* Mid-Page Sticky CTA */}
            <MidPageCTA />

            {/* Social Proof (Phase 4) */}
            {system.socialProof && (
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">نتائج المشتركين وشهاداتهم</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {system.socialProof.testimonials.map((t, i) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-card border border-border relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
                                    <p className="text-lg text-muted-foreground mb-8 relative z-10">&quot;{t.content}&quot;</p>
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-secondary/20 border border-border overflow-hidden">
                                            {t.avatar ? (
                                                <OptimizedImage
                                                    config={{
                                                        src: t.avatar,
                                                        alt: t.user,
                                                        category: "testimonials",
                                                        width: 48,
                                                        height: 48
                                                    }}
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xl">👤</div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold">{t.user}</div>
                                            <div className="text-sm text-muted-foreground">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <div className="container mx-auto px-4 max-w-4xl py-20">
                <ArticleCTA />
            </div>

        </div>
    );
}

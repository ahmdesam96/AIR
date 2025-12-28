import { tools } from "@/lib/data";
import { notFound } from "next/navigation";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Globe } from "lucide-react";
import { RichContent } from "@/components/RichContent";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const tool = tools.find((t) => t.slug === decodedSlug);
    if (!tool) return { title: 'أداة غير موجودة' };

    return {
        title: `${tool.name} | أفضل أدوات الذكاء الاصطناعي`,
        description: tool.description,
        openGraph: {
            title: tool.name,
            description: tool.description,
            images: [tool.image],
        },
    };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const tool = tools.find((t) => t.slug === decodedSlug);

    if (!tool) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": tool.category,
        "operatingSystem": "Web",
        "url": tool.link,
        "image": tool.image,
        "publisher": {
            "@type": "Organization",
            "name": "ذكاء عملي"
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 text-right" dir="rtl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 max-w-4xl">
                <Link
                    href="/tools"
                    className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group"
                >
                    <ArrowLeft className="ml-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    عودة للأدوات
                </Link>

                <div
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden"
                >
                    <div className="relative h-64 md:h-80 w-full bg-gradient-to-b from-primary/5 to-transparent">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-40 h-40 md:w-56 md:h-56 bg-background rounded-2xl shadow-2xl p-4 flex items-center justify-center">
                                <OptimizedImage
                                    config={{
                                        src: tool.image,
                                        alt: tool.name,
                                        category: "tools", // Assuming 'tools' category exists or mapping to generic if not
                                        width: 224, // 56 * 4
                                        height: 224
                                    }}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Badge variant="secondary" className="text-sm">{tool.category}</Badge>
                                {tool.featured && <Badge variant="secondary">مميز</Badge>}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{tool.name}</h1>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                {tool.description}
                            </p>
                        </div>

                        {tool.content && (
                            <div className="prose prose-lg dark:prose-invert mx-auto mb-12 text-right">
                                <RichContent content={tool.content} />
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Link href={tool.link} target="_blank">
                                <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20">
                                    <Globe className="ml-2 w-5 h-5" />
                                    زيارة الموقع الرسمي
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

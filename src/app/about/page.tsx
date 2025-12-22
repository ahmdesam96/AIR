import { Metadata } from "next";

export const metadata: Metadata = {
    title: "من نحن | ذكاء عملي",
    description: "تعرف على الفريق وراء منصة ذكاء عملي، ورسالتنا في تمكين رواد الأعمال العرب باستخدام أدوات الذكاء الاصطناعي.",
};

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { authors } from "@/lib/data";

export default function AboutPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "ذكاء عملي",
            "url": "https://arabic-ai-blog.vercel.app",
            "logo": "https://arabic-ai-blog.vercel.app/logo.png",
            "sameAs": [
                "https://x.com/zakaa_ai",
                "https://linkedin.com/company/zakaa-ai"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "email": "hello@zakaa.ai",
                "contactType": "customer support"
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 text-right" dir="rtl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-foreground">
                    من نحن
                </h1>

                <div className="prose prose-lg dark:prose-invert mx-auto mb-12 text-muted-foreground">
                    <p className="mb-6 text-xl leading-relaxed">
                        نحن منصة متخصصة في تبسيط تقنيات الذكاء الاصطناعي لرواد الأعمال الشباب في العالم العربي.
                        هدفنا هو سد الفجوة بين التكنولوجيا المعقدة والتطبيق العملي في مجال الأعمال.
                    </p>
                    <p className="mb-6">
                        نؤمن بأن الذكاء الاصطناعي ليس مجرد &quot;تريند&quot;، بل هو أداة ولادة لفرص جديدة ومساحة لزيادة الإنتاجية بشكل غير مسبوق.
                        من خلال مقالاتنا وأدواتنا، نسعى لتمكين الجيل القادم من المبتكرين العرب.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {[
                        { title: "رؤيتنا", desc: "تمكين كل رائد أعمال عربي بأدوات المستقبل." },
                        { title: "مهمتنا", desc: "تبسيط المعرفة التقنية وجعلها قابلة للتنفيذ." },
                        { title: "قيمنا", desc: "المصداقية، البساطة، والجودة." }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-bold mb-2 text-primary">{item.title}</h3>
                            <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center">فريق العمل</h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {Object.values(authors).map((author) => (
                            <div key={author.name} className="flex flex-col items-center gap-3">
                                <div className="p-1 rounded-full border-2 border-primary/20">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted">
                                        <Image
                                            src={author.avatar}
                                            alt={author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold">{author.name}</h4>
                                    <p className="text-xs text-muted-foreground">{author.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/10 text-center">
                    <h2 className="text-3xl font-bold mb-4">هل لديك استفسار؟</h2>
                    <p className="text-muted-foreground mb-8 text-lg">
                        يسعدنا دائماً سماع آرائكم ومقترحاتكم. تواصل معنا في أي وقت عبر البريد الإلكتروني:{" "}
                        <a href="mailto:hello@zakaa.ai" className="text-primary font-bold hover:underline">hello@zakaa.ai</a>
                    </p>
                    <a href="mailto:hello@zakaa.ai">
                        <Button size="lg" className="shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                            تواصل معنا مباشرة
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}

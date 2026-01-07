import { Metadata } from "next";
import { creators } from "@/lib/data/creators";
import { CreatorsBrowser } from "@/components/creators/CreatorsBrowser";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "دليل صُنّاع المحتوى | أثير",
    description: "دليلك الشامل لأفضل صُنّاع المحتوى العرب في مجال الذكاء الاصطناعي. تعلم من الخبراء في البرمجة، التصميم، الأعمال، والمزيد.",
};

export default function CreatorsPage() {
    return (
        <div className="min-h-screen bg-background pb-20">

            {/* Hero Section */}
            <section className="relative border-b border-border/50 bg-card overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

                <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        دليل <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">صُنّاع المحتوى</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        اكتشف نخبة الخبراء العرب في الذكاء الاصطناعي. تعلم من تجاربهم، تابع شروحاتهم، وابدأ رحلتك مع أفضل المصادر الموثوقة.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="#directory">
                            <Button size="lg" className="h-12 px-8 rounded-full text-lg">
                                تصفح الدليل
                            </Button>
                        </Link>
                        <Link href="/contact"> {/* Placeholder for nomination form */}
                            <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-lg gap-2">
                                <PlusCircle className="w-5 h-5" />
                                رشح صانع محتوى
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Directory Section */}
            <div id="directory" className="container mx-auto px-4 py-12">
                <CreatorsBrowser initialCreators={creators} />
            </div>

        </div>
    );
}

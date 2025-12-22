import { Metadata } from "next";
import { tools } from "@/lib/data";
import ToolsBrowser from "@/components/tools/ToolsBrowser";

export const metadata: Metadata = {
    title: 'الأدوات',
    description: 'دليل شامل لأفضل أدوات الذكاء الاصطناعي لزيادة الإنتاجية.',
};

export default function ToolsPage() {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    أدوات <span className="text-gradient-gold">الذكاء الاصطناعي</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                    دليلك الشامل لأفضل الأدوات التي تساعدك على زيادة الإنتاجية وتحسين جودة العمل.
                </p>
                <ToolsBrowser initialTools={tools} />
            </div>
        </div>
    );
}

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const ArticleCTA = () => {
    return (
        <div className="my-12 p-8 rounded-2xl bg-primary text-primary-foreground text-center relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-black">
                    جاهز لتطبيق ما تعلمته؟
                </h3>
                <p className="text-lg text-black/80 mb-6 max-w-xl mx-auto">
                    لا تكتفِ بالقراءة. احصل على أنظمة جاهزة توفر عليك 10 ساعات أسبوعياً.
                </p>
                <Link href="/resources/10-hour-guide">
                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full sm:w-auto font-bold text-lg bg-black text-white hover:bg-black/80 border-none shadow-xl"
                    >
                        حمّل الدليل المجاني الآن
                    </Button>
                </Link>
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black rounded-full blur-3xl"></div>
            </div>
        </div>
    );
};

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <div className="relative mb-8">
                <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-6xl">🔍</span>
                </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">الصفحة غير موجودة</h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
                عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون انتقلت أو حذفت.
            </p>

            <Link href="/">
                <Button size="lg" className="h-12 px-8">
                    العودة للرئيسية
                </Button>
            </Link>
        </div>
    );
}

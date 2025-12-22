"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Mail, CheckCircle2 } from "lucide-react";

interface NewsletterSignupProps {
    variant?: "default" | "compact";
}

export function NewsletterSignup({ variant = "default" }: NewsletterSignupProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setLoading(false);
        setSuccess(true);
        toast.success("تم الاشتراك بنجاح! تفقد بريدك قريباً.");
        setEmail("");
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-green-500/10 border border-green-500/20 rounded-3xl text-center animate-in fade-in zoom-in duration-500" role="alert" aria-live="polite">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">تم اشتراكك بيقين!</h3>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                    ستصلك أول رسالة يوم الخميس القادم. <br />
                    <span className="text-primary font-bold">تأكد من فحص البريد العشوائي (Spam) وتفعيل الرسائل.</span>
                </p>
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-10 px-3 bg-secondary/10 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
                    required
                />
                <Button size="sm" type="submit" disabled={loading}>
                    {loading ? "جاري..." : "اشترك"}
                </Button>
            </form>
        );
    }

    return (
        <div className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
                    <Mail className="w-6 h-6" />
                </div>

                <h2 className="text-3xl font-bold">ملخص الذكاء الاصطناعي الأسبوعي</h2>
                <p className="text-lg text-muted-foreground">
                    انضم لـ +5,000 مهتم واحصل على أقوى 5 أدوات ذكاء اصطناعي يمكن تطبيقها فوراً في عملك كل يوم خميس.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-14 px-6 bg-secondary/5 border border-border rounded-xl text-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        required
                    />
                    <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
                        {loading ? "جاري الحفظ..." : "انضم الآن مجاناً"}
                    </Button>
                </form>

                <p className="text-xs text-muted-foreground">
                    * نعدك بالفائدة فقط. لا سبام، ولا إزعاج. يمكنك إلغاء الاشتراك في أي وقت.
                </p>
            </div>
        </div>
    );
}

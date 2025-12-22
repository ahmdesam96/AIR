"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function LeadMagnetPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulating processing
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            toast.success("شكراً لك! الدليل متاح للتحميل الآن.");
        }, 1000);
    };

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
            <div className="max-w-2xl w-full bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                <div className="text-center mb-10">
                    <span className="text-primary font-bold tracking-wider text-sm uppercase mb-4 block">دليل مجاني للتنفيذ السريع</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        10 استخدامات للذكاء الاصطناعي توفر<br />
                        <span className="text-gradient-gold">10 ساعات أسبوعيًا</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        ملف PDF بسيط (5 صفحات). تفتحه، تطبق ما فيه، وتوفر الوقت. بهذه البساطة.
                    </p>
                </div>

                {!success ? (
                    <>
                        <div className="space-y-6 mb-10">
                            {[
                                "حالات استخدام عملية وليست مجرد نظريات",
                                "أسماء الأدوات والخطوات بالترتيب",
                                "الناتج المتوقع من كل خطوة",
                                "أخطاء شائعة قد تقع فيها أثناء التطبيق"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="bg-green-500/10 p-1 rounded-full text-green-500">
                                        <Check className="w-5 h-5" />
                                    </div>
                                    <span className="text-lg font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-sm font-bold mb-2 block">البريد الإلكتروني الشخصي (لإرسال الدليل إليك)</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 px-4 bg-secondary/5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <Button size="lg" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20" disabled={loading}>
                                {loading ? "جاري المعالجة..." : "أرسل لي الدليل الآن"}
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                * يصلك فوراً. لا نرسل رسائل مزعجة.
                            </p>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center space-y-6 bg-green-500/5 rounded-2xl border border-green-500/10 animate-in fade-in zoom-in duration-300">
                        <CheckCircle2 className="w-20 h-20 text-green-500 mb-2" />
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold">الدليل جاهز للتحميل!</h2>
                            <p className="text-muted-foreground">اضغط على الزر أدناه لبدء التحميل مباشرة.</p>
                        </div>
                        <a href="/resources/10-hour-guide.pdf" download className="w-full max-w-sm">
                            <Button size="lg" className="w-full h-16 text-xl font-bold shadow-xl shadow-green-500/20 bg-green-600 hover:bg-green-700 border-none gap-3">
                                <Download className="w-6 h-6" /> تحميل الدليل (PDF)
                            </Button>
                        </a>
                        <button onClick={() => setSuccess(false)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            إعادة المحاولة ببريد آخر؟
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

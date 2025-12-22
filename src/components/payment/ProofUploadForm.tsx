"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Upload, AlertCircle } from "lucide-react";

export function ProofUploadForm() {
    const [status, setStatus] = useState<"idle" | "uploading" | "success">("idle");
    const [transactionId, setTransactionId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!transactionId) return;

        setStatus("uploading");
        setTimeout(() => setStatus("success"), 1500);
    };

    if (status === "success") {
        return (
            <div className="text-center p-8 bg-green-50 rounded-3xl border-2 border-green-200 space-y-4 animate-in fade-in zoom-in duration-500">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-green-800">تم استلام طلبك!</h3>
                <p className="text-green-700 leading-relaxed">
                    نقوم الآن بمراجعة عملية التحويل. ستصلك رسالة تفعيل على بريدك الإلكتروني خلال أقل من ساعتين.
                </p>
                <Button variant="outline" className="mt-4 border-green-300 text-green-700 hover:bg-green-100" onClick={() => window.location.href = "/"}>
                    العودة للرئيسية
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-bold text-muted-foreground block text-right">رقم المعاملة / رقم المحفظة المحول منها</label>
                <input
                    required
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="مثال: 010XXXXXXXX أو رقم العملية"
                    className="w-full h-14 px-6 rounded-2xl bg-muted border-2 border-transparent focus:border-primary focus:bg-background transition-all text-left font-mono"
                />
            </div>

            <div className="p-8 border-2 border-dashed border-border rounded-2xl text-center space-y-3 group hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                </div>
                <div>
                    <p className="font-bold">ارفع صورة التحويل (اختياري)</p>
                    <p className="text-sm text-muted-foreground">سكرين شوت يساعد في سرعة التفعيل</p>
                </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-xl flex items-start gap-3 text-xs text-primary leading-relaxed border border-primary/10">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-right">يتم تفعيل الحساب يدوياً بعد التأكد من وصول المبلغ. إذا واجهت أي مشكلة تواصل معنا عبر واتساب مباشرة.</p>
            </div>

            <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-xl font-bold shadow-xl shadow-primary/20"
                disabled={status === "uploading" || !transactionId}
            >
                {status === "uploading" ? "جاري الإرسال..." : "تأكيد الدفع والتفعيل"}
            </Button>
        </form>
    );
}

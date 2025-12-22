"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Lock, Crown, Check } from "lucide-react";
import Link from "next/link";

interface PremiumGateProps {
    children: React.ReactNode;
    isPremium?: boolean;
}

export const PremiumGate = ({ children, isPremium }: PremiumGateProps) => {
    if (!isPremium) {
        return <>{children}</>;
    }

    return (
        <div className="relative">
            {/* Blurred Content Preview */}
            <div className="select-none pointer-events-none blur-[6px] opacity-40">
                {children}
            </div>

            {/* Locked Overlay */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
                <div className="max-w-md w-full bg-card border-2 border-primary rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-500">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />

                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3 flex items-center justify-center gap-2">
                        هذا المحتوى <span className="text-primary italic">حصري</span>
                        <Crown className="w-6 h-6 text-primary fill-primary" />
                    </h3>

                    <p className="text-muted-foreground mb-8 leading-relaxed">
                        أنت تحاول الوصول إلى نظام عملي متقدم مخصص لأعضاء &quot;ذكاء PRO&quot;. اشترك الآن للوصول الكامل.
                    </p>

                    <div className="space-y-4 mb-8 text-right">
                        {[
                            "وصول كامل لكل المقالات والأنظمة",
                            "تحميل قوالب العمل الجاهزة",
                            "خصم 20% على الدورات والاستشارات",
                            "أولوية الوصول للميزات الجديدة"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-medium">
                                <Check className="w-4 h-4 text-primary" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/pricing">
                            <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20">
                                انضم للـ PRO الآن
                            </Button>
                        </Link>
                        <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            لديك حساب بالفعل؟ سجل دخولك
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

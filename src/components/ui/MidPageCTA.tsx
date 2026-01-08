"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export const MidPageCTA = () => {
    return (
        <section className="py-12 my-12 relative z-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm max-w-4xl mx-auto"
            >
                <div className="inline-block p-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                    🎁 هدية مجانية
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    تريد تطبيق هذا النظام ولكن لا تملك الوقت؟
                </h3>

                <div className="relative w-full max-w-sm mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                    <img
                        src="/AIR/images/guide-promo.png"
                        alt="دليل ذكاء عملي الجديد"
                        className="w-full h-auto object-cover"
                    />
                </div>

                <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                    احصل على دليل "الـ 10 ساعات" المجاني، يحتوي على قوالب جاهزة (Copy-Paste) لتطبيق هذا النظام وأنظمة أخرى في دقائق.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Link href="/resources/10-hour-guide" className="w-full">
                        <Button className="w-full text-lg font-bold shadow-xl shadow-primary/20" size="lg">
                            تحميل الدليل مجاناً
                        </Button>
                    </Link>
                </div>
                <p className="text-xs text-muted-foreground mt-4 opacity-70">
                    +1,200 مشترك قاموا بتحميل الدليل واستفادوا منه.
                </p>
            </motion.div>
        </section>
    );
};

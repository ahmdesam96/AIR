"use client";

import { CheckCircle2, ArrowRightLeft, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface SuccessMetricsProps {
    valueIdentity: {
        promise7Days: string;
        roiIndicators: string[];
        beforeAfter: {
            before: string;
            after: string;
        }[];
    };
}

export function SystemSuccessMetrics({ valueIdentity }: SuccessMetricsProps) {
    return (
        <section className="space-y-12 my-16">
            {/* 7-Day Promise Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="bg-card border border-primary/20 rounded-[2.5rem] p-8 md:p-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Clock className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">ماذا أحقق لك خلال 7 أيام؟</h3>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {valueIdentity.promise7Days}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ROI Indicators */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-[2.5rem] p-8"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-500" />
                        </div>
                        <h4 className="text-xl font-bold">مؤشرات النجاح (ROI)</h4>
                    </div>
                    <ul className="space-y-4">
                        {valueIdentity.roiIndicators.map((indicator, index) => (
                            <li key={index} className="flex items-center gap-3 text-lg text-muted-foreground">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                {indicator}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Before / After */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-[2.5rem] p-8"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <ArrowRightLeft className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold">نتائج حقيقية (قبل / بعد)</h4>
                    </div>
                    <div className="space-y-6">
                        {valueIdentity.beforeAfter.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                                    <span className="text-xs font-bold text-red-500 block mb-1">قبل النظام</span>
                                    <p className="text-sm text-muted-foreground">{item.before}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                                    <span className="text-xs font-bold text-green-500 block mb-1">بعد النظام</span>
                                    <p className="text-sm text-muted-foreground">{item.after}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

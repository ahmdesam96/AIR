"use client";

import Link from "next/link";
import { systems } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { toast } from "sonner";

export default function SystemsPage() {
    return (
        <div className="min-h-screen bg-background text-right" dir="rtl">
            {/* Header */}
            <div className="relative pt-32 pb-20 px-4 overflow-hidden bg-secondary/5 border-b border-border">
                <div className="absolute inset-0 bg-system-grid opacity-30 pointer-events-none" />
                <div className="container mx-auto max-w-6xl relative z-10 text-center">
                    <Badge variant="outline" className="mb-6 bg-background/50 backdrop-blur border-primary/20 text-primary gap-1 mx-auto">
                        <Zap className="w-3 h-3 fill-current" />
                        أنظمة الإنتاجية
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        أنظمة عمل جاهزة <br />
                        <span className="text-gradient-gold">للنسخ واللصق</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        لا تبدأ من الصفر. اختر النظام المناسب لهدفك، انسخ الخطوات، وابدأ بتوفير الوقت فوراً.
                    </p>
                </div>
            </div>

            {/* Systems Grid */}
            <div className="container mx-auto px-4 py-20 max-w-6xl">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {systems.map((system) => (
                        <div key={system.id} className="group relative flex flex-col h-full bg-card rounded-[2.5rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">

                            {/* Image & Badges */}
                            <div className="relative h-72 w-full overflow-hidden bg-secondary/10">
                                {system.image ? (
                                    <Image
                                        src={system.image}
                                        alt={system.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20">
                                        <Zap className="w-24 h-24" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />

                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Badge className="bg-primary text-primary-foreground font-bold rounded-full px-3 py-1">
                                        آخر تحديث: {new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' })}
                                    </Badge>
                                </div>

                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <Badge variant="secondary" className="backdrop-blur-md bg-white/10 border border-white/20 text-white font-bold rounded-full">
                                        {system.toolsUsed.length} أدوات عمل
                                    </Badge>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-10 flex flex-col flex-1">
                                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                    {system.title}
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8 line-clamp-3">
                                    {system.description}
                                </p>

                                {/* Stats Bar */}
                                <div className="flex items-center gap-8 mb-8 pb-8 border-b border-border/50">
                                    {system.stats.slice(0, 2).map((stat, i) => (
                                        <div key={i}>
                                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                                            <div className="text-xl font-black text-foreground">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <Link href={`/systems/${system.slug}`} className="flex-1">
                                        <Button className="w-full h-14 text-lg font-bold rounded-2xl">
                                            عرض الخطوات
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="h-14 px-8 font-bold border-2 rounded-2xl hover:bg-primary/5"
                                        onClick={() => {
                                            navigator.clipboard.writeText(`System: ${system.title}\nDescription: ${system.description}`);
                                            toast.success("تم نسخ ملخص النظام!");
                                        }}
                                    >
                                        نسخ النظام
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

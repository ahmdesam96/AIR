"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { systems } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Search, Zap, SlidersHorizontal, Clock, Target, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const goals = [
    { id: "all", label: "الكل" },
    { id: "writing", label: "كتابة" },
    { id: "management", label: "إدارة" },
    { id: "analysis", label: "تحليل" },
    { id: "automation", label: "أتمتة" },
];

const levels = [
    { id: "all", label: "كل المستويات" },
    { id: "beginner", label: "مبتدئ" },
    { id: "intermediate", label: "متوسط" },
    { id: "advanced", label: "متقدم" },
];

const synonyms: Record<string, string[]> = {
    "automation": ["أتمتة", "تلقائي", "آلي", "ربط"],
    "writing": ["كتابة", "محتوى", "تدوين", "صناعة"],
    "management": ["إدارة", "تنظيم", "ترتيب", "تخطيط"],
    "analysis": ["تحليل", "بيانات", "استخراج", "دراسة"],
};

export default function SystemsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGoal, setSelectedGoal] = useState("all");
    const [selectedLevel, setSelectedLevel] = useState("all");

    const filteredSystems = useMemo(() => {
        return systems.filter((system) => {
            const query = searchQuery.toLowerCase();
            const goalMatch = selectedGoal === "all" || system.filterMetadata?.goal === selectedGoal;
            const levelMatch = selectedLevel === "all" || system.filterMetadata?.level === selectedLevel;

            // Smart search with synonyms
            const content = `${system.title} ${system.description} ${system.subtitle}`.toLowerCase();
            let searchMatch = content.includes(query);

            if (!searchMatch) {
                // Check synonyms
                for (const [key, list] of Object.entries(synonyms)) {
                    if (query === key || list.some(s => s.includes(query) || query.includes(s))) {
                        if (system.filterMetadata?.goal === key || content.includes(key)) {
                            searchMatch = true;
                            break;
                        }
                    }
                }
            }

            return goalMatch && levelMatch && searchMatch;
        });
    }, [searchQuery, selectedGoal, selectedLevel]);

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
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
                        لا تبدأ من الصفر. اختر النظام المناسب لهدفك، انسخ الخطوات، وابدأ بتوفير الوقت فوراً.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="max-w-4xl mx-auto bg-card border border-border shadow-2xl rounded-[2.5rem] p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="ابحث بالنظام أو الهدف (مثلاً: أتمتة المحتوى)..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-14 pr-12 pl-4 rounded-2xl bg-secondary/5 border-transparent focus:bg-background focus:border-primary/20 transition-all outline-none"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={selectedGoal}
                                    onChange={(e) => setSelectedGoal(e.target.value)}
                                    className="h-14 px-4 rounded-2xl bg-secondary/5 border-transparent outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                >
                                    {goals.map(g => (
                                        <option key={g.id} value={g.id}>{g.label}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="h-14 px-4 rounded-2xl bg-secondary/5 border-transparent outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold"
                                >
                                    {levels.map(l => (
                                        <option key={l.id} value={l.id}>{l.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Systems Grid */}
            <div className="container mx-auto px-4 py-20 max-w-6xl">
                <AnimatePresence mode="popLayout">
                    <motion.div layout className="grid md:grid-cols-2 gap-8">
                        {filteredSystems.map((system) => (
                            <motion.div
                                layout
                                key={system.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative flex flex-col h-full bg-card rounded-[2.5rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                            >
                                {/* Image & Badges */}
                                <div className="relative h-64 w-full overflow-hidden bg-secondary/10">
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
                                        {system.filterMetadata?.level && (
                                            <Badge className="bg-primary text-primary-foreground font-bold rounded-full px-3 py-1">
                                                {levels.find(l => l.id === system.filterMetadata?.level)?.label}
                                            </Badge>
                                        )}
                                        <Badge variant="secondary" className="backdrop-blur-md bg-white/10 border border-white/20 text-white font-bold rounded-full">
                                            {system.toolsUsed.length} أدوات
                                        </Badge>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-10 flex flex-col flex-1">
                                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                                        {system.title}
                                    </h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-8 line-clamp-2">
                                        {system.description}
                                    </p>

                                    {/* Quick Info Bar */}
                                    <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border/50">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span className="font-bold">{system.filterMetadata?.expectedTime || "غير محدد"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Target className="w-4 h-4 text-primary" />
                                            <span className="font-bold">{goals.find(g => g.id === system.filterMetadata?.goal)?.label || "عام"}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                        <Link href={`/systems/${system.slug}`} className="flex-1">
                                            <Button className="w-full h-14 text-lg font-bold rounded-2xl">
                                                عرض الخطوات والنتائج
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            className="h-14 px-8 font-bold border-2 rounded-2xl hover:bg-primary/5"
                                            onClick={() => {
                                                navigator.clipboard.writeText(`${system.title}\n${system.description}`);
                                                toast.success("تم نسخ ملخص النظام!");
                                            }}
                                        >
                                            نسخ
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredSystems.length === 0 && (
                    <div className="text-center py-32 rounded-[3rem] bg-secondary/5 border border-dashed border-border">
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-bold mb-2">لم نجد أنظمة تطابق بحثك</h3>
                        <p className="text-muted-foreground text-lg">جرب تغيير الفلاتر أو البحث بمرادفات أخرى.</p>
                        <Button
                            variant="ghost"
                            className="mt-8 text-primary font-bold"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedGoal("all");
                                setSelectedLevel("all");
                            }}
                        >
                            تصفير كل الفلاتر
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

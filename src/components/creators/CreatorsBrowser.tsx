"use client";

import { useState, useMemo } from "react";
import { Creator, CreatorCategory, ContentLevel, PlatformType } from "@/lib/types/creators";
import { CreatorCard } from "./CreatorCard";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

interface CreatorsBrowserProps {
    initialCreators: Creator[];
}

const CATEGORIES: { value: CreatorCategory | "all"; label: string }[] = [
    { value: "all", label: "الكل" },
    { value: "education", label: "تعليم" },
    { value: "business", label: "أعمال" },
    { value: "programming", label: "برمجة" },
    { value: "design", label: "تصميم" },
    { value: "news", label: "أخبار" },
    { value: "reviews", label: "مراجعات" },
];

export function CreatorsBrowser({ initialCreators }: CreatorsBrowserProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<CreatorCategory | "all">("all");
    const [selectedLevel, setSelectedLevel] = useState<ContentLevel | "all">("all");

    const filteredCreators = useMemo(() => {
        return initialCreators.filter((creator) => {
            const matchesSearch =
                creator.name.ar.includes(searchQuery) ||
                (creator.name.en && creator.name.en.toLowerCase().includes(searchQuery.toLowerCase())) ||
                creator.bio.includes(searchQuery);

            const matchesCategory = selectedCategory === "all" || creator.category === selectedCategory;
            const matchesLevel = selectedLevel === "all" || creator.level === selectedLevel;

            return matchesSearch && matchesCategory && matchesLevel;
        });
    }, [initialCreators, searchQuery, selectedCategory, selectedLevel]);

    // Sort: Featured first
    const sortedCreators = useMemo(() => {
        return [...filteredCreators].sort((a, b) => {
            if (a.badge === 'featured' && b.badge !== 'featured') return -1;
            if (a.badge !== 'featured' && b.badge === 'featured') return 1;
            return 0;
        });
    }, [filteredCreators]);

    return (
        <div className="space-y-8">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-30 bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-border/50 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                        type="text"
                        placeholder="ابحث عن صانع محتوى..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pr-10 pl-4 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setSelectedCategory(cat.value)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.value
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary/50 hover:bg-secondary text-muted-foreground"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {sortedCreators.length > 0 ? (
                        sortedCreators.map((creator) => (
                            <motion.div
                                layout
                                key={creator.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <CreatorCard creator={creator} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-20 text-muted-foreground"
                        >
                            <p className="text-lg">لم يتم العثور على نتائج تطابق بحثك 🔍</p>
                            <Button
                                variant="ghost"
                                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                                className="mt-2 underline"
                            >
                                مسح الفلاتر
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

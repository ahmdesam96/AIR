"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Zap, FileText, Settings, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { systems, tools, posts } from "@/lib/data";
import { cn } from "@/lib/utils";

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
        setQuery("");
        setActiveIndex(0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                toggleOpen();
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, toggleOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    const filteredItems = React.useMemo(() => {
        if (!query) return [];
        const q = query.toLowerCase();

        const results = [
            ...systems.map(s => ({ title: s.title, description: s.description, type: 'system', icon: Zap, url: `/systems/${s.slug}` })),
            ...tools.map(t => ({ title: t.name, description: t.description, type: 'tool', icon: Settings, url: `/tools/${t.id}` })),
            ...posts.map(p => ({ title: p.title, description: p.excerpt, type: 'post', icon: FileText, url: `/blog/${p.slug}` }))
        ].filter(item =>
            item.title.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q))
        );

        return results.slice(0, 8);
    }, [query]);

    const handleSelect = (item: { url: string }) => {
        router.push(item.url);
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) => (prev + 1) % filteredItems.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === "Enter" && filteredItems[activeIndex]) {
            handleSelect(filteredItems[activeIndex]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm shadow-2xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] p-4"
                    >
                        <div className="bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="relative flex items-center p-4 border-b border-border/50">
                                <Search className="absolute right-4 w-5 h-5 text-muted-foreground mr-4 ml-4" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="ابحث عن أنظمة، أدوات، أو شروحات..."
                                    className="w-full bg-transparent border-none outline-none text-xl pr-10 pl-10"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    dir="rtl"
                                />
                                <div className="flex items-center gap-2 mr-4">
                                    <kbd className="px-2 py-1 rounded bg-secondary/10 border border-secondary/20 text-xs text-muted-foreground">ESC</kbd>
                                </div>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto p-2">
                                {filteredItems.length > 0 ? (
                                    <div className="space-y-1">
                                        {filteredItems.map((item, index) => {
                                            const Icon = item.icon;
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSelect(item)}
                                                    onMouseEnter={() => setActiveIndex(index)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-right group",
                                                        index === activeIndex ? "bg-primary/10 text-primary border-primary/20" : "hover:bg-secondary/5"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "p-2 rounded-lg",
                                                            index === activeIndex ? "bg-primary/20" : "bg-secondary/10"
                                                        )}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex flex-col items-start pr-0 pl-0">
                                                            <span className="font-bold text-lg">{item.title}</span>
                                                            <span className="text-sm opacity-60 line-clamp-1">{item.description}</span>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className={cn(
                                                        "w-5 h-5 transition-transform",
                                                        index === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                                                    )} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : query ? (
                                    <div className="p-8 text-center text-muted-foreground">
                                        لم يتم العثور على نتائج لـ &quot;{query}&quot;
                                    </div>
                                ) : (
                                    <div className="p-4 space-y-4">
                                        <p className="text-xs font-bold text-muted-foreground uppercase mr-2 tracking-wider">اقتراحات سريعة</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { label: "دليل الـ 10 ساعات", url: "/resources/10-hour-guide" },
                                                { label: "الأنظمة الجاهزة", url: "/systems" },
                                                { label: "كل الأدوات", url: "/tools" },
                                                { label: "استشارات مجانية", url: "/consultancy" }
                                            ].map((link, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { router.push(link.url); setIsOpen(false); }}
                                                    className="p-3 text-right rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                                                >
                                                    <span className="font-medium">{link.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 border-t border-border/50 bg-secondary/5 flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1"><Command className="w-3 h-3" /> + K للاختصار</span>
                                    <span className="flex items-center gap-1">↑↓ للتنقل</span>
                                    <span className="flex items-center gap-1">Enter للاختيار</span>
                                </div>
                                <span>ذكاء عملي v1.0</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

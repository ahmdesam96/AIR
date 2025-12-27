"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { posts } from "@/lib/data";
import { formatDateArabic } from "@/lib/formatters";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

const categories = ["الكل", "ذكاء اصطناعي", "إنتاجية", "أخبار"];

export default function BlogList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "الكل");

    // Sync state with URL only on the blog page
    useEffect(() => {
        if (pathname !== "/blog") return;

        const params = new URLSearchParams();
        if (searchQuery) params.set("q", searchQuery);
        if (selectedCategory && selectedCategory !== "الكل") params.set("category", selectedCategory);

        const queryString = params.toString();
        router.push(queryString ? `?${queryString}` : "/blog", { scroll: false });
    }, [searchQuery, selectedCategory, router, pathname]);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "الكل" || post.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { "الكل": posts.length };
        posts.forEach(post => {
            counts[post.category] = (counts[post.category] || 0) + 1;
        });
        return counts;
    }, []);

    return (
        <div className="min-h-screen">
            <div className="text-center mb-16">
                <h1 className="leading-tight mb-6">
                    المدونة <span className="text-gradient-gold">التقنية</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
                    مقالات وشروحات تفصيلية حول أحدث تقنيات الذكاء الاصطناعي وكيفية الاستفادة منها في ريادة الأعمال.
                </p>

                {/* Search & Filter UI */}
                <div className="max-w-3xl mx-auto bg-card border border-border rounded-[2.5rem] p-4 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" aria-hidden="true" />
                            <input
                                type="text"
                                placeholder="ابحث عن نظام أو مقال..."
                                aria-label="ابحث في المدونة"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 pr-12 pl-4 rounded-2xl bg-secondary/5 border-transparent focus:bg-background focus:border-primary/30 transition-all outline-none text-lg"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 px-2" role="group" aria-label="تصفية حسب التصنيف">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    aria-pressed={selectedCategory === category}
                                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${selectedCategory === category
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                                        : "bg-secondary/5 hover:bg-secondary/10 text-muted-foreground"
                                        }`}
                                >
                                    {category}
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === category ? "bg-black/10" : "bg-black/5"}`}
                                        aria-label={`${categoryCounts[category] || 0} مقالات`}
                                    >
                                        {categoryCounts[category] || 0}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredPosts.map((post) => (
                        <motion.div
                            layout
                            key={post.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <Link href={`/blog/${post.slug}`} className="group h-full block">
                                <div className="h-full flex flex-col bg-card rounded-[2rem] border border-border overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                    <div className="aspect-[16/10] bg-muted w-full relative overflow-hidden">
                                        {post.image ? (
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-muted-foreground">
                                                <span className="text-4xl">📝</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 z-10">
                                            <Badge className="bg-background/90 backdrop-blur-md border-white/10 text-xs font-bold px-3 py-1 rounded-full">{post.category}</Badge>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-4">
                                            <span>{formatDateArabic(post.date)}</span>
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span>{post.readingTime}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors mb-4 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-8">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border">
                                                    <Image
                                                        src={post.author.avatar}
                                                        alt={post.author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-muted-foreground">{post.author.name}</span>
                                            </div>
                                            <div className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                اقرأ المقال
                                                <span className="text-lg">←</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredPosts.length === 0 && (
                <div className="text-center py-32 rounded-[3rem] bg-secondary/5 border border-dashed border-border">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold mb-2">لا توجد نتائج للبحث</h3>
                    <p className="text-muted-foreground">جرب البحث بكلمات مختلفة أو تصفح التصنيفات.</p>
                </div>
            )}
        </div>
    );
}

"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Tool } from "@/lib/data";

interface ToolsBrowserProps {
    initialTools: Tool[];
}

const categories = ["All", "Chatbots", "Design", "Productivity", "Coding"];

const categoryLabels: Record<string, string> = {
    "All": "الكل",
    "Chatbots": "المحادثة",
    "Design": "التصميم",
    "Productivity": "الإنتاجية",
    "Coding": "البرمجة"
};

export default function ToolsBrowser({ initialTools }: ToolsBrowserProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredTools = useMemo(() => {
        return initialTools.filter((tool) => {
            const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, initialTools]);

    return (
        <div className="space-y-12">
            {/* Search & Filter */}
            <div className="max-w-xl mx-auto space-y-6">
                <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <input
                        type="text"
                        placeholder="ابحث عن أداة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-12 pr-10 pl-4 rounded-xl border border-input bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "bg-secondary/5 hover:bg-secondary/10 text-muted-foreground"
                                }`}
                        >
                            {categoryLabels[category]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tools Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTools.map((tool) => (
                        <motion.div
                            layout
                            key={tool.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors group bg-card/50 backdrop-blur-sm text-right">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
                                            {tool.category === "Chatbots" ? "🤖" :
                                                tool.category === "Design" ? "🎨" : "⚡"}
                                        </div>
                                        {tool.featured && (
                                            <Badge variant="secondary" className="text-xs backdrop-blur-md bg-secondary/10 border-secondary/20">مميز</Badge>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                                    <p className="text-xs text-muted-foreground">{tool.category}</p>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {tool.pricingType && (
                                            <Badge variant="outline" className={`text-[10px] font-bold ${tool.pricingType === 'free' ? 'text-green-600 border-green-200 bg-green-50' :
                                                tool.pricingType === 'freemium' ? 'text-blue-600 border-blue-200 bg-blue-50' :
                                                    'text-orange-600 border-orange-200 bg-orange-50'
                                                }`}>
                                                {tool.pricingType === 'free' ? 'مجاني' :
                                                    tool.pricingType === 'freemium' ? 'مجاني جزئياً' : 'مدفوع'}
                                            </Badge>
                                        )}
                                        {tool.featured && (
                                            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">مميز</Badge>
                                        )}
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {tool.description}
                                    </p>

                                    {/* Use Cases Section */}
                                    {(tool.bestFor || tool.notFor) && (
                                        <div className="pt-4 border-t border-border/50 space-y-3">
                                            {tool.bestFor && tool.bestFor.length > 0 && (
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-green-600 flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> مثالي لـ
                                                    </span>
                                                    <ul className="text-xs text-muted-foreground pr-4 space-y-1">
                                                        {tool.bestFor.slice(0, 2).map((item, i) => (
                                                            <li key={i} className="list-disc">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {tool.notFor && tool.notFor.length > 0 && (
                                                <div className="space-y-1">
                                                    <span className="text-[10px] uppercase tracking-wider font-semibold text-red-500 flex items-center gap-1">
                                                        <XCircle className="w-3 h-3" /> لا يصلح لـ
                                                    </span>
                                                    <ul className="text-xs text-muted-foreground pr-4 space-y-1">
                                                        {tool.notFor.slice(0, 1).map((item, i) => ( // Show only 1 constraint to save space
                                                            <li key={i} className="list-disc">{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <div className="flex gap-3 w-full">
                                        <Link href={`/tools/${tool.slug}`} className="flex-1">
                                            <Button variant="secondary" className="w-full bg-secondary/5 hover:bg-primary shadow-sm hover:text-primary-foreground text-foreground border border-border transition-all duration-300">
                                                اقرأ المزيد
                                            </Button>
                                        </Link>
                                        <a href={tool.affiliateLink || tool.link} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" className={`shrink-0 px-3 hover:scale-105 transition-transform ${tool.affiliateLink ? 'border-primary/50 text-primary' : ''}`} title={tool.affiliateLink ? "رابط إحالة" : "زيارة الموقع"}>
                                                ↗
                                            </Button>
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredTools.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-muted-foreground">لا توجد نتائج مطابقة لبحثك.</p>
                </div>
            )}
        </div>
    );
}

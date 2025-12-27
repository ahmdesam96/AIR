"use client";

import { ExternalLink, Copy, FileText, Layout, Table } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";

interface Template {
    name: string;
    platform: 'Notion' | 'Trello' | 'Sheets' | 'Other';
    url: string;
    language: 'ar' | 'en' | 'both';
}

interface TemplateLibraryProps {
    templates: Template[];
}

const platformIcons = {
    Notion: Layout,
    Trello: FileText,
    Sheets: Table,
    Other: ExternalLink,
};

const languageLabels = {
    ar: "عربي",
    en: "English",
    both: "عربي / English",
};

export function TemplateLibrary({ templates }: TemplateLibraryProps) {
    if (!templates || templates.length === 0) return null;

    return (
        <section className="space-y-8 my-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h3 className="text-3xl font-bold mb-2">مكتبة القوالب</h3>
                    <p className="text-muted-foreground">قوالب جاهزة قابلة للتعديل والنسخ مباشرة لحسابك.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template, index) => {
                    const Icon = platformIcons[template.platform] || platformIcons.Other;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-card border border-border rounded-3xl p-6 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <Badge variant="secondary" className="rounded-full px-3 py-1">
                                    {languageLabels[template.language]}
                                </Badge>
                            </div>

                            <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {template.name}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-6">
                                منصة: {template.platform}
                            </p>

                            <a
                                href={template.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-12 rounded-xl flex items-center justify-center gap-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                                <Copy className="w-4 h-4" />
                                انسخ إلى حسابك
                            </a>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}

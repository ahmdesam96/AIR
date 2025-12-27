"use client";

import { Play, FileDown, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

interface Lesson {
    title: string;
    duration: string;
    videoUrl?: string;
    exampleFiles?: {
        name: string;
        url: string;
    }[];
}

interface SystemLessonsProps {
    lessons: Lesson[];
}

export function SystemLessons({ lessons }: SystemLessonsProps) {
    if (!lessons || lessons.length === 0) return null;

    return (
        <section className="space-y-8 my-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold">دروس مصغرة</h3>
                    <p className="text-muted-foreground">شروحات مرئية سريعة لخطوات التطبيق العملي.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {lessons.map((lesson, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-card border border-border rounded-3xl p-6 hover:border-primary/30 transition-all"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-secondary/5 flex items-center justify-center shrink-0 border border-border group-hover:bg-primary/10 transition-colors">
                                    <Play className="w-8 h-8 text-muted-foreground group-hover:text-primary fill-current" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-1">{lesson.title}</h4>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{lesson.duration}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                {lesson.exampleFiles?.map((file, fIndex) => (
                                    <a
                                        key={fIndex}
                                        href={file.url}
                                        download
                                        className="rounded-xl gap-2 h-10 px-4 flex items-center border border-border hover:bg-secondary/5 transition-colors text-sm font-medium"
                                    >
                                        <FileDown className="w-4 h-4" />
                                        {file.name}
                                    </a>
                                ))}
                                {lesson.videoUrl && (
                                    <a
                                        href={lesson.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-xl gap-2 h-10 px-4 flex items-center bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-bold"
                                    >
                                        <Play className="w-4 h-4 fill-current" />
                                        شاهد الدرس
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

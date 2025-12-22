import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        {/* System Icon (Grid/Layers concept) */}
                        <div className="grid grid-cols-2 gap-1 w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <span className="bg-primary rounded-sm"></span>
                            <span className="bg-primary/50 rounded-sm"></span>
                            <span className="bg-primary/50 rounded-sm"></span>
                            <span className="bg-primary rounded-sm"></span>
                        </div>
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        ذكاء<span className="text-primary">.</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/blog" className="hover:text-primary transition-colors">
                        المدونة التقنية
                    </Link>
                    <Link href="/systems" className="hover:text-primary transition-colors">
                        الأنظمة الجاهزة
                    </Link>
                    <Link href="/tools" className="hover:text-primary transition-colors">
                        دليل الأدوات
                    </Link>
                    <Link href="/consultancy" className="hover:text-primary transition-colors font-bold">
                        استشارات ونماذج
                    </Link>
                    <Link href="/about" className="hover:text-primary transition-colors">
                        من نحن
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <div className="hidden md:block">
                        <Link href="/resources/10-hour-guide">
                            <Button variant="primary" size="sm" className="font-bold">
                                ابدأ هنا
                            </Button>
                        </Link>
                    </div>
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};

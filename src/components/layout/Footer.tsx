"use client";

import React from "react";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="inline-block relative w-32 md:w-40 h-10 md:h-12" aria-label="أثير | AIR - الصفحة الرئيسية">
                            <img
                                src="/AIR/images/brand/air-logo-full.png"
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-contain dark:hidden"
                            />
                            <img
                                src="/AIR/images/brand/air-logo-dark.png"
                                alt=""
                                aria-hidden="true"
                                className="w-full h-full object-contain hidden dark:block"
                            />
                        </Link>
                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-4">
                            مستودع الذكاء العربي - منصة شاملة للأنظمة والأدوات والمعرفة التي تمكنك من تحويل الذكاء الاصطناعي إلى واقع ملموس في عملك وحياتك.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">روابط سريعة</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">
                                    المدونة التقنية
                                </Link>
                            </li>
                            <li>
                                <Link href="/systems" className="hover:text-primary transition-colors">
                                    الأنظمة الجاهزة
                                </Link>
                            </li>
                            <li>
                                <Link href="/tools" className="hover:text-primary transition-colors">
                                    دليل الأدوات
                                </Link>
                            </li>
                            <li>
                                <Link href="/consultancy" className="hover:text-primary transition-colors">
                                    استشارات ونماذج
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-primary transition-colors">
                                    من نحن
                                </Link>
                            </li>
                            <li>
                                <Link href="/media-kit" className="hover:text-primary transition-colors font-bold text-primary">
                                    مركز المعلنين (Media Kit)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4 text-lg">تواصل معنا</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li>
                                <a href="https://x.com/zakaa_ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                                    تويتر (X)
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/company/zakaa-ai" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                                    لينكد إن
                                </a>
                            </li>
                            <li>
                                <a href="mailto:hello@zakaa.ai" className="hover:text-primary transition-colors flex items-center gap-2">
                                    البريد الإلكتروني
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground font-medium">
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
                        <span>•</span>
                        <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
                    </div>
                    <p>© {new Date().getFullYear()} أثير | AIR. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
};

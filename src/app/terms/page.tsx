import { Metadata } from "next";

export const metadata: Metadata = {
    title: "الشروط والأحكام",
    description: "الشروط والأحكام لاستخدام موقع ذكاء.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-noise pb-20">
            <div className="container mx-auto px-4 pt-32 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">الشروط والأحكام</h1>
                <p className="text-sm text-muted-foreground mb-8">آخر تحديث: ديسمبر 2025</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">قبول الشروط</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            باستخدامك لموقع &quot;ذكاء&quot;، فإنك توافق على هذه الشروط والأحكام. إذا لم توافق على أي جزء منها، يرجى عدم استخدام الموقع.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">استخدام المحتوى</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>المحتوى المنشور للأغراض التعليمية والمعلوماتية فقط</li>
                            <li>يُسمح بمشاركة المقالات مع ذكر المصدر</li>
                            <li>لا يُسمح بنسخ المحتوى لأغراض تجارية دون إذن</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">إخلاء المسؤولية</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            نبذل جهدنا لتقديم معلومات دقيقة ومحدثة، لكن لا نضمن دقة أو اكتمال المحتوى. استخدام الأدوات والنصائح المذكورة على مسؤوليتك الخاصة.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">الروابط الخارجية</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            قد يحتوي الموقع على روابط لمواقع خارجية. لسنا مسؤولين عن محتوى أو سياسات خصوصية هذه المواقع.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">التعديلات</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            نحتفظ بحق تعديل هذه الشروط في أي وقت. سيتم نشر التعديلات على هذه الصفحة مع تحديث التاريخ.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">تواصل معنا</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            لأي استفسارات، تواصل معنا عبر:{" "}
                            <a href="mailto:hello@zakaa.ai" className="text-primary hover:underline">hello@zakaa.ai</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

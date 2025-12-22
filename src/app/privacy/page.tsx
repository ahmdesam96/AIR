import { Metadata } from "next";

export const metadata: Metadata = {
    title: "سياسة الخصوصية",
    description: "سياسة الخصوصية لموقع ذكاء - كيف نحمي بياناتك ونستخدمها.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-noise pb-20">
            <div className="container mx-auto px-4 pt-32 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">سياسة الخصوصية</h1>
                <p className="text-sm text-muted-foreground mb-8">آخر تحديث: ديسمبر 2025</p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            نحن في &quot;ذكاء&quot; نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام موقعنا.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">البيانات التي نجمعها</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>البريد الإلكتروني (عند الاشتراك في النشرة البريدية)</li>
                            <li>بيانات التصفح المجهولة (عبر أدوات التحليل)</li>
                            <li>ملفات تعريف الارتباط (Cookies) لتحسين التجربة</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">كيف نستخدم بياناتك</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>إرسال النشرة البريدية الأسبوعية (إذا اشتركت)</li>
                            <li>تحسين محتوى الموقع بناءً على تحليلات الاستخدام</li>
                            <li>التواصل معك بخصوص استفساراتك</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">حماية البيانات</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            نستخدم إجراءات أمنية معيارية لحماية بياناتك. لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">حقوقك</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>إلغاء الاشتراك من النشرة البريدية في أي وقت</li>
                            <li>طلب حذف بياناتك الشخصية</li>
                            <li>الاستفسار عن البيانات المحفوظة لديك</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4">تواصل معنا</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            لأي استفسارات حول هذه السياسة، تواصل معنا عبر:{" "}
                            <a href="mailto:hello@zakaa.ai" className="text-primary hover:underline">hello@zakaa.ai</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

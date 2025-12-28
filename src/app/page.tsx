import { IMAGES } from "@/lib/image-data";
import { getImageSizes } from "@/lib/image-utils";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, X, Zap } from "lucide-react";
import BlogList from "@/components/blog/BlogList";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { SystemSnippet } from "@/components/ui/SystemSnippet";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { OptimizedImage } from "@/components/ui/OptimizedImage";

export const metadata: Metadata = {
  title: "ذكاء عملي | أدوات واقعية للمحترفين العرب",
  description: "أنظمة جاهزة للنسخ واللصق، أدوات إنتاجية، وأمثلة واقعية لتوفير 10 ساعات أسبوعياً",
  openGraph: {
    title: "ذكاء عملي",
    description: "أنظمة جاهزة للنسخ واللصق، أدوات إنتاجية، وأمثلة واقعية",
    images: [
      {
        url: IMAGES.og.default.src,
        width: IMAGES.og.default.width || 1200,
        height: IMAGES.og.default.height || 630,
        alt: IMAGES.og.default.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [IMAGES.og.default.src],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden bg-aurora">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/5 border border-secondary/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-muted-foreground">تحديث: النظام العملي للمحتوى جاهز للنسخ</span>
          </div>

          <h1 className="leading-tight">
            اعمل بذكاء: أنظمة جاهزة <br />
            <span className="text-gradient-gold">لتوفير 10 ساعات أسبوعياً.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            لن تتعلم الذكاء الاصطناعي هنا. بل ستستخدمه. <br />
            أنظمة جاهزة، أدوات إنتاجيات، وأمثلة واقعية.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/resources/10-hour-guide">
              <Button size="lg" className="w-full sm:w-auto text-lg px-12 h-16 font-bold shadow-2xl shadow-primary/20">
                حمّل الدليل الآن
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              * ابدأ غداً بدون تنظير
            </p>
          </div>

          <SystemSnippet
            title="نظام كتابة المحتوى السريع"
            code={`[Workflow: Article to Thread]
1. Input: Blog URL
2. Process: Extract hook + 5 key points
3. Output: 7-post X thread (Viral format)`}
            description="انسخ هذا الـ Prompt واستخدمه مع ChatGPT لتحويل أي مقال لسلسلة تغريدات في ثوانٍ."
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl mb-4">الميزات الرئيسية</h2>
            <p className="text-xl text-muted-foreground">ما الذي يميزنا عن الآخرين</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="mb-6 aspect-video overflow-hidden rounded-2xl bg-muted">
                <OptimizedImage
                  config={IMAGES.features.executionReady}
                  context="feature"
                  className="group-hover:scale-110 transition-transform duration-300 w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-2xl mb-3">رؤى قابلة للتنفيذ</h3>
              <p className="text-muted-foreground leading-relaxed">
                تحويل البيانات إلى استراتيجيات عملية يمكنك تطبيقها فوراً دون تأخير
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="mb-6 aspect-video overflow-hidden rounded-2xl bg-muted">
                <OptimizedImage
                  config={IMAGES.features.easyAutomation}
                  context="feature"
                  className="group-hover:scale-110 transition-transform duration-300 w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-2xl mb-3">أتمتة سهلة</h3>
              <p className="text-muted-foreground leading-relaxed">
                تبسيط المهام المتكررة والمملة باستخدام أدوات ذكية وفعالة
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="mb-6 aspect-video overflow-hidden rounded-2xl bg-muted">
                <OptimizedImage
                  config={IMAGES.features.smartTools}
                  context="feature"
                  className="group-hover:scale-110 transition-transform duration-300 w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-2xl mb-3">أدوات ذكية</h3>
              <p className="text-muted-foreground leading-relaxed">
                مجموعة متكاملة من أدوات الذكاء الاصطناعي الموثوقة والمدعومة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Section */}
      <BeforeAfter />

      {/* Why Section */}
      <section className="bg-card border-y border-border/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-bold">الفرق بيننا وبين المحتوى التقليدي</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Others Card */}
            <div className="relative p-8 rounded-[2rem] bg-card border border-border/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <h3 className="font-bold text-muted-foreground flex items-center gap-2">
                <span className="p-2 rounded-full bg-red-500/10 text-red-600"><X className="w-5 h-5" /></span>
                معظم المحتوى العربي
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                  <span>شرح مصطلحات أكاديمية (LLM, NLP) دون تطبيق</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                  <span>أخبار يومية وصيحات "التريند"</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                  <span>"جرب هذه الأداة ستبهرك" (بدون هدف)</span>
                </li>
              </ul>
            </div>

            {/* Practical AI Card */}
            <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 shadow-xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-br-full -ml-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <h3 className="text-primary flex items-center gap-2">
                <span className="p-2 rounded-full bg-green-500/10 text-green-600"><Check className="w-6 h-6" /></span>
                ذكاء عملي
              </h3>
              <ul className="space-y-5 text-foreground font-medium">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 text-green-600 mt-1"><Check className="w-4 h-4" /></div>
                  <span>أنظمة جاهزة للنسخ واللصق فوراً</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 text-green-600 mt-1"><Check className="w-4 h-4" /></div>
                  <span>ركز على الإنتاجية وتوفير الوقت والمال</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 text-green-600 mt-1"><Check className="w-4 h-4" /></div>
                  <span>"خذ هذا النظام وابدأ العمل به غداً"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-bold underline decoration-primary/30 underline-offset-8">ماذا ستستفيد من هنا؟</h2>
          <p className="text-xl text-muted-foreground mt-4">لا حشو. أنظمة عمل مجهزة للنمو.</p>
        </div>

        <div className="bento-grid max-w-6xl mx-auto">
          <div className="bento-item-1 p-8 rounded-3xl bg-card border border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
            <h3 className="font-bold text-3xl mb-4 text-primary">أنظمة جاهزة للنسخ</h3>
            <p className="text-xl text-muted-foreground leading-relaxed">
              سير عمل كامل يمكنك من إنجاز عمل أسبوع في يومين. ركزنا على أن تكون الخطوات واضحة وسهلة التنفيذ فوراً.
            </p>
          </div>

          <div className="bento-item-2 p-8 rounded-3xl bg-card border border-border/50">
            <Zap className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold text-2xl mb-2">وفّر الوقت</h3>
            <p className="text-muted-foreground">10 ساعات أسبوعياً على الأقل</p>
          </div>

          <div className="bento-item-3 p-8 rounded-3xl bg-card border border-border/50">
            <Check className="w-12 h-12 text-primary mb-4" />
            <h3 className="font-bold text-2xl mb-2">ابدأ الآن</h3>
            <p className="text-muted-foreground">بدون دورات طويلة أو نظريات</p>
          </div>

          <div className="bento-item-4 p-8 rounded-3xl bg-card border border-border/50">
            <div className="space-y-3">
              <h3 className="font-bold text-xl">صُمّمت للعرب</h3>
              <p className="text-sm text-muted-foreground">بأمثلة ولغة تفهمها</p>
            </div>
          </div>

          <div className="bento-item-5 p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
            <h3 className="font-bold text-2xl mb-4">أدوات موثوقة</h3>
            <p className="text-muted-foreground mb-6">
              مختارة بعناية من أفضل المنصات والمراجع العالمية
            </p>
            <Link href="/tools">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                استكشف الأدوات →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-card border-t border-border">
        <NewsletterSignup />
      </section>

      {/* Recent Blog Posts */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="mb-12">
          <h2 className="font-bold mb-2">أحدث المقالات</h2>
          <p className="text-muted-foreground">نصائح عملية وأمثلة واقعية كل أسبوع</p>
        </div>
        <BlogList limit={6} />
      </section>
    </div>
  );
}

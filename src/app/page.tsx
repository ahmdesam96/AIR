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
import { FeatureCard } from "@/components/ui/FeatureCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export const metadata: Metadata = {
  title: "أثير | AIR - Arab Intelligence Repository",
  description: "مستودع الذكاء العربي - أنظمة جاهزة، أدوات إنتاجية، ومعرفة شاملة في مجال الذكاء الاصطناعي",
  openGraph: {
    title: "أثير | AIR",
    description: "مستودع الذكاء العربي - منصة شاملة للأنظمة والأدوات في مجال الذكاء الاصطناعي",
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-primary">مستودع الذكاء العربي</span>
          </div>

          <h1 className="leading-tight">
            أثير | AIR <br />
            <span className="text-gradient-tech">Arab Intelligence Repository</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            مستودع شامل للأنظمة، الأدوات، والمعرفة في مجال الذكاء الاصطناعي.<br />
            كل ما تحتاجه لتطبيق الذكاء الاصطناعي في عملك.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/resources/10-hour-guide">
              <Button size="lg" className="w-full sm:w-auto text-lg px-12 h-16 font-bold shadow-2xl shadow-primary/20">
                استكشف المستودع
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
              * أنظمة جاهزة للتطبيق الفوري
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-[var(--muted)]/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="mb-4">ما الذي يميز أثير | AIR؟</h2>
            <p className="text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto">
              مستودع متكامل يحوّل الذكاء الاصطناعي من مفهوم نظري إلى أداة عملية في يدك
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="رؤى قابلة للتنفيذ"
              description="تحويل البيانات إلى استراتيجيات عملية يمكنك تطبيقها فوراً دون تأخير أو تنظير."
            />
            <FeatureCard
              icon={<Check className="w-6 h-6" />}
              title="أتمتة سهلة"
              description="أنظمة جاهزة للنسخ تبسّط المهام المتكررة وتوفر ساعات من العمل اليدوي."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="أدوات موثوقة"
              description="مجموعة مختارة بعناية من أفضل أدوات الذكاء الاصطناعي مع شروحات عملية."
            />
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

      {/* Testimonials Section - Social Proof */}
      <section className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-bold mb-4">ماذا يقول مستخدمونا؟</h2>
          <p className="text-xl text-muted-foreground">تجارب حقيقية من رواد أعمال وصناع محتوى</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative z-10">
              &quot;وفرت 12 ساعة أسبوعياً بعد تطبيق نظام إعادة استغلال المحتوى. الأنظمة واضحة وسهلة التنفيذ.&quot;
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👨‍💼
              </div>
              <div>
                <div className="font-bold">محمد الراشد</div>
                <div className="text-sm text-muted-foreground">صانع محتوى</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative z-10">
              &quot;أخيراً محتوى عربي عملي عن الذكاء الاصطناعي! الأدوات المختارة مميزة والشروحات واضحة.&quot;
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👩‍💻
              </div>
              <div>
                <div className="font-bold">سارة الأحمد</div>
                <div className="text-sm text-muted-foreground">مديرة تسويق</div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full -mr-4 -mt-4" />
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed relative z-10">
              &quot;النشرة الأسبوعية رائعة! كل خميس أحصل على أدوات جديدة يمكنني تطبيقها فوراً.&quot;
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                👨‍🎓
              </div>
              <div>
                <div className="font-bold">خالد المنصور</div>
                <div className="text-sm text-muted-foreground">رائد أعمال</div>
              </div>
            </div>
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

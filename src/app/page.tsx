import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Check, X, ArrowLeft } from "lucide-react";
import BlogList from "@/components/blog/BlogList";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { SystemSnippet } from "@/components/ui/SystemSnippet";
import { BeforeAfter } from "@/components/sections/BeforeAfter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
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
                  <span>أخبار يومية وصيحات &quot;التريند&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                  <span>&quot;جرب هذه الأداة ستبهرك&quot; (بدون هدف)</span>
                </li>
              </ul>
            </div>

            {/* Practical AI Card */}
            <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 shadow-xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-br-full -ml-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <h3 className="text-primary flex items-center gap-2">
                <span className="p-2 rounded-full bg-green-500/10 text-green-600"><Check className="w-6 h-6" /></span>
                ذكاء عملي (Practical AI)
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
                  <span>&quot;خذ هذا النظام وابدأ العمل به غداً&quot;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-bold">ماذا ستستفيد من هنا؟</h2>
          <p className="text-xl text-muted-foreground">لا حشو. عمل فقط.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "أنظمة جاهزة", desc: "سير عمل كامل يمكنك من إنجاز عمل أسبوع في يومين." },
            { title: "أدوات إنتاجية", desc: "لا نجرب كل أداة جديدة، بل نختار فقط ما يحقق نتائج حقيقية." },
            { title: "أمثلة واقعية", desc: "صور ونصوص قبل / بعد لترى الفرق بنفسك." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10 hover:border-primary/30 transition-all">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles Section (Renamed to Latest Systems) */}
      <section className="bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
            <h2 className="font-bold mb-0">أحدث الأنظمة والشروحات</h2>
            <Link href="/blog">
              <Button variant="outline" className="rounded-full px-8">كل المقالات</Button>
            </Link>
          </div>
          <div className="max-w-7xl mx-auto">
            <BlogList />
          </div>
        </div>
      </section>

      {/* Final CTA / Newsletter */}
      <section className="bg-background border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  );
}

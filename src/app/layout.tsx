import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/Toaster";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ImageDeduplicationProvider } from "@/components/providers/ImageDeduplicationProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://arabic-ai-blog.vercel.app'),
  title: {
    template: '%s | ذكاء عملي',
    default: 'ذكاء عملي | التطبيق العملي للذكاء الاصطناعي',
  },
  description: 'منصة عربية تنفيذية تعلمك كيفية تحويل الذكاء الاصطناعي من مجرد أداة للتجربة إلى نظام عملي يوفر لك الإنتاجية، الوقت، والمال.',
  applicationName: 'Zakaa Amaly',
  authors: [{ name: 'Ahmed Esam' }],
  generator: 'Next.js',
  keywords: ['ذكاء اصطناعي', 'ذكاء عملي', 'ChatGPT', 'إنتاجية', 'أنظمة عمل', 'Business Automation'],
  creator: 'Ahmed Esam',
  publisher: 'Zakaa Amaly',
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://arabic-ai-blog.vercel.app",
    title: "ذكاء عملي | لن تتعلم الذكاء الاصطناعي هنا.. بل ستستخدمه",
    description: "أنظمة مجربة تجعل الذكاء الاصطناعي يعمل نيابة عنك بدلاً من التفكير فيه.",
    siteName: "ذكاء عملي",
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'ذكاء عملي - استخدم الذكاء الاصطناعي واطلع نتيجة',
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ذكاء عملي | التطبيق العملي للذكاء الاصطناعي",
    description: "منصة عربية تنفيذية للذكاء الاصطناعي.",
    creator: '@zakaa_ai',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://arabic-ai-blog.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Inter-VariableFont_slnt,wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ذكاء",
              "url": "https://arabic-ai-blog.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://arabic-ai-blog.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ذكاء",
              "url": "https://arabic-ai-blog.vercel.app",
              "logo": "https://arabic-ai-blog.vercel.app/logo.png",
              "sameAs": [
                "https://x.com/zakaa_ai",
                "https://linkedin.com/company/zakaa-ai"
              ]
            })
          }}
        />
      </head>
      <body
        className={`antialiased font-sans bg-background text-foreground min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleAnalytics />
          <ImageDeduplicationProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ImageDeduplicationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

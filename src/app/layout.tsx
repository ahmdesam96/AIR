import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/Toaster";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ImageDeduplicationProvider } from "@/components/providers/ImageDeduplicationProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    template: `%s | ${SITE_CONFIG.name}`,
    default: `${SITE_CONFIG.name} | التطبيق العملي للذكاء الاصطناعي`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.nameEn,
  authors: [{ name: SITE_CONFIG.author }],
  generator: 'Next.js',
  keywords: ['ذكاء اصطناعي', 'ذكاء عملي', 'ChatGPT', 'إنتاجية', 'أنظمة عمل', 'Business Automation'],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.nameEn,
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} | لن تتعلم الذكاء الاصطناعي هنا.. بل ستستخدمه`,
    description: "أنظمة مجربة تجعل الذكاء الاصطناعي يعمل نيابة عنك بدلاً من التفكير فيه.",
    siteName: SITE_CONFIG.name,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: `${SITE_CONFIG.name} - استخدم الذكاء الاصطناعي واطلع نتيجة`,
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | التطبيق العملي للذكاء الاصطناعي`,
    description: "منصة عربية تنفيذية للذكاء الاصطناعي.",
    creator: SITE_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
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
        className={`antialiased font-['IBM_Plex_Sans_Arabic'] font-medium bg-background text-foreground min-h-screen flex flex-col`}
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
            <CommandPalette />
          </ImageDeduplicationProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

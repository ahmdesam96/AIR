import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/Toaster";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ImageDeduplicationProvider } from "@/components/providers/ImageDeduplicationProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { SITE_CONFIG } from "@/lib/constants";

interface PageProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      template: `%s | ${isAr ? SITE_CONFIG.name : SITE_CONFIG.nameEn}`,
      default: isAr ? `${SITE_CONFIG.name} | التطبيق العملي للذكاء الاصطناعي` : `${SITE_CONFIG.nameEn} | Practical AI Implementation`,
    },
    description: isAr ? SITE_CONFIG.description : SITE_CONFIG.descriptionEn,
    applicationName: SITE_CONFIG.nameEn,
    authors: [{ name: SITE_CONFIG.author }],
    generator: 'Next.js',
    keywords: isAr
      ? ['ذكاء اصطناعي', 'ذكاء عملي', 'ChatGPT', 'إنتاجية', 'أنظمة عمل', 'Business Automation']
      : ['AI', 'Practical AI', 'ChatGPT', 'Productivity', 'Work Systems', 'Business Automation'],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.nameEn,
    openGraph: {
      type: "website",
      locale: isAr ? "ar_SA" : "en_US",
      url: `${SITE_CONFIG.url}/${locale}`,
      title: isAr
        ? `${SITE_CONFIG.name} | لن تتعلم الذكاء الاصطناعي هنا.. بل ستستخدمه`
        : `${SITE_CONFIG.nameEn} | You won't learn AI here.. you will use it`,
      description: isAr
        ? "أنظمة مجربة تجعل الذكاء الاصطناعي يعمل نيابة عنك بدلاً من التفكير فيه."
        : "Proven systems that make AI work for you instead of thinking about it.",
      siteName: isAr ? SITE_CONFIG.name : SITE_CONFIG.nameEn,
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: isAr ? `${SITE_CONFIG.name} - استخدم الذكاء الاصطناعي واطلع نتيجة` : `${SITE_CONFIG.nameEn} - Use AI and get results`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: isAr ? `${SITE_CONFIG.name} | التطبيق العملي للذكاء الاصطناعي` : `${SITE_CONFIG.nameEn} | Practical AI Implementation`,
      description: isAr ? "منصة عربية تنفيذية للذكاء الاصطناعي." : "Arabic executive platform for AI.",
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
    },
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default async function RootLayout({
  children,
  params,
}: PageProps) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return (
    <html lang={locale} dir={isAr ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/AIR/fonts/Inter-VariableFont_slnt,wght.ttf"
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
              "name": isAr ? "أثير | AIR" : "AIR | Arab Intelligence Repository",
              "alternateName": isAr ? "مستودع الذكاء العربي" : "Arab Intelligence Repository",
              "url": `${SITE_CONFIG.url}/${locale}`,
              "description": isAr
                ? "مستودع الذكاء العربي - منصة شاملة للأنظمة والأدوات والمعرفة في مجال الذكاء الاصطناعي"
                : "Arab Intelligence Repository - A comprehensive platform for systems, tools, and knowledge in the field of AI",
              "inLanguage": locale,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `https://arabic-ai-blog.vercel.app/${locale}/blog?search={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
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
          <AuthProvider>
            <GoogleAnalytics />
            <ImageDeduplicationProvider>
              <Header locale={locale} />
              <main className="flex-1">
                {children}
              </main>
              <Footer locale={locale} />
              <CommandPalette locale={locale} />
            </ImageDeduplicationProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

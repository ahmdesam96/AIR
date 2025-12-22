import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
    title: 'المدونة',
    description: 'مقالات وشروحات تفصيلية عن أحدث تقنيات الذكاء الاصطناعي وكيفية الاستفادة منها في عملك وحياتك اليومية.',
    openGraph: {
        title: "المدونة التقنية | ذكاء",
        description: "تصففح أحدث المقالات والشروحات حول الذكاء الاصطناعي، أدوات الإنتاجية، وريادة الأعمال.",
        type: "website",
    },
};

export default function BlogPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <BlogList />
        </div>
    );
}

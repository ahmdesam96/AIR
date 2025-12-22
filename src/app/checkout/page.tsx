import { courses, paymentDetails } from "@/lib/data";
import { notFound } from "next/navigation";
import { PaymentInstructionCard } from "@/components/payment/PaymentInstructionCard";
import { ProofUploadForm } from "@/components/payment/ProofUploadForm";
import { ShieldCheck, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CheckoutPageProps {
    searchParams: Promise<{
        type: string;
        id?: string;
    }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
    const { type, id } = await searchParams;

    let productTitle = "";
    let productPrice = "";

    if (type === "pro") {
        productTitle = "عضوية ذكاء PRO سنوية";
        productPrice = "$199";
    } else if (type === "course" && id) {
        const decodedId = decodeURIComponent(id);
        const course = courses.find(c => c.slug === decodedId);
        if (!course) notFound();
        productTitle = `دورة: ${course.title}`;
        productPrice = course.price === "Free" ? "مجاني" : `$${course.price}`;
    } else {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/pricing">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowRight className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold font-arabic mb-2">إتمام الاشتراك</h1>
                        <p className="text-muted-foreground">خطوة واحدة وتصبح جزءاً من مجتمع ذكاء.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Left Column: Instructions & Form */}
                    <div className="lg:col-span-7 space-y-10">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                                اختر وسيلة الدفع المناسبة لك
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <PaymentInstructionCard
                                    method="instapay"
                                    title="عبر إنستا باي (قريباً)"
                                    details={paymentDetails.instaPay}
                                />
                                <PaymentInstructionCard
                                    method="vfcash"
                                    title="عبر فودافون كاش"
                                    details={paymentDetails.vodafoneCash}
                                />
                            </div>

                            <div className="p-4 bg-orange-50/50 border border-orange-200 rounded-2xl flex items-start gap-3 text-sm text-orange-800">
                                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                                <p className="text-right leading-relaxed">
                                    <strong>ملاحظة:</strong> يتم التحويل بالسعر الرسمي للدولار في البنك المركزي في يوم التحويل.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                                أكد عملية التحويل
                            </h2>
                            <div className="bg-card border-2 border-border p-8 rounded-3xl">
                                <ProofUploadForm />
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                        <div className="bg-muted/30 p-8 rounded-[2.5rem] border border-border/50 space-y-8">
                            <h3 className="text-xl font-bold">ملخص الطلب</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-lg font-bold">
                                    <span className="text-muted-foreground">{productTitle}</span>
                                    <span>{productPrice}</span>
                                </div>
                                <div className="h-px bg-border" />
                                <div className="flex justify-between items-center text-2xl font-black">
                                    <span>الإجمالي</span>
                                    <span className="text-primary">{productPrice}</span>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    "وصول فوري للمحتوى بعد التأكيد",
                                    "دعم فني عبر البريد والواتساب",
                                    "شهادة إتمام (للدورات)",
                                    "تحديثات مدى الحياة"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                        <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest bg-background px-4 py-2 rounded-full border border-border">
                                    🔒 آمن ومشفر 100%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

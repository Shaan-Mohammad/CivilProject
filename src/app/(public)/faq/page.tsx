import { db } from "@/lib/db";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { CTASection } from "@/components/public/CTASection";

export const metadata = {
  title: "FAQ | CivilDraft Pro",
  description: "Frequently asked questions about our civil engineering and drafting services.",
};

export default async function FAQPage() {
  const faqs = await db.fAQ.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <section className="bg-sidebar-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight">
            How Can We <span className="text-accent">Help?</span>
          </h1>
        </div>
      </section>

      <FAQAccordion faqs={faqs} />
      <CTASection />
    </>
  );
}

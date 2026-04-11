import { db } from "@/lib/db";
import { ServiceListClient } from "@/components/public/ServiceListClient";
import { CTASection } from "@/components/public/CTASection";

export const metadata = {
  title: "Our Services | CivilDraft Pro",
  description: "Explore our specialized civil engineering and drafting services.",
};

export default async function ServicesPage() {
  const services = await db.service.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <section className="bg-sidebar-background text-sidebar-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white">Engineering Expertise</h1>
          <p className="text-sidebar-foreground/80 text-lg max-w-2xl mx-auto">
            From preliminary blueprints to final site audits, our suite of structural and architectural services guarantees precision.
          </p>
        </div>
      </section>

      <ServiceListClient services={services} />
      <CTASection />
    </>
  );
}

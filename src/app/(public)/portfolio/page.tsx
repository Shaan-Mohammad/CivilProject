import { db } from "@/lib/db";
import { PortfolioClient } from "@/components/public/PortfolioClient";
import { CTASection } from "@/components/public/CTASection";

export const metadata = {
  title: "Engineering Portfolio | CivilDraft Pro",
  description: "Browse our legacy of structural success and architectural precision.",
};

export default async function PortfolioPage() {
  const projects = await db.project.findMany({
    where: { status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
  });

  return (
    <>
      <section className="bg-sidebar-background text-sidebar-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white leading-tight text-balance">
            Our Legacy of <span className="text-secondary">Excellence</span>
          </h1>
          <p className="text-sidebar-foreground/80 text-lg max-w-2xl mx-auto text-balance">
            Explore our diverse portfolio showcasing rigorous engineering methodologies, flawless drafting, and successfully deployed civil infrastructures.
          </p>
        </div>
      </section>

      <PortfolioClient projects={projects} />
      <CTASection />
    </>
  );
}

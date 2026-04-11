import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileSignature } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/public/CTASection";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await db.service.findUnique({ where: { slug: params.slug } });
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | CivilDraft Pro`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await db.service.findUnique({ where: { slug: params.slug } });
  
  if (!service || !service.isActive) {
    notFound();
  }

  // Fetch a few other services for the sidebar
  const otherServices = await db.service.findMany({
    where: { isActive: true, id: { not: service.id } },
    take: 5,
    orderBy: { order: "asc" },
  });

  // Parse features JSON safely
  let features: string[] = [];
  try {
    if (service.features) {
      features = JSON.parse(service.features);
    }
  } catch {
    // legacy or comma separated fallback
    features = service.features ? service.features.split(",") : [];
  }

  return (
    <>
      <section className="bg-sidebar-background text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-balance">
              {service.title}
            </h1>
            <p className="text-sidebar-foreground/80 text-xl max-w-2xl text-balance">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg prose-slate max-w-none">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Overview</h2>
                {/* Normally longDescription is rich text/html or markdown. Render as lines for MVP */}
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {service.longDescription ? (
                    service.longDescription.split('\n').filter(Boolean).map((p: string, i: number) => <p key={i}>{p}</p>)
                  ) : (
                    <p>{service.description}</p>
                  )}
                </div>
              </div>

              {features && features.length > 0 && (
                <div className="bg-secondary/50 p-8 rounded-3xl border">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Key Deliverables & Features</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl border shadow-sm">
                        <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Service specific CTA block inside content */}
              <div className="bg-gradient-primary rounded-3xl p-8 md:p-12 text-white shadow-primary text-center">
                <FileSignature className="mx-auto w-12 h-12 mb-6 opacity-80" />
                <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">Need {service.title}?</h3>
                <p className="text-white/80 mb-8 max-w-lg mx-auto">
                  Our certified engineers are ready to review your requirements and provide a highly accurate estimate.
                </p>
                <Link href={`/quote?service=${service.slug}`}>
                  <Button size="lg" variant="secondary" className="font-bold">
                    Request an Estimate <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[120px] space-y-8">
                
                {/* Other Services Box */}
                <div className="bg-card border rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading text-xl font-bold mb-6 border-b pb-4">Other Services</h3>
                  <ul className="space-y-3">
                    {otherServices.map((other: { id: string; slug: string; title: string }) => (
                      <li key={other.id}>
                        <Link 
                          href={`/services/${other.slug}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium text-muted-foreground hover:text-foreground group"
                        >
                          {other.title}
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Link href="/services">
                      <Button variant="outline" className="w-full">View All Services</Button>
                    </Link>
                  </div>
                </div>

                {/* Quick Contact Box */}
                <div className="bg-sidebar-background border-sidebar-border text-sidebar-foreground border rounded-2xl p-6 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                  <h3 className="font-heading text-xl font-bold mb-2 text-white">Expert Consultation</h3>
                  <p className="text-sidebar-foreground/70 text-sm mb-6 leading-relaxed">
                    Not sure if {service.title} is exactly what you need? Talk to our chief engineers.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white">Contact Us</Button>
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

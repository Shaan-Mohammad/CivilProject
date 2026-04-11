import { CheckCircle2 } from "lucide-react";
import { QuoteForm } from "@/components/public/QuoteForm";
import { CTASection } from "@/components/public/CTASection";

export const metadata = {
  title: "Request a Quote | CivilDraft Pro",
  description: "Get a detailed estimate for your architectural and engineering project.",
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-sidebar-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Request an <span className="text-accent">Estimate</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
             Share your vision, attach your blueprints, and let our lead engineers analyze the scope of your commercial or residential project.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background relative -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            {/* Left Info Column */}
            <div className="lg:col-span-1 space-y-8 order-2 lg:order-1 pt-10 lg:pt-0">
               <div>
                 <h3 className="font-heading text-2xl font-bold mb-4">How it works</h3>
                 <p className="text-muted-foreground leading-relaxed">
                   Our quote process is streamlined to give you fast, accurate pricing mapped out by certified civil professionals.
                 </p>
               </div>

               <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="mt-1 bg-primary/10 text-primary rounded-full p-2 shrink-0 h-min">
                     <CheckCircle2 size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold">1. Submit Details</h4>
                     <p className="text-sm text-muted-foreground mt-1">Provide project specifications via our secure wizard.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 bg-primary/10 text-primary rounded-full p-2 shrink-0 h-min">
                     <CheckCircle2 size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold">2. Engineer Review</h4>
                     <p className="text-sm text-muted-foreground mt-1">Our certified team assesses structural viability and drafting requirements.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="mt-1 bg-primary/10 text-primary rounded-full p-2 shrink-0 h-min">
                     <CheckCircle2 size={20} />
                   </div>
                   <div>
                     <h4 className="font-bold">3. Receive Proposal</h4>
                     <p className="text-sm text-muted-foreground mt-1">Get an itemized BOQ and timeline estimate within 24-48 hours.</p>
                   </div>
                 </div>
               </div>
               
               <div className="bg-secondary/50 p-6 rounded-2xl border">
                 <h4 className="font-bold mb-2">Notice on Privacy</h4>
                 <p className="text-sm text-muted-foreground">
                   All blueprints and documentation uploaded to our servers are highly encrypted and protected under an automatic Non-Disclosure Agreement (NDA).
                 </p>
               </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-2 order-1 lg:order-2">
               <QuoteForm />
            </div>

          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

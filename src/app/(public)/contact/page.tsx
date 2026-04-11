import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/public/ContactForm";

export const metadata = {
  title: "Contact Us | CivilDraft Pro",
  description: "Get in touch with our civil engineering experts today.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-sidebar-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 text-balance">
            Let&apos;s Discuss Your <span className="text-accent">Project</span>
          </h1>
          <p className="text-sidebar-foreground/80 text-lg max-w-2xl mx-auto">
            Whether it&apos;s a minor drafting revision or a massive structural undertaking, our team is ready to assist.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                 <h2 className="font-heading text-3xl font-bold mb-6">Contact Information</h2>
                 <p className="text-muted-foreground leading-relaxed mb-8">
                   Fill out the form to the right, and our support staff will align you with the right engineering specialist.
                 </p>
              </div>

              <div className="space-y-6">
                 <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/50 border shadow-sm">
                   <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0"><MapPin size={24}/></div>
                   <div>
                     <h4 className="font-bold font-heading text-lg">Office Address</h4>
                     <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                       123 Builder Avenue, Engineering Block<br/>Tech City, 10001
                     </p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/50 border shadow-sm">
                   <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0"><ContactMethodIcon method="phone"/></div>
                   <div>
                     <h4 className="font-bold font-heading text-lg">Phone Number</h4>
                     <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                       General: +1 (555) 123-4567<br/>
                       Engineering: +1 (555) 987-6543
                     </p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/50 border shadow-sm">
                   <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0"><ContactMethodIcon method="mail"/></div>
                   <div>
                     <h4 className="font-bold font-heading text-lg">Email Address</h4>
                     <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                       info@civildraftpro.com<br/>
                       quotes@civildraftpro.com
                     </p>
                   </div>
                 </div>

                 <div className="flex items-start gap-4 p-6 rounded-2xl bg-secondary/50 border shadow-sm">
                   <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0"><Clock size={24}/></div>
                   <div>
                     <h4 className="font-bold font-heading text-lg">Working Hours</h4>
                     <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                       Monday - Friday: 9:00 AM - 6:00 PM<br/>
                       Saturday & Sunday: Closed
                     </p>
                   </div>
                 </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
               <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function ContactMethodIcon({ method }: { method: "phone" | "mail" }) {
  if (method === "phone") return <Phone size={24} />;
  return <Mail size={24} />;
}

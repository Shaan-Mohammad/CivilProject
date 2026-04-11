"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";
import { APP_NAME } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="bg-sidebar-background text-sidebar-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-balance"
          >
            Engineering Excellence, <span className="text-secondary">Delivered</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sidebar-foreground/80 text-lg md:text-xl text-balance"
          >
            We are {APP_NAME}, a premier civil engineering consultancy dedicated to providing innovative, structurally sound, and sustainable drafting and modeling solutions.
          </motion.p>
        </div>
      </section>

      {/* Our Story / Who We Are */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Established with a vision to redefine drafting accuracy, {APP_NAME} blends decades of civil engineering experience with cutting-edge CAD technology. What started as a small structural consulting firm has grown into a full-scale civil engineering powerhouse.
                </p>
                <p>
                  We understand that a successful construction project requires a flawless blueprint. From 2D municipal drawings to complex 3D elevations and rigorous BOQ (Bill of Quantities) analyses, our team ensures your foundation is built on absolute certainty.
                </p>
                <p className="font-medium text-foreground">
                  Our commitment is simple: We don&apos;t just draw buildings. We engineer realities.
                </p>
              </div>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden glass shadow-2xl border-white/20 p-2"
            >
               <img 
                 src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop" 
                 alt="Engineers planning" 
                 className="w-full h-full object-cover rounded-2xl"
               />
               <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-8 rounded-2xl shadow-xl w-48 hidden md:block">
                 <p className="font-heading text-4xl font-bold mb-1">12+</p>
                 <p className="text-sm font-semibold tracking-wider uppercase">Years of Setup</p>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="bg-card p-10 rounded-3xl border shadow-sm"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver highly accurate, code-compliant, and cost-effective architectural blueprints and structural layouts that empower contractors and developers to build with absolute confidence.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="bg-card p-10 rounded-3xl border shadow-sm"
            >
              <div className="w-14 h-14 bg-accent/10 text-accent-foreground rounded-2xl flex items-center justify-center mb-6">
                <Eye size={28} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become the globally recognized standard for virtual construction planning and civil drafting, bridging the gap between innovative architectural design and practical execution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Why <span className="text-primary">Choose Us?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
               { title: "Municipal Code Expertise", desc: "Every draft is guaranteed to pass local council and building authority approvals gracefully." },
               { title: "Cost-Effective Execution", desc: "Our BOQ analyses prevent material wastage and budget overruns before the first brick is laid." },
               { title: "Rapid Turnaround", desc: "We utilize modern CAD and BIM techniques to deliver your designs faster without compromising quality." },
               { title: "Structural Integrity", desc: "Our engineering cores guarantee maximum load-bearing efficiency tailored to your specific geography." },
               { title: "3D Visualization", desc: "See your multi-million dollar investment virtually before breaking ground." },
               { title: "End-to-End Support", desc: "From blank canvas to final site inspection, our engineers are with you." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl hover:bg-secondary/50 transition-colors"
              >
                <div className="mt-1 bg-primary/10 text-primary rounded-full p-1 shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 font-heading">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

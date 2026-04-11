"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-sidebar"></div>
      <div className="absolute inset-0 blueprint-grid opacity-20 filter invert brightness-0 dark:invert-0"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
           {/* Inner glimmers */}
           <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
           <div className="absolute bottom-0 right-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

           <div className="w-16 h-16 mx-auto bg-primary text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/30 transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
             <FileSignature size={32} />
           </div>

           <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-white text-balance">
             Ready to Turn Your Vision into a <span className="text-accent">Solid Blueprint?</span>
           </h2>
           
           <p className="text-sidebar-foreground/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto text-balance font-medium">
             Get a precise, fully-detailed quote tailored to your civil engineering needs within 24 hours. No obligations, just expert clarity.
           </p>

           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link href="/quote">
               <Button size="lg" className="h-14 px-8 text-base shadow-primary hover:shadow-card-hover group w-full sm:w-auto">
                 Request a Free Quote
                 <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Button>
             </Link>
             <Link href="/contact">
               <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto transition-colors">
                 Contact Our Team
               </Button>
             </Link>
           </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, HardHat, Compass, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 pb-32 -mt-[112px]">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent)] animate-pulse pointer-events-none"></div>
      {/* Background Video/Image Underlay */}
      {/* We use a very subtle blueprint grid instead of a noisy image for a cleaner engineering look */}
      <div className="absolute inset-0 blueprint-grid opacity-40 z-0"></div>
      
      {/* Gradient Orbs for Aesthetic depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-multiply opacity-50 translate-x-1/3 -translate-y-1/3 animate-pulse pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] mix-blend-multiply opacity-50 -translate-x-1/4 translate-y-1/4 pointer-events-none z-0"></div>

      <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Column */}
        <div className="flex flex-col items-start pt-[120px] lg:pt-[84px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6"
          >
            <Compass size={16} />
            <span className="text-sm font-semibold tracking-wide uppercase">Precision Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-balance tracking-tight"
          >
            <span className="block overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                 className="block"
               >
                 Building the Future
               </motion.span>
            </span>
            <span className="block overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                 className="block text-gradient"
               >
                 with Precision
               </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 text-balance max-w-lg"
          >
            Expert 2D/3D civil drafting, structural layouts, and comprehensive project consultation tailored for modern construction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row w-full sm:w-auto gap-4"
          >
            <Link href="/quote">
              <Button size="lg" className="h-14 px-8 text-base shadow-primary hover:shadow-card-hover group transition-all w-full sm:w-auto">
                Get a Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-white/50 backdrop-blur w-full sm:w-auto">
                View Portfolio
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.5, delay: 0.6 }}
             className="mt-12 flex items-center gap-6"
          >
            <div className="flex -space-x-4">
               {/* Dummy avatars for social proof */}
               <img src="https://i.pravatar.cc/100?img=1" alt="Client" className="w-12 h-12 rounded-full border-2 border-background shadow-sm" />
               <img src="https://i.pravatar.cc/100?img=2" alt="Client" className="w-12 h-12 rounded-full border-2 border-background shadow-sm" />
               <img src="https://i.pravatar.cc/100?img=3" alt="Client" className="w-12 h-12 rounded-full border-2 border-background shadow-sm" />
               <div className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center shadow-sm z-10">
                 <span className="text-xs font-bold font-heading">+50</span>
               </div>
            </div>
            <div className="text-sm">
              <p className="font-bold text-foreground">Trusted by 50+ Clients</p>
              <div className="flex gap-1 text-accent">
                {Array(5).fill("").map((_, i) => (
                   <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Content / Visual Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Main graphic container */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            {/* The abstract floating blueprint visual */}
            <div className="absolute inset-0 bg-gradient-hero rounded-[40px] transform hover:rotate-0 transition-transform duration-700 shadow-2xl overflow-hidden glass border-white/20">
              <div className="absolute inset-0 blueprint-grid opacity-30"></div>
              
              {/* Parallax Floating Props */}
              <motion.div
                animate={{ 
                  y: [0, -30, 0],
                  x: [0, 15, 0],
                  rotate: [0, 10, 0] 
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 left-12 w-28 h-28 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex justify-center items-center shadow-2xl"
              >
                <Ruler className="text-white" size={48} />
              </motion.div>
              
               <motion.div
                animate={{ 
                  y: [0, 40, 0],
                  x: [0, -20, 0],
                  rotate: [0, -15, 0] 
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-24 right-12 w-36 h-36 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex justify-center items-center shadow-2xl"
              >
                <HardHat className="text-accent" size={64} />
              </motion.div>

              {/* Floating UI Card with extra depth */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ y: -10, rotate: -2 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-12 left-[-60px] bg-card/80 backdrop-blur-2xl p-8 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border flex gap-6 items-center z-20 w-[350px]"
              >
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <span className="font-bold font-heading text-xl tracking-tighter">99.9%</span>
                </div>
                <div>
                  <h4 className="font-bold text-base font-heading tracking-tight text-foreground">Structural Integrity</h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Certified blueprints meeting global and local municipal codes.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

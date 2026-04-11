"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// A custom animated counter component
function AnimatedCounter({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // Easing function: easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, to, from, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StatsSection() {
  const stats = [
    { label: "Projects Completed", value: 450, suffix: "+" },
    { label: "Happy Clients", value: 320, suffix: "+" },
    { label: "Years Experience", value: 12, suffix: "" },
    { label: "Design Awards", value: 15, suffix: "" },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-sidebar text-sidebar-foreground">
      {/* Blueprint background texture layered on primary color */}
      <div className="absolute inset-0 blueprint-grid opacity-20 filter invert brightness-0 dark:invert-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x-0 md:divide-x divide-primary-foreground/20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-4"
            >
              <div className="font-heading text-5xl md:text-6xl font-bold mb-2 flex items-center">
                <AnimatedCounter to={stat.value} />
                <span className="text-accent ml-1">{stat.suffix}</span>
              </div>
              <p className="font-medium text-primary-foreground/80 tracking-wide uppercase text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Box, Compass, FileText, Home, PencilRuler, Search } from "lucide-react";

// Helper to map DB icon strings to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Home,
  PencilRuler,
  Box,
  Compass,
  FileText,
  Search,
};

export function ServiceListClient({ services }: { services: { id: string, title: string, description: string, slug: string, icon?: string | null }[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
          Our specialized <span className="text-primary">Services</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Comprehensive civil engineering solutions tailored for developers, architects, and homeowners.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service) => {
          const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : Home;
          return (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-card-hover transition-all group outline outline-1 outline-transparent hover:outline-primary/20 flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <IconComponent size={28} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                {service.description}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-auto inline-flex items-center text-sm font-bold text-primary group-hover:text-accent transition-colors"
              >
                Explore Service <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

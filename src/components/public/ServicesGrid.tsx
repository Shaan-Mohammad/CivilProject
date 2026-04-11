"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Box, Compass, FileText, Home, PencilRuler, Search } from "lucide-react";

// For the dummy UI before dynamic data is wired, we use placeholder data that looks real.
const SERVICES = [
  {
    title: "Residential House Plans",
    description: "Custom floor plans and layouts optimized for natural light, ventilation, and your family's unique lifestyle.",
    icon: Home,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "2D CAD Drafting",
    description: "Highly accurate and detailed 2D architectural and structural drawings ready for municipal approval.",
    icon: PencilRuler,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "3D Elevation & Rendering",
    description: "Photorealistic 3D external elevations to visualize your building before construction begins.",
    icon: Box,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Structural Engineering",
    description: "Safe, efficient, and code-compliant structural designs reinforcing the core of your architectural vision.",
    icon: Compass,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Cost Estimation",
    description: "Detailed quantity takeoff and BOQ preparation to keep your construction budget strictly on track.",
    icon: FileText,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    title: "Site Inspection & Audit",
    description: "Professional site visits to ensure adherence to blueprints and evaluate structural integrity.",
    icon: Search,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesGrid() {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Our Core <span className="text-primary">Capabilities</span>
          </h2>
          <p className="text-muted-foreground text-lg text-balance">
            We bridge the gap between imagination and execution with industry-leading civil engineering services.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-card-hover transition-all group relative overflow-hidden"
            >
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className={`w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 relative z-10`}>
                <service.icon size={28} />
              </div>
              
              <h3 className="font-heading font-bold text-xl mb-3 relative z-10">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 relative z-10 text-pretty">
                {service.description}
              </p>
              
              <Link href="/services" className="inline-flex items-center text-sm font-bold text-primary group-hover:text-accent transition-colors relative z-10">
                Learn more <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

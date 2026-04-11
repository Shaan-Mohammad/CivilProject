"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Maximize2 } from "lucide-react";

// Placeholder data for MVP
const PROJECTS = [
  {
    id: 1,
    title: "Skyline Corporate Tower",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    slug: "skyline-tower",
  },
  {
    id: 2,
    title: "The Oasis Residences",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    slug: "oasis-residences",
  },
  {
    id: 3,
    title: "Metro City Bridge",
    category: "Infrastructure",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    slug: "metro-city-bridge",
  },
  {
    id: 4,
    title: "Eco Park Pavilion",
    category: "Public Sector",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=2000&auto=format&fit=crop",
    slug: "eco-park-pavilion",
  },
];

export function PortfolioGallery() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg text-balance">
              Explore our diverse portfolio of engineering excellence, from residential homes to massive commercial infrastructures.
            </p>
          </div>
          <Link href="/portfolio" className="group hidden justify-center md:flex items-center gap-2 font-bold text-accent hover:text-primary transition-colors">
            View All Projects 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
            >
              {/* Image using standard img tag for simplicity in MVP, but object-fit is handled */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-sidebar-background/90 via-sidebar-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-accent font-bold text-sm tracking-widest uppercase mb-2">
                  {project.category}
                </span>
                <h3 className="text-white font-heading text-2xl md:text-3xl font-bold mb-4">
                  {project.title}
                </h3>
                
                {/* Reveal on hover button */}
                <div className="flex items-center gap-2 text-white/opacity-0 group-hover:text-white transition-colors duration-500 opacity-0 group-hover:opacity-100 h-0 overflow-hidden group-hover:h-auto">
                  <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 font-bold text-sm hover:text-accent transition-colors">
                    View Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              
              {/* Top right icon */}
              <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 size={20} />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/portfolio" className="group flex items-center gap-2 font-bold text-primary hover:text-accent transition-colors bg-secondary px-6 py-3 rounded-xl w-full justify-center">
            View All Projects 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

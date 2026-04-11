"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Maximize2, ArrowRight } from "lucide-react";

export function PortfolioClient({ projects }: { projects: { id: string | number, category: string, title: string, slug: string, coverImage?: string | null }[] }) {
  // Find all unique categories
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-20 bg-background">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {categories.map((category, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === category
                ? "bg-primary text-white shadow-md"
                : "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary"
            }`}
          >
             {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {filteredProjects.map((project) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            key={project.id}
            className="group relative h-[300px] sm:h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
          >
            <img 
              src={project.coverImage || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-sidebar-background/90 via-sidebar-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-accent font-bold text-sm tracking-widest uppercase mb-2">
                {project.category}
              </span>
              <h3 className="text-white font-heading text-2xl font-bold mb-4">
                {project.title}
              </h3>
              
              <div className="flex items-center gap-2 text-white/opacity-0 group-hover:text-white transition-colors duration-500 opacity-0 group-hover:opacity-100 h-0 overflow-hidden group-hover:h-auto">
                <Link href={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 font-bold text-sm hover:text-accent transition-colors">
                  View Case Study <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            
            <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 size={20} />
            </div>
          </motion.div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground">
            No projects found for {activeCategory}.
          </div>
        )}
      </motion.div>
    </div>
  );
}

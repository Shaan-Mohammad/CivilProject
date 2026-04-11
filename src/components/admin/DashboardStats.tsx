"use client";

import { motion } from "framer-motion";
import { Users, FolderKanban, FileText, TrendingUp } from "lucide-react";

interface StatsProps {
  enquiriesCount: number;
  projectsCount: number;
  blogCount: number;
}

export function DashboardStats({ enquiriesCount, projectsCount, blogCount }: StatsProps) {
  const stats = [
    { label: "Total CRM Leads", value: enquiriesCount, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Portfolio Projects", value: projectsCount, icon: FolderKanban, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Published Insights", value: blogCount, icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Conversion Rate", value: "14%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <motion.div
           key={i}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: i * 0.1 }}
           className="bg-card p-6 rounded-xl border shadow-sm flex items-center gap-4 hover:shadow-card-hover transition-shadow"
        >
           <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${s.bg}`}>
             <s.icon size={24} className={s.color} />
           </div>
           <div>
             <p className="text-3xl font-heading font-bold">{s.value}</p>
             <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
           </div>
        </motion.div>
      ))}
    </div>
  );
}

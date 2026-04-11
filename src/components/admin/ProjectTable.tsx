"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, FolderKanban } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// A minimal table for Project CRM CMS.
// In a full production build, we would add the modal forms for add/edit operations here.
export function ProjectTable({ projects }: { projects: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-card rounded-xl border shadow-sm flex flex-col">
      <div className="p-6 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
             placeholder="Search projects by name..." 
             className="pl-10"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
           <Plus size={18} className="mr-2" /> Add New Project
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-4 font-semibold w-16">Cover</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Featured</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length > 0 ? (
              filtered.map(proj => (
                <tr key={proj.id} className="hover:bg-secondary/20 transition-colors group">
                  <td className="p-4">
                     <div className="w-10 h-10 rounded overflow-hidden bg-secondary border flex items-center justify-center">
                        {proj.coverImage ? (
                          <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover" />
                        ) : (
                          <FolderKanban size={16} className="text-muted-foreground opacity-50" />
                        )}
                     </div>
                  </td>
                  <td className="p-4 font-semibold">{proj.title}</td>
                  <td className="p-4 text-muted-foreground"><span className="text-xs bg-secondary border px-2 py-1 rounded font-bold uppercase tracking-wider">{proj.category}</span></td>
                  <td className="p-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">{proj.status}</td>
                  <td className="p-4">
                    {proj.featured ? (
                      <span className="inline-flex px-2 py-0.5 bg-accent/20 text-accent-foreground border border-accent/30 rounded text-xs font-bold uppercase tracking-wider">Yes</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-12 text-center text-muted-foreground">
                  <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
                     <FolderKanban size={24} className="opacity-50" />
                  </div>
                  <p className="font-medium">No projects found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

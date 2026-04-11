"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, MessageSquareQuote, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TestimonialTable({ testimonials }: { testimonials: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-card rounded-xl border shadow-sm flex flex-col min-h-[500px]">
      <div className="p-6 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
             placeholder="Search client names..." 
             className="pl-10"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
           <Plus size={18} className="mr-2" /> Add Review
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-4 font-semibold w-16">Avatar</th>
              <th className="p-4 font-semibold">Client Name</th>
              <th className="p-4 font-semibold">Rating</th>
              <th className="p-4 font-semibold">Content</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length > 0 ? (
               filtered.map(t => (
                 <tr key={t.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="p-4">
                       <div className="w-10 h-10 rounded-full bg-secondary border flex items-center justify-center overflow-hidden">
                          {t.avatar ? (
                            <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-bold text-muted-foreground text-xs uppercase">
                               {t.name.substring(0, 2)}
                            </span>
                          )}
                       </div>
                    </td>
                    <td className="p-4">
                       <p className="font-semibold text-foreground">{t.name}</p>
                       <p className="text-xs text-muted-foreground">{t.role}{t.company ? ` at ${t.company}` : ""}</p>
                    </td>
                    <td className="p-4 flex items-center gap-0.5 text-accent pt-6">
                       {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={14} className="fill-accent text-accent" />)}
                    </td>
                    <td className="p-4 max-w-[300px]">
                       <p className="text-xs text-muted-foreground line-clamp-2 italic">&quot;{t.content}&quot;</p>
                    </td>
                    <td className="p-4">
                       {t.isActive ? (
                         <span className="inline-flex px-2 py-0.5 bg-green-500/10 text-green-600 border border-green-500/20 rounded text-xs font-bold uppercase tracking-wider">Active</span>
                       ) : (
                         <span className="inline-flex px-2 py-0.5 bg-secondary text-muted-foreground border rounded text-xs font-bold uppercase tracking-wider">Hidden</span>
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
                     <MessageSquareQuote size={24} className="opacity-50" />
                  </div>
                  <p className="font-medium">No testimonials found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

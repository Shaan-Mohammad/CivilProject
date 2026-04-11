"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, FileText, Eye, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BlogTable({ posts }: { posts: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = posts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.author && p.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-card rounded-xl border shadow-sm flex flex-col min-h-[500px]">
      <div className="p-6 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
             placeholder="Search blog posts..." 
             className="pl-10"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
           <Plus size={18} className="mr-2" /> Write Post
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
              <th className="p-4 font-semibold">Author</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length > 0 ? (
               filtered.map(post => (
                 <tr key={post.id} className="hover:bg-secondary/20 transition-colors group">
                    <td className="p-4">
                       <div className="w-10 h-10 rounded overflow-hidden bg-secondary border flex items-center justify-center">
                          {post.coverImage ? (
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                          ) : (
                            <FileText size={16} className="text-muted-foreground opacity-50" />
                          )}
                       </div>
                    </td>
                    <td className="p-4">
                       <p className="font-semibold text-foreground line-clamp-1">{post.title}</p>
                       <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar size={12} />
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
                       </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                       {post.category ? (
                         <span className="text-xs bg-secondary border px-2 py-1 rounded font-bold uppercase tracking-wider">
                           {post.category.name}
                         </span>
                       ) : (
                         "—"
                       )}
                    </td>
                    <td className="p-4">
                       {post.published ? (
                         <span className="inline-flex px-2 py-0.5 bg-green-500/10 text-green-600 border border-green-500/20 rounded text-xs font-bold uppercase tracking-wider">Published</span>
                       ) : (
                         <span className="inline-flex px-2 py-0.5 bg-secondary text-muted-foreground border rounded text-xs font-bold uppercase tracking-wider">Draft</span>
                       )}
                    </td>
                    <td className="p-4 text-sm text-foreground/80 font-medium">
                       {post.author || "Admin"}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Eye size={16} />
                        </Button>
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
                     <FileText size={24} className="opacity-50" />
                  </div>
                  <p className="font-medium">No blog posts found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

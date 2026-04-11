"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye, Filter, MoreHorizontal, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function EnquiryPipeline({ enquiries }: { enquiries: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const statuses = [
    "ALL", 
    "NEW", 
    "QUALIFIED", 
    "QUOTE_SENT", 
    "NEGOTIATION", 
    "IN_PROGRESS", 
    "REVISION", 
    "DELIVERED", 
    "CLOSED", 
    "LOST"
  ];

  const filtered = enquiries.filter(enq => {
    const matchesSearch = enq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          enq.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          enq.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || enq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-card rounded-xl border shadow-sm flex flex-col min-h-[600px]">
      {/* Header Controls */}
      <div className="p-6 border-b flex flex-wrap gap-4 items-center justify-between bg-secondary/20">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
               placeholder="Search leads, companies..." 
               className="pl-10"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="shrink-0 hidden sm:flex">
             <Filter size={18} className="mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Kanban / Status Tabs representation (Horizontal Scroll) */}
      <div className="w-full overflow-x-auto border-b bg-card">
         <div className="flex p-3 gap-2 min-w-max">
            {statuses.map(status => (
              <button
                 key={status}
                 onClick={() => setStatusFilter(status)}
                 className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
                   statusFilter === status 
                   ? "bg-primary text-white shadow-md" 
                   : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                 }`}
              >
                 {status.replace("_", " ")}
                 <span className="ml-2 opacity-70">
                   ({status === "ALL" ? enquiries.length : enquiries.filter(e => e.status === status).length})
                 </span>
              </button>
            ))}
         </div>
      </div>

      {/* Table Data */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-4 font-semibold">Lead Info</th>
              <th className="p-4 font-semibold">Service Requirement</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Priority</th>
              <th className="p-4 font-semibold">Date Submitted</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length > 0 ? (
              filtered.map(enq => (
                <tr key={enq.id} className="hover:bg-secondary/20 transition-colors group">
                  <td className="p-4">
                    <p className="font-bold text-foreground">{enq.name}</p>
                    {enq.company && <p className="text-sm text-muted-foreground">{enq.company}</p>}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                       <span className="font-medium">{enq.service}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex px-2.5 py-1 rounded bg-secondary text-xs font-bold tracking-wider text-muted-foreground border">
                      {enq.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${enq.priority === 'HIGH' ? 'text-red-500' : enq.priority === 'URGENT' ? 'text-purple-600' : 'text-blue-500'}`}>
                      {enq.priority}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {new Date(enq.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/enquiries/${enq.id}`}>
                      <Button variant="ghost" size="sm" className="hidden group-hover:inline-flex border">
                        Manage <ArrowUpRight size={16} className="ml-2" />
                      </Button>
                      <Button variant="ghost" size="icon" className="inline-flex group-hover:hidden text-muted-foreground">
                         <MoreHorizontal size={18} />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-12 text-center text-muted-foreground">
                  <div className="mx-auto w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                     <Search size={32} className="opacity-50" />
                  </div>
                  <p className="font-medium text-lg">No enquiries found</p>
                  <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

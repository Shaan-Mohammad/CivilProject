"use client";

import { useState } from "react";
import { MailOpen, Mail, Search, Trash2, Reply } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function InboxTable({ messages }: { messages: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.subject && m.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-card rounded-xl border shadow-sm flex flex-col min-h-[500px]">
      <div className="p-6 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
             placeholder="Search sender name or email..." 
             className="pl-10"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <th className="p-4 font-semibold w-12"></th>
              <th className="p-4 font-semibold w-64">Sender</th>
              <th className="p-4 font-semibold">Subject / Message Summary</th>
              <th className="p-4 font-semibold w-32">Date</th>
              <th className="p-4 font-semibold text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border flex-1">
            {filtered.length > 0 ? (
               filtered.map(msg => (
                 <tr key={msg.id} className={`hover:bg-secondary/20 transition-colors group cursor-pointer ${!msg.isRead ? 'bg-secondary/10' : ''}`}>
                    <td className="p-4 text-muted-foreground text-center">
                       {msg.isRead ? <MailOpen size={16} className="opacity-50" /> : <Mail size={16} className="text-primary font-bold" />}
                    </td>
                    <td className="p-4">
                       <p className={`font-semibold text-foreground line-clamp-1 ${!msg.isRead ? 'text-primary' : ''}`}>
                         {msg.name}
                       </p>
                       <a href={`mailto:${msg.email}`} className="text-xs text-muted-foreground hover:underline hover:text-primary">
                         {msg.email}
                       </a>
                    </td>
                    <td className="p-4">
                       <p className={`text-sm mb-1 line-clamp-1 ${!msg.isRead ? 'font-bold text-foreground' : 'font-medium text-foreground/80'}`}>
                         {msg.subject || "General Inquiry"}
                       </p>
                       <p className="text-xs text-muted-foreground line-clamp-1 max-w-[500px]">
                         {msg.message}
                       </p>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground whitespace-nowrap">
                       {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50">
                          <Reply size={16} />
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
                <td colSpan={5} className="p-12 text-center text-muted-foreground">
                  <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-3">
                     <Mail size={24} className="opacity-50" />
                  </div>
                  <p className="font-medium">Inbox is empty</p>
                  <p className="text-sm mt-1">You are all caught up on primary messages!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

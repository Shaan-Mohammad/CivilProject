"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, Phone, Mail, FileText, UploadCloud, CornerDownRight, ExternalLink, Calendar, Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  updateEnquiryStatus, 
  updateEnquiryPriority, 
  addEnquiryNote 
} from "@/actions/crm";

export function EnquiryDetail({ enquiry }: { enquiry: any }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    await updateEnquiryStatus(enquiry.id, e.target.value);
    setIsUpdating(false);
    router.refresh();
  };

  const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUpdating(true);
    await updateEnquiryPriority(enquiry.id, e.target.value);
    setIsUpdating(false);
    router.refresh();
  };

  const handleAddNote = async () => {
    if (!noteContent.trim()) return;
    setIsUpdating(true);
    await addEnquiryNote(enquiry.id, { content: noteContent, type: "NOTE" });
    setNoteContent("");
    setIsUpdating(false);
    router.refresh();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Info Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Header Setup */}
        <div className="bg-card p-6 rounded-xl border shadow-sm flex items-start justify-between">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <h2 className="font-heading text-2xl font-bold text-foreground tracking-tight">{enquiry.name}</h2>
                 <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider border ${
                   enquiry.priority === 'HIGH' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 
                   enquiry.priority === 'URGENT' ? 'bg-purple-500/10 text-purple-600 border-purple-500/20' : 
                   'bg-blue-500/10 text-blue-600 border-blue-500/20'
                 }`}>
                   {enquiry.priority}
                 </span>
              </div>
              <p className="flex items-center text-sm text-muted-foreground gap-1.5 font-medium">
                 <FileText size={16} /> Scope: {enquiry.service} {enquiry.quoteRequest?.projectType ? `(${enquiry.quoteRequest.projectType})` : ""}
              </p>
           </div>
           
           <div className="text-right">
             <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Current Phase</p>
             <select 
               className="font-bold text-sm bg-accent/10 border border-accent/20 text-accent-foreground px-3 py-1.5 rounded-md appearance-none cursor-pointer hover:bg-accent/20 transition-colors"
               value={enquiry.status}
               onChange={handleStatusChange}
               disabled={isUpdating}
             >
                <option value="NEW">New Lead</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="QUOTE_SENT">Quote Sent</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="REVISION">Revision</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CLOSED">Closed (Success)</option>
                <option value="LOST">Lost</option>
             </select>
           </div>
        </div>

        {/* Deep Specs */}
        <div className="bg-card rounded-xl border shadow-sm">
           <h3 className="font-heading font-bold text-lg p-6 border-b">Project Details</h3>
           <div className="p-6">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                {enquiry.description}
              </p>
              
              {enquiry.quoteRequest && (
                <div className="mt-8 grid sm:grid-cols-3 gap-4 border-t pt-8">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Plot Area</p>
                    <p className="font-semibold">{enquiry.quoteRequest.plotArea || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Floors</p>
                    <p className="font-semibold">{enquiry.quoteRequest.floors || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Est. Budget</p>
                    <p className="font-semibold">{enquiry.quoteRequest.budget || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Timeline</p>
                    <p className="font-semibold">{enquiry.quoteRequest.timeline || "N/A"}</p>
                  </div>
                </div>
              )}
           </div>
        </div>

        {/* Files Attached */}
        <div className="bg-card rounded-xl border shadow-sm">
           <div className="flex items-center justify-between p-6 border-b">
             <h3 className="font-heading font-bold text-lg flex items-center gap-2">
               <UploadCloud size={20} className="text-primary"/> Assigned Documents
             </h3>
             <span className="text-sm font-semibold bg-secondary px-2 rounded-md">{enquiry.files.length}</span>
           </div>
           <div className="p-6 divide-y divide-border">
             {enquiry.files.length > 0 ? (
               enquiry.files.map((file: any) => (
                 <div key={file.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm line-clamp-1">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}</p>
                    </div>
                    <a href={file.url} target="_blank" rel="noreferrer" className="w-8 h-8 flex flex-col items-center justify-center rounded-md bg-secondary hover:bg-primary/20 hover:text-primary transition-colors">
                      <ExternalLink size={16} />
                    </a>
                 </div>
               ))
             ) : (
               <p className="text-sm text-muted-foreground pb-2">No documents attached to this enquiry.</p>
             )}
           </div>
        </div>
        
      </div>

      {/* Sidebar Info */}
      <div className="lg:col-span-1 space-y-6">
        
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <h3 className="font-heading font-bold text-lg mb-4">Contact Info</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 size={16} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Company</p>
                <p className="text-sm font-medium">{enquiry.company || "Individual"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Email</p>
                <a href={`mailto:${enquiry.email}`} className="text-sm font-medium text-primary hover:underline">{enquiry.email}</a>
              </div>
            </div>
            {enquiry.phone && (
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Phone</p>
                  <a href={`tel:${enquiry.phone}`} className="text-sm font-medium">{enquiry.phone}</a>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Calendar size={16} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Created At</p>
                <p className="text-sm font-medium">{new Date(enquiry.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-6 pt-6 flex flex-col gap-2">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Edit Priority Level</p>
            <select 
             className="w-full text-sm font-semibold bg-secondary border border-border px-3 py-2 rounded-md appearance-none cursor-pointer"
             value={enquiry.priority}
             onChange={handlePriorityChange}
             disabled={isUpdating}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
        </div>

        {/* Internal Activity Notes */}
        <div className="bg-card rounded-xl border shadow-sm flex flex-col h-[500px]">
          <div className="p-6 border-b shrink-0 flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg">Activity Flow</h3>
            <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">Internal</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
             {enquiry.notes.length > 0 ? (
               enquiry.notes.map((note: any) => (
                 <div key={note.id} className="relative pl-6">
                    <CornerDownRight size={16} className="absolute left-0 top-1 text-muted-foreground" />
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-sm font-medium leading-relaxed">{note.content}</p>
                      <p className="text-xs text-muted-foreground mt-2 font-semibold">
                         {new Date(note.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                      </p>
                    </div>
                 </div>
               ))
             ) : (
               <p className="text-sm text-muted-foreground text-center italic py-4">No activity notes recorded yet.</p>
             )}
          </div>
          <div className="p-4 border-t shrink-0 bg-secondary/20">
             <Textarea 
               placeholder="Add an internal note or progress update..." 
               className="mb-2 min-h-[80px] bg-background"
               value={noteContent}
               onChange={(e) => setNoteContent(e.target.value)}
               disabled={isUpdating}
             />
             <Button onClick={handleAddNote} disabled={isUpdating || !noteContent.trim()} className="w-full">
               <Plus size={16} className="mr-2" /> Add Note
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

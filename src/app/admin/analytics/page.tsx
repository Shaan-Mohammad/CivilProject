import { BarChart3, Users, MousePointerClick, Activity } from "lucide-react";
import { db } from "@/lib/db";

export const metadata = {
  title: "Analytics | Admin Dashboard",
};

export default async function AnalyticsPage() {
  const events = await db.analyticsEvent.findMany({
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
         <h1 className="font-heading text-3xl font-bold">Platform Analytics</h1>
         <p className="text-muted-foreground mt-1">Monitor web traffic, conversion events, and page views historically.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="bg-card border shadow-sm rounded-xl p-6 lg:col-span-2 min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <BarChart3 size={48} className="opacity-20 mb-4" />
            <p className="font-semibold">Traffic Chart Configuration Pending</p>
            <p className="text-sm text-center max-w-sm mt-2">Historical traffic aggregations will go here based on raw table events. Vercel Analytics provides automatic mapping natively.</p>
         </div>
         
         <div className="bg-card border shadow-sm rounded-xl flex flex-col overflow-hidden">
            <div className="p-6 border-b shrink-0 bg-secondary/30">
               <h3 className="font-heading font-bold text-lg flex items-center gap-2"><Activity size={18} className="text-primary" /> Live Event Stream</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
               {events.length > 0 ? (
                 events.map((ev: any) => (
                   <div key={ev.id} className="p-3 bg-secondary/50 rounded-lg text-sm flex gap-3">
                      <div className="mt-0.5 opacity-50 shrink-0">
                         {ev.event === "PAGE_VIEW" ? <MousePointerClick size={16}/> : <Users size={16}/>}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{ev.event}</p>
                        <p className="text-xs text-muted-foreground mt-1">{ev.page} • {new Date(ev.createdAt).toLocaleString([], { timeStyle: 'short', dateStyle: 'short' })}</p>
                      </div>
                   </div>
                 ))
               ) : (
                 <p className="text-sm text-center text-muted-foreground italic py-10">No recent telemetry sent by the tracker yet.</p>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

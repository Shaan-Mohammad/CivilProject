import { db } from "@/lib/db";
import { Users, FolderKanban, FileText, Activity } from "lucide-react";
import Link from "next/link";
import { DashboardStats } from "@/components/admin/DashboardStats";

export default async function AdminDashboardPage() {
  const [
    enquiriesCount,
    projectsCount,
    blogCount,
    recentEnquiries,
    activeProjects
  ] = await Promise.all([
    db.enquiry.count(),
    db.project.count(),
    db.blogPost.count(),
    db.enquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    db.project.findMany({ where: { status: { not: "COMPLETED" } }, take: 4 })
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold">Dashboard Hub</h1>
      </div>

      {/* KPI Cards */}
      <DashboardStats 
         enquiriesCount={enquiriesCount}
         projectsCount={projectsCount}
         blogCount={blogCount}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Recent Enquiries */}
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
             <h2 className="font-heading text-xl font-bold flex items-center gap-2">
               <Users className="text-primary" size={20} /> Latest Leads
             </h2>
             <Link href="/admin/enquiries" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
               View All
             </Link>
          </div>
          
          <div className="space-y-4">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border hover:bg-secondary/80 transition-colors">
                   <div>
                     <p className="font-semibold text-foreground">{enquiry.name}</p>
                     <p className="text-xs text-muted-foreground">{enquiry.service}</p>
                   </div>
                   <div className="text-right">
                     <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-accent/20 text-accent-foreground border border-accent/30">
                       {enquiry.status}
                     </span>
                     <p className="text-xs text-muted-foreground mt-1">
                       {new Date(enquiry.createdAt).toLocaleDateString()}
                     </p>
                   </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm py-4">No recent leads found.</p>
            )}
          </div>
        </div>

        {/* Active Projects */}
        <div className="bg-card rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
             <h2 className="font-heading text-xl font-bold flex items-center gap-2">
               <FolderKanban className="text-primary" size={20} /> Active Projects
             </h2>
             <Link href="/admin/projects" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
               Manage
             </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {activeProjects.length > 0 ? (
              activeProjects.map((project) => (
                <div key={project.id} className="p-4 rounded-lg bg-secondary/50 border hover:bg-secondary/80 transition-colors">
                   <p className="text-xs text-accent font-bold mb-1 uppercase line-clamp-1">{project.category}</p>
                   <p className="font-semibold text-foreground text-sm line-clamp-2 leading-tight">{project.title}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm py-4 col-span-2">No active projects right now.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

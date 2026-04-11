import { db } from "@/lib/db";
import { ProjectTable } from "@/components/admin/ProjectTable";

export const metadata = {
  title: "Projects Hub | Admin Dashboard",
};

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
         <h1 className="font-heading text-3xl font-bold">Portfolio CRM</h1>
         <p className="text-muted-foreground mt-1">Manage infrastructure, residential, and commercial portfolios.</p>
      </div>

      <ProjectTable projects={projects} />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Tag } from "lucide-react";
import { db } from "@/lib/db";
import { CTASection } from "@/components/public/CTASection";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await db.project.findUnique({ where: { slug: params.slug } });
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Portfolio | CivilDraft Pro`,
    description: project.description.slice(0, 150) + "...",
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await db.project.findUnique({ 
    where: { slug: params.slug },
    include: { images: true } 
  });
  
  if (!project) {
    notFound();
  }

  // Related projects
  const relatedProjects = await db.project.findMany({
    where: { category: project.category, id: { not: project.id }, status: "COMPLETED" },
    take: 3,
  });

  return (
    <>
      <section className="bg-sidebar-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold tracking-wide uppercase mb-6">
              {project.category}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white leading-tight text-balance">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Image Banner */}
      <section className="-mt-10 relative z-20 px-4">
        <div className="container mx-auto max-w-5xl rounded-3xl overflow-hidden glass shadow-2xl border-white/20 aspect-video">
           <img 
              src={project.coverImage || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"} 
              alt={project.title} 
              className="w-full h-full object-cover"
           />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-4 gap-12">
            
            {/* Meta Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-secondary/50 rounded-2xl p-6 border shadow-sm">
                <h3 className="font-heading text-lg font-bold mb-6 border-b pb-3">Project Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2"><Tag size={14}/> Client</p>
                    <p className="font-medium text-foreground">{project.client || "Confidential"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2"><MapPin size={14}/> Location</p>
                    <p className="font-medium text-foreground">{project.location || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2"><Calendar size={14}/> Completed</p>
                    <p className="font-medium text-foreground">
                      {project.completedAt ? new Date(project.completedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long' }) : "Ongoing"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content properly parsed */}
            <div className="lg:col-span-3 prose prose-lg prose-slate max-w-none">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">About The Project</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                  {project.description.split('\n').filter(Boolean).map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>

              {project.images && project.images.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Gallery</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                     {project.images.map((img: { id: string; url: string; caption?: string | null }) => (
                       <img key={img.id} src={img.url} alt={img.caption || "Project Image"} className="rounded-xl w-full h-48 object-cover" />
                     ))}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-secondary/50 border-t">
          <div className="container mx-auto px-4 max-w-5xl">
            <h3 className="font-heading text-3xl font-bold mb-10 text-center">Related Projects</h3>
            <div className="grid sm:grid-cols-3 gap-6">
               {relatedProjects.map((rp: { id: string; slug: string; title: string; category: string; coverImage?: string | null }) => (
                 <Link href={`/portfolio/${rp.slug}`} key={rp.id} className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md block">
                    <img 
                      src={rp.coverImage || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"} 
                      alt={rp.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-accent text-xs font-bold uppercase">{rp.category}</span>
                      <h4 className="text-white font-heading font-bold">{rp.title}</h4>
                    </div>
                 </Link>
               ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}

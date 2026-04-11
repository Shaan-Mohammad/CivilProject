import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { db } from "@/lib/db";
import { CTASection } from "@/components/public/CTASection";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await db.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | CivilDraft Pro Blog`,
    description: post.excerpt || post.content.substring(0, 150),
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await db.blogPost.findUnique({ 
    where: { slug: params.slug },
    include: { category: true }
  });
  
  if (!post || !post.published) {
    notFound();
  }

  // Increment views in a real app you'd do an API call counting it uniquely, 
  // but for MVP we don't necessarily update inside a Server Component directly to avoid side effect warnings,
  // or we could do `db.blogPost.update` directly since it's Next 14.
  // Skipping view count increment for now to prevent hydration/build warnings.

  const tags = post.tags ? post.tags.split(",").map((t: string) => t.trim()) : [];

  return (
    <>
      <section className="bg-sidebar-background py-16 relative overflow-hidden">
         <div className="absolute inset-0 blueprint-grid opacity-10"></div>
         <div className="container relative z-10 mx-auto px-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors mb-8 font-medium text-sm">
                <ArrowLeft size={16} /> Back to Insights
            </Link>
            
            <div className="max-w-4xl mx-auto text-center">
              {post.category && (
                <div className="inline-flex px-3 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  {post.category.name}
                </div>
              )}
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-white leading-tight text-balance">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
                <div className="flex items-center gap-2"><User size={16} /> {post.author || "Admin"}</div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} /> 
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recent"}
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="-mt-8 relative z-20 px-4">
          <div className="container mx-auto max-w-4xl rounded-2xl overflow-hidden glass shadow-2xl border-white/20 aspect-[21/9]">
             <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
             />
          </div>
        </section>
      )}

      {/* Post Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none text-muted-foreground">
             {/* For MVP we map paragraphs. In production, use a markdown renderer */}
             {post.content.split('\n').filter(Boolean).map((p: string, i: number) => (
               <p key={i} className="mb-6 leading-relaxed text-foreground/80">{p}</p>
             ))}
          </div>
          
          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t flex items-center flex-wrap gap-3">
               <Tag size={18} className="text-muted-foreground mr-2" />
               {tags.map((tag: string) => (
                 <span key={tag} className="px-3 py-1 bg-secondary text-foreground rounded-full text-xs font-medium"> # {tag}</span>
               ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}

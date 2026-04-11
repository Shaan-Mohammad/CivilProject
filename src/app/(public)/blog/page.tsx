import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { CTASection } from "@/components/public/CTASection";

export const metadata = {
  title: "Engineering Insights | CivilDraft Pro Blog",
  description: "Read our latest insights, case studies, and civil engineering news.",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { published: true },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <section className="bg-sidebar-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-white text-balance">
            Engineering <span className="text-accent">Insights</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Stay up to date with the latest advancements in civil engineering, architectural design, and municipal code compliance.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group bg-card rounded-2xl border shadow-sm hover:shadow-card-hover transition-all flex flex-col overflow-hidden h-full">
                <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden">
                  <img 
                    src={post.coverImage || "https://images.unsplash.com/photo-1541888086925-ebca89506691?q=80&w=1000&auto=format&fit=crop"} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {post.category && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                      {post.category.name}
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                     <Calendar size={14} />
                     <time>
                       {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                     </time>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm flex-grow mb-6 line-clamp-3">
                    {post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + "..."}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center text-sm font-bold text-accent group-hover:text-primary transition-colors">
                    Read Article <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}

            {posts.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No blog posts available at this time.
              </div>
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

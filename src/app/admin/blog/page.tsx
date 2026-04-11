import { db } from "@/lib/db";
import { BlogTable } from "@/components/admin/BlogTable";

export const metadata = {
  title: "Blog CMS | Admin Dashboard",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
         <h1 className="font-heading text-3xl font-bold">Content Editor</h1>
         <p className="text-muted-foreground mt-1">Manage articles, design guides, and regulatory updates.</p>
      </div>

      <BlogTable posts={posts} />
    </div>
  );
}

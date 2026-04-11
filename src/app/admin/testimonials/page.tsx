import { db } from "@/lib/db";
import { TestimonialTable } from "@/components/admin/TestimonialTable";

export const metadata = {
  title: "Testimonials CMS | Admin Dashboard",
};

export default async function TestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
         <h1 className="font-heading text-3xl font-bold">Client Reviews</h1>
         <p className="text-muted-foreground mt-1">Manage public testimonials, rankings, and structural proof points.</p>
      </div>

      <TestimonialTable testimonials={testimonials} />
    </div>
  );
}

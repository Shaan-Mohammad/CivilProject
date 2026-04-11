import { db } from "@/lib/db";
import { EnquiryPipeline } from "@/components/admin/EnquiryPipeline";

export const metadata = {
  title: "CRM Pipeline | Admin Dashboard",
};

export default async function EnquiriesPage() {
  const enquiries = await db.enquiry.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="font-heading text-3xl font-bold">Enquiries Pipeline</h1>
           <p className="text-muted-foreground mt-1">Manage leads, track quote requests, and progress active projects.</p>
        </div>
      </div>

      <EnquiryPipeline enquiries={enquiries} />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { EnquiryDetail } from "@/components/admin/EnquiryDetail";

export const metadata = {
  title: "Enquiry Details | Admin Dashboard",
};

export default async function EnquiryDetailPage({ params }: { params: { id: string } }) {
  const enquiry = await db.enquiry.findUnique({
    where: { id: params.id },
    include: {
      notes: { orderBy: { createdAt: "desc" } },
      files: true,
      quoteRequest: true,
    }
  });

  if (!enquiry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/enquiries" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-foreground transition-colors group">
         <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
         Back to Pipeline
      </Link>
      
      <EnquiryDetail enquiry={enquiry} />
    </div>
  );
}

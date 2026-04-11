import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const session = await auth();
  
  const [enquiryCount, projectCount, testimonialCount, messageCount] = await Promise.all([
    db.enquiry.count(),
    db.project.count(),
    db.testimonial.count(),
    db.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {session?.user?.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Total Enquiries</p>
          <p className="text-3xl font-bold mt-2">{enquiryCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Projects</p>
          <p className="text-3xl font-bold mt-2">{projectCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Testimonials</p>
          <p className="text-3xl font-bold mt-2">{testimonialCount}</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <p className="text-sm text-muted-foreground">Unread Messages</p>
          <p className="text-3xl font-bold mt-2">{messageCount}</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Full dashboard UI will be built in Phase 4. 
        Schema, auth, seed data, and middleware are operational.
      </p>
    </div>
  );
}

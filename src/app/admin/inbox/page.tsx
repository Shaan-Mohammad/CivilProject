import { db } from "@/lib/db";
import { InboxTable } from "@/components/admin/InboxTable";

export const metadata = {
  title: "Admin Inbox | CivilDraft Pro",
};

export default async function InboxPage() {
  const messages = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div>
         <h1 className="font-heading text-3xl font-bold">Mail Inbox</h1>
         <p className="text-muted-foreground mt-1">General inquiries and contacts waiting for response.</p>
      </div>

      <InboxTable messages={messages} />
    </div>
  );
}

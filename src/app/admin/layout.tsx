import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Admin sidebar and header will be added in Phase 4 */}
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}

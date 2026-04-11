import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin Dashboard | CivilDraft Pro",
  description: "Secure administrative dashboard for CivilDraft Pro.",
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-secondary/30 relative">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-8 flex flex-col min-h-screen">
        <div className="mx-auto w-full max-w-7xl flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Inbox, 
  FolderKanban, 
  FileText, 
  MessageSquareQuote, 
  Settings, 
  BarChart3,
  LogOut,
  ShieldAlert
} from "lucide-react";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { APP_NAME } from "@/lib/constants";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Enquiries (CRM)", href: "/admin/enquiries", icon: Users },
  { name: "Inbox", href: "/admin/inbox", icon: Inbox },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Blog Posts", href: "/admin/blog", icon: FileText },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground h-screen sticky top-0 flex flex-col border-r border-sidebar-border shadow-lg">
      <div className="p-6 border-b border-sidebar-border bg-sidebar flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-md">
           <ShieldAlert size={18} className="text-white" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-lg leading-none tracking-tight">{APP_NAME}</h2>
          <span className="text-xs text-sidebar-foreground/60 uppercase tracking-wider font-bold">Admin Panel</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon size={18} className={isActive ? "opacity-100" : "opacity-70"} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-sidebar-border bg-sidebar flex items-center justify-between">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}

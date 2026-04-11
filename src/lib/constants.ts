// ─── App-Wide Constants ───────────────────────────────────────────────

export const APP_NAME = "CivilDraft Pro";
export const APP_DESCRIPTION =
  "Professional civil engineering drafting, design, and consultation services. Get expert house plans, CAD drafting, 3D elevations, structural layouts, and cost estimation.";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// ─── Navigation ───────────────────────────────────────────────────────
export const PUBLIC_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Enquiries", href: "/admin/enquiries", icon: "Inbox" },
  { label: "Projects", href: "/admin/projects", icon: "FolderKanban" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "Star" },
  { label: "Blog", href: "/admin/blog", icon: "FileText" },
  { label: "Settings", href: "/admin/settings", icon: "Settings" },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
] as const;

// ─── Services ─────────────────────────────────────────────────────────
export const SERVICE_CATEGORIES = [
  "Residential House Plans",
  "2D CAD Drafting",
  "3D Elevation Design",
  "Structural Basic Layouts",
  "Cost Estimation",
  "Quantity Takeoff",
  "Consultation",
] as const;

// ─── Portfolio Categories ─────────────────────────────────────────────
export const PORTFOLIO_CATEGORIES = [
  "All",
  "Residential",
  "Commercial",
  "Structural",
  "Interior",
  "Renovation",
] as const;

// ─── File Upload ──────────────────────────────────────────────────────
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/dwg",
  "application/dxf",
  "application/zip",
  "application/x-rar-compressed",
] as const;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

// ─── Pagination ───────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// ─── Social Links (defaults, overridable via SiteSettings) ───────────
export const DEFAULT_SOCIAL_LINKS = {
  whatsapp: "+91XXXXXXXXXX",
  phone: "+91XXXXXXXXXX",
  email: "info@civildraftpro.com",
  address: "Engineering Hub, Sector 15, Gurgaon, Haryana 122001",
  facebook: "https://facebook.com/civildraftpro",
  instagram: "https://instagram.com/civildraftpro",
  linkedin: "https://linkedin.com/company/civildraftpro",
  twitter: "https://twitter.com/civildraftpro",
} as const;

// ─── Theme ────────────────────────────────────────────────────────────
export const THEME_COLORS = {
  primary: "#0052A3",
  primaryLight: "#1A73E8",
  primaryDark: "#003D7A",
  accent: "#FFD000",
  accentDark: "#E6BB00",
} as const;

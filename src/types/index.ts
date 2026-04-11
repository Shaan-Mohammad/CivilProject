// ─── Enquiry Status Enum ──────────────────────────────────────────────
export const EnquiryStatus = {
  NEW: "NEW",
  QUALIFIED: "QUALIFIED",
  QUOTE_SENT: "QUOTE_SENT",
  NEGOTIATION: "NEGOTIATION",
  IN_PROGRESS: "IN_PROGRESS",
  REVISION: "REVISION",
  DELIVERED: "DELIVERED",
  CLOSED: "CLOSED",
  LOST: "LOST",
} as const;

export type EnquiryStatus = (typeof EnquiryStatus)[keyof typeof EnquiryStatus];

export const ENQUIRY_STATUS_OPTIONS: {
  value: EnquiryStatus;
  label: string;
  color: string;
}[] = [
  { value: "NEW", label: "New", color: "bg-blue-500" },
  { value: "QUALIFIED", label: "Qualified", color: "bg-indigo-500" },
  { value: "QUOTE_SENT", label: "Quote Sent", color: "bg-purple-500" },
  { value: "NEGOTIATION", label: "Negotiation", color: "bg-amber-500" },
  { value: "IN_PROGRESS", label: "In Progress", color: "bg-cyan-500" },
  { value: "REVISION", label: "Revision", color: "bg-orange-500" },
  { value: "DELIVERED", label: "Delivered", color: "bg-emerald-500" },
  { value: "CLOSED", label: "Closed", color: "bg-green-600" },
  { value: "LOST", label: "Lost", color: "bg-red-500" },
];

// ─── Priority Enum ────────────────────────────────────────────────────
export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  URGENT: "URGENT",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const PRIORITY_OPTIONS: {
  value: Priority;
  label: string;
  color: string;
}[] = [
  { value: "LOW", label: "Low", color: "bg-gray-400" },
  { value: "MEDIUM", label: "Medium", color: "bg-blue-400" },
  { value: "HIGH", label: "High", color: "bg-orange-400" },
  { value: "URGENT", label: "Urgent", color: "bg-red-500" },
];

// ─── Enquiry Source Enum ──────────────────────────────────────────────
export const EnquirySource = {
  WEBSITE: "WEBSITE",
  REFERRAL: "REFERRAL",
  SOCIAL: "SOCIAL",
  DIRECT: "DIRECT",
  OTHER: "OTHER",
} as const;

export type EnquirySource =
  (typeof EnquirySource)[keyof typeof EnquirySource];

// ─── Note Type Enum ──────────────────────────────────────────────────
export const NoteType = {
  NOTE: "NOTE",
  STATUS_CHANGE: "STATUS_CHANGE",
  SYSTEM: "SYSTEM",
} as const;

export type NoteType = (typeof NoteType)[keyof typeof NoteType];

// ─── Project Status Enum ─────────────────────────────────────────────
export const ProjectStatus = {
  PLANNING: "PLANNING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
} as const;

export type ProjectStatus =
  (typeof ProjectStatus)[keyof typeof ProjectStatus];

// ─── Site Setting Type Enum ──────────────────────────────────────────
export const SettingType = {
  TEXT: "TEXT",
  NUMBER: "NUMBER",
  BOOLEAN: "BOOLEAN",
  JSON: "JSON",
  IMAGE: "IMAGE",
} as const;

export type SettingType = (typeof SettingType)[keyof typeof SettingType];

// ─── Analytics Event Types ───────────────────────────────────────────
export const AnalyticsEventType = {
  PAGE_VIEW: "PAGE_VIEW",
  QUOTE_REQUEST: "QUOTE_REQUEST",
  CONTACT_FORM: "CONTACT_FORM",
  CTA_CLICK: "CTA_CLICK",
  SERVICE_VIEW: "SERVICE_VIEW",
  PORTFOLIO_VIEW: "PORTFOLIO_VIEW",
  BLOG_VIEW: "BLOG_VIEW",
  FILE_DOWNLOAD: "FILE_DOWNLOAD",
} as const;

export type AnalyticsEventType =
  (typeof AnalyticsEventType)[keyof typeof AnalyticsEventType];

// ─── Inferred Prisma Types (re-export for convenience) ───────────────
export type { 
  User,
  Enquiry,
  EnquiryNote,
  UploadedFile,
  Service,
  Project,
  ProjectImage,
  Testimonial,
  BlogPost,
  BlogCategory,
  FAQ,
  SiteSetting,
  AnalyticsEvent,
  ContactMessage,
  QuoteRequest,
} from "@prisma/client";

// ─── Extended Types ──────────────────────────────────────────────────
import type {
  Enquiry as PrismaEnquiry,
  EnquiryNote as PrismaEnquiryNote,
  UploadedFile as PrismaUploadedFile,
  QuoteRequest as PrismaQuoteRequest,
  Project as PrismaProject,
  ProjectImage as PrismaProjectImage,
  BlogPost as PrismaBlogPost,
  BlogCategory as PrismaBlogCategory,
} from "@prisma/client";

export type EnquiryWithRelations = PrismaEnquiry & {
  notes: PrismaEnquiryNote[];
  files: PrismaUploadedFile[];
  quoteRequest: PrismaQuoteRequest | null;
};

export type ProjectWithRelations = PrismaProject & {
  images: PrismaProjectImage[];
  files: PrismaUploadedFile[];
};

export type BlogPostWithCategory = PrismaBlogPost & {
  category: PrismaBlogCategory | null;
};

// ─── API Response Types ──────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Dashboard Stats ─────────────────────────────────────────────────
export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  activeProjects: number;
  totalRevenue: string;
  conversionRate: number;
  enquiriesByStatus: Record<string, number>;
  recentEnquiries: PrismaEnquiry[];
  monthlyTrend: { month: string; count: number }[];
}

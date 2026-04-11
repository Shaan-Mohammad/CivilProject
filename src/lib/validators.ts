import { z } from "zod";
import { EnquiryStatus, Priority, EnquirySource } from "@/types";

// ─── Helper Validators ────────────────────────────────────────────────
const phoneRegex = /^[+]?[\d\s()-]{7,20}$/;

// ─── Enquiry Status Enum Validator ────────────────────────────────────
const enquiryStatusValues = [
  "NEW",
  "QUALIFIED",
  "QUOTE_SENT",
  "NEGOTIATION",
  "IN_PROGRESS",
  "REVISION",
  "DELIVERED",
  "CLOSED",
  "LOST",
] as const;

const priorityValues = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
const sourceValues = ["WEBSITE", "REFERRAL", "SOCIAL", "DIRECT", "OTHER"] as const;

// ─── Contact Form ─────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Quote Request Form ───────────────────────────────────────────────
export const quoteRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  serviceType: z.string().min(1, "Please select a service type"),
  projectType: z.string().optional().or(z.literal("")),
  plotArea: z.string().optional().or(z.literal("")),
  floors: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  description: z.string().min(20, "Please provide at least 20 characters of detail").max(5000),
});

export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;

// ─── Enquiry (Admin) ──────────────────────────────────────────────────
export const enquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  service: z.string().min(1),
  status: z.enum(enquiryStatusValues).default("NEW"),
  priority: z.enum(priorityValues).default("MEDIUM"),
  budget: z.string().optional().or(z.literal("")),
  description: z.string().min(1),
  source: z.enum(sourceValues).default("WEBSITE"),
  assignedTo: z.string().optional().or(z.literal("")),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const enquiryStatusUpdateSchema = z.object({
  status: z.enum(enquiryStatusValues),
});

export const enquiryNoteSchema = z.object({
  content: z.string().min(1, "Note cannot be empty").max(5000),
  type: z.enum(["NOTE", "STATUS_CHANGE", "SYSTEM"]).default("NOTE"),
});

export type EnquiryNoteFormData = z.infer<typeof enquiryNoteSchema>;

// ─── Service ──────────────────────────────────────────────────────────
export const serviceSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  description: z.string().min(10).max(1000),
  longDescription: z.string().optional().or(z.literal("")),
  icon: z.string().optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  features: z.string().optional().or(z.literal("")), // JSON string
  order: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

// ─── Project ──────────────────────────────────────────────────────────
export const projectSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  description: z.string().min(10),
  client: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  category: z.string().min(1),
  status: z.string().default("COMPLETED"),
  completedAt: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  coverImage: z.string().optional().or(z.literal("")),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// ─── Testimonial ──────────────────────────────────────────────────────
export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().optional().or(z.literal("")),
  role: z.string().optional().or(z.literal("")),
  content: z.string().min(10).max(2000),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  avatar: z.string().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

// ─── Blog Post ────────────────────────────────────────────────────────
export const blogPostSchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  excerpt: z.string().optional().or(z.literal("")),
  content: z.string().min(10),
  coverImage: z.string().optional().or(z.literal("")),
  author: z.string().optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
  tags: z.string().optional().or(z.literal("")),
  published: z.boolean().default(false),
  publishedAt: z.string().optional().or(z.literal("")),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// ─── Blog Category ────────────────────────────────────────────────────
export const blogCategorySchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
});

export type BlogCategoryFormData = z.infer<typeof blogCategorySchema>;

// ─── FAQ ──────────────────────────────────────────────────────────────
export const faqSchema = z.object({
  question: z.string().min(5).max(500),
  answer: z.string().min(10).max(5000),
  slug: z.string().optional().or(z.literal("")),
  category: z.string().optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export type FAQFormData = z.infer<typeof faqSchema>;

// ─── Site Setting ─────────────────────────────────────────────────────
export const siteSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string(),
  type: z.enum(["TEXT", "NUMBER", "BOOLEAN", "JSON", "IMAGE"]).default("TEXT"),
  group: z.string().default("general"),
  label: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});

export type SiteSettingFormData = z.infer<typeof siteSettingSchema>;

// ─── Login ────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

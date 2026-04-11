"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import {
  serviceSchema,
  projectSchema,
  testimonialSchema,
  blogPostSchema,
  faqSchema,
  type ServiceFormData,
  type ProjectFormData,
  type TestimonialFormData,
  type BlogPostFormData,
  type FAQFormData,
} from "@/lib/validators";
import { ActionResponse } from "./crm";

async function requireAdmin() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }
}

// ─── Generic DB Action Wrapper ───────────────────────────────────────
async function executeAdminAction<T>(
  actionFn: () => Promise<T>,
  successMsg: string,
  pathsToRevalidate: string[] = []
): Promise<ActionResponse<T>> {
  try {
    await requireAdmin();
    const data = await actionFn();
    pathsToRevalidate.forEach((p) => revalidatePath(p));
    return { success: true, message: successMsg, data };
  } catch (error: unknown) {
    console.error(`Action error:`, error);
    return { success: false, message: error instanceof Error ? error.message : "An error occurred." };
  }
}

// ─── SERVICES ────────────────────────────────────────────────────────
export async function createService(data: ServiceFormData) {
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  return executeAdminAction(
    () => db.service.create({ data: parsed.data }),
    "Service created successfully",
    ["/admin/services", "/services", "/"]
  );
}

export async function updateService(id: string, data: ServiceFormData) {
  const parsed = serviceSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  return executeAdminAction(
    () => db.service.update({ where: { id }, data: parsed.data }),
    "Service updated successfully",
    ["/admin/services", "/services", `/services/${parsed.data.slug}`, "/"]
  );
}

export async function deleteService(id: string) {
  return executeAdminAction(
    () => db.service.delete({ where: { id } }),
    "Service deleted successfully",
    ["/admin/services", "/services", "/"]
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────
export async function createProject(data: ProjectFormData) {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  // Adjust completedAt string to Date if needed
  const dbData = {
    ...parsed.data,
    completedAt: parsed.data.completedAt ? new Date(parsed.data.completedAt) : null,
  };

  return executeAdminAction(
    () => db.project.create({ data: dbData }),
    "Project created successfully",
    ["/admin/projects", "/portfolio", "/"]
  );
}

export async function updateProject(id: string, data: ProjectFormData) {
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  const dbData = {
    ...parsed.data,
    completedAt: parsed.data.completedAt ? new Date(parsed.data.completedAt) : null,
  };

  return executeAdminAction(
    () => db.project.update({ where: { id }, data: dbData }),
    "Project updated successfully",
    ["/admin/projects", "/portfolio", `/portfolio/${parsed.data.slug}`, "/"]
  );
}

export async function deleteProject(id: string) {
  return executeAdminAction(
    () => db.project.delete({ where: { id } }),
    "Project deleted successfully",
    ["/admin/projects", "/portfolio", "/"]
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────
export async function createTestimonial(data: TestimonialFormData) {
  const parsed = testimonialSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  return executeAdminAction(
    () => db.testimonial.create({ data: parsed.data }),
    "Testimonial created successfully",
    ["/admin/testimonials", "/"]
  );
}

export async function updateTestimonial(id: string, data: TestimonialFormData) {
  const parsed = testimonialSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  return executeAdminAction(
    () => db.testimonial.update({ where: { id }, data: parsed.data }),
    "Testimonial updated successfully",
    ["/admin/testimonials", "/"]
  );
}

export async function deleteTestimonial(id: string) {
  return executeAdminAction(
    () => db.testimonial.delete({ where: { id } }),
    "Testimonial deleted successfully",
    ["/admin/testimonials", "/"]
  );
}

// ─── BLOG POSTS ──────────────────────────────────────────────────────
export async function createBlogPost(data: BlogPostFormData) {
  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  const dbData = {
    ...parsed.data,
    publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
  };

  return executeAdminAction(
    () => db.blogPost.create({ data: dbData }),
    "Blog post created successfully",
    ["/admin/blog", "/blog"]
  );
}

export async function updateBlogPost(id: string, data: BlogPostFormData) {
  const parsed = blogPostSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  const dbData = {
    ...parsed.data,
    publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
  };

  return executeAdminAction(
    () => db.blogPost.update({ where: { id }, data: dbData }),
    "Blog post updated successfully",
    ["/admin/blog", "/blog", `/blog/${parsed.data.slug}`]
  );
}

export async function deleteBlogPost(id: string) {
  return executeAdminAction(
    () => db.blogPost.delete({ where: { id } }),
    "Blog post deleted successfully",
    ["/admin/blog", "/blog"]
  );
}

// ─── FAQS ────────────────────────────────────────────────────────────
export async function createFAQ(data: FAQFormData) {
  const parsed = faqSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  return executeAdminAction(
    () => db.fAQ.create({ data: parsed.data }),
    "FAQ created successfully",
    ["/admin/faqs", "/faq", "/"]
  );
}

export async function updateFAQ(id: string, data: FAQFormData) {
  const parsed = faqSchema.safeParse(data);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  return executeAdminAction(
    () => db.fAQ.update({ where: { id }, data: parsed.data }),
    "FAQ updated successfully",
    ["/admin/faqs", "/faq", "/"]
  );
}

export async function deleteFAQ(id: string) {
  return executeAdminAction(
    () => db.fAQ.delete({ where: { id } }),
    "FAQ deleted successfully",
    ["/admin/faqs", "/faq", "/"]
  );
}

// ─── SITE SETTINGS ───────────────────────────────────────────────────
export async function updateSiteSettings(settings: { key: string; value: string }[]) {
  try {
    await requireAdmin();
    // Use transaction to update multiple settings
    await db.$transaction(
      settings.map((setting) =>
        db.siteSetting.update({
          where: { key: setting.key },
          data: { value: setting.value },
        })
      )
    );
    
    revalidatePath("/", "layout"); // Revalidate the whole app layout since settings are global
    return { success: true, message: "Settings updated successfully" };
  } catch (error: unknown) {
    console.error("updateSiteSettings error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to update settings" };
  }
}

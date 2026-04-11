"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import {
  contactSchema,
  quoteRequestSchema,
  enquiryStatusUpdateSchema,
  enquiryNoteSchema,
  type ContactFormData,
  type QuoteRequestFormData,
  type EnquiryNoteFormData,
} from "@/lib/validators";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ActionResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
};

/**
 * Ensures the caller is an authenticated admin.
 * Throws an error if not.
 */
async function requireAdmin() {
  const session = await auth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }
  return session.user;
}

// ─── Public Actions ───────────────────────────────────────────────────

/**
 * Handle public contact form submission.
 * Creates a NEW Enquiry in the database.
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ActionResponse> {
  try {
    const parsedData = contactSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors,
      };
    }

    const { name, email, phone, subject, message } = parsedData.data;

    // Create an Enquiry and a ContactMessage record depending on requirements
    // Creating Enquiry to act as CRM entry point
    const enquiry = await db.enquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        description: `Subject: ${subject || "General Inquiry"}\nMessage: ${message}`,
        source: "WEBSITE",
        status: "NEW",
        priority: "MEDIUM",
        service: "General Consultation",
      },
    });

    // Also store separately as a contact message for legacy views
    await db.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject: subject || "Contact Form Submission",
        message,
        isRead: false,
      },
    });

    // Log the creation
    await db.enquiryNote.create({
      data: {
        enquiryId: enquiry.id,
        content: "Enquiry automatically created from Contact Form submission.",
        type: "SYSTEM",
        createdBy: "System",
      },
    });

    return { success: true, message: "Thank you for reaching out. We will contact you soon." };
  } catch (error) {
    console.error("submitContactForm error:", error);
    return { success: false, message: "An unexpected error occurred. Please try again later." };
  }
}

/**
 * Handle public quote request form submission.
 * Creates an Enquiry and links it to QuoteRequest and optionally UploadedFiles.
 */
export async function submitQuoteRequest(
  data: QuoteRequestFormData,
  fileIds: string[] = [] // Optional IDs of files uploaded via API beforehand
): Promise<ActionResponse> {
  try {
    const parsedData = quoteRequestSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors,
      };
    }

    const {
      name,
      email,
      phone,
      serviceType,
      projectType,
      plotArea,
      floors,
      budget,
      timeline,
      description,
    } = parsedData.data;

    const [enquiry, quoteRequest] = await db.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Create Enquiry
      const enq = await tx.enquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          service: serviceType,
          budget: budget || null,
          description: `Quote request for ${serviceType}. Project details: ${description}`,
          source: "WEBSITE",
          status: "NEW", // Starts natively in "NEW"
          priority: "HIGH", // Quote requests are generally high priority
        },
      });

      // 2. Create the detailed Quote request
      const quote = await tx.quoteRequest.create({
        data: {
          name,
          email,
          phone: phone || null,
          serviceType,
          projectType: projectType || null,
          plotArea: plotArea || null,
          floors: floors || null,
          budget: budget || null,
          timeline: timeline || null,
          description,
          enquiryId: enq.id,
        },
      });

      // 3. System Note
      await tx.enquiryNote.create({
        data: {
          enquiryId: enq.id,
          content: "Quote Request generated an enquiry. Review detailed form.",
          type: "SYSTEM",
          createdBy: "System",
        },
      });

      // 4. Attach files if provided
      if (fileIds && fileIds.length > 0) {
        await tx.uploadedFile.updateMany({
          where: { id: { in: fileIds } },
          data: { quoteRequestId: quote.id },
        });
      }

      return [enq, quote];
    });

    return { 
      success: true, 
      message: "Your quote request has been submitted successfully.",
      data: { enquiryId: enquiry.id, quoteRequestId: quoteRequest.id }
    };
  } catch (error) {
    console.error("submitQuoteRequest error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

// ─── Protected Actions (Admin) ────────────────────────────────────────

/**
 * Updates an enquiry's current pipeline status and adds an automatic log note.
 */
export async function updateEnquiryStatus(
  enquiryId: string,
  newStatusStr: string
): Promise<ActionResponse> {
  try {
    const adminUser = await requireAdmin();

    const parsedStatus = enquiryStatusUpdateSchema.safeParse({ status: newStatusStr });
    if (!parsedStatus.success) {
      return { success: false, message: "Invalid status value." };
    }
    const newStatus = parsedStatus.data.status;

    const enquiry = await db.enquiry.findUnique({
      where: { id: enquiryId },
      select: { status: true },
    });

    if (!enquiry) {
      return { success: false, message: "Enquiry not found." };
    }

    if (enquiry.status === newStatus) {
      return { success: false, message: "Status is already set to the provided value." };
    }

    await db.$transaction([
      db.enquiry.update({
        where: { id: enquiryId },
        data: { status: newStatus },
      }),
      db.enquiryNote.create({
        data: {
          enquiryId,
          content: `Status changed from ${enquiry.status} to ${newStatus}`,
          type: "STATUS_CHANGE",
          createdBy: adminUser.name || "Admin",
        },
      }),
    ]);

    revalidatePath(`/admin/enquiries/${enquiryId}`);
    revalidatePath("/admin/enquiries");

    return { success: true, message: `Status updated to ${newStatus}` };
  } catch (error: unknown) {
    console.error("updateEnquiryStatus error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to update status." };
  }
}

/**
 * Add a manual note to the enquiry timeline.
 */
export async function addEnquiryNote(
  enquiryId: string,
  data: EnquiryNoteFormData
): Promise<ActionResponse> {
  try {
    const adminUser = await requireAdmin();

    const parsedData = enquiryNoteSchema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: parsedData.error.flatten().fieldErrors,
      };
    }

    const { content, type } = parsedData.data;

    await db.enquiryNote.create({
      data: {
        enquiryId,
        content,
        type,
        createdBy: adminUser.name || "Admin",
      },
    });

    revalidatePath(`/admin/enquiries/${enquiryId}`);

    return { success: true, message: "Note added successfully." };
  } catch (error: unknown) {
    console.error("addEnquiryNote error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Failed to add note." };
  }
}

export async function updateEnquiryPriority(enquiryId: string, priority: string) {
  try {
    await requireAdmin();
    const updated = await db.enquiry.update({
      where: { id: enquiryId },
      data: { priority },
    });
    revalidatePath(`/admin/enquiries/${enquiryId}`);
    revalidatePath("/admin/enquiries");
    return { success: true, enquiry: updated };
  } catch (error: unknown) {
    console.error("Failed to update enquiry priority:", error);
    return { success: false, message: "Failed to update priority" };
  }
}

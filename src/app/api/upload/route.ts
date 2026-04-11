import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { MAX_FILE_SIZE } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const enquiryId = formData.get("enquiryId") as string | null;
    const projectId = formData.get("projectId") as string | null;
    const quoteRequestId = formData.get("quoteRequestId") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await storage.upload(buffer, file.name, file.type);

    const uploadedFile = await db.uploadedFile.create({
      data: {
        name: file.name,
        url,
        size: file.size,
        type: file.type,
        enquiryId: enquiryId || undefined,
        projectId: projectId || undefined,
        quoteRequestId: quoteRequestId || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      data: uploadedFile,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

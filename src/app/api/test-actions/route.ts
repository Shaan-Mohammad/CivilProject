import { NextResponse } from "next/server";
import { submitContactForm } from "@/actions/crm";

export async function GET() {
  const result = await submitContactForm({
    name: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    subject: "Test Inquiry",
    message: "This is a test message to verify the server action.",
  });

  return NextResponse.json(result);
}

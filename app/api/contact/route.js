import { NextResponse } from "next/server";
import {connectDB} from "@/utils/connectToDb";
import Contact from "@/models/contact";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create new contact
    const contact = await Contact.create(body);
    
    return NextResponse.json(
      { message: "Message sent successfully", contact },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

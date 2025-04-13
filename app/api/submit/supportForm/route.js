import { connectDB } from "@/utils/connectToDb"
import supportFormJoiSchema from "@/schemas/supportForm"; // Adjust the path
import SupportForm from "@/models/supportForm"; // Mongoose model
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    
    // Validate the form data
    const { error, value } = supportFormJoiSchema.validate(body, { 
      abortEarly: false,
      stripUnknown: true // Remove any fields that aren't in the schema
    });

    if (error) {
      const errorMessages = error.details.map((err) => ({
        field: err.path[0],
        message: err.message
      }));
      return NextResponse.json({ success: false, errors: errorMessages }, { status: 400 });
    }

    // Create and save the support form
    const newSupportForm = new SupportForm(value);
    await newSupportForm.save();

    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully",
      data: newSupportForm 
    }, { status: 201 });
  } catch (err) {
    console.error('Support form submission error:', err);
    return NextResponse.json({ 
      success: false, 
      error: "An error occurred while processing your request" 
    }, { status: 500 });
  }
}

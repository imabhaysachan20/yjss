import { connectDB } from "@/utils/connectToDb"
import supportFormJoiSchema from "@/schemas/supportForm"; // Adjust the path
import SupportForm from "@/models/supportForm"; // Mongoose model
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const { error, value } = supportFormJoiSchema.validate(body, { abortEarly: false });

    if (error) {
      return NextResponse.json({ error: error.details.map((err) => err.message) }, { status: 400 });
    }

    const newSupportForm = new SupportForm(value);
    await newSupportForm.save();

    return NextResponse.json({ success: true, data: newSupportForm }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

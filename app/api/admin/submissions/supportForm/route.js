import { connectDB } from "@/utils/connectToDb"
import SupportForm from "@/models/supportForm"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    
    const submissions = await SupportForm.find()
      .sort({ submittedAt: -1 }) // Sort by newest first
    
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    )
  }
} 
import { connectDB } from "@/utils/connectToDb"
import Donners from "@/models/Active"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    
    const submissions = await Donners.find()
      .sort({ membershipDate: -1 }) // Sort by newest first
      console.log(submissions)
    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    )
  }
} 
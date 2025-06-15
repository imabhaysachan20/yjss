import { connectDB } from "@/utils/connectToDb"
import { NextResponse } from "next/server"
import Pricing from "@/models/Pirice"
export async function POST(req) {
  try {
    await connectDB();
    const {form} = req.json();
     const pricing = await Pricing.find({
      form
    });

    if (!pricing) {
      return NextResponse.json(
        { error: "No pricing found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pricing);
  } catch (error) {
    console.error('Error fetching:', error)
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    )
  }
} 
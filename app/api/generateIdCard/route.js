import { connectDB } from "@/utils/connectToDb";
import Member from "@/models/Member";
import sharp from "sharp";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request) {
  try {
    await connectDB();

    const { mobileNumber } = await request.json();
    if (!mobileNumber) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    const member = await Member.findOne({ mob: mobileNumber });
    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    const formattedDate = member.membershipDate
      ? new Date(member.membershipDate).toLocaleDateString("hi-IN")
      : "";

    // serif base64 (truncated for brevity)
  

    const svgContent = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#74ebd5" />
            <stop offset="100%" stop-color="#ACB6E5" />
          </linearGradient>
        </defs>
       
      </svg>
    `;

    const buffer = await sharp(Buffer.from(svgContent))
      .png()
      .toBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
      },
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

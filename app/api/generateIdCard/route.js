import { connectDB } from "@/utils/connectToDb";
import Member from "@/models/Member";
import MemberA from "@/models/Active";
import MemberD from "@/models/Doner";
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

const hindiFontPath = path.resolve(process.cwd(), "public/font/NotoSansDevanagari-Regular.ttf");
const logoPath = path.resolve(process.cwd(), "public/logo.png");


export async function POST(request) {
  try {
    await connectDB();

    const { mobileNumber } = await request.json();
    if (!mobileNumber) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    let member = await Member.findOne({ mob: mobileNumber });
    if (!member) {
      member = await MemberA.findOne({mob:mobileNumber})
      if(!member) {
        member = await MemberD.findOne({mob:mobileNumber})
        if (!member) {
          return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
      }
    }
    
   

    return NextResponse.json(member, {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

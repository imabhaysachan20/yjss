import { connectDB } from "@/utils/connectToDb";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

const hindiFontPath = path.resolve(process.cwd(), "public/font/NotoSansDevanagari-Regular.ttf");

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

    // Embed Hindi font
    const hindiFontBytes = fs.readFileSync(hindiFontPath);
    const pdfDoc = await PDFDocument.create();
    // Dynamically require fontkit and register on the instance
    const fontkit = require("fontkit");
    pdfDoc.registerFontkit(fontkit);
    const hindiFont = await pdfDoc.embedFont(hindiFontBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage([600, 400]);

    // Draw background gradient (approximate with rectangles)
    page.drawRectangle({
      x: 0, y: 0, width: 600, height: 400,
      color: rgb(0.67, 0.92, 0.84), // #ACB6E5 (approx)
    });
    page.drawRectangle({
      x: 0, y: 200, width: 600, height: 200,
      color: rgb(0.45, 0.92, 0.84), // #74ebd5 (approx)
      opacity: 0.5,
    });
    // Draw border
    page.drawRectangle({
      x: 10, y: 10, width: 580, height: 380,
      borderColor: rgb(0.17, 0.24, 0.31),
      borderWidth: 5,
      color: undefined,
    });

    // Draw Hindi and English text
    page.drawText("युवा जनता संघर्ष समिति", {
      x: 120, y: 340, size: 28, font: hindiFont, color: rgb(0.17, 0.24, 0.31),
    });
    page.drawText("Membership ID Card", {
      x: 200, y: 310, size: 16, font, color: rgb(0.20, 0.29, 0.37),
    });
    page.drawText(`ID: ${member.userId || ""}`, { x: 50, y: 270, size: 18, font, color: rgb(0.17, 0.24, 0.31) });
    page.drawText(`Name: ${member.name || ""}`, { x: 50, y: 240, size: 18, font, color: rgb(0.17, 0.24, 0.31) });
    page.drawText(`Mobile No: ${member.mob || ""}`, { x: 50, y: 210, size: 18, font, color: rgb(0.17, 0.24, 0.31) });
    page.drawText(`Date of Join: ${formattedDate}`, { x: 50, y: 180, size: 18, font, color: rgb(0.17, 0.24, 0.31) });
    page.drawText(`Lok Sabha: ${member.loksabha || ""}`, { x: 50, y: 150, size: 18, font: hindiFont, color: rgb(0.17, 0.24, 0.31) });
    page.drawText(`Vidhan Sabha: ${member.vidansabha || ""}`, { x: 50, y: 120, size: 18, font: hindiFont, color: rgb(0.17, 0.24, 0.31) });
    page.drawText(`District: ${member.district || ""}`, { x: 50, y: 90, size: 18, font: hindiFont, color: rgb(0.17, 0.24, 0.31) });
    page.drawText(`State: ${member.state || ""}`, { x: 50, y: 60, size: 18, font: hindiFont, color: rgb(0.17, 0.24, 0.31) });
    page.drawText("मोबाइल नंबर: 7676366014 | सदस्यता ग्रहण करने के लिए आपका धन्यवाद।", {
      x: 50, y: 30, size: 14, font: hindiFont, color: rgb(0.15, 0.66, 0.38),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdfBytes.length,
        "Content-Disposition": "inline; filename=IDCard.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

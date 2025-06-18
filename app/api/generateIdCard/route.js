import { connectDB } from "@/utils/connectToDb";
import Member from "@/models/Member";
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

    // Draw modern gradient background (top to bottom, #F53D3D shades)
    for (let i = 0; i < 400; i += 10) {
      const t = i / 400;
      // Gradient from #F53D3D to a lighter shade
      const r = 0.96;
      const g = 0.24 + 0.30 * t; // from 61 to ~137
      const b = 0.24 + 0.50 * t; // from 61 to ~186
      page.drawRectangle({
        x: 0, y: 400 - i - 10, width: 600, height: 10,
        color: rgb(r, g, b),
      });
    }

    // Card shadow (darker red shadow)
    page.drawRectangle({
      x: 35, y: 25, width: 530, height: 350,
      color: rgb(0.6, 0.1, 0.1),
      opacity: 0.10,
      borderRadius: 18,
    });

    // Card with rounded corners (white)
    page.drawRectangle({
      x: 30, y: 30, width: 530, height: 340,
      color: rgb(1, 1, 1),
      borderRadius: 16,
    });

    // Border (main theme color)
    page.drawRectangle({
      x: 30, y: 30, width: 530, height: 340,
      borderColor: rgb(0.96, 0.24, 0.24),
      borderWidth: 4,
      color: undefined,
      borderRadius: 16,
    });

    // Logo: embed and draw logo.png instead of ellipse and text
    const logoBytes = fs.readFileSync(logoPath);
    const logoImage = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImage.scale(56 / logoImage.height); // 56px height (similar to previous ellipse diameter)
    page.drawImage(logoImage, {
      x: 48, // left margin
      y: 300, // vertical position to align with previous ellipse
      width: logoDims.width,
      height: logoDims.height,
    });

    // Title (centered, theme color)
    page.drawText("Yuva Janta Sangarsh Samiti", {
      x: 150, y: 335, size: 24, font, color: rgb(0.96, 0.24, 0.24),
    });
    // Subtitle (centered, dark gray)
    page.drawText("Membership ID Card", {
      x: 200, y: 310, size: 16, font, color: rgb(0.20, 0.20, 0.20),
    });

    // Draw a horizontal line under the title (theme color)
    page.drawRectangle({
      x: 120, y: 330, width: 360, height: 2,
      color: rgb(0.96, 0.24, 0.24),
      opacity: 0.7,
    });

    // Info fields (aligned left, with labels bold)
    const labelFontSize = 15;
    const valueFontSize = 17;
    let y = 270;
    const leftX = 80;
    const gap = 40; // increased gap for better vertical spacing since there are fewer fields
    page.drawText("ID:", { x: leftX, y, size: labelFontSize, font, color: rgb(0.5, 0.1, 0.1), });
    page.drawText(`${member.userId || ""}`, { x: leftX + 60, y, size: valueFontSize, font, color: rgb(0.20, 0.20, 0.20), });
    y -= gap;
    page.drawText("Name:", { x: leftX, y, size: labelFontSize, font, color: rgb(0.5, 0.1, 0.1), });
    page.drawText(`${member.name || ""}`, { x: leftX + 60, y, size: valueFontSize, font, color: rgb(0.20, 0.20, 0.20), });
    y -= gap;
    page.drawText("Mobile No:", { x: leftX, y, size: labelFontSize, font, color: rgb(0.5, 0.1, 0.1), });
    page.drawText(`${member.mob || ""}`, { x: leftX + 90, y, size: valueFontSize, font, color: rgb(0.20, 0.20, 0.20), });
    y -= gap;
    page.drawText("Date of Join:", { x: leftX, y, size: labelFontSize, font, color: rgb(0.5, 0.1, 0.1), });
    page.drawText(`${formattedDate}`, { x: leftX + 110, y, size: valueFontSize, font, color: rgb(0.20, 0.20, 0.20), });
    y -= gap;
    page.drawText("State:", { x: leftX, y, size: labelFontSize, font, color: rgb(0.5, 0.1, 0.1), });
    page.drawText(`${member.state || ""}`, { x: leftX + 70, y, size: valueFontSize, font, color: rgb(0.20, 0.20, 0.20), });

    // Footer message (centered, theme color)
    
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

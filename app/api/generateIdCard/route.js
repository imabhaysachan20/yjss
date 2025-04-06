import { connectDB } from "@/utils/connectToDb";
import Member from "@/models/Member";
import sharp from "sharp";
import { NextResponse } from "next/server";

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

    const svgContent = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <!-- Background Gradient -->
        <defs>
          <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#74ebd5" />
            <stop offset="100%" stop-color="#ACB6E5" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        
        <!-- Border -->
        <rect x="10" y="10" width="580" height="380" fill="none" stroke="#2c3e50" stroke-width="5" rx="15" ry="15" />

        <!-- Header -->
        <text x="50%" y="60" font-family="Noto Sans Devanagari, Arial" font-size="28" font-weight="bold" fill="#2c3e50" text-anchor="middle">
          युवा जनता संघर्ष समिति
        </text>

        <!-- Sub-header -->
        <text x="50%" y="100" font-family="Arial" font-size="16" font-weight="bold" fill="#34495e" text-anchor="middle">
          Membership ID Card
        </text>

        <!-- Body -->
        <text x="50" y="140" font-family="Arial" font-size="18" fill="#2c3e50">
          ID: ${member.userId || ""}
        </text>
        <text x="50" y="170" font-family="Arial" font-size="18" fill="#2c3e50">
          Name: ${member.name || ""}
        </text>
        <text x="50" y="200" font-family="Arial" font-size="18" fill="#2c3e50">
          Mobile No: ${member.mob || ""}
        </text>
        <text x="50" y="230" font-family="Arial" font-size="18" fill="#2c3e50">
          Date of Join: ${formattedDate}
        </text>
        <text x="50" y="260" font-family="Arial" font-size="18" fill="#2c3e50">
          Lok Sabha: ${member.loksabha || ""}
        </text>
        <text x="50" y="290" font-family="Arial" font-size="18" fill="#2c3e50">
          Vidhan Sabha: ${member.vidansabha || ""}
        </text>
        <text x="50" y="320" font-family="Arial" font-size="18" fill="#2c3e50">
          District: ${member.district || ""}
        </text>
        <text x="50" y="350" font-family="Arial" font-size="18" fill="#2c3e50">
          State: ${member.state || ""}
        </text>

        <!-- Footer -->
        <text x="50%" y="380" font-family="Noto Sans Devanagari, Arial" font-size="16" fill="#27ae60" text-anchor="middle">
          मोबाइल नंबर: 7676366014 | सदस्यता ग्रहण करने के लिए आपका धन्यवाद।
        </text>
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

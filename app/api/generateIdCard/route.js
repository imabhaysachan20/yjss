import { connectDB } from "@/utils/connectToDb";
import Member from "@/models/Member";
import MemberA from "@/models/Active";
import MemberD from "@/models/Doner";
import { NextResponse } from "next/server";


export async function POST(request) {
  const MEMBER_TYPE = "Thank You For Accepting The Membership.";
  try {
    await connectDB();

    const { mobileNumber } = await request.json();
    if (!mobileNumber) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
    }

    let member = await Member.findOne({ mob: mobileNumber });
    if (!member) {
      member = await MemberA.findOne({mob:mobileNumber})
      MEMBER_TYPE="Thank you for accepting the active membership."
      if(!member) {
        member = await MemberD.findOne({mob:mobileNumber})
        MEMBER_TYPE="Thank you for supporting the organization."
        if (!member) {
          return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
      }
    }
    console.log({...member,MEMBER_TYPE})
   

    return NextResponse.json({...member._doc,MEMBER_TYPE}, {
      status: 200,
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

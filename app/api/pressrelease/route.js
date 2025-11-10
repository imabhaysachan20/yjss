import { NextResponse } from "next/server"
import { connectDB } from '@/utils/connectToDb';
import PressRelease from "@/models/PressRelease"

export async function GET() {
  await connectDB()
  const releases = await PressRelease.find().sort({ date: -1 })
  return NextResponse.json(releases)
}

export async function POST(request) {
  await connectDB()
  const body = await request.json()
  
  // body will include: { title, description, date, pdfBase64 }
  const newRelease = await PressRelease.create({
    title: body.title,
    description: body.description,
    date: body.date,
    pdfUrl: body.pdfBase64, // save Base64 string
  })

  return NextResponse.json(newRelease, { status: 201 })
}

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from "@/utils/connectToDb"
import Member from '@/models/Active';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData } = await request.json();

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(text)
      .digest('hex');

    if (signature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Connect to database
    await connectDB();

    // Create new member
    const member = new Member({
      ...formData,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: 'success'
    });

    await member.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

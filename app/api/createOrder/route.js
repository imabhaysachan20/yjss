import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});
const amounts = {
  'newMember':10000,
  'activeMember':25100,
}

export async function POST(request) {

  try {
    const data = await request.json();
    const amount = 0;
    if (!data.membership_type) {
      return NextResponse.json({ message:"invalid request" }, { status: 400 });
    }
    if (!Object.keys(amounts).includes(data.membership_type) ) {
      return NextResponse.json({ message:"invalid request" }, { status: 400 });
    }
    if (data.membership_type=='donate') {
      
      const amount = Number(data.amount);
      if (!amount) {
        return NextResponse.json({ message:"invalid request" }, { status: 400 });
      }

    }
    const options = {
      amount:data.membership_type=='donate'?amount: Number(amounts[data.membership_type]),
      currency: "INR",
      receipt: `receipt_${data.userId}`,
      notes: {
        userId: data.userId
      }
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

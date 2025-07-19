import connectDB from '@/config/db'
import User from '@/models/User'
import { getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const authInfo = getAuth(request);
    console.log('getAuth(request) output:', authInfo);
    const { userId } = authInfo;

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
    }
    const { cartData } = body;

    if (!cartData) {
      return NextResponse.json({ success: false, message: "cartData is required" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    user.cartItems = cartData;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
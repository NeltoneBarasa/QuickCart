import connectDB from "@/config/db"
import Address from "@/models/Address"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const authInfo = getAuth(request);
    console.log("getAuth output:", authInfo);
    const { userId } = authInfo;
    const { address } = await request.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized: userId is missing." }, { status: 401 });
    }

    await connectDB();
    const newAddress = await Address.create({ ...address, userId });

    return NextResponse.json({ success: true, message: 'Address added successfully', newAddress });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: 'GET handler working for /api/user/add-address' });
}
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    await connectDB();
    let user = await User.findById(userId);

    if (!user) {
      // Fetch user info from Clerk
      let name = "New User";
      let email = userId ? `${userId}@unknown.local` : "unknown@example.com";
      let imageUrl = "https://ui-avatars.com/api/?name=User";
      if (userId) {
        try {
          const clerkUser = await clerkClient.users.getUser(userId);
          name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || name;
          email = clerkUser.emailAddresses?.[0]?.emailAddress || `${userId}@unknown.local`;
          imageUrl = clerkUser.imageUrl || imageUrl;
        } catch (err) {
          // Clerk user not found, use unique fallback
          email = `${userId}@unknown.local`;
        }
      }
      user = await User.create({
        _id: userId,
        name,
        email,
        imageUrl,
        cartItems: {}
      });
    }
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
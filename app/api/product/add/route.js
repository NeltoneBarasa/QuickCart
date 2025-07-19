import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import Product from "../../../../models/Product";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      console.error("No userId found in auth");
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Parse form data
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = Number(formData.get("price"));
    const offerPrice = Number(formData.get("offerPrice"));
    const images = formData.getAll("images").map(file => file.name);

    // Validation
    if (!name || !description || !category || !price || !offerPrice || !images.length) {
      console.error("Validation failed", { name, description, category, price, offerPrice, images });
      return NextResponse.json({ success: false, message: "All fields are required and at least one image must be uploaded." }, { status: 400 });
    }

    console.log("Received product data:", { userId, name, description, category, price, offerPrice, images });

    // Create product
    let product;
    try {
      product = await Product.create({
        userId,
        name,
        description,
        category,
        price,
        offerPrice,
        image: images,
        date: Date.now(),
      });
      console.log("Created product:", product);
    } catch (err) {
      console.error("Mongoose create error:", err);
      return NextResponse.json({ success: false, message: "Database error: " + err.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Product add error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
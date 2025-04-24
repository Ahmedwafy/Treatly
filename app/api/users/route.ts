import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import connectDb from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, phone, password } = await req.json();

  // make sure all fields are provided
  if (!name || !email || !phone || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connectDb();

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // create a new user
    const newUser = new User({
      name,
      email,
      phone,
      password, // Schemas will handle hashing
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}

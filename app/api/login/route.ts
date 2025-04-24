// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";
import connectDb from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    await connectDb();

    const user = await User.findOne(
      { email: email.toLowerCase() },
      { password: 1 }
    );
    console.log("User from DB:", user);

    if (!user || !user.password) {
      console.log("User not found or password missing");
      return NextResponse.json(
        { message: "User not found or password missing" },
        { status: 401 }
      );
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Login successful" });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

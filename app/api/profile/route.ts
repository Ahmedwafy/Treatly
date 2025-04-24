// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../lib/models/User";
import connectDb from "../../../lib/db";

interface JwtPayload {
  userId: string;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Cookies:", req.cookies);

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // check if token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // connect to the database
    await connectDb();

    // check if user exists in the database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // return user data without password
    return NextResponse.json({
      user: { name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    // handle token verification errors
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}

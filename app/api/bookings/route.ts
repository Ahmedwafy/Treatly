// app/api/bookings/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDb from "@/lib/db";
import Booking from "@/lib/models/Booking";
import User from "@/lib/models/User";

interface JwtPayload {
  userId: string;
}

// Show bookings for the logged-in user
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    await connectDb();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const bookings = await Booking.find({ user: user._id });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// Add a new booking for the logged-in user
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    await connectDb();

    const body = await req.json();
    const { service, date, time } = body;

    if (!service || !date || !time) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const newBooking = await Booking.create({
      service,
      date,
      time,
      user: decoded.userId,
      status: "pending",
    });

    return NextResponse.json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

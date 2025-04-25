// app/api/bookings/cancel/[bookingId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import Booking from "@/lib/models/Booking";
import connectDb from "@/lib/db";

// @ts-expect-error: Ignoring the implicit any issue for context
export async function POST(req: NextRequest, context) {
  const { bookingId } = context.params;

  try {
    await connectDb();

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    // change status to "cancelled"
    booking.status = "cancelled";
    await booking.save();

    return NextResponse.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

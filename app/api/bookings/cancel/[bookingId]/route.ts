// app/api/bookings/cancel/[bookingId]/route.ts

// use this api to cancel a booking by changing its status
// to "cancelled" in the database.

import { NextRequest, NextResponse } from "next/server";
import Booking from "@/lib/models/Booking";
import connectDb from "@/lib/db";

export async function POST(
  req: NextRequest,
  context: { params: { bookingId: string } }
) {
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

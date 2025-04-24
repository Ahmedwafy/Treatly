// app/api/bookings/[userId]/route.ts
// show bookings for a specific user
import Booking from "@/lib/models/Booking";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const bookings = await Booking.find({ user: userId }).populate(
      "user",
      "name email"
    );
    return NextResponse.json(bookings, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "Error fetching bookings" },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

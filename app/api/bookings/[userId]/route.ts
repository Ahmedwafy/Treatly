// app/api/bookings/[userId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    await connectDb();

    const bookings = await Booking.find({ user: userId }).populate(
      "user",
      "name email"
    );

    return NextResponse.json(bookings, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "An unknown error occurred while fetching bookings.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

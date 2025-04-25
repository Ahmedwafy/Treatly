// app/api/bookings/[userId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db";
import Booking from "@/lib/models/Booking";

// @ts-expect-error: Ignoring the implicit any issue for context
export async function GET(req: NextRequest, context) {
  const { userId } = context.params;

  if (!userId) {
    return NextResponse.json(
      { error: "User ID not provided" },
      { status: 400 }
    );
  }

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
        : "Something went wrong while fetching bookings";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

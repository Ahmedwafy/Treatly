// app/api/bookings/[userId]/route.ts
// Show bookings for a specific user

import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/db"; // تأكد إن ده ملف الاتصال بقاعدة البيانات
import Booking from "@/lib/models/Booking"; // تأكد إن Booking متعرف ومتصدّر بشكل سليم

type Params = {
  params: {
    userId: string;
  };
};

export async function GET(req: NextRequest, context: Params) {
  const { userId } = context.params;

  try {
    await connectDb(); // الاتصال بقاعدة البيانات

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

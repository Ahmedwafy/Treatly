// app/api/logout/route.ts

// This will remove the token from the cookies, effectively logging the user out
import { NextResponse } from "next/server";

export async function POST() {
  // create a response object with a message
  const response = new NextResponse(
    JSON.stringify({ message: "Logged out successfully" }),
    { status: 200 } // HTTP status code for successful logout
  );

  // delete the token from the HTTP-only cookies after logout
  response.cookies.delete("token");

  return response;
}

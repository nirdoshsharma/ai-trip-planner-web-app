import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    tokenBucket({
      mode: "LIVE", // "LIVE" blocks requests, "DRY_RUN" only logs
      characteristics: ["userId"], // track requests by userId
      refillRate: 5, // add 5 tokens per interval
      interval: 86400, // interval in seconds (1 day)
      capacity: 10, // bucket capacity (max tokens)
    }),
  ],
});

export async function GET(req: Request) {
  const userId = "user123"; // replace with actual authenticated userId

  // Deduct 1 token per request (you can change this if needed)
  const decision = await aj.protect(req, { userId, requested: 1 });

  console.log("Arcjet decision:", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 }
    );
  }

  return NextResponse.json({ message: "Hello world" });
}

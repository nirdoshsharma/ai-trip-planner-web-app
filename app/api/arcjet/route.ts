import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { aj } from "@/lib/arcjet"; // ✅ now imported instead of exported

export async function GET(req: Request) {
  const user = await currentUser();

  // fallback to IP if no logged-in user
  const userId =
    user?.primaryEmailAddress?.emailAddress ||
    req.headers.get("x-forwarded-for") ||
    "anonymous";

  // Deduct 1 token per request
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

import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { createAdminSession, cookieName, sessionDuration } from "@/lib/admin-auth";

const credentialsSchema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 });
  }
  const credentials = credentialsSchema.safeParse(input);
  if (!credentials.success) return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  const email = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!email || !passwordHash) {
    console.error("Admin login is not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD_HASH.");
    return NextResponse.json({ error: "Team access is not configured. Please contact the site administrator." }, { status: 503 });
  }
  const emailMatches = credentials.data.email.toLowerCase() === email.toLowerCase();
  const passwordMatches = await compare(credentials.data.password, passwordHash);
  if (!emailMatches || !passwordMatches) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });

  const response = NextResponse.json({ message: "Signed in." });
  response.cookies.set(cookieName, createAdminSession(email.toLowerCase()), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: sessionDuration,
  });
  return response;
}

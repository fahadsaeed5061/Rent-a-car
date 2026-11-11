import { BookingStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminSessionValid, cookieName } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";

const updateSchema = z.object({ id: z.string().min(1), status: z.nativeEnum(BookingStatus) });

async function authorized(request: Request) {
  const value = request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  return isAdminSessionValid(value ? decodeURIComponent(value) : undefined);
}

export async function GET(request: Request) {
  if (!await authorized(request)) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Unable to load bookings.", error);
    return NextResponse.json({ error: "Bookings could not be loaded." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!await authorized(request)) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid update request." }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return NextResponse.json({ error: "A booking and valid status are required." }, { status: 400 });
  try {
    const booking = await prisma.booking.update({ where: { id: parsed.data.id }, data: { status: parsed.data.status } });
    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Unable to update booking.", error);
    return NextResponse.json({ error: "Booking could not be updated." }, { status: 503 });
  }
}

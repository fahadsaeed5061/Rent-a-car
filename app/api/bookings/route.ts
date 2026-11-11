import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  pickup: z.string().trim().min(2).max(300),
  dropoff: z.string().trim().min(2).max(300),
  date: z.string().date(),
  time: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  vehicle: z.string().trim().min(2).max(100),
  passengers: z.number().int().min(1).max(30),
  serviceType: z.string().trim().min(2).max(100),
  notes: z.string().trim().max(2000).optional().default(""),
});

function chicagoPickupTime(date: string, time: string) {
  const requested = `${date}T${time}:00`;
  const utcGuess = new Date(`${requested}.000Z`);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(formatter.formatToParts(utcGuess).map(({ type, value }) => [type, value]));
  const chicagoAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  const offset = chicagoAsUtc - utcGuess.getTime();
  const pickupAt = new Date(utcGuess.getTime() - offset);
  const localParts = formatter.formatToParts(pickupAt);
  const local = Object.fromEntries(localParts.map(({ type, value }) => [type, value]));
  if (`${local.year}-${local.month}-${local.day}T${local.hour}:${local.minute}` !== `${date}T${time}`) return null;
  return pickupAt;
}

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid booking request." }, { status: 400 });
  }
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const { date, time, notes, ...details } = parsed.data;
  const pickupAt = chicagoPickupTime(date, time);
  if (!pickupAt) {
    return NextResponse.json({ error: "That pickup time does not exist in Chicago. Please choose another time." }, { status: 400 });
  }
  if (pickupAt.getTime() <= Date.now()) {
    return NextResponse.json({ error: "Please choose a future pickup date and time." }, { status: 400 });
  }
  try {
    const booking = await prisma.booking.create({
      data: { ...details, pickupAt, notes: notes || null },
      select: { id: true },
    });
    return NextResponse.json({ id: booking.id, message: "Your booking request has been received." }, { status: 201 });
  } catch (error) {
    console.error("Unable to save booking request.", error);
    return NextResponse.json({ error: "We couldn’t save your request right now. Please try again or call our concierge." }, { status: 503 });
  }
}

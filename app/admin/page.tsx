import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { AdminDashboard } from "./dashboard";

export const metadata: Metadata = { title: "Booking Dashboard", robots: { index: false, follow: false } };

export default async function AdminPage() {
  await requireAdmin();
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  return <AdminDashboard bookings={bookings.map((booking) => ({ ...booking, pickupAt: booking.pickupAt.toISOString(), createdAt: booking.createdAt.toISOString() }))} />;
}

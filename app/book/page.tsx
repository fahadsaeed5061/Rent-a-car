import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = { title: "Reserve a Chicago Chauffeur", description: "Request a private chauffeur, airport transfer, or luxury black car in Chicago.", alternates: { canonical: "/book" } };

export default async function BookPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const vehicle = typeof query.vehicle === "string" ? query.vehicle : "";
  const service = typeof query.service === "string" ? query.service : "";
  const destination = typeof query.destination === "string" ? query.destination : "";
  return <section className="section"><div className="booking-layout"><aside className="booking-aside"><span className="eyebrow">A more considered journey</span><h1>Let’s get you there.</h1><p>Tell us a little about your trip. Our concierge will follow up to confirm the details and help make the journey your own.</p><p>Our team will follow up using the contact details you provide.</p><p className="form-disclaimer">Submitting a request does not confirm availability or reserve a vehicle. Confirmation is provided by our team.</p></aside><BookingForm initialValues={{ vehicle, ...(service ? { serviceType: service } : {}), dropoff: destination }} /></div></section>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { OptimizedImage } from "@/components/optimized-image";
import { events } from "@/lib/content";

export const metadata: Metadata = { title: "Chicago Event Transportation", description: "Chauffeur transportation for corporate events, weddings, concerts, sporting events, and private celebrations in Chicago.", alternates: { canonical: "/events" } };

export default function EventsPage() {
  return <><section className="page-hero" style={{ "--page-image": `url(${events[0].image})` } as React.CSSProperties}><div className="page-hero-content"><span className="eyebrow">Make an occasion of the journey</span><h1>For the moments<br />that matter.</h1><p>Thoughtful transportation for the gatherings, celebrations, and days you’ll remember.</p></div></section><section className="section"><div className="event-grid">{events.map((event, i) => <MotionReveal key={event.title} delay={(i % 3) * .06}><article className="event-card"><div className="image-wrap"><OptimizedImage className="event-image" src={event.image} alt={`${event.title} chauffeur transportation`} /></div><div className="event-body"><h2>{event.title}</h2><p>{event.description}</p><Link className="card-link" href={`/book?service=${encodeURIComponent(event.title)}`}>Plan your event ride <ArrowRight size={13} /></Link></div></article></MotionReveal>)}</div></section></>;
}

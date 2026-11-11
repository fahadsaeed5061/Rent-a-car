import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { OptimizedImage } from "@/components/optimized-image";
import { airports } from "@/lib/content";

export const metadata: Metadata = { title: "Chicago Airport Chauffeur & Limo Service", description: "Private, punctual chauffeur transfers to O’Hare, Midway, and Chicago Executive Airport.", alternates: { canonical: "/airports" } };

export default function AirportsPage() {
  return <><section className="page-hero" style={{ "--page-image": `url(${airports[0].image})` } as React.CSSProperties}><div className="page-hero-content"><span className="eyebrow">A seamless start, a softer landing</span><h1>Airport transfers</h1><p>On-time luxury transfers to and from Chicago’s major airports.</p></div></section><section className="section"><div className="airport-list">{airports.map((airport, i) => <MotionReveal key={airport.code} delay={i * .06}><article className="airport-row"><div className="airport-image-wrap"><OptimizedImage className="airport-image" src={airport.image} alt={`${airport.name} chauffeur pickup`} /></div><div className="airport-content"><span className="airport-code">{airport.code}</span><h2>{airport.name}</h2><p>{airport.text}</p><Link className="text-link" href={`/book?service=${encodeURIComponent(`${airport.code} airport transfer`)}`}>Book an airport transfer <ArrowRight size={14} /></Link></div></article></MotionReveal>)}</div></section></>;
}

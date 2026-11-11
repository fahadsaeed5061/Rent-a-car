import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { OptimizedImage } from "@/components/optimized-image";
import { SectionHeading } from "@/components/section-heading";
import { fleet } from "@/lib/content";

export const metadata: Metadata = { title: "Our Luxury Chauffeur Fleet", description: "Explore the Maison Motor fleet of executive sedans, full-size SUVs, and spacious Sprinter vans.", alternates: { canonical: "/fleet" } };

export default function FleetPage() {
  return <><section className="page-hero" style={{ "--page-image": `url(${fleet[1].image})` } as React.CSSProperties}><div className="page-hero-content"><span className="eyebrow">Made for the way you travel</span><h1>The fleet</h1><p>Meticulously maintained vehicles for every group size and occasion.</p></div></section><section className="section"><SectionHeading eyebrow="Comfort, without compromise" title="Choose your kind of comfort" description="Every vehicle in our fleet is selected for comfort, presentation, and a beautifully considered ride." /><div className="fleet-grid">{fleet.map((vehicle, i) => <MotionReveal key={vehicle.slug} delay={(i % 2) * .06}><article className="fleet-card"><div className="image-wrap"><OptimizedImage className="fleet-image" src={vehicle.image} alt={`${vehicle.model} luxury chauffeur vehicle`} /></div><div className="fleet-card-body"><h2>{vehicle.name}</h2><p className="fleet-model">{vehicle.model}</p><p>{vehicle.description}</p><div className="fleet-specs"><span>Up to {vehicle.passengers} passengers</span></div><Link className="card-link" href={`/fleet/${vehicle.slug}`}>Explore this vehicle <ArrowRight size={13} /></Link></div></article></MotionReveal>)}</div></section></>;
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { areas } from "@/lib/content";

export const metadata: Metadata = { title: "Chicago Chauffeur Service Areas", description: "Maison Motor serves downtown Chicago, neighborhoods, suburbs, airports, and event destinations.", alternates: { canonical: "/areas" } };

export default function AreasPage() {
  return <><section className="page-hero" style={{ "--page-image": `url(https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=1800&q=85)` } as React.CSSProperties}><div className="page-hero-content"><span className="eyebrow">Chicago and a little beyond</span><h1>Where we go</h1><p>From downtown to the surrounding suburbs, considered transportation throughout the Chicago region.</p></div></section><section className="section"><div className="area-groups">{Object.entries(areas).map(([group, places], i) => <MotionReveal key={group} delay={i * .06}><section className="area-group"><span className="eyebrow">Maison Motor service area</span><h2>{group}</h2><ul className="area-list">{places.map((place) => <li key={place}>{place}<Link aria-label={`Book a ride to ${place}`} href={`/book?destination=${encodeURIComponent(place)}`}><ArrowUpRight size={15} /></Link></li>)}</ul></section></MotionReveal>)}</div></section><section className="cta-band"><div><span className="eyebrow">A little further afield?</span><h2>Tell us where you’re going.</h2></div><Link href="/book" className="button">Plan your ride <ArrowUpRight size={15} /></Link></section></>;
}

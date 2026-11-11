import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { OptimizedImage } from "@/components/optimized-image";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Chauffeur & Black Car Services", description: "Explore private chauffeur, airport transfer, corporate, wedding, and event transportation across Chicago.", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  return <><section className="page-hero" style={{ "--page-image": `url(${services[1].image})` } as React.CSSProperties}><div className="page-hero-content"><span className="eyebrow">A better way to get around</span><h1>Our services</h1><p>Premium transportation across Chicago, tailored for every occasion.</p></div></section><section className="section"><div className="services-grid">{services.map((service, i) => <MotionReveal key={service.slug} delay={(i % 4) * .05}><article className="service-card"><div className="image-wrap"><OptimizedImage className="service-image" src={service.image} alt={`${service.title} transportation in Chicago`} /></div><div className="service-card-body"><h2>{service.title}</h2><p>{service.description}</p><div className="service-actions"><Link className="card-link" href={`/services/${service.slug}`}>Learn more <ArrowRight size={13} /></Link><Link className="card-link" href={`/book?service=${encodeURIComponent(service.title)}`}>Book now <ArrowRight size={13} /></Link></div></div></article></MotionReveal>)}</div></section><section className="cta-band"><div><span className="eyebrow">Something specific in mind?</span><h2>We’ll help you plan it.</h2></div><Link className="button" href="/book">Talk to our concierge <ArrowRight size={15} /></Link></section></>;
}

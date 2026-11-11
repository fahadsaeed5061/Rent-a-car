import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { OptimizedImage } from "@/components/optimized-image";
import { fleet } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return fleet.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = fleet.find((item) => item.slug === slug);
  return vehicle ? { title: `${vehicle.name} | Luxury Chauffeur Fleet`, description: `${vehicle.description} Up to ${vehicle.passengers} passengers.`, alternates: { canonical: `/fleet/${vehicle.slug}` } } : {};
}
export default async function FleetDetailPage({ params }: Props) {
  const { slug } = await params;
  const vehicle = fleet.find((item) => item.slug === slug);
  if (!vehicle) notFound();
  return <><section className="section"><Link className="text-link" href="/fleet"><ArrowLeft size={14} /> Back to the fleet</Link><div className="story-layout" style={{ marginTop: 36 }}><OptimizedImage className="story-image" src={vehicle.image} alt={vehicle.model} /><div className="story-copy"><span className="eyebrow">{vehicle.model}</span><h1>{vehicle.name}</h1><p>{vehicle.description}</p><p>Arrive at ease in a carefully maintained vehicle, with a professional chauffeur and personal attention from pickup to drop-off.</p><div className="fleet-specs" style={{ color: "var(--ink)" }}><span>Up to {vehicle.passengers} passengers</span></div><h3>Thoughtful details</h3>{vehicle.features.map((feature) => <p key={feature}><Check size={14} style={{ color: "var(--gold)", marginRight: 8, verticalAlign: "middle" }} />{feature}</p>)}<Link className="button button-dark" href={`/book?vehicle=${encodeURIComponent(vehicle.name)}`}>Request this vehicle <ArrowRight size={15} /></Link></div></div></section></>;
}

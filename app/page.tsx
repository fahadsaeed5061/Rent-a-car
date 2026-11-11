import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MotionReveal } from "@/components/motion-reveal";
import { OptimizedImage } from "@/components/optimized-image";
import { SectionHeading } from "@/components/section-heading";
import { services, fleet, image } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <OptimizedImage className="hero-image" src={image("photo-1503376780353-7e6692767b70", 2200)} alt="" sizes="100vw" />
        <div className="hero-content">
          <span className="hero-kicker">Private chauffeur · Chicago, Illinois</span>
          <h1>The art of<br />getting <em>there.</em></h1>
          <p className="hero-copy">A more considered way to move through the city. Personal chauffeurs, exceptional vehicles, and every detail taken care of.</p>
          <div className="hero-actions"><Link href="/book" className="button button-light">Reserve your ride <ArrowRight size={15} /></Link><Link href="/fleet" className="button button-outline">Explore the fleet <ArrowUpRight size={15} /></Link></div>
        </div>
        <span className="hero-caption">Chicago, and wherever the day takes you</span>
      </section>
      <MotionReveal><section className="intro-strip"><div><span className="eyebrow">A little more considered</span><h2>Arrive calm.<br />Leave the details to us.</h2></div><div><p>Some journeys deserve more than a ride. Maison Motor brings together professional chauffeurs, a thoughtfully selected fleet, and the kind of personal attention that makes the whole day feel easier.</p><p><Link className="text-link" href="/about">A little about us <ArrowRight size={14} /></Link></p></div></section></MotionReveal>
      <section className="section"><SectionHeading eyebrow="Made for the moment" title="A ride for every reason" description="From the runway to the boardroom, we make the in-between feel like part of the experience." /><div className="services-grid">{services.slice(0, 4).map((service, i) => <MotionReveal key={service.slug} delay={i * .06}><article className="service-card"><div className="image-wrap"><OptimizedImage className="service-image" src={service.image} alt={`${service.title} chauffeur service in Chicago`} /></div><div className="service-card-body"><h3>{service.title}</h3><p>{service.description}</p><Link className="card-link" href={`/services/${service.slug}`}>Discover the service <ArrowRight size={13} /></Link></div></article></MotionReveal>)}</div><div className="section-link"><Link className="text-link" href="/services">Explore all services <ArrowRight size={15} /></Link></div></section>
      <section className="section dark-section"><SectionHeading eyebrow="The Maison Motor fleet" title="Good company, wherever you’re going." description="Meticulously maintained, beautifully appointed, and chosen for the way you travel." light /><div className="fleet-grid">{fleet.slice(0, 3).map((vehicle, i) => <MotionReveal key={vehicle.slug} delay={i * .07}><article className="fleet-card"><div className="image-wrap"><OptimizedImage className="fleet-image" src={vehicle.image} alt={`${vehicle.model} luxury chauffeur vehicle`} /></div><div className="fleet-card-body"><h3>{vehicle.name}</h3><p className="fleet-model">{vehicle.model}</p><div className="fleet-specs"><span>Up to {vehicle.passengers} passengers</span></div><Link className="card-link" href={`/fleet/${vehicle.slug}`}>Meet the vehicle <ArrowRight size={13} /></Link></div></article></MotionReveal>)}</div><div className="section-link fleet-section-link"><Link className="text-link" href="/fleet">Explore the complete fleet <ArrowRight size={15} /></Link></div></section>
      <MotionReveal><section className="split-feature"><div className="split-feature-image" role="img" aria-label="Chicago Executive Airport at sunset" /><div className="split-feature-copy"><span className="eyebrow">Chicago, made effortless</span><h2>Every arrival,<br />a little easier.</h2><p>From a quiet welcome at O’Hare to a smooth ride home from Midway, we keep an eye on the details so you can settle into the journey.</p><Link className="text-link" href="/airports">Explore airport transfers <ArrowRight size={15} /></Link></div></section></MotionReveal>
      <MotionReveal><section className="quote-section"><span className="eyebrow">The Maison Motor feeling</span><div className="quote-mark">“</div><blockquote>Good service is knowing what matters—and taking care of it before you have to ask.</blockquote><span className="quote-credit">Our approach, in a sentence</span></section></MotionReveal>
      <section className="cta-band"><div><span className="eyebrow">Your next journey, thoughtfully handled</span><h2>Let’s get you there.</h2></div><Link href="/book" className="button">Request your ride <ArrowRight size={15} /></Link></section>
    </>
  );
}

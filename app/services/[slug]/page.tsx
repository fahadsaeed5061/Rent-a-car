import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/optimized-image";
import { MotionReveal } from "@/components/motion-reveal";
import { services } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service
    ? {
        title: `${service.title} | Chicago Chauffeur Service`,
        description: `${service.description} Private chauffeur service throughout Chicago and surrounding suburbs.`,
        alternates: { canonical: `/services/${service.slug}` },
        openGraph: { images: [service.image] },
      }
    : {};
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="service-detail section">
        <Link className="text-link" href="/services"><ArrowLeft size={14} /> All services</Link>
        <div className="service-detail-layout">
          <MotionReveal>
            <div className="service-detail-image-wrap">
              <OptimizedImage className="service-detail-image" src={service.image} alt={`${service.title} chauffeur service in Chicago`} sizes="(max-width: 700px) 100vw, 55vw" />
            </div>
          </MotionReveal>
          <div className="service-detail-copy">
            <span className="eyebrow">Maison Motor · Chicago</span>
            <h1>{service.title}</h1>
            <p className="service-detail-lead">{service.description}</p>
            <p>Enjoy a thoughtfully coordinated journey with a professional chauffeur and a carefully prepared luxury vehicle. Tell us where you’re headed and our concierge will help arrange the details around your plans.</p>
            <p>Serving Chicago and surrounding suburbs. Share your itinerary when you request a ride and our team will follow up to confirm availability and pickup arrangements.</p>
            <Link className="button button-dark" href={`/book?service=${encodeURIComponent(service.title)}`}>Request this service <ArrowRight size={15} /></Link>
            <p className="form-disclaimer">Your request is not a confirmed reservation. Our concierge will follow up to confirm details.</p>
          </div>
        </div>
      </section>
      <section className="section related-services">
        <div className="section-heading"><span className="eyebrow">More ways to travel</span><h2>Explore our other services</h2></div>
        <div className="related-service-links">{relatedServices.map((item) => <Link className="related-service-link" href={`/services/${item.slug}`} key={item.slug}><span>{item.title}<small>{item.description}</small></span><ArrowRight size={16} /></Link>)}</div>
      </section>
    </>
  );
}

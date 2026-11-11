import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><Link href="/" className="wordmark footer-mark"><span className="wordmark-main">MAISON</span><span className="wordmark-sub">MOTOR · CHICAGO</span></Link><p className="footer-note">The art of getting there.</p></div>
        <div className="footer-column"><span className="footer-label">Explore</span><Link href="/services">Our services</Link><Link href="/fleet">The fleet</Link><Link href="/areas">Service areas</Link><Link href="/events">Events</Link></div>
        <div className="footer-column"><span className="footer-label">Discover</span><Link href="/about">Our story</Link><Link href="/airports">Airport transfers</Link><Link href="/journal">Journal</Link><Link href="/book">Make a reservation</Link></div>
        <div className="footer-column"><span className="footer-label">Get in touch</span><span>Chicago, Illinois</span><Link href="/book">Contact our concierge <ArrowUpRight size={13} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Maison Motor Chicago</span><span>Thoughtfully driven, always.</span><Link href="/admin/login">Team access</Link></div>
    </footer>
  );
}

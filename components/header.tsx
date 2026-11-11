"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/lib/content";

const links = [
  ["Airports", "/airports"],
  ["Our Fleet", "/fleet"],
  ["Our Story", "/about"],
  ["Journal", "/journal"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  function closeMenus() {
    setOpen(false);
    setServicesOpen(false);
  }

  return (
    <header className="site-header">
      <Link aria-label="Maison Motor home" className="wordmark" href="/">
        <span className="wordmark-main">MAISON</span><span className="wordmark-sub">MOTOR · CHICAGO</span>
      </Link>
      <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Main navigation">
        <div className={`services-nav${servicesOpen ? " is-open" : ""}`} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
          <button className="services-trigger" type="button" aria-expanded={servicesOpen} aria-haspopup="true" onClick={() => setServicesOpen(!servicesOpen)} onKeyDown={(event) => { if (event.key === "Escape") setServicesOpen(false); }}>
            Services <ChevronDown size={13} />
          </button>
          <div className="services-mega" aria-label="All chauffeur services">
            <div className="mega-intro"><span className="eyebrow">The Maison Motor experience</span><h2>Considered rides<br />for every occasion.</h2><Link href="/services" onClick={closeMenus}>Explore all services <span aria-hidden="true">→</span></Link></div>
            <div className="mega-links">{services.map((service, index) => <Link className="mega-link" key={service.slug} href={`/services/${service.slug}`} onClick={closeMenus}><span className="mega-number">0{index + 1}</span><span>{service.title}<small>{service.description}</small></span><span className="mega-arrow" aria-hidden="true">↗</span></Link>)}</div>
          </div>
        </div>
        {links.map(([label, href]) => <Link key={href} href={href} onClick={closeMenus}>{label}</Link>)}
        <Link className="nav-book mobile-book" href="/book" onClick={closeMenus}>Reserve your ride <span>↗</span></Link>
      </nav>
      <Link className="nav-book desktop-book" href="/book">Reserve your ride <span>↗</span></Link>
      <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  );
}

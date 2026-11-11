import type { Metadata } from "next";
import { JournalSearch } from "@/components/journal-search";
import { articles } from "@/lib/content";

export const metadata: Metadata = { title: "The Maison Motor Journal", description: "Chicago travel notes, airport guides, and thoughtful advice for a better journey.", alternates: { canonical: "/journal" } };

export default function JournalPage() {
  return <><section className="page-hero" style={{ "--page-image": `url(${articles[0].image})` } as React.CSSProperties}><div className="page-hero-content"><span className="eyebrow">Notes from the road</span><h1>The journal</h1><p>Thoughtful guides and city notes for getting there a little better.</p></div></section><section className="section"><JournalSearch articles={articles} /></section></>;
}

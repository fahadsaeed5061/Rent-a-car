"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { OptimizedImage } from "@/components/optimized-image";
import type { articles } from "@/lib/content";

type Article = (typeof articles)[number];

export function JournalSearch({ articles: entries }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? entries.filter((article) => `${article.title} ${article.category} ${article.excerpt}`.toLowerCase().includes(term)) : entries;
  }, [entries, query]);

  return <>
    <label className="journal-search"><Search size={16} /><span className="sr-only">Search articles</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the journal" /></label>
    <div className="journal-grid">{filtered.map((article) => <article className="journal-card" key={article.slug}><div className="image-wrap"><OptimizedImage className="journal-image" src={article.image} alt={article.title} /></div><div className="journal-body"><div className="journal-meta">{article.category} · {article.date}</div><h2><Link href={`/journal/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="card-link" href={`/journal/${article.slug}`}>Read the story <span aria-hidden="true">→</span></Link></div></article>)}</div>
    {filtered.length === 0 && <p className="empty-search">No stories match “{query}”. Try another search.</p>}
  </>;
}

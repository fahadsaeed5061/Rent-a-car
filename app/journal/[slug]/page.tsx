import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { OptimizedImage } from "@/components/optimized-image";
import { articles } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.excerpt, alternates: { canonical: `/journal/${article.slug}` }, openGraph: { images: [article.image] } } : {};
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return <section className="section"><article className="article-layout"><Link href="/journal" className="text-link"><ArrowLeft size={14} /> Back to the journal</Link><header className="article-header" style={{ marginTop: 40 }}><div className="journal-meta">{article.category} · {article.date}</div><h1>{article.title}</h1><p>{article.excerpt}</p><div className="journal-meta">By Maison Motor Editorial</div></header><OptimizedImage className="article-cover" src={article.image} alt={article.title} sizes="(max-width: 820px) 100vw, 790px" /><div className="article-content">{article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article></section>;
}

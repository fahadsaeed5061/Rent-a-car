import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { canonical } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(canonical()),
  title: { default: "Maison Motor | Chicago Chauffeur & Black Car Service", template: "%s | Maison Motor Chicago" },
  description: "A more considered way to travel. Private chauffeur, luxury black car, and airport transportation throughout Chicago and the surrounding suburbs.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: "Maison Motor Chicago", title: "Maison Motor | The art of getting there", description: "Private chauffeur and luxury transportation, thoughtfully driven across Chicago." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header /><main>{children}</main><Footer /></body></html>;
}

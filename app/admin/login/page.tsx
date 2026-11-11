import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAdminSessionValid, cookieName } from "@/lib/admin-auth";
import { AdminLoginForm } from "./login-form";

export const metadata: Metadata = { title: "Team Access", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  const jar = await cookies();
  if (isAdminSessionValid(jar.get(cookieName)?.value)) redirect("/admin");
  return <section className="admin-login"><span className="eyebrow">Maison Motor · Team access</span><h1>Welcome back.</h1><p>Sign in to manage your booking requests.</p><AdminLoginForm /></section>;
}

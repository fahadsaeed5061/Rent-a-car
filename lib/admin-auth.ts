import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "maison_admin";
const sessionDuration = 8 * 60 * 60;

function signature(payload: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("ADMIN_SESSION_SECRET must be set to at least 32 characters.");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createAdminSession(email: string) {
  const payload = `${Date.now()}:${email}`;
  return `${payload}:${signature(payload)}`;
}

export function isAdminSessionValid(value?: string) {
  if (!value) return false;
  const [issuedAt, email, suppliedSignature] = value.split(":");
  if (!issuedAt || !email || !suppliedSignature || !/^\d+$/.test(issuedAt)) return false;
  const age = Date.now() - Number(issuedAt);
  if (age < 0 || age > sessionDuration * 1000) return false;
  const expected = signature(`${issuedAt}:${email}`);
  const supplied = Buffer.from(suppliedSignature, "hex");
  const known = Buffer.from(expected, "hex");
  return supplied.length === known.length && timingSafeEqual(supplied, known);
}

export async function requireAdmin() {
  const jar = await cookies();
  if (!isAdminSessionValid(jar.get(cookieName)?.value)) {
    const { redirect } = await import("next/navigation");
    redirect("/admin/login");
  }
}

export { cookieName, sessionDuration };

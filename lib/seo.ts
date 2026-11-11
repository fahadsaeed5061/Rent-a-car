export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maisonmotor.com";

export function canonical(path = "") {
  return new URL(path, siteUrl).toString();
}

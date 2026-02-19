const FALLBACK_SITE_URL = "https://dmaskzify.com";

function normalizeSiteUrl(value: string | undefined): string {
  if (!value) {
    return FALLBACK_SITE_URL;
  }

  const withProtocol = value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;

  return withProtocol.replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL,
);


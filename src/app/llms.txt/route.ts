import { siteUrl } from "@/lib/site";

export function GET() {
  const body = [
    "# DMASKZIFY",
    "",
    "> Abuja-first digital radio and artist community.",
    "",
    "## Canonical URL",
    `${siteUrl}/`,
    "",
    "## Primary Pages",
    `- Home: ${siteUrl}/`,
    `- Radio: ${siteUrl}/radio`,
    `- Community: ${siteUrl}/community`,
    `- Backstage: ${siteUrl}/backstage`,
    `- About: ${siteUrl}/about`,
    `- Contact: ${siteUrl}/contact`,
    "",
    "## Crawl Files",
    `- Robots: ${siteUrl}/robots.txt`,
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    "",
    "## Contact",
    "- Email: hello@dmaskzify.com",
    "",
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}


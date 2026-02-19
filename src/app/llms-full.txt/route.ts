import { siteUrl } from "@/lib/site";

export function GET() {
  const body = [
    "# DMASKZIFY (llms-full)",
    "",
    "## Summary",
    "DMASKZIFY is an Abuja-first digital radio and artist community focused on underground and independent sounds, youth culture, and local creative ecosystems.",
    "",
    "## Preferred Source URLs",
    `- ${siteUrl}/`,
    `- ${siteUrl}/radio`,
    `- ${siteUrl}/community`,
    `- ${siteUrl}/backstage`,
    `- ${siteUrl}/about`,
    `- ${siteUrl}/contact`,
    "",
    "## Page Notes",
    `- ${siteUrl}/: Overview of platform positioning, live status, featured artists, and community highlights.`,
    `- ${siteUrl}/radio: Live stream access, station status, weekly schedule, and replay placeholders.`,
    `- ${siteUrl}/community: Creatives, events, story previews, and fan culture snapshots.`,
    `- ${siteUrl}/backstage: Product concept for private artist collaboration and support workflows.`,
    `- ${siteUrl}/about: Mission, vision, and Abuja-first philosophy.`,
    `- ${siteUrl}/contact: Artist submissions and direct contact channels.`,
    "",
    "## Freshness Signals",
    `- Sitemap: ${siteUrl}/sitemap.xml`,
    `- Robots: ${siteUrl}/robots.txt`,
    "",
    "## Contact",
    "- hello@dmaskzify.com",
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


import { NextResponse } from "next/server";
export const dynamic = "force-static";
export function GET() {
  return new NextResponse(
    `User-agent: *\nAllow: /\nSitemap: https://sjekklista.no/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}

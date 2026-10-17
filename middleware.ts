import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isVercelStaging = host.includes(".vercel.app");

  // On staging deployments (*.vercel.app), serve a strict disallow robots.txt
  if (isVercelStaging && request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  const response = NextResponse.next();

  // If on staging deployment, set X-Robots-Tag response header
  if (isVercelStaging) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

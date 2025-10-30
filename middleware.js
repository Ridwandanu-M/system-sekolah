import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if it's an admin route (except login page and API endpoints)
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin" &&
    !pathname.startsWith("/admin/api") &&
    !pathname.startsWith("/api/admin/sign-in")
  ) {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        console.error("JWT_SECRET not configured");
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }

      // Verify the token
      jwt.verify(token, jwtSecret);

      // Token is valid, continue to the requested page
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      console.error("Invalid token:", error.message);
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

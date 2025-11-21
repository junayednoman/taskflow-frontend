import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const DASHBOARD_PATH = /^\/dashboard(\/.*)?$/;
const AUTH_PATH = /^\/auth(\/.*)?$/;
const ROOT_PATH = /^\/$/;

interface DecodedUser {
  id: string;
  iat: number;
  exp: number;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  let isAuthenticated = false;

  if (token) {
    try {
      const decoded: DecodedUser = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp > currentTime) {
        isAuthenticated = true;
      }
    } catch (err) {
      console.error("Invalid token:", err);
      isAuthenticated = false;
    }
  }

  // Redirect / to /dashboard if logged in
  if (ROOT_PATH.test(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect dashboard routes
  if (DASHBOARD_PATH.test(pathname) && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Prevent logged-in users from accessing auth routes
  if (AUTH_PATH.test(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/"],
};

import { NextResponse } from "next/server";
import * as jose from "jose";
import { SECRET } from "@/lib/auth";
import { clearCookieOpts } from "@/lib/cookies";
import { SESSION_COOKIE, TENANT_PATH_PATTERN } from "@/lib/constants";
import tenantConfig from "@/config.json";

const tenantPattern = new URLPattern({ pathname: TENANT_PATH_PATTERN });

export async function middleware(req) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = req.nextUrl;

  console.log("Middleware - Checking path:", pathname);
  console.log("Middleware - SECRET exists:", !!SECRET);
  console.log("Middleware - SECRET length:", SECRET?.length);

  // Redirect logged in users away from the login page
  if (pathname === "/" && token) {
    try {
      const { payload } = await jose.jwtVerify(token, SECRET);
      console.log(
        "Middleware - Redirecting logged-in user to:",
        payload.tenant
      );
      return NextResponse.redirect(new URL(`/${payload.tenant}`, req.url));
    } catch (err) {
      console.error("Middleware - JWT verification error:", err.message);
      // expired -> let them log in again
    }
  }

  // allow public assets & login API to load
  if (
    pathname === "/" ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if this is a tenant path
  const match = tenantPattern.exec({ pathname });
  const pathTenant = match?.pathname?.groups?.tenant;

  console.log("Middleware - Path tenant:", pathTenant);

  if (!pathTenant) {
    return NextResponse.next();
  }

  // Check if the tenant exists in config
  if (!tenantConfig.tenants[pathTenant]) {
    console.log("Middleware - Invalid tenant:", pathTenant);
    if (token) {
      try {
        const { payload } = await jose.jwtVerify(token, SECRET);
        console.log(
          "Middleware - Redirecting to user's tenant:",
          payload.tenant
        );
        return NextResponse.redirect(new URL(`/${payload.tenant}`, req.url));
      } catch {
        // If token is invalid, redirect to login
        console.log("Middleware - Invalid token, redirecting to login");
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    console.log("Middleware - No token, redirecting to login");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token) {
    console.log("Middleware - No token, redirecting to login");
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const { payload } = await jose.jwtVerify(token, SECRET);
    const userTenant = payload.tenant;

    if (userTenant !== pathTenant) {
      return NextResponse.redirect(new URL(`/${userTenant}`, req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.log("Middleware - Token verification failed:", err.message);
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set(SESSION_COOKIE, "", clearCookieOpts);
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};

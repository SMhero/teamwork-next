import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

import { routes } from "@/config/app";

const SESSION_ID = "sessionid";

const PROTECTED_ROUTES = [routes.team];
const PUBLIC_ROUTES = [routes.main, routes.about, routes.login];

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_ID)?.value;

  // const requestHeaders = new Headers(request.headers);

  // requestHeaders.set("credentials", "include");
  // requestHeaders.set("Access-Control-Allow-Credentials", "true");

  if (PROTECTED_ROUTES.includes(request.nextUrl.pathname) && !sessionId) {
    const response = NextResponse.redirect(new URL(routes.main, request.url));

    return response;
  }

  if (PUBLIC_ROUTES.includes(request.nextUrl.pathname) && sessionId) {
    const response = NextResponse.redirect(new URL(routes.team, request.url));
    response.cookies.set("sessionid", sessionId);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

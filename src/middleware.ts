import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routes } from "@/config/app";

const SESSION_ID = "sessionid";

const PROTECTED_ROUTES = [routes.team];
const PUBLIC_ROUTES = [routes.main, routes.about, routes.login];

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_ID)?.value;

  if (PROTECTED_ROUTES.includes(request.nextUrl.pathname) && !sessionId) {
    return NextResponse.redirect(new URL(routes.main, request.url));
  }

  if (PUBLIC_ROUTES.includes(request.nextUrl.pathname) && sessionId) {
    return NextResponse.redirect(new URL(routes.team, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

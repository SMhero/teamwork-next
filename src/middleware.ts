import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routes } from "@/config/app";

const SESSION_ID_COOKIE = "sessionid";

export function middleware(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_ID_COOKIE)?.value;

  if (
    routes.protected.includes(request.nextUrl.pathname) &&
    (!sessionId || Date.now() > JSON.parse(SESSION_ID_COOKIE).expiredAt)
  ) {
    request.cookies.delete(SESSION_ID_COOKIE);

    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete(SESSION_ID_COOKIE);

    return response;
  }

  if (routes.public.includes(request.nextUrl.pathname) && sessionId) {
    return NextResponse.redirect(new URL("/team", request.url));
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routes } from "@/config/app";

const REFRESH_TOKEN = "refreshToken";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  if (routes.protected.includes(request.nextUrl.pathname) && !refreshToken) {
    request.cookies.delete(REFRESH_TOKEN);

    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete(REFRESH_TOKEN);

    return response;
  }

  if (routes.public.includes(request.nextUrl.pathname) && refreshToken) {
    return NextResponse.redirect(new URL("/team", request.url));
  }
}

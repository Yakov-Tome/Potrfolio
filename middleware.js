import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/content";

// Every page lives under /en or /he. A request without a locale is sent to the
// visitor's own language when we can tell, and to English when we cannot —
// Hebrew is only chosen on an explicit Accept-Language signal, never guessed
// from geography.
function pick(request) {
  const header = request.headers.get("accept-language") || "";
  const wantsHebrew = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .some((tag) => tag === "he" || tag.startsWith("he-") || tag === "iw");
  return wantsHebrew ? "he" : DEFAULT_LOCALE;
}

export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // Behind nginx, request.nextUrl carries the origin the Node server is bound
  // to — redirecting to it would send visitors to localhost:3002. The public
  // origin is only knowable from the forwarded headers, so it is rebuilt here.
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const target = `/${pick(request)}${pathname === "/" ? "" : pathname}${search}`;

  const url = host ? new URL(target, `${proto}://${host}`) : request.nextUrl.clone();
  if (!host) url.pathname = target;

  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, the API surface and real files in public/.
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

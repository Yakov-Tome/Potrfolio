import { NextResponse } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/content";
import { LOCALE_COOKIE, readLocale } from "@/lib/locale-cookie";

// Every page lives under /en or /he. A request without a locale goes to English
// unless the visitor has previously chosen otherwise.
//
// English is the start, always — no Accept-Language sniffing. That header says
// what languages the browser was configured with, which for an Israeli visitor
// is very often Hebrew even when they would rather read a developer's portfolio
// in English, and it is not something they can see or correct. The site now has
// one predictable first impression, and one visible control that changes it.
//
// The exception is a language the visitor picked themselves. The switch in the
// nav writes it to a cookie, and that cookie is the only thing that overrides
// English here. Nothing else sets it: opening a shared /he link shows Hebrew,
// as the URL asks, but does not silently repoint the visitor's next visit.
function pick(request) {
  return readLocale(request.cookies.get(LOCALE_COOKIE)?.value) ?? DEFAULT_LOCALE;
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

  const response = NextResponse.redirect(url);
  // This redirect is decided by a cookie, so it must not be reused for the next
  // visitor — or for the same one after they switch. 307 is not cacheable by
  // default, but saying so beats depending on every proxy agreeing.
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Vary", "Cookie");
  return response;
}

export const config = {
  // Everything except Next internals, the API surface and real files in public/.
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

import { LOCALES } from "@/lib/content";

/**
 * The name of the cookie that remembers a deliberately chosen language.
 *
 * It is written by the language switch in the nav and read by the middleware,
 * which are in different runtimes, so the name and the parsing live here rather
 * than being spelled out twice.
 */
export const LOCALE_COOKIE = "locale";

// A year. The point of this cookie is that a visitor who picked Hebrew in March
// still gets Hebrew in November; a session cookie would forget it the moment
// they closed the tab, which is the case the request is actually about.
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** `value` if it names a locale this site has, otherwise null. */
export function readLocale(value) {
  return LOCALES.includes(value) ? value : null;
}

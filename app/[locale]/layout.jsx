import { Public_Sans, Heebo, Rubik } from "next/font/google";
import { LOCALES, getDictionary, isRtl, site } from "@/lib/content";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "@/app/styles/globals.css";

// Public Sans is the design's typeface but has no Hebrew glyphs, so a Hebrew
// face carries the Hebrew and the two are declared together — see globals.css,
// where the order swaps on an RTL document.
//
// Heebo is the primary Hebrew face and Rubik the fallback behind it. Both are
// loaded with the 900 weight as well, because the hero marquee is 240px at
// weight 900 and a Hebrew face without that cut would be synthesised into a
// smear at that size.
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-public-sans",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const title = `${site.name} — ${t.hero.role}`;
  return {
    title,
    description: t.about.cards[0],
    metadataBase: new URL(site.url),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", he: "/he", "x-default": "/en" },
    },
    openGraph: { title, description: t.about.cards[0], locale, type: "website" },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const dir = isRtl(locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${publicSans.variable} ${heebo.variable} ${rubik.variable}`}>
      <body>
        <SmoothScroll />
        <Nav locale={locale} t={t} />
        <main>{children}</main>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}

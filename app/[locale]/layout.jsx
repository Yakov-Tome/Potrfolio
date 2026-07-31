import { Public_Sans, Assistant } from "next/font/google";
import { LOCALES, getDictionary, isRtl, site } from "@/lib/content";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import "@/app/styles/globals.css";

// Public Sans is the design's typeface but has no Hebrew glyphs, so Assistant
// carries the Hebrew and the two are declared together — see globals.css, where
// the order swaps on an RTL document.
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-public-sans",
  display: "swap",
});

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-assistant",
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
    metadataBase: new URL("https://yakov.iresale.co.il"),
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
    <html lang={locale} dir={dir} className={`${publicSans.variable} ${assistant.variable}`}>
      <body>
        <Nav locale={locale} t={t} />
        <main>{children}</main>
        <Footer locale={locale} t={t} />
      </body>
    </html>
  );
}

import Link from "next/link";
import { getDictionary, DEFAULT_LOCALE } from "@/lib/content";

export default function NotFound() {
  const t = getDictionary(DEFAULT_LOCALE);
  return (
    <section className="section min-h-[70svh]">
      <div className="shell flex flex-col items-center gap-6 text-center">
        <h1 className="t-h2">{t.notFound.title}</h1>
        <p className="t-body-big">{t.notFound.lead}</p>
        <Link href={`/${DEFAULT_LOCALE}`} className="t-body-small link-underline font-medium text-black no-underline">
          {t.notFound.home}
        </Link>
      </div>
    </section>
  );
}

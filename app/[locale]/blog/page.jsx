import Image from "next/image";
import Link from "next/link";
import { getDictionary, LOCALES } from "@/lib/content";
import Reveal from "@/components/motion/Reveal";
import { blogs } from "@/lib/blogs";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return { title: `${t.blog.title} — Yakov Tome`, description: t.blog.lead };
}

export default async function BlogIndex({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <section className="section">
      <div className="shell flex w-full flex-col gap-[var(--section-gap)]">
        <header className="flex flex-col gap-4">
          <h1 className="t-h2">{t.blog.title}</h1>
          <p className="t-body-big">{t.blog.lead}</p>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post, i) => (
            <Reveal key={post.id} as="li" delay={(i % 3) * 0.08} className="tint-card group">
              <article className="inner flex h-full flex-col gap-4">
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[16px] bg-gray-95">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 810px) 100vw, (max-width: 1200px) 50vw, 360px"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                </div>
                <p className="t-span text-gray-50">
                  {post.date} · {t.blog.by} {post.commentor}
                </p>
                <h2 className="t-h3 font-medium text-black">{post.title}</h2>
                <p className="t-body-small line-clamp-3">{post.description1}</p>
                <Link
                  href={`/${locale}/blog/${post.id}`}
                  className="t-body-small link-underline mt-auto w-fit font-medium text-black no-underline"
                >
                  {t.blog.readMore}
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, LOCALES } from "@/lib/content";
import { blogs } from "@/lib/blogs";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => blogs.map((p) => ({ locale, id: String(p.id) })));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = blogs.find((p) => String(p.id) === id);
  if (!post) return {};
  return { title: `${post.title} — Yakov Tome`, description: post.description1 };
}

export default async function BlogPost({ params }) {
  const { locale, id } = await params;
  const t = getDictionary(locale);
  const post = blogs.find((p) => String(p.id) === id);
  if (!post) notFound();

  const body = [post.description1, post.description2, post.description3, post.description4].filter(Boolean);

  return (
    <article className="section">
      <div className="shell flex w-full max-w-[860px] flex-col gap-8">
        <Link href={`/${locale}/blog`} className="t-body-small link-underline w-fit text-gray-30 no-underline">
          ← {t.blog.back}
        </Link>

        <header className="flex flex-col gap-4">
          <p className="t-span text-gray-50">
            {post.date} · {t.blog.by} {post.commentor}
          </p>
          <h1 className="t-h2">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tag.split(",").map((tag) => (
              <span key={tag} className="t-span rounded-full bg-gray-95 px-3 py-1.5">
                {tag.trim()}
              </span>
            ))}
          </div>
        </header>

        <div className="relative aspect-16/9 w-full overflow-hidden rounded-[24px] bg-gray-95">
          <Image src={post.img} alt={post.title} fill sizes="(max-width: 860px) 100vw, 860px" className="object-cover" priority />
        </div>

        {/* The posts are authored in English and kept in the language they were
            written in; only the surrounding interface follows the locale. */}
        <div className="flex flex-col gap-5" dir="ltr" lang="en">
          {body.map((para, i) => (
            <p key={i} className="t-body !leading-[1.7]">
              {para}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

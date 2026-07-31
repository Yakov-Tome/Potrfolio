import { site } from "@/lib/content";

export default function Footer({ t }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gray-95">
      <div className="shell flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <p className="t-body-small">
          © {year} {site.name}. {t.footer.rights}
        </p>
        <div className="flex items-center gap-6">
          <a className="t-body-small link-underline text-gray-30 no-underline hover:text-black" href={site.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="t-body-small link-underline text-gray-30 no-underline hover:text-black" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="t-body-small link-underline text-gray-30 no-underline hover:text-black" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
        <p className="t-span">{t.footer.built}</p>
      </div>
    </footer>
  );
}

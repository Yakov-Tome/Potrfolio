import { site } from "@/lib/content";

export default function Footer({ t }) {
  const year = new Date().getFullYear();
  return (
    // The copyright row, 192px below the closing columns — measured on the
    // reference, whose region is 456 tall for 245 of columns and a 19px row.
    // No top border there, so none here.
    <footer>
      {/* Its own gutter: the footer sits outside <main>, which is where the page
          gutter now lives. */}
      <div className="shell px-[var(--page-gutter)] pb-12">
        <div className="cap flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="t-body-small">
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p className="t-span">{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}

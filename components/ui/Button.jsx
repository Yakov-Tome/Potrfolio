import Link from "next/link";

/**
 * The design's pill button: 84px tall, black on white, inverting on hover, with
 * the icon sitting in its own circle on the inline-end edge. Colours come from
 * the instance props in Framer (bg white / text black, inverted on the Back
 * variant), so both tones are expressed here rather than hard-coded per use.
 */
export default function Button({
  href,
  children,
  icon = "arrow-down",
  tone = "light",
  external = false,
  className = "",
}) {
  const light = tone === "light";
  const base = [
    "group inline-flex h-[84px] items-center gap-4 rounded-full ps-8 pe-3",
    "text-[18px] font-medium no-underline transition-colors duration-300",
    light
      ? "bg-white text-black border border-black hover:bg-black hover:text-white"
      : "bg-black text-white border border-black hover:bg-white hover:text-black",
    className,
  ].join(" ");

  const inner = (
    <>
      <span>{children}</span>
      <span
        className={[
          "grid h-14 w-14 place-items-center rounded-full transition-colors duration-300",
          light
            ? "bg-black text-white group-hover:bg-white group-hover:text-black"
            : "bg-white text-black group-hover:bg-black group-hover:text-white",
        ].join(" ")}
        aria-hidden="true"
      >
        <Icon name={icon} />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={base}>
      {inner}
    </Link>
  );
}

function Icon({ name }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  if (name === "cv") {
    return (
      <svg {...common}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }
  // The hero and section CTAs all point further down the page.
  return (
    <svg {...common}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

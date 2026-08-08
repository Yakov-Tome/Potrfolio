/**
 * One of the nine 3D renders, served as a pre-built file rather than through
 * Next's image optimizer.
 *
 * Why this exists rather than a next/image:
 *
 * The optimizer builds each variant on demand, in the server process, the first
 * time somebody asks for it. On this box that route wedged: with a warm server,
 *
 *   GET /_next/image?url=%2F3d%2Fblue-pyramid.png&w=640&q=75   Accept: image/webp
 *
 * hung for the full 60s proxy timeout and returned 504, three times running,
 * while every other width of the same file and w=640 of all eight other renders
 * answered in 2-7ms. A restart cleared it — the same request then took 543ms
 * cold — so it was a stuck state in the running process, not a bad input. That
 * is exactly the reported symptom: one shape missing in the About area, for a
 * long time, and then present again.
 *
 * These nine files are fixed decorations. There is nothing to negotiate at
 * request time, so nothing should be: two widths of each are built into
 * public/3d and picked by a plain srcset. 480 covers every place a render is
 * drawn at 240 CSS px or less (the CV shapes, the phone hero) at 2x, and 960
 * covers the largest, the 640 About renders, at 1.5x and the 720 stack cube at
 * 1.33x. The whole set is 228kB, and a page pulls only what it shows.
 *
 * The PNG masters stay in public/3d. They are what these are generated from:
 *   for f in *.png; do n=${f%.png}
 *     for w in 480 960; do
 *       convert "$f" -resize ${w}x${w} -quality 82 -define webp:method=6 "$n-$w.webp"
 *     done
 *   done
 *
 * `src` is still given as the master's path, so call sites read the same as
 * they did and the mapping to the built widths lives here alone.
 */
export default function Shape3D({ src, sizes, eager = false, className = "" }) {
  const base = src.replace(/^\/3d\//, "").replace(/\.png$/, "");
  return (
    // Absolutely filling its parent, which is what `fill` gave us before: every
    // call site positions the box and expects the render to fill it.
    <img
      src={`/3d/${base}-960.webp`}
      srcSet={`/3d/${base}-480.webp 480w, /3d/${base}-960.webp 960w`}
      sizes={sizes}
      alt=""
      aria-hidden="true"
      // Eager for anything in or near the first screen. The About renders are
      // eager too: they are the second screen, they are large, and waiting for
      // an intersection is how a decoration ends up arriving visibly late.
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
      className={`absolute inset-0 h-full w-full object-contain ${className}`}
    />
  );
}

import { getDictionary } from "@/lib/content";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Stack from "@/components/sections/Stack";
import Resume from "@/components/sections/Resume";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

// Section order follows the Framer page. Pricing and Services remain absent:
// they exist in the template but there is no real content for them, and a
// portfolio that invents services and prices is worse than a shorter one.
// Testimonials IS built, but with a visible template in it rather than invented
// quotes — see lib/content.js.
export default async function Home({ params }) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <>
      <Hero t={t} />
      <About t={t} />
      <Testimonials t={t} />
      <Stack t={t} locale={locale} />
      <Resume t={t} />
      <Projects t={t} />
      <Contact t={t} />
    </>
  );
}

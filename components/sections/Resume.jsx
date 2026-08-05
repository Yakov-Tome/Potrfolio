import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { experience, education, site } from "@/lib/content";

/**
 * Experience, education and details.
 *
 * The Framer design has no section for these — but they are real content from
 * the previous site, and dropping them would lose the twelve years of IT work
 * that the About copy refers to. Rather than invent a new visual language, this
 * reuses the design's own card: tinted 48px shell, white 24px inner, 24px
 * padding at both levels.
 */
export default function Resume({ t }) {
  return (
    <section id="resume" className="section">
      <div className="shell flex w-full flex-col gap-[var(--section-gap)]">
        {/* Capped at the 1200 the design uses for its own widest content block;
            the page container itself is fluid now. */}
        <div className="cap grid gap-6 md:grid-cols-2">
          {/* Experience */}
          <Reveal className="tint-card">
            <div className="inner flex flex-col gap-6">
              <h2 className="t-h3 font-medium text-black">{t.experience.title}</h2>
              <ol className="m-0 flex list-none flex-col gap-5 p-0">
                {experience.map((job) => {
                  const copy = t.experience.items[job.id];
                  return (
                    <li key={job.id} className="border-s-2 border-gray-95 ps-4">
                      <p className="t-span text-gray-50">{job.period}</p>
                      <p className="t-body-small font-medium text-black">{copy.role}</p>
                      <p className="t-span text-blue-70">{job.company}</p>
                      <p className="t-body-small mt-1">{copy.detail}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* Education + details */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.08} className="tint-card">
              <div className="inner flex flex-col gap-6">
                <h2 className="t-h3 font-medium text-black">{t.education.title}</h2>
                <ol className="m-0 flex list-none flex-col gap-5 p-0">
                  {education.map((cert) => {
                    const copy = t.education.items[cert.id];
                    return (
                      <li key={cert.id} className="flex gap-4">
                        <Image
                          src={cert.image}
                          alt=""
                          width={72}
                          height={54}
                          className="h-[54px] w-[72px] shrink-0 rounded-[8px] object-cover"
                        />
                        <div className="min-w-0">
                          <p className="t-span text-gray-50">{cert.date}</p>
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="t-body-small link-underline font-medium text-black no-underline"
                          >
                            {copy.name}
                          </a>
                          <p className="t-span text-blue-70">{cert.provider}</p>
                          <p className="t-span break-all text-gray-50">
                            {t.education.credential}: {cert.credential}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.16} className="tint-card">
              <div className="inner flex flex-col gap-4">
                <h2 className="t-h3 font-medium text-black">{t.info.title}</h2>
                <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                  <Row k={t.info.fullName} v={site.name} />
                  <Row k={t.info.role} v={t.info.roleValue} />
                  <Row k={t.info.country} v={t.info.countryValue} />
                  <Row k={t.info.languages} v={t.info.languagesValue} />
                  <Row k={t.info.experienceLabel} v={t.info.experienceValue} />
                  <Row k={t.info.specialties} v={t.info.specialtiesValue} />
                  <Row k={t.info.freelance} v={t.info.freelanceValue} accent />
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, accent = false }) {
  return (
    <>
      <dt className="t-span text-gray-50">{k}</dt>
      <dd className={`t-body-small m-0 ${accent ? "font-medium text-green-40" : "text-black"}`}>{v}</dd>
    </>
  );
}

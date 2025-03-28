"use client";

import { FaDownload } from "react-icons/fa";
import PersonalInfo from "./PersonalInfo.jsx";
import Image from "next/image";
import Skills from "./Skill.jsx";
import Experience from "./Experience.jsx";
import Education from "./Education.jsx";
import Title from "@/app/components/Title.jsx";
import { motion } from "framer-motion";

// Animation variant for sections
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <>
      <Title text="about" textcolor="me" backword="resume" />

      {/* Main container */}
      <section className="container mx-auto py-10 mb-10 backdrop-blur-xl bg-white/10 p-6 rounded-lg shadow-lg w-full lg:w-10/12">
        {/* === PERSONAL INFO SECTION === */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-1 gap-10 bg-black/40 p-6 rounded-lg shadow-md"
        >
          <section>
            <h3 className="text-2xl font-semibold uppercase mb-4">
              Personal Infos
            </h3>

            {/* Mobile Image */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="block sm:hidden w-[220px] mx-auto rounded-full overflow-hidden border-3 border-white/70 my-10"
            >
              <Image
                src="/mobile.jpg"
                alt="Yakov Tome"
                width={200}
                height={200}
                className="w-full rounded-lg shadow-md"
              />
            </motion.div>

            {/* Personal Info Details */}
            <PersonalInfo />

            {/* Download CV Button */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-4"
            >
              <a
                className="inline-flex items-center px-6 py-2 rounded-lg btn btn-primary hover:scale-102 transition-transform duration-300 ease-in-out"
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download my CV"
              >
                <span className="mr-2">Download CV</span>
                <FaDownload />
              </a>
            </motion.div>
          </section>
        </motion.div>

        <div className="divider divider-info"></div>

        {/* === SKILLS SECTION === */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-6 rounded-lg"
        >
          <h3 className="text-2xl font-semibold uppercase text-center mb-6">
            My Skills
          </h3>
          <Skills />
        </motion.div>

        <div className="divider divider-info"></div>

        {/* === EXPERIENCE & EDUCATION SECTION === */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold uppercase text-center mb-6">
            Experience & Education
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Experience */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 rounded-lg shadow-md bg-black/60"
            >
              <Experience />
            </motion.div>

            {/* Education */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 rounded-lg shadow-md bg-black/60"
            >
              <Education />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default About;

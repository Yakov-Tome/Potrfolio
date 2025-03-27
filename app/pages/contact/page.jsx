"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "@/app/components/Title.jsx";
import Form from "./Form";
import { RiRoadMapFill } from "react-icons/ri";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";

// Animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Contact = () => {
  return (
    <>
      <ToastContainer />

      {/* Page title */}
      <Title text="contact" textcolor="me" backword="contact" />

      {/* Contact section */}
      <motion.div
        className="flex flex-wrap container mx-auto bg-white/10 p-4 rounded mb-10 lg:max-w-5xl lg:mr-24 xl:mr-32 xl:min-w-10/12 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Contact details */}
        <motion.div
          className="w-full lg:w-5/12 p-4 rounded bg-black/10 h-fit m-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <div className="m-4 text-sm">
            <motion.h3
              className="uppercase text-xl pb-4 text-info font-bold"
              variants={fadeInUp}
              custom={2}
            >
              Let’s connect!
            </motion.h3>
            <motion.p className="rounded" variants={fadeInUp} custom={3}>
              I’m always open to new opportunities — whether it’s building
              exciting projects, exploring creative ideas, or starting great
              collaborations. Let’s build something amazing together.
            </motion.p>
          </div>

          <div className="m-4 space-y-4 text-gray-300">
            {/* Location */}
            <motion.p
              onClick={() =>
                window.open(
                  "https://maps.app.goo.gl/1y3qNw7qzeYQhoQG9",
                  "_blank"
                )
              }
              className="relative pl-10 hover:bg-white/10 hover:scale-102 duration-300 rounded-lg text-sm"
              variants={fadeInUp}
              custom={4}
              aria-label="Click to view location on Google Maps"
            >
              <RiRoadMapFill
                className="absolute left-0 top-2 text-info"
                size={32}
              />
              Location
              <span className="block text-white font-normal">
                Herzliya, Israel
              </span>
            </motion.p>

            {/* Email */}
            <motion.p
              onClick={() => window.open("mailto:yakovtome@outlook.com")}
              className="relative pl-10 hover:bg-white/10 hover:scale-102 duration-300 rounded-lg text-sm"
              variants={fadeInUp}
              custom={5}
              aria-label="Click to send email"
            >
              <MdEmail className="absolute left-0 top-2 text-info" size={32} />
              Email
              <span className="block text-white font-normal">
                yakovtome@outlook.com
              </span>
            </motion.p>

            {/* GitHub */}
            <motion.p
              onClick={() =>
                window.open("https://github.com/yakov-tome", "_blank")
              }
              className="relative pl-10 hover:bg-white/10 hover:scale-102 duration-300 rounded-lg text-sm"
              variants={fadeInUp}
              custom={6}
              aria-label="View GitHub profile"
            >
              <FaGithub className="absolute left-0 top-2 text-info" size={32} />
              GitHub
              <span className="block text-white font-normal">
                github.com/Yakov-Tome
              </span>
            </motion.p>

            {/* LinkedIn */}
            <motion.p
              onClick={() =>
                window.open("https://linkedin.com/in/yakov-tome", "_blank")
              }
              className="relative pl-10 hover:bg-white/10 hover:scale-102 duration-300 rounded-lg text-sm cursor-pointer"
              variants={fadeInUp}
              custom={7}
              aria-label="View LinkedIn profile"
            >
              <FaLinkedin
                className="absolute left-0 top-2 text-info"
                size={32}
              />
              LinkedIn
              <span className="block text-white font-normal">
                linkedin.com/in/yakov-tome
              </span>
            </motion.p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="w-full lg:w-6/12 p-4 rounded bg-black/10 m-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={8}
        >
          <Form />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Contact;

"use client";

import { FaArrowAltCircleRight } from "react-icons/fa";
import Modal from "@/app/components/Modal.jsx";
import { useState } from "react";
import About from "../about/page.jsx";
import { motion } from "framer-motion";

const heroContent = {
  heroTitleName: "Yakov Tome",
  heroDesignation: "Full Stack Developer",
  heroDescriptions:
    "I'm a Full Stack Developer specialized in React, Node.js, MongoDB, and Next.js. I'm passionate about building excellent software that improves the lives of those around me.",
  heroBtn: "More About Me",
};

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end p-10">
      {/* Left background image (visible on desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:block lg:w-1/3 fixed bg-cover bg-center border-2 rounded-4xl"
        style={{
          backgroundImage: `url(/regular.jpg)`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          height: `calc(96vh - 80px)`,
          top: `80px`,
          left: `80px`,
          boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.2)`,
        }}
        role="img"
        aria-label="Yakov Tome hero background image"
      ></motion.div>

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-[58%] flex items-center justify-center lg:justify-end lg:mt-60"
      >
        <div className="transition-all duration-300 ease-in-out lg:mr-[20%] lg:text-left sm:justify-center sm:text-center bg-white/10 p-6 rounded-3xl shadow-lg min-w-sm text-center ">
          {/* Mobile image */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            src="/mobile.jpg"
            className="w-60 mx-auto mb-6 rounded-full ring-4 ring-white sm:block lg:hidden"
            alt="Yakov Tome portrait"
          />

          {/* Heading */}
          <motion.h1
            className="uppercase text-3xl sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <span role="img" aria-label="Waving hand">
              👋Hi
            </span>
            , I'm{" "}
            <strong className="text-yellow-500">
              {heroContent.heroTitleName}
            </strong>
            <span className="block">{heroContent.heroDesignation}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {heroContent.heroDescriptions}
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open modal with more information about me"
            className="mt-6 px-6 py-3 btn btn-warning w-full text-xl uppercase flex items-center justify-center gap-2 sm:mx-auto hover:scale-101"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span>{heroContent.heroBtn}</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <FaArrowAltCircleRight />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* Modal with About content */}
      {isOpen && (
        <Modal
          size="xl:min-w-4xl xl:h-11/12 lg:min-w-3xl lg:h-11/12 md:min-w-2xl md:h-11/12 sm:min-w-xl h-11/12 min-w-lg"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <About />
        </Modal>
      )}
    </div>
  );
};

export default Hero;

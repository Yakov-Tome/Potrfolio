"use client";

import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";
import dev from "@/public/cert/DEV.jpg";
import css from "@/public/cert/CSS.jpg";
import Image from "next/image";

// Education data array
const educationContent = [
  {
    year: "Sep 2024",
    degree: "The Complete 2024 Web Development Bootcamp",
    institute: "Udemy",
    details: "Credential ID: UC-52774641-1666-4987-ad4a-1a867d2a5e58",
    cert: dev,
    link: "https://www.udemy.com/certificate/UC-52774641-1666-4987-ad4a-1a867d2a5e58/",
  },
  {
    year: "Nov 2024",
    degree: "CSS - The Complete Guide (Flexbox, Grid & Sass)",
    institute: "Udemy",
    details: "Credential ID: UC-11067684-803f-4ef0-86e5-94542b50a039",
    cert: css,
    link: "https://www.udemy.com/certificate/UC-11067684-803f-4ef0-86e5-94542b50a039/",
  },
];

// Animation settings
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Education = () => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-8"
      aria-label="Education timeline"
    >
      {educationContent.map((val, i) => (
        <motion.li
          key={i}
          variants={itemVariants}
          className="flex items-start space-x-4 text-xs"
        >
          {/* Icon bubble */}
          <div className="flex items-center justify-center p-2 rounded-full bg-secondary text-white text-xl shadow-md relative">
            <FaBriefcase size={18} />
            <i className="absolute border-1 border-gray-800 border-t-70 top-9"></i>
          </div>

          {/* Content */}
          <div>
            <span className="block text-gray-400 uppercase font-semibold">
              {val.year}
            </span>
            <h5 className="font-bold text-white uppercase mt-1">
              {val.degree}
              <span className="block text-blue-400 font-semibold">
                {val.institute}
              </span>
            </h5>
            <p className="text-gray-300 mt-2 text-xs">{val.details}</p>

            {/* Certificate image (clickable) */}
            <Image
              src={val.cert.src}
              alt={`${val.degree} Certificate`}
              width={250}
              height={250}
              style={{ width: "auto", height: "auto" }}
              priority
              className="rounded-lg mt-2  hover:scale-102 transition-transform  duration-300 ease-in-out hover:brightness-90"
              onClick={() =>
                window.open(val.link, "_blank", "noopener,noreferrer")
              }
            />
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Education;

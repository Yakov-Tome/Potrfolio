"use client";

import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

// Timeline experience data
const experienceContent = [
  {
    year: "Feb 2024 - Present",
    position: "Career Transition",
    companyName: "Center District",
    details:
      "Full-Stack Web Development Bootcamp: HTML, CSS, JS, React, Node.js, PostgreSQL, Web3, Git, APIs",
  },
  {
    year: "Jun 2021 - Feb 2024",
    position: "IT Support Expert",
    companyName: "Primo Water Corporation",
    details:
      "Trained teams, improved IT processes, managed servers & SCCM, solved complex technical issues",
  },
  {
    year: "Jun 2017 - Jun 2021",
    position: "IT Support Expert",
    companyName: "Cloud247",
    details:
      "Led lab staff, managed systems & networks, supported clients, contributed to business growth",
  },
  {
    year: "Jan 2009 - Jan 2017",
    position: "IT Consultant & Lab Owner",
    companyName: "Self-employed",
    details:
      "Provided IT services: networks, servers, websites, diagnostics, support & cloud backups",
  },
  {
    year: "Oct 2006 - Oct 2009",
    position: "IT Specialist",
    companyName: "IDF",
    details: "Computer & server support, hardware & infrastructure maintenance",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Experience = () => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-8"
      aria-label="Work experience timeline"
    >
      {experienceContent.map((val, i) => (
        <motion.li
          key={i}
          variants={itemVariants}
          className="flex items-start space-x-4 text-xs pb-10"
        >
          <div className="flex items-center justify-center p-2 rounded-full bg-primary text-white shadow-md relative">
            <FaBriefcase size={18} />
            <i className="absolute border-1 border-gray-800 border-t-70 top-9"></i>
          </div>
          <div>
            <span className="block text-gray-400 uppercase font-semibold">
              {val.year}
            </span>
            <h5 className="font-bold text-white uppercase mt-1">
              {val.position}
              <span className="block text-yellow-400 font-semibold">
                {val.companyName}
              </span>
            </h5>
            <p className="text-gray-300 mt-2">{val.details}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default Experience;

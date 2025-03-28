"use client";
import { motion } from "framer-motion";

// Updated personal info content
const personalInfoContent = [
  { meta: "Full Name", metaInfo: "Yakov Tome" },
  { meta: "Country", metaInfo: "Israel" },
  { meta: "Freelance", metaInfo: "Available", metaColor: "green" },
  { meta: "Email", metaInfo: "yakovtome@outlook.com" },
  { meta: "Languages", metaInfo: "Hebrew, English" },
  { meta: "Role", metaInfo: "Full-Stack Developer | React & Node.js" },
  { meta: "Experience", metaInfo: "5+ Years in Tech & Web Dev" },
  { meta: "Specialties", metaInfo: "React, Node.js, Tailwind, REST APIs" },
];

// Animation settings
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PersonalInfo = () => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-wrap text-xs sm:text-sm md:text-sm text-gray-400 rounded-lg shadow-md divide-y divide-gray-600 border border-white/50"
      aria-label="Personal information list"
    >
      {personalInfoContent.map((info, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="w-full sm:w-1/2 pr-2 pl-2 pb-2 pt-2"
        >
          <div className="text-white capitalize ml-4 p-1 lg:text-sm">
            <span className="text-gray-400 block">{info.meta}:</span>
            <span
              className={
                info.metaColor === "green"
                  ? "text-green-500 font-semibold"
                  : "text-white"
              }
            >
              {info.metaInfo}
            </span>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default PersonalInfo;

"use client";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { FaSquareGithub } from "react-icons/fa6";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      role="contentinfo"
      className="flex flex-col md:flex-row items-center gap-4 bg-white/10 pb-20 pt-2 md:justify-around md:pb-18 md:mt-10 lg:p-2 z-50"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex flex-row items-center gap-2 text-xs"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Image src={logo} alt="Yakov Tome Logo" className="w-40 h-auto" />
      </motion.div>

      <motion.nav
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        aria-label="Social media links"
      >
        <p className="text-xs">
          © {new Date().getFullYear()} Yakov Tome. All rights reserved.
        </p>
        <SocialLink
          href="mailto:yakovtome@outlook.com"
          label="Email"
          icon={<GrMail className="text-xl lg:text-2xl xl:text-3xl" />}
        />
        <SocialLink
          href="https://github.com/Yakov-Tome"
          label="GitHub"
          icon={<FaSquareGithub className="text-xl lg:text-2xl xl:text-3xl" />}
        />
        <SocialLink
          href="https://www.linkedin.com/in/yakov-tome/"
          label="LinkedIn"
          icon={<FaLinkedin className="text-xl lg:text-2xl xl:text-3xl" />}
        />
      </motion.nav>
    </motion.footer>
  );
};

const SocialLink = ({ href, label, icon }) => (
  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {icon}
    </Link>
  </motion.div>
);

export default Footer;

"use client";
import { motion } from "framer-motion";

const Title = ({ text, textcolor, backword, padding = "py-16" }) => {
  return (
    <div
      className={`uppercase sm:text-center text-4xl sm:text-6xl font-[900] ${padding} text-white relative`}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="ml-2 z-10 relative"
      >
        {text} <span className="text-yellow-500">{textcolor}</span>
      </motion.div>

      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        className="blur-xs absolute top-18 opacity-20 text-5xl sm:text-6xl md:text-8xl tracking-[8px] sm:flex sm:justify-center sm:items-center sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2"
      >
        {backword}
      </motion.span>
    </div>
  );
};

export default Title;

"use client";

import { useContent } from "@/Context/GlobalContext.jsx";
import { useParams } from "next/navigation";
import Title from "@/app/components/Title.jsx";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { PiFileCodeFill, PiQuotesFill } from "react-icons/pi";
import { AiFillProject } from "react-icons/ai";
import Image from "next/image";
import { motion } from "framer-motion";
import NotFound from "./not-found";

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

const SinglePortfolio = () => {
  const { portfolioData } = useContent();
  const params = useParams();
  const id = Number(params.id);
  const post = portfolioData.find((item) => item.id === id);

  if (!post) return <NotFound />;

  return (
    <motion.div
      className="container mx-auto bg-black/40 rounded-lg mb-18 mt-4 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <article className="mx-auto w-full max-w-3xl">
        <Title text="post" textcolor="details" backword="portfolio" />

        {/* Metadata row */}
        <motion.div
          className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300 justify-around"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <span className="flex items-center gap-2">
            <FaBox color="orange" />
            {post.type}
          </span>
          <span className="flex items-center gap-2">
            <PiFileCodeFill color="orange" />
            {post.modalDetails[0].language}
          </span>
          <span className="flex items-center gap-2">
            <AiFillProject color="orange" />
            {post.modalDetails[0].project}
          </span>
          <span
            onClick={() => window.open(post.modalDetails[0].link, "_blank")}
            className="flex items-center gap-2 hover:scale-105 duration-300"
          >
            <FaExternalLinkSquareAlt color="orange" />
            <strong className="text-yellow-500">
              {post.modalDetails[0].preview}
            </strong>
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl font-bold mt-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {post?.title}
        </motion.h1>

        {/* Image */}
        <motion.div
          className="w-full h-auto rounded-md mt-4 overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <Image
            src={post?.image?.src}
            alt={`Image for ${post?.title}`}
            width={800}
            height={500}
            className="rounded-md"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="mt-6 space-y-4 text-sm text-neutral-300"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <strong className="text-2xl text-primary">{post?.type}</strong>

          <div className="border-l-4 border-primary pl-4 py-2 bg-neutral-800 flex items-start gap-4 rounded-md">
            <PiQuotesFill
              size={42}
              className="rotate-180 shrink-0"
              color="white"
            />
            <p className="text-xl mt-1">{post.modalDetails[0].title}</p>
          </div>

          <p>{post.modalDetails[0].description}</p>
        </motion.div>
      </article>
    </motion.div>
  );
};

export default SinglePortfolio;

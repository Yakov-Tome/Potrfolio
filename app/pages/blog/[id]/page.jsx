"use client";

import { useParams } from "next/navigation";
import { useContent } from "@/Context/GlobalContext";
import { motion } from "framer-motion";
import Title from "@/app/components/Title";
import { PiQuotesFill } from "react-icons/pi";
import Image from "next/image";
import NotFound from "./not-found";

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

const SingleBlog = () => {
  const { blogsData } = useContent();
  const params = useParams();
  const id = Number(params.id);
  const post = blogsData.find((blog) => blog.id === id);

  if (!post) return <NotFound />;

  return (
    <motion.div
      className="container mx-auto bg-black/40 rounded-lg  mb-18 mt-4 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <article className="max-w-3xl mx-auto">
        <Title text="post" textcolor="details" backword="blog" />

        <motion.h1
          className="text-2xl font-bold text-white"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {post.title}
        </motion.h1>

        <motion.div
          className="w-full h-auto rounded-md mt-4 overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Image
            src={post.img?.src}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg"
          />
        </motion.div>

        <motion.div
          className="mt-6 space-y-4 text-sm text-neutral-300"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <p>{post.description1}</p>

          <div className="border-l-4 border-primary pl-4 py-2 bg-neutral-800 flex items-start gap-4 rounded-md">
            <PiQuotesFill
              size={42}
              className="rotate-180 shrink-0"
              color="white"
            />
            <p>{post.description2}</p>
          </div>

          <p>{post.description3}</p>
          <p>{post.description4}</p>
        </motion.div>
      </article>
    </motion.div>
  );
};

export default SingleBlog;

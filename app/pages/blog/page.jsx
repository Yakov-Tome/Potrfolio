"use client";

import Modal from "@/app/components/Modal.jsx";
import Title from "@/app/components/Title.jsx";
import { useContent } from "@/Context/GlobalContext.jsx";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";
import { PiQuotesFill } from "react-icons/pi";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const Blog = () => {
  const [url, setUrl] = useState("");

  // Destructure context
  const { singleData, isOpen, setIsOpen, blogsData, handleBlogsData } =
    useContent();

  // Trigger context logic on click
  const openModal = (id) => {
    handleBlogsData(id);
  };

  // Generate modal sharing URL
  useEffect(() => {
    if (typeof window !== "undefined" && singleData?.id) {
      setUrl(`${window.location.origin}/pages/blog/${singleData.id}`);
    }
  }, [singleData]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <Title text="my" textcolor="blog" backword="posts" />

      {/* Blog Cards */}
      <motion.div
        className="flex flex-wrap mt-4 lg:-ml-1 container mx-auto bg-white/10 backdrop-blur-3xl rounded-xl p-4 mb-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label="Blog posts grid"
      >
        {blogsData?.length > 0 &&
          blogsData.map((item) => (
            <motion.div
              key={item.id}
              className="w-full md:w-1/2 xl:w-1/3 px-4 mb-8"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <article
                className="block overflow-hidden rounded-md shadow-lg hover:shadow-xl transition duration-300 group"
                onClick={() => openModal(item?.id)}
              >
                <div className="rounded-t-md overflow-hidden">
                  <Image
                    src={item?.img?.src}
                    alt={item?.title}
                    width={500}
                    height={300}
                    priority
                    className="w-full h-auto transform transition-transform duration-300 group-hover:scale-110 border-b-6 border-info"
                  />
                </div>

                <div className="bg-neutral-900 text-white p-6 rounded-b-md">
                  <h3 className="text-lg font-semibold leading-6 group-hover:text-primary transition-colors duration-300">
                    {item?.title}
                  </h3>
                  <div className="mt-3 text-sm text-neutral-300">
                    <p>{item?.description1.slice(0, 100)}</p>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
      </motion.div>

      {/* Modal View for Single Blog */}
      {singleData?.id && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          url={url}
          size="xl:min-w-5xl xl:h-11/12 lg:min-w-4xl lg:h-11/12 md:min-w-3xl md:h-11/12 sm:min-w-2xl sm:h-11/12"
        >
          <motion.div
            className="container mx-auto p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <article>
              <Title text="post" textcolor="details" backword="posts" />

              <motion.div
                className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="flex items-center gap-2">
                  <FaUser color="orange" />
                  {singleData.commentor}
                </span>
                <span className="flex items-center gap-2">
                  <FaCalendarAlt color="orange" />
                  {singleData.date}
                </span>
                <span className="flex items-center gap-2">
                  <FaTags color="orange" />
                  {singleData.tag}
                </span>
              </motion.div>

              <motion.h1
                className="text-2xl font-bold mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {singleData?.title}
              </motion.h1>

              <motion.img
                src={singleData?.img?.src}
                className="w-full h-auto rounded-md mt-4"
                alt={singleData?.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />

              <motion.div
                className="mt-6 space-y-4 text-sm text-neutral-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p>{singleData?.description1}</p>

                <div className="border-l-4 border-primary pl-4 py-2 bg-neutral-800 flex items-start gap-4 rounded-md">
                  <PiQuotesFill
                    size={42}
                    className="rotate-180 shrink-0"
                    color="white"
                  />
                  <p>{singleData?.description2}</p>
                </div>

                <p>{singleData?.description3}</p>
                <p>{singleData?.description4}</p>
              </motion.div>
            </article>
          </motion.div>
        </Modal>
      )}
    </>
  );
};

export default Blog;

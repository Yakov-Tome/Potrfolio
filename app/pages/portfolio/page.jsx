"use client";

import Title from "@/app/components/Title.jsx";
import Image from "next/image";
import { useContent } from "@/Context/GlobalContext.jsx";
import Link from "next/link";
import Modal from "@/app/components/Modal.jsx";
import { SlUser } from "react-icons/sl";
import { FaRegFileCode } from "react-icons/fa";
import { PiProjectorScreenLight } from "react-icons/pi";
import { GoLinkExternal } from "react-icons/go";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [url, setUrl] = useState("");

  // Destructure content context
  const { singleData, isOpen, setIsOpen, portfolioData, handlePortfolio } =
    useContent();

  // Generate preview URL for sharing
  useEffect(() => {
    if (typeof window !== "undefined" && singleData?.id) {
      setUrl(`${window.location.origin}/pages/portfolio/${singleData.id}`);
    }
  }, [singleData]);

  // Render project/customer cards by tag
  const renderCards = (tag) => (
    <div className="flex flex-wrap gap-4 mx-auto justify-center">
      {portfolioData.length > 0 &&
        portfolioData
          .filter((data) => data?.tag.includes(tag))
          .map((data) => (
            <motion.div
              key={data?.id}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="card card-body card-hover">
                {data?.image && (
                  <Image
                    src={data.image}
                    alt={data.type}
                    width={300}
                    style={{ height: "auto" }}
                    onClick={() => handlePortfolio(data.id)}
                    priority
                    className="rounded-2xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                )}

                <h2 className="card-title opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4">
                  {data?.type}
                </h2>
              </div>
            </motion.div>
          ))}
    </div>
  );

  return (
    <>
      <Title text="my" textcolor="Portfolio" backword="works" />

      {/* Tab section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="tabs tabs-border lg:max-w-lg min-w-10/12 mx-auto items-center justify-center mb-10">
          <input
            type="radio"
            name="my_tabs_2"
            className="tab cursor-none"
            aria-label="Projects"
            defaultChecked
          />
          <div className="tab-content border-base-300 bg-white/10 rounded-2xl p-10">
            <div>{renderCards("projects")}</div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab cursor-none"
            aria-label="Customers"
          />
          <div className="tab-content border-base-300 bg-white/10 rounded-2xl p-10">
            <div>{renderCards("customer")}</div>
          </div>
        </div>
      </motion.div>

      {/* Modal with project details */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url={url}
        size="min-w-xl h-10/12 md:min-w-2xl md:h-11/12 lg:min-w-3xl lg:h-11/12 xl:min-w-4xl xl:h-11/12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm text-gray-500">
            <div className="flex flex-col items-center">
              <Title
                text={singleData?.type}
                textcolor="Project"
                backword="Details"
              />

              {singleData?.modalDetails?.map((data, index) => (
                <div key={index}>
                  <section className="grid grid-cols-2 text-xs text-white gap-2 span bg-white/10 rounded-2xl p-4 mb-4">
                    <div className="flex p-4 bg-black/10 rounded-2xl">
                      <FaRegFileCode className="mr-2" />
                      <span>
                        Project:
                        <span className="font-semibold uppercase ml-1">
                          {data.project}
                        </span>
                      </span>
                    </div>

                    <div className="flex p-4 bg-black/10 rounded-2xl">
                      <SlUser className="mr-2" />
                      <span>
                        Client:
                        <span className="font-semibold uppercase ml-1">
                          {data.client}
                        </span>
                      </span>
                    </div>

                    <div className="flex p-4 bg-black/10 rounded-2xl">
                      <PiProjectorScreenLight className="mr-2" />
                      <span>
                        Platform:
                        <span className="font-semibold uppercase ml-1">
                          {data.language}
                        </span>
                      </span>
                    </div>

                    <div className="flex p-4 bg-black/10 rounded-2xl hover:scale-102 transition-transform hover:bg-yellow-400/10 duration-300 ease-in-out">
                      <GoLinkExternal className="mr-2" />
                      <span>
                        Preview:
                        <Link
                          className="ml-1 text-info break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={data.link}
                        >
                          <strong>{data.preview}</strong>
                        </Link>
                      </span>
                    </div>

                    <div className="col-span-2 rounded-2xl overflow-hidden m-1 mx-auto">
                      {singleData?.image && (
                        <Image
                          src={singleData?.image}
                          alt={singleData?.type || "Project Image"}
                          width={600}
                          style={{ height: "auto" }}
                        />
                      )}
                    </div>
                  </section>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Modal>
    </>
  );
};

export default Portfolio;

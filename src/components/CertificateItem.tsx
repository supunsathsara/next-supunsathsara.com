"use client";

import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const CertificateItem = ({ certificate, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="rounded-lg relative bg-neutral-900 overflow-hidden h-60 md:h-50 w-full transition-all duration-300 ease-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFullScreen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={`/certificates/${certificate.image}`}
          alt={certificate.name}
          width={500}
          height={500}
          className="object-cover absolute inset-0"
        />

        <div
          className={`absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
            {certificate.name}
          </div>
        </div>

        {isHovered && (
          <div className="absolute top-4 right-4 text-white">
            <ArrowsPointingOutIcon className="h-6 w-6" />
          </div>
        )}
      </motion.div>

      <div className="mt-4 text-center">
        <div className="text-xl md:text-2xl font-medium text-gray-100">
          {certificate.name}
        </div>
        <div className="text-md md:text-lg text-gray-300">
          {certificate.provider}
        </div>
      </div>

      {isFullScreen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50"
          onClick={() => setIsFullScreen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full h-3/4 md:w-3/4 flex flex-col items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <Image
              src={`/certificates/${certificate.image}`}
              alt={certificate.name}
              width={1000}
              height={1000}
              className="object-contain"
            />

            <div
              className="absolute top-4 right-4 text-white text-2xl cursor-pointer"
              onClick={() => setIsFullScreen(false)}
            >
              &times;
            </div>
          </motion.div>
          <div className="w-full text-white text-lg text-center pt-4 bg-black bg-opacity-75 p-4">
            <p>{certificate.provider}</p>
            <a
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View Certificate
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CertificateItem;

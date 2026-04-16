"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export const VisualBreakSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="my-32"
    >
      <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl group">
        <Image
          src="/images/visual-break.png"
          alt="Deep space nebula with digital grid overlays highlighting scalable engineering"
          fill
          className="object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-12 left-12 max-w-lg z-10">
          <blockquote className="text-2xl font-light text-slate-100 italic leading-snug">
            &quot;Great software is a symphony of invisible logic and visible poetry.&quot;
          </blockquote>
        </div>
      </div>
    </motion.section>
  );
};

export default VisualBreakSection;

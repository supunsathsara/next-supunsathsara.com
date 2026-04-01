"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ContainerTextFlip } from "./ui/container-text-flip";

const HeroSection = () => {
  return (
    <section className="h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 order-2 lg:order-1 text-center lg:text-left"
        >
          <h1 className="text-white mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            <span className="block">Supun Sathsara</span>
            <span className="block text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl text-gray-300 mt-2">
              <ContainerTextFlip
                words={[
                  "Associate Software Engineer",
                  "Full-Stack Web Developer",
                  "Postman Student Leader",
                  "Tech Enthusiast & Innovator",
                ]}
                interval={3000}
                className="inline-block"
              />
            </span>
          </h1>
          <p className="text-[#ADB7BE] text-sm sm:text-base lg:text-lg xl:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
            A Developer based in Sri Lanka, specializing in building exceptional
            websites, applications, and everything in between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
            <Link
              href="#contact"
              className="px-6 py-3 w-full sm:w-auto rounded-full bg-gradient-to-br from-primary-500 to-secondary hover:bg-slate-500 text-white text-center font-medium transition-all"
            >
              Hire Me
            </Link>
            <a
              href="/Supun-Sathsara-CV.pdf"
              download="Supun Sathsara CV.pdf"
              title="Download My CV"
              className="px-1 py-1 w-full sm:w-auto rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white transition-all"
            >
              <span className="block animate-shimmer bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2 text-center font-medium">
                Download CV
              </span>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="rounded-full bg-[#03001417] w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] relative shadow-xl shadow-[#2A0E61]/50 backdrop-blur-md">
            <Image
              src="/images/hero.jpg"
              alt="hero image"
              className="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              loading="eager" // Load this critical image eagerly
              priority // Load this image before others below the fold
              width={350}
              height={350}
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 250px, 400px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

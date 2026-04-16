"use client";
import { motion } from "motion/react";
import {
  BoltIcon,
  PaintBrushIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

export const InsightsSection = () => {
  return (
    <section id="philosophy" className="relative text-white py-24 px-4 xl:px-16 overflow-hidden">
      {/* Background Atmospheric Glows matching the portfolio theme */}
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-purple-900/20 blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-cyan-900/20 blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto relative z-10">

        {/* Hero Philosophy Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8"
            >
              <label className="text-xs uppercase tracking-[0.2em] text-[#b89fff] mb-6 block font-medium">Manifesto</label>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-12 text-transparent bg-clip-text bg-gradient-to-tr from-[#b89fff] to-[#00cffc]">
                Engineering Philosophy
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                In an era where digital noise is constant, I prioritize <span className="text-white font-normal">clean, scalable, and intuitive user experiences</span>. My approach integrates rigorous software engineering principles with a dedication to robust architecture. Whether building complex distributed systems or crafting highly responsive interfaces, the goal remains the same: <span className="text-[#00cffc] italic">invisible complexity, visible simplicity.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <div className="aspect-square rounded-full border border-gray-700/30 p-8 flex items-center justify-center relative">
                <div className="absolute inset-0 animate-pulse bg-purple-500/10 rounded-full blur-3xl"></div>
                <CubeTransparentIcon className="w-32 h-32 text-purple-400/40" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Principles Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Core Principles</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#b89fff] to-transparent"></div>
            </div>
            <p className="text-sm text-gray-500 tracking-wider max-w-xs">
              Foundational pillars guiding every architectural decision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1: Performance First */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#18191e]/40 backdrop-blur-xl border border-gray-700/30 p-10 rounded-xl relative group overflow-hidden transition-all duration-500 hover:bg-[#24252b]/60 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(184,159,255,0.08)] flex flex-col h-full"
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <BoltIcon className="w-48 h-48" />
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-8 shrink-0">
                <BoltIcon className="w-6 h-6 text-[#b89fff]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Performance First</h3>
              <p className="text-gray-400 leading-relaxed flex-grow">
                Focusing on sub-second latency and optimized resource usage to ensure seamless digital flows.
              </p>
            </motion.article>

            {/* Card 2: Aesthetic Integrity */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#18191e]/40 backdrop-blur-xl border border-gray-700/30 p-10 rounded-xl relative group overflow-hidden transition-all duration-500 hover:bg-[#24252b]/60 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(0,207,252,0.08)] flex flex-col h-full"
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <PaintBrushIcon className="w-48 h-48" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center mb-8 rounded-lg shrink-0" style={{ background: "rgba(0, 207, 252, 0.1)" }}>
                <PaintBrushIcon className="w-6 h-6 text-[#00cffc]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Aesthetic Integrity</h3>
              <p className="text-gray-400 leading-relaxed flex-grow">
                Ensuring every pixel serves a purpose and enhances the user journey with deliberate intent.
              </p>
            </motion.article>

            {/* Card 3: Scalable Architecture */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#18191e]/40 backdrop-blur-xl border border-gray-700/30 p-10 rounded-xl relative group overflow-hidden transition-all duration-500 hover:bg-[#24252b]/60 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(255,106,159,0.08)] flex flex-col h-full"
            >
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CubeTransparentIcon className="w-48 h-48" />
              </div>
              <div className="w-12 h-12 flex items-center justify-center mb-8 rounded-lg shrink-0" style={{ background: "rgba(255, 106, 159, 0.1)" }}>
                <CubeTransparentIcon className="w-6 h-6 text-[#ff6a9f]" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Scalable Architecture</h3>
              <p className="text-gray-400 leading-relaxed flex-grow">
                Building systems that grow gracefully with user demand, maintaining stability under pressure.
              </p>
            </motion.article>

          </div>
        </section>

      </div>
    </section>
  );
};

export default InsightsSection;

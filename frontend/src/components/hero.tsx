"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Bot, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/social-icons";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Machine Learning Engineer",
  "AI Engineer",
  "Systems Developer",
  "Agentic AI Developer",
  "Full Stack Developer"
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
    >
      {/* Background Interactive Particles Simulated with CSS Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-purple-accent/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-accent/5 blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Intro Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-purple-accent/30 bg-purple-accent/5 font-mono text-[11px] tracking-widest text-purple-accent uppercase mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-accent animate-ping"></span>
            Specializing in Distributed Inference & LLMOps
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-4"
          >
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-accent to-blue-accent text-glow-purple">intelligent</span>
            <br />
            systems.
          </motion.h1>

          {/* Dynamic Role Rotator */}
          <div className="h-10 sm:h-12 overflow-hidden mb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={roles[roleIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-lg sm:text-xl font-mono text-blue-accent uppercase tracking-widest"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground max-w-xl mb-10 leading-relaxed font-sans"
          >
            Hi, I&apos;m Abdul Razak. I am a backend-focused systems and ML engineer. I specialize in designing low-latency RESTful APIs, high-throughput data processing pipelines, and scalable local LLM serving infrastructure. 
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
          >
            <a
              href="#ai-assistant"
              className="flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-wider text-white bg-gradient-to-r from-purple-accent to-blue-accent px-6 py-3.5 rounded-lg shadow-lg hover:shadow-purple-accent/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Bot size={16} />
              Consult AI Digital Twin
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-white border border-border/80 bg-obsidian-light/40 hover:bg-obsidian-light/90 px-6 py-3.5 rounded-lg glass transition-all"
            >
              Explore Showcase
              <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Social connections */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-6 text-muted-foreground border-t border-border/20 pt-6 w-full"
          >
            <span className="text-[10px] uppercase font-mono tracking-widest">Connect:</span>
            <a
              href="https://www.linkedin.com/in/abdul-rasak-n-46b178279/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-accent transition-colors"
            >
              <LinkedinIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://github.com/iamRaz-01"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-accent transition-colors"
            >
              <GithubIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href="mailto:abdulrazak.nasriudeen@gmail.com"
              className="hover:text-purple-accent transition-colors"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Glassmorphic Photo Frame */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-2xl overflow-hidden glass p-3 glow-purple"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/40">
              <Image
                src="/avatar.jpg"
                alt="Abdul Razak N Portrait"
                fill
                priority
                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out hover:scale-105"
                sizes="(max-width: 640px) 280px, 360px"
              />
            </div>
            
            {/* Absolute Badges on the Photo Card */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border border-purple-accent/20 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Status</p>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Available for work</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

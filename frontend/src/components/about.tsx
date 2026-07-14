"use client";

import React from "react";
import { Cpu, Layers, Zap, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: <Cpu className="text-purple-accent" size={24} />,
    title: "Intelligent Systems Architect",
    description: "Driven by the transition from static software to intelligent agentic systems. Focused on model serving, distributed inference, and LLMOps pipelines."
  },
  {
    icon: <Layers className="text-purple-accent" size={24} />,
    title: "Scalable API & Backend Engineer",
    description: "Expertise in designing RESTful architectures with Spring Boot and FastAPI. Skilled in handling concurrent connections and database optimization."
  },
  {
    icon: <Zap className="text-purple-accent" size={24} />,
    title: "Low-Latency Mindset",
    description: "Passionate about optimizing GPU infrastructure and utilizing containerized tools (Docker, Kubernetes) to reduce processing overheads and latencies."
  },
  {
    icon: <GraduationCap className="text-purple-accent" size={24} />,
    title: "Constant Lifelong Learning",
    description: "Currently pursuing B.Tech in Artificial Intelligence & Machine Learning. Industry-vetted training at Freshworks Software Academy."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-accent mb-3">
            01 // Inside the Mind
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Engineering Philosophy
          </h2>
          <div className="w-16 h-[2px] bg-purple-accent mt-4"></div>
        </div>

        {/* Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-muted-foreground leading-relaxed font-sans text-sm sm:text-base">
            <p>
              I don&apos;t just write code; I construct the backbones of systems that process data, draw inferences, and serve users in real-time. My engineering journey is fueled by a curiosity for how complex systems are built, scaled, and secured.
            </p>
            <p>
              Having completed intensive software academy training at <strong className="text-white">Freshworks</strong>, I gained hands-on expertise in industry practices—ranging from MVC design patterns and unit testing to continuous delivery pipelines and agile sprint structures.
            </p>
            <p>
              My focus lies at the intersection of <strong className="text-white">Backend Engineering</strong> and <strong className="text-white">Applied Machine Learning</strong>. I design systems with the capacity to handle concurrent operations, optimize resources, and serve large-scale models with minimal overhead.
            </p>
            <div className="p-4 rounded-xl border border-blue-accent/20 bg-blue-accent/5 font-mono text-xs text-blue-accent mt-4">
              &quot;The bottleneck in modern computing is no longer raw computation—it is the orchestration and latency of data flow between layers.&quot;
            </div>
          </div>

          {/* Core Values Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass glass-hover border border-border/40 flex flex-col items-start gap-4"
              >
                <div className="p-3 rounded-lg bg-obsidian-light/60 border border-border/60">
                  {val.icon}
                </div>
                <h3 className="font-sans font-bold text-base text-white tracking-wide">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

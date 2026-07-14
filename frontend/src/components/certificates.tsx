"use client";

import React from "react";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const certificates = [
  {
    title: "Oracle Certified Professional: Java SE 21 Developer",
    provider: "Oracle",
    date: "2025",
    skills: ["Java SE 21", "Object-Oriented Design", "Concurrency", "JVM Architecture"],
    verified: true
  },
  {
    title: "AWS Educate Machine Learning Foundations",
    provider: "Amazon Web Services (AWS)",
    date: "2024",
    skills: ["AWS ML Stack", "SageMaker Basics", "Data Engineering", "Model Training"],
    verified: true
  },
  {
    title: "AWS Educate Introduction to Generative AI",
    provider: "Amazon Web Services (AWS)",
    date: "2024",
    skills: ["Foundation Models", "Bedrock Overview", "Prompt Design", "Transformer Architectures"],
    verified: true
  },
  {
    title: "AWS Educate Introduction to Cloud 101",
    provider: "Amazon Web Services (AWS)",
    date: "2024",
    skills: ["EC2", "S3", "IAM Roles", "Serverless Architectures"],
    verified: true
  },
  {
    title: "Microsoft Certified: Azure Basics",
    provider: "Microsoft",
    date: "2024",
    skills: ["Azure Cloud", "Subnets", "Resource Management", "Identity Security"],
    verified: true
  }
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-accent mb-3">
            05 // Certified Verifications
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Certificates & Licenses
          </h2>
          <div className="w-16 h-[2px] bg-purple-accent mt-4"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="p-6 rounded-2xl glass glass-hover border border-border/40 flex flex-col justify-between hover:border-purple-accent/20 transition-all duration-300"
            >
              <div>
                {/* Provider Logo Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    <Award size={14} className="text-purple-accent" />
                    {cert.provider}
                  </div>
                  {cert.verified && (
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded-full">
                      <ShieldCheck size={10} />
                      Verified
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-sm sm:text-base text-white tracking-wide mb-4 leading-relaxed">
                  {cert.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="font-mono text-[9px] uppercase tracking-wider text-blue-accent/90 border border-blue-accent/15 bg-blue-accent/5 px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Badge Footer */}
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest pt-4 border-t border-border/20">
                <span>Issue Date: {cert.date}</span>
                <span className="text-purple-accent flex items-center gap-1 hover:underline cursor-pointer">
                  Credential <ExternalLink size={10} />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

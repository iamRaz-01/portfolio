"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, Award } from "lucide-react";
import { motion } from "framer-motion";

const timelineEvents = [
  {
    type: "education",
    icon: <GraduationCap size={16} className="text-blue-accent" />,
    role: "Bachelor of Technology (B.Tech)",
    company: "Saveetha Engineering College",
    duration: "Expected Graduation: May 2028",
    location: "Chennai, India",
    points: [
      "Specializing in Artificial Intelligence and Machine Learning.",
      "Focusing on system-level programming, neural network architectures, data science, and distributed systems."
    ],
    tech: ["Python", "TensorFlow", "Scikit-Learn", "Machine Learning", "Deep Learning", "Pandas", "NumPy"]
  },
  {
    type: "work",
    icon: <Briefcase size={16} className="text-purple-accent" />,
    role: "Full Stack Developer Intern",
    company: "Enyard Private Limited",
    duration: "Sept 2025 - Nov 2025",
    location: "Chennai, India",
    points: [
      "Developed and optimized RESTful APIs using Spring Boot, improving response latency and backend efficiency.",
      "Implemented robust backend logic to handle concurrent requests, enhancing application scalability.",
      "Identified and resolved database performance bottlenecks, improving system reliability under high loads.",
      "Collaborated with cross-functional design and frontend teams to integrate scalable application features."
    ],
    tech: ["Spring Boot", "Java SE 21", "RESTful APIs", "MySQL", "Git", "Backend Optimization"]
  },
  {
    type: "work",
    icon: <Briefcase size={16} className="text-purple-accent" />,
    role: "Product Development Intern",
    company: "Lumel Technology",
    duration: "Dec 2023 - June 2024",
    location: "Chennai, India",
    points: [
      "Built and optimized interactive data-driven dashboards using Power BI and InfoRiver Matrix.",
      "Processed and analyzed complex structured datasets to generate actionable KPI insights for business decisions.",
      "Collaborated closely with engineering teams to enhance reporting performance and data pipeline efficiency."
    ],
    tech: ["Power BI", "InfoRiver Matrix", "Data Analysis", "MySQL", "KPI Dashboards"]
  },
  {
    type: "education",
    icon: <GraduationCap size={16} className="text-blue-accent" />,
    role: "Software Trainee",
    company: "Freshworks Software Academy",
    duration: "Sept 2022 - Nov 2023",
    location: "Chennai, India",
    points: [
      "Completed a comprehensive one-year industry-focused training program covering MVC architecture, REST APIs, and database design.",
      "Built, tested, and debugged backend application structures using Java and MySQL databases.",
      "Acquired deep understanding of Git version control, CI/CD fundamentals, unit testing, and Agile workflows."
    ],
    tech: ["Java", "Spring Boot", "REST APIs", "MySQL", "Git & GitHub", "Agile Methodologies", "CI/CD"]
  }
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-accent mb-3">
            02 // Historical Milestones
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Professional Timeline
          </h2>
          <div className="w-16 h-[2px] bg-purple-accent mt-4"></div>
        </div>

        {/* Timeline Line & Nodes */}
        <div className="relative border-l border-border/40 ml-4 sm:ml-8 pl-8 sm:pl-12 flex flex-col gap-16">
          {timelineEvents.map((evt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Floating Timeline Icon */}
              <div className="absolute -left-[53px] sm:-left-[69px] top-1.5 h-10 w-10 rounded-full border border-border/60 bg-obsidian-light/95 flex items-center justify-center shadow-lg">
                {evt.icon}
              </div>

              {/* Event Card */}
              <div className="p-6 rounded-2xl glass border border-border/40 hover:border-purple-accent/30 transition-all duration-300">
                
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-white">
                      {evt.role}
                    </h3>
                    <p className="font-sans text-sm text-purple-accent/90">
                      {evt.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-obsidian-light/60 border border-border/60 px-3 py-1.5 rounded-lg w-max">
                    <Calendar size={12} className="text-blue-accent" />
                    {evt.duration}
                  </div>
                </div>

                {/* Point details */}
                <ul className="list-disc pl-4 space-y-2 mb-6">
                  {evt.points.map((p, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                      {p}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {evt.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] tracking-wider uppercase text-blue-accent border border-blue-accent/20 bg-blue-accent/5 px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

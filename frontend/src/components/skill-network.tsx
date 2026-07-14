"use client";

import React, { useState } from "react";
import { Cpu, Server, Layout, Database, Network } from "lucide-react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: string;
  projects: string[];
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    name: "Languages",
    icon: <Cpu className="text-purple-accent" size={18} />,
    color: "from-purple-accent to-purple-600",
    skills: [
      { name: "Java", level: "Expert", projects: ["TransitOps", "SentraOps"] },
      { name: "Python", level: "Advanced", projects: ["RuralGPT", "EcoSphere"] },
      { name: "JavaScript / TypeScript", level: "Intermediate", projects: ["SentraOps"] },
      { name: "SQL", level: "Advanced", projects: ["TransitOps", "SentraOps"] }
    ]
  },
  {
    id: "backend",
    name: "Backend & Systems",
    icon: <Server className="text-blue-accent" size={18} />,
    color: "from-blue-accent to-blue-600",
    skills: [
      { name: "Spring Boot", level: "Expert", projects: ["TransitOps", "SentraOps"] },
      { name: "FastAPI", level: "Advanced", projects: ["RuralGPT", "EcoSphere", "SentraOps"] },
      { name: "RESTful APIs", level: "Expert", projects: ["TransitOps", "SentraOps", "RuralGPT"] },
      { name: "Concurrent Programming", level: "Advanced", projects: ["TransitOps", "SentraOps"] }
    ]
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    icon: <Network className="text-purple-accent" size={18} />,
    color: "from-purple-accent to-blue-accent",
    skills: [
      { name: "Llama-3 serving", level: "Advanced", projects: ["RuralGPT"] },
      { name: "RAG Pipelines", level: "Advanced", projects: ["RuralGPT", "EcoSphere"] },
      { name: "Model Quantization", level: "Intermediate", projects: ["RuralGPT"] },
      { name: "TensorFlow / Scikit-learn", level: "Intermediate", projects: ["Saveetha AIML"] }
    ]
  },
  {
    id: "databases",
    name: "Data & Infrastructure",
    icon: <Database className="text-blue-accent" size={18} />,
    color: "from-blue-600 to-indigo-600",
    skills: [
      { name: "Qdrant (Vector DB)", level: "Advanced", projects: ["RuralGPT", "EcoSphere", "SentraOps"] },
      { name: "MySQL", level: "Advanced", projects: ["TransitOps", "SentraOps"] },
      { name: "Docker", level: "Advanced", projects: ["SentraOps", "RuralGPT"] },
      { name: "CI/CD & Git", level: "Advanced", projects: ["TransitOps", "SentraOps"] }
    ]
  }
];

export default function SkillNetwork() {
  const [activeCategory, setActiveCategory] = useState<string>("languages");

  const currentCategoryData = skillCategories.find((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-accent mb-3">
            04 // Technology Matrix
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Skill Network
          </h2>
          <div className="w-16 h-[2px] bg-purple-accent mt-4"></div>
        </div>

        {/* Skill Web Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Hub Categories Selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <p className="font-mono text-xs uppercase text-muted-foreground mb-2">
              Select Hub Category
            </p>
            <div className="flex flex-col gap-3">
              {skillCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${
                      isActive
                        ? "glass border-purple-accent/60 bg-purple-accent/5 glow-purple"
                        : "border-border/40 hover:border-purple-accent/20 bg-obsidian-light/20 hover:bg-obsidian-light/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-obsidian-light border border-border/80">
                        {cat.icon}
                      </div>
                      <span className="font-sans font-bold text-sm text-white tracking-wide">
                        {cat.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {cat.skills.length} nodes
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Nodes Connections display */}
          <div className="lg:col-span-7 p-6 rounded-2xl glass border border-purple-accent/15 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center gap-2 border-b border-border/20 pb-4 mb-6">
                <span className="font-mono text-xs text-purple-accent uppercase tracking-widest">
                  Hub:
                </span>
                <span className="font-sans font-bold text-white text-base">
                  {currentCategoryData?.name}
                </span>
              </div>

              {/* Skills Nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentCategoryData?.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-4 rounded-xl border border-border/40 bg-obsidian-light/35 flex flex-col gap-2 hover:border-blue-accent/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-bold text-xs sm:text-sm text-white">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-blue-accent border border-blue-accent/20 bg-blue-accent/5 px-2 py-0.5 rounded">
                        {skill.level}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        Linked Systems:
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {skill.projects.map((proj) => (
                          <span
                            key={proj}
                            className="font-mono text-[9px] text-muted-foreground border border-border bg-obsidian-light/60 px-1.5 py-0.5 rounded"
                          >
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Micro-interaction footer */}
            <div className="mt-8 pt-4 border-t border-border/20 flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              <span>Interactive network system</span>
              <span className="animate-pulse text-purple-accent">Sync active</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

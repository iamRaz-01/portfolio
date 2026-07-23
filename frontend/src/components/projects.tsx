"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, ExternalLink, X, Cpu, Server, Terminal, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/social-icons";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: "ai" | "systems" | "fullstack";
  shortDesc: string;
  longDesc: string;
  problem: string;
  motivation: string;
  architecture: string;
  challenges: string;
  solutions: string;
  lessons: string;
  tech: string[];
  github: string;
  demo?: string;
  image: string;
}

const projectsData: Project[] = [
  {
    id: "sentraops",
    title: "SentraOps",
    category: "fullstack",
    shortDesc: "All-in-one operations dashboard for enterprises with built-in LLMOps guardrails and real-time monitoring.",
    longDesc: "SentraOps is a premium enterprise operations management portal. It integrates core management models, automated supply chains, staff roster pipelines, and high-concurrency request handlers with active safety layers.",
    problem: "Modern operations software is either static (no AI features) or insecure (data leaks, hallucinations, lack of guardrails in automated pipelines). Enterprise operations require low latency, real-time KPI data, and secure AI assistants.",
    motivation: "Build a prototype showcasing how next-generation operations tools can leverage agentic workflows to automate scheduling and inventory forecasting securely.",
    architecture: "Next.js frontend communicating with a FastAPI microservice backend. Uses Qdrant for semantic log storage, PostgreSQL for transactional inventory data, and WebSockets for real-time dashboard state updates.",
    challenges: "Handling rapid, concurrent updates from inventory pipelines while checking LLM inputs against custom security constraints (preventing prompt injections and sensitive data leaks).",
    solutions: "Implemented an async queue in FastAPI for DB writes and added a lightweight input-validation guardrail layer before hitting the LLM model endpoints.",
    lessons: "Decoupling high-frequency data streams from RAG processing is critical to maintaining a responsive UI and keeping inference costs down.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Qdrant", "WebSockets", "Docker", "Tailwind CSS"],
    github: "https://github.com/iamRaz-01/SentraOps",
    image: "/project_blueprint.jpg"
  },
  {
    id: "ruralgpt",
    title: "RuralGPT",
    category: "ai",
    shortDesc: "High-performance local AI assistant tailored for offline agricultural advisory and localized systems.",
    longDesc: "RuralGPT is an AI-powered digital system designed to operate in areas with low or zero internet connectivity. It uses highly optimized localized models to answer questions on agriculture, pest control, and localized resource management.",
    problem: "Farmers and rural technicians in remote areas cannot access cloud-based models (like GPT-4) due to high costs or lack of network connectivity, yet they need instant access to technical knowledge.",
    motivation: "Create a self-contained, low-resource LLM deployment model that runs efficiently on consumer hardware (single local GPU or edge devices) without internet access.",
    architecture: "FastAPI server running a quantized Llama-3 model (8B parameters) via llama.cpp. Local Qdrant instance for vector lookup of regional crop manuals, served to a responsive client interface.",
    challenges: "Quantization of the language model led to a degradation in understanding local dialects and specialized crop terminologies.",
    solutions: "Developed a custom domain-specific retrieval-augmented generation (RAG) system with a structured keyword expansion index that guides the local prompt structure.",
    lessons: "Quantized edge models perform exceptionally well when guided by strict context retrieval, reducing the reliance on massive model parameters.",
    tech: ["FastAPI", "Quantized LLM", "Qdrant", "Python", "RAG", "Llama.cpp", "Shell Scripting"],
    github: "https://github.com/iamRaz-01/RuralGPT",
    image: "/project_blueprint.jpg"
  },
  {
    id: "transitops",
    title: "TransitOps",
    category: "systems",
    shortDesc: "Smart fleet dispatch platform optimized for high-concurrency tracking and route orchestration.",
    longDesc: "TransitOps is a transport operations center designed to track vehicle movements, optimize driver schedules, and dispatch routes in real-time under high-concurrency environments.",
    problem: "Real-time dispatch networks suffer from latency spikes when hundreds of drivers send concurrent location updates, resulting in outdated routing schedules and poor ETA estimates.",
    motivation: "Architect a robust backend pipeline that processes high-frequency telemetry data and evaluates routing options asynchronously.",
    architecture: "Java and Spring Boot backend utilizing WebSockets for live driver connections. In-memory data store for telemetry caching and PostgreSQL for archival travel data.",
    challenges: "Thread blocking during peak hours when processing location updates, and database locking when updating trip status structures.",
    solutions: "Implemented an event-driven design using reactive programming concepts (Project Reactor) and decoupled location updates from database persistence using memory queues.",
    lessons: "In-memory caching of active tracking telemetry combined with batch database writes is key to scaling real-time IoT backend systems.",
    tech: ["Spring Boot", "Java", "WebSockets", "Project Reactor", "PostgreSQL", "MVC Architecture"],
    github: "https://github.com/iamRaz-01/TransitOps",
    image: "/project_blueprint.jpg"
  },
  {
    id: "ecosphere",
    title: "EcoSphere",
    category: "ai",
    shortDesc: "ESG compliance analyzer utilizing local document parsers and semantic checking matrices.",
    longDesc: "EcoSphere is an automated compliance verification platform that audits corporate ESG documents (carbon footprints, supply chain policies) against international compliance matrices.",
    problem: "Manually auditing ESG compliance reports spans thousands of pages of unstructured data, making it prone to oversight and auditing errors.",
    motivation: "Automate document audit parsing to highlight discrepancies in carbon offsets and environmental reports using open-source models.",
    architecture: "FastAPI RAG server utilizing a local semantic indexing database. Extracts text from PDFs/DOCX, chunks them using semantic boundaries, and maps assertions to compliance templates.",
    challenges: "Parsing poorly formatted PDFs, tables, and charts that contain crucial emissions data, which standard text parsers omit.",
    solutions: "Wrote a custom Python document layout parsing engine that uses table extraction models to feed structured JSON variables directly to the indexing database.",
    lessons: "Pre-processing and maintaining document layout structure (especially tables) is 90% of the work in building reliable document auditing systems.",
    tech: ["Python", "FastAPI", "Qdrant", "PDF Parsing", "Data Pipelines", "Text Extraction"],
    github: "https://github.com/iamRaz-01/EcoSphere",
    image: "/project_blueprint.jpg"
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "systems" | "fullstack">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesTab = activeTab === "all" || p.category === activeTab;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <section id="projects" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start text-left">
            <p className="font-mono text-xs uppercase tracking-widest text-purple-accent mb-3">
              03 // Engineering Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Featured Systems
            </h2>
            <div className="w-16 h-[2px] bg-purple-accent mt-4"></div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search tech, name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-obsidian-light/40 border border-border/80 rounded-lg text-white focus:border-purple-accent/60 outline-none transition-colors placeholder:text-muted-foreground/60"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-border/20 pb-4">
          {(["all", "ai", "systems", "fullstack"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[10px] font-mono uppercase tracking-widest px-4 py-2 rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-purple-accent text-white font-bold"
                  : "text-muted-foreground hover:text-white bg-obsidian-light/20 hover:bg-obsidian-light/60 border border-border/40"
              }`}
            >
              {tab === "ai" ? "AI & ML" : tab === "systems" ? "Systems & Backend" : tab === "fullstack" ? "Full Stack" : "All Projects"}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="group rounded-2xl glass border border-border/40 overflow-hidden flex flex-col justify-between hover:border-purple-accent/25 hover:shadow-lg hover:shadow-purple-accent/5 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedProject(p)}
              >
                <div>
                  {/* Card Image Cover with Blueprint Overlay */}
                  <div className="relative h-48 w-full border-b border-border/40 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-500 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
                    <div className="absolute top-4 left-4 p-2 rounded-lg glass border border-purple-accent/20 bg-obsidian-light/60">
                      {p.category === "ai" ? (
                        <Cpu className="text-purple-accent" size={16} />
                      ) : p.category === "systems" ? (
                        <Server className="text-purple-accent" size={16} />
                      ) : (
                        <Terminal className="text-purple-accent" size={16} />
                      )}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6">
                    <h3 className="font-sans font-bold text-xl text-white tracking-wide mb-2 group-hover:text-purple-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans mb-6">
                      {p.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Tech badges and interaction footer */}
                <div className="p-6 pt-0 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-[9px] uppercase tracking-wider text-blue-accent/90 border border-blue-accent/20 bg-blue-accent/5 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground px-2 py-0.5">
                        +{p.tech.length - 4} More
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-purple-accent flex items-center gap-1 group-hover:underline">
                    View Technical Case Study &rarr;
                  </div>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 font-mono text-xs text-muted-foreground border border-dashed border-border/60 rounded-2xl bg-obsidian-light/10">
            No active systems matching search filters.
          </div>
        )}

      </div>

      {/* Case Study Modal (Framer Motion Lightbox) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md">
            
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setSelectedProject(null)}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass border border-border/80 rounded-2xl z-10 glow-purple"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-border/80 bg-obsidian-light hover:bg-border transition-colors text-white cursor-pointer z-20"
                aria-label="Close Case Study"
              >
                <X size={18} />
              </button>

              {/* Cover blueprint */}
              <div className="relative h-64 sm:h-80 w-full border-b border-border/40 overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 80vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex flex-col items-start gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-purple-accent border border-purple-accent/30 bg-purple-accent/5 px-3 py-1 rounded-full">
                    {selectedProject.category === "ai" ? "AI & ML System" : selectedProject.category === "systems" ? "Backend & Systems" : "Full Stack Platform"}
                  </span>
                  <h2 className="text-3xl font-sans font-bold text-white tracking-wide text-shadow">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Case Study Content */}
              <div className="p-6 sm:p-8 space-y-8 font-sans">
                
                {/* Intro summary */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase text-muted-foreground tracking-wider border-b border-border/20 pb-2">
                    Executive Summary
                  </h3>
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    {selectedProject.longDesc}
                  </p>
                </div>

                {/* Problem Statement vs Motivation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 p-4 rounded-xl border border-red-500/10 bg-red-500/5">
                    <h4 className="font-mono text-xs uppercase text-red-400 tracking-wider">
                      The Problem Statement
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </div>
                  <div className="space-y-3 p-4 rounded-xl border border-blue-accent/20 bg-blue-accent/5">
                    <h4 className="font-mono text-xs uppercase text-blue-accent tracking-wider">
                      Core Motivation
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.motivation}
                    </p>
                  </div>
                </div>

                {/* Technical Architecture */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs uppercase text-muted-foreground tracking-wider border-b border-border/20 pb-2">
                    Systems Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {selectedProject.architecture}
                  </p>
                </div>

                {/* Challenges & Solutions */}
                <div className="space-y-4">
                  <h3 className="font-mono text-xs uppercase text-muted-foreground tracking-wider border-b border-border/20 pb-2">
                    Challenges & Engineering Implementations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="font-sans font-bold text-xs uppercase text-white">Engineering Blockers</p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-sans font-bold text-xs uppercase text-white">Implemented Solutions</p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex gap-2 items-start">
                        <CheckCircle2 size={16} className="text-purple-accent flex-shrink-0 mt-0.5" />
                        {selectedProject.solutions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Lessons Learned */}
                <div className="space-y-3 p-4 rounded-xl border border-purple-accent/20 bg-purple-accent/5">
                  <h4 className="font-mono text-xs uppercase text-purple-accent tracking-wider">
                    Key Lessons Learned
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {selectedProject.lessons}
                  </p>
                </div>

                {/* Tech Stack badge matrix */}
                <div className="space-y-3">
                  <p className="font-sans font-bold text-xs uppercase text-white">Complete Architecture Matrix</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs text-blue-accent border border-blue-accent/20 bg-blue-accent/5 px-3 py-1 rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case study actions */}
                <div className="flex items-center gap-4 border-t border-border/20 pt-6">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white border border-border bg-obsidian-light/60 hover:bg-border px-5 py-3 rounded-lg transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Inspect Repository
                  </a>
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white bg-purple-accent hover:bg-purple-accent/80 px-5 py-3 rounded-lg transition-colors"
                    >
                      <ExternalLink size={14} />
                      Launch Sandbox
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

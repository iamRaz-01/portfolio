"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "Who is Abdul Razak?",
  "Tell me about RuralGPT.",
  "What is his experience with Spring Boot?",
  "What certifications does he hold?",
  "Why should I hire Abdul?",
];

// Offline fallback response matrix (curated from resume & projects)
const localKB: { keywords: string[]; response: string }[] = [
  {
    keywords: ["who", "abdul", "razak", "about", "identity", "summary"],
    response: "Abdul Razak N is a backend-focused systems and ML engineer. He is currently pursuing a B.Tech in Artificial Intelligence & Machine Learning at Saveetha Engineering College (expected May 2028). He trained at Freshworks Software Academy and specializes in Java/Spring Boot API optimization, FastAPI RAG design, and local LLM serving infrastructure."
  },
  {
    keywords: ["ruralgpt", "rural", "agriculture", "farmer"],
    response: "RuralGPT is an off-grid localized agricultural LLM agent built by Abdul. It runs a quantized Llama-3 (8B) model locally on edge hardware using llama.cpp and utilizes a Qdrant vector database to serve diagnostic advisory responses to farmers in remote areas with zero network connectivity."
  },
  {
    keywords: ["sentraops", "sentra", "ops"],
    response: "SentraOps is an enterprise operations management dashboard built using Next.js, FastAPI, PostgreSQL, and Qdrant. It features built-in LLMOps security filters to inspect inputs for prompt injections and sensitive data leaks before processing agentic pipeline activities."
  },
  {
    keywords: ["transitops", "transit", "spring", "boot", "java"],
    response: "TransitOps is a transport operations dispatch engine built with Spring Boot, Java, and WebSockets. Abdul optimized its concurrency model using reactive patterns (Project Reactor) to process high-frequency telemetry updates from hundreds of active vehicles without thread starvation."
  },
  {
    keywords: ["ecosphere", "compliance", "esg"],
    response: "EcoSphere is an automated ESG compliance report analyzer. It extracts layout data from corporate environmental audit documents and matches assertions against global regulatory matrices using a local document chunks vector index in Qdrant."
  },
  {
    keywords: ["certification", "certifications", "oracle", "aws", "azure", "credential"],
    response: "Abdul holds several prestigious industry verifications:\n1. Oracle Certified Professional: Java SE 21 Developer\n2. AWS Educate Machine Learning Foundations\n3. AWS Educate Introduction to Generative AI\n4. AWS Educate Introduction to Cloud 101\n5. Microsoft Certified: Azure Basics"
  },
  {
    keywords: ["experience", "work", "job", "intern", "freshworks", "lumel", "eynard"],
    response: "Abdul's professional milestones include:\n- Full Stack Developer Intern at Enyard Private Limited (Sept 2025 - Nov 2025): Optimized Spring Boot REST APIs and database queries under concurrent loads.\n- Product Development Intern at Lumel Technology (Dec 2023 - June 2024): Developed KPI tracking dashboards with Power BI and InfoRiver Matrix.\n- Software Trainee at Freshworks Software Academy (Sept 2022 - Nov 2023): One year intensive program in Java, MVC architectures, database schemas, and Git CI/CD flows."
  },
  {
    keywords: ["hire", "why", "strengths", "skills"],
    response: "You should hire Abdul because he bridges the gap between traditional backend systems engineering and modern applied AI. He doesn't just call model APIs—he understands quantization, model serving latency, asynchronous database optimization, and high-concurrency architecture design."
  },
  {
    keywords: ["contact", "email", "phone", "linkedin", "github"],
    response: "You can reach Abdul Razak N via:\n- Email: abdulrazak.nasriudeen@gmail.com\n- Phone: +91 8124311602\n- LinkedIn: linkedin.com/in/abdul-razak-n-46b178279\n- GitHub: github.com/iamRaz-01"
  }
];

function getOfflineResponse(query: string): string {
  const normalized = query.toLowerCase();
  for (const item of localKB) {
    if (item.keywords.some(k => normalized.includes(k))) {
      return item.response;
    }
  }
  return "I have indexed Abdul's resume, certificates, and core projects. Try asking about his experience at Enyard or Freshworks, his AWS and Java certifications, or details on projects like RuralGPT, SentraOps, TransitOps, or EcoSphere!";
}

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Abdul Razak's AI Digital Twin. I have access to his full resume, certifications, experience history, and project architectures. How can I assist you with your hiring decisions today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Attempt API call to backend service
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        throw new Error("Backend offline, triggering local twin...");
      }
    } catch (err) {
      // Offline simulation fallback
      setTimeout(() => {
        const fallbackText = getOfflineResponse(text);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: fallbackText }
        ]);
        setLoading(false);
      }, 1000);
      return;
    }
    setLoading(false);
  };

  return (
    <section id="ai-assistant" className="py-24 px-6 relative z-10 bg-obsidian-light/5">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-blue-accent mb-3">
            07 // Autonomous digital twin
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase flex items-center gap-3">
            <Sparkles size={24} className="text-purple-accent animate-pulse" />
            Virtual AI Twin
          </h2>
          <div className="w-16 h-[2px] bg-purple-accent mt-4"></div>
        </div>

        {/* Chat Terminal Console */}
        <div className="rounded-2xl glass border border-purple-accent/25 glow-purple overflow-hidden flex flex-col h-[550px] bg-obsidian/60">
          
          {/* Console Header */}
          <div className="px-6 py-4 border-b border-border/40 bg-obsidian-light/45 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="text-blue-accent" size={18} />
              <span className="font-mono text-xs uppercase text-white tracking-widest">
                twin-agent-v1.0.0
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest">
                Active context: Resume & Projects
              </span>
            </div>
          </div>

          {/* Messages Viewport */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => {
              const isAi = msg.role === "assistant";
              return (
                <div
                  key={idx}
                  className={`flex gap-4 items-start ${isAi ? "justify-start" : "justify-end"}`}
                >
                  {isAi && (
                    <div className="h-8 w-8 rounded-full border border-blue-accent/30 bg-blue-accent/5 flex items-center justify-center flex-shrink-0">
                      <Bot size={14} className="text-blue-accent" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs sm:text-sm font-sans whitespace-pre-wrap leading-relaxed ${
                      isAi
                        ? "bg-obsidian-light/50 border border-border/40 text-muted-foreground"
                        : "bg-purple-accent/15 border border-purple-accent/35 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {!isAi && (
                    <div className="h-8 w-8 rounded-full border border-purple-accent/30 bg-purple-accent/5 flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-purple-accent" />
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Loading typing bubble */}
            {loading && (
              <div className="flex gap-4 items-start justify-start">
                <div className="h-8 w-8 rounded-full border border-blue-accent/30 bg-blue-accent/5 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-blue-accent" />
                </div>
                <div className="bg-obsidian-light/50 border border-border/40 rounded-2xl px-4 py-3 text-xs flex items-center gap-2 text-muted-foreground font-mono">
                  <Loader size={12} className="animate-spin" />
                  Twin agent is retrieving...
                </div>
              </div>
            )}
            <div ref={scrollRef}></div>
          </div>

          {/* Quick suggestions chips */}
          <div className="px-6 py-3 border-t border-border/20 flex flex-wrap gap-2 overflow-x-auto bg-obsidian-light/10">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSendMessage(s)}
                disabled={loading}
                className="text-[10px] font-mono text-blue-accent border border-blue-accent/20 bg-blue-accent/5 px-3 py-1.5 rounded-full hover:bg-blue-accent/15 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-4 border-t border-border/40 bg-obsidian-light/45 flex gap-3"
          >
            <input
              type="text"
              placeholder="Ask Abdul's twin about his projects, credentials, or experience..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-grow px-4 py-3 bg-obsidian border border-border/80 rounded-xl text-xs sm:text-sm text-white focus:border-purple-accent/60 outline-none transition-colors placeholder:text-muted-foreground/60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-purple-accent hover:bg-purple-accent/80 text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { BookOpen, Calendar, Clock, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
}

const blogsData: BlogPost[] = [
  {
    id: "llama-edge",
    title: "Serving Quantized Llama Models on Consumer Edge Hardware",
    category: "AI & Inference",
    date: "July 12, 2026",
    readTime: "6 min read",
    summary: "A technical deep dive into running 8B parameters models locally on consumer GPUs. Optimizing prompt context lengths and retrieval overlays to maximize offline accuracy.",
    content: `
# Serving Quantized Llama Models on Consumer Edge Hardware

Running LLMs locally on consumer hardware requires optimizing both parameters and inference loops. This post breaks down how we serve a 4-bit quantized Llama-3 model at low latencies for remote offline deployments.

## The Model Serving Stack
To run Llama-3 (8B parameters) efficiently on an edge device (such as a single GPU or a low-resource server), we utilize:
- **llama.cpp**: C++ backend for high-performance inference.
- **FastAPI**: Asynchronous Python wrapper to manage client requests.
- **Qdrant**: Local database serving as the custom RAG vector cache.

### Quantization Mechanics
We convert the model to GGUF format and apply a Q4_K_M quantization scheme. This compresses the model size down to ~4.8 GB, permitting it to fit entirely inside standard VRAM.

\`\`\`bash
# Quantizing the model using llama.cpp
./quantize ./models/llama-3-8b.gguf ./models/llama-3-8b-Q4_K_M.gguf Q4_K_M
\`\`\`

## Retrieval-Augmented Generation (RAG) Setup
A quantized model has decreased dialect fluency. To bypass this blocker:
1. We segment regional agricultural documents into 300-token chunks with 50-token overlaps.
2. We embed chunks using the lightweight Sentence-Transformers model.
3. When a query is received, we search Qdrant for the top 3 corresponding document chunks and inject them directly into the system prompt context.

This strategy ensures that even a compressed 8B model produces highly accurate, hallucination-free advisory responses.
`
  },
  {
    id: "springboot-concurrency",
    title: "Optimizing High-Concurrency Database Operations in Spring Boot",
    category: "Systems & Backend",
    date: "June 28, 2026",
    readTime: "8 min read",
    summary: "How to prevent database locking and thread starvation in high-throughput APIs. Decoupling telemetry processing using reactive design models and memory queues.",
    content: `
# Optimizing High-Concurrency Database Operations in Spring Boot

In high-concurrency systems, standard blocking database transactions can quickly lead to thread pool starvation. Here is how we redesigned a logistics tracking API to handle concurrent connections.

## The Bottleneck: Database Locking
In fleet tracking applications, concurrent writes to a vehicle table create severe row-locking contention, especially when drivers post location telemetry updates multiple times per minute.

### Reactive Redesign (Project Reactor)
Rather than executing a block-and-write thread for every incoming HTTP request, we transitioned to a reactive event pipeline:

1. **WebSocket Telemetry Ingestion**: Incoming updates are parsed asynchronously and pushed directly to a memory-cached buffer.
2. **Buffer Flush Execution**: A scheduled job processes the cached locations in memory and triggers batch writes to PostgreSQL.
3. **Decoupled Transactions**: Writing telemetry is entirely isolated from checking routing logic, preventing locking contentions.

\`\`\`java
// Event loop ingestion
public Mono<Void> processLocation(LocationUpdate update) {
    return telemetryBuffer.push(update)
        .subscribeOn(Schedulers.boundedElastic());
}
\`\`\`

This optimization reduced API response latency by over 60% and minimized database CPU utilization during peak tracking hours.
`
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-purple-accent mb-3">
            06 // MDX Technical Journal
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Technical Blog
          </h2>
          <div className="w-16 h-[2px] bg-purple-accent mt-4"></div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogsData.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass glass-hover border border-border/40 flex flex-col justify-between hover:border-purple-accent/20 cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-purple-accent border border-purple-accent/20 bg-purple-accent/5 px-2.5 py-1 rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 font-mono text-[9px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-lg text-white tracking-wide mb-3">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans mb-6">
                  {post.summary}
                </p>
              </div>

              {/* Action read indicator */}
              <div className="text-xs font-mono text-purple-accent flex items-center gap-1 group-hover:underline">
                Read technical post <ArrowRight size={12} />
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Blog Full Screen Reader */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md">
            
            <div className="absolute inset-0" onClick={() => setSelectedPost(null)}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass border border-border/80 rounded-2xl p-6 sm:p-10 z-10 glow-purple"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-border bg-obsidian-light hover:bg-border transition-colors text-white cursor-pointer z-20"
                aria-label="Close Journal"
              >
                <X size={18} />
              </button>

              {/* Meta details header */}
              <div className="flex items-center gap-4 mb-4 mt-4">
                <span className="font-mono text-xs text-purple-accent border border-purple-accent/25 bg-purple-accent/5 px-3 py-1 rounded">
                  {selectedPost.category}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{selectedPost.date}</span>
                <span className="font-mono text-xs text-muted-foreground">{selectedPost.readTime}</span>
              </div>

              {/* MDX-like Content Rendering */}
              <article className="prose prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
                <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-wide border-b border-border/20 pb-4 mb-6">
                  {selectedPost.title}
                </h1>
                
                {/* Simulated rendering of markdown content */}
                {selectedPost.content.split("\n\n").map((para, pIdx) => {
                  if (para.trim().startsWith("# ")) {
                    return null; // Skip main title as rendered above
                  }
                  if (para.trim().startsWith("## ")) {
                    return (
                      <h2 key={pIdx} className="text-xl font-bold text-white font-sans mt-8 pt-4 border-t border-border/10">
                        {para.replace("## ", "").trim()}
                      </h2>
                    );
                  }
                  if (para.trim().startsWith("### ")) {
                    return (
                      <h3 key={pIdx} className="text-base font-bold text-white font-sans mt-6">
                        {para.replace("### ", "").trim()}
                      </h3>
                    );
                  }
                  if (para.trim().startsWith("- ") || para.trim().match(/^\d+\. /)) {
                    const items = para.split("\n");
                    return (
                      <ul key={pIdx} className="list-disc pl-6 space-y-2 text-xs sm:text-sm">
                        {items.map((it, itIdx) => (
                          <li key={itIdx}>
                            {it.replace("- ", "").replace(/^\d+\. /, "").trim()}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.trim().startsWith("\`\`\`")) {
                    const lines = para.split("\n");
                    const lang = lines[0].replace("\`\`\`", "").trim();
                    const code = lines.slice(1, -1).join("\n");
                    return (
                      <pre key={pIdx} className="p-4 rounded-lg bg-obsidian-light/80 border border-border/80 font-mono text-xs text-blue-accent/90 overflow-x-auto my-6">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return (
                    <p key={pIdx} className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      {para.trim()}
                    </p>
                  );
                })}
              </article>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

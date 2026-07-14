"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Bot, FileText, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "AI Assistant", href: "#ai-assistant" },
  { name: "Projects", href: "#projects" },
  { name: "Timeline", href: "#timeline" },
  { name: "Certificates", href: "#certificates" },
  { name: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      let currentSection = "home";
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "py-3 bg-obsidian/75 border-b border-border/40 backdrop-blur-md" 
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-accent"></span>
          </span>
          <span className="font-sans font-bold text-lg tracking-wider text-white group-hover:text-purple-accent transition-colors">
            ABDUL RAZAK
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest text-muted-foreground border border-border/80 px-2 py-0.5 rounded-full bg-obsidian-light/50">
            Twin Online
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isAi = item.name === "AI Assistant";
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative text-xs font-mono tracking-widest uppercase transition-colors hover:text-white ${
                  isActive 
                    ? "text-purple-accent font-semibold" 
                    : isAi 
                      ? "text-blue-accent" 
                      : "text-muted-foreground"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-purple-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions / CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#ai-assistant"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-accent border border-blue-accent/30 bg-blue-accent/5 px-4 py-2 rounded-lg glass-blue-hover transition-all"
          >
            <Bot size={14} className="animate-pulse" />
            AI Twin Chat
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-obsidian border-b border-border/60 p-6 flex flex-col gap-6 md:hidden glass"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isAi = item.name === "AI Assistant";
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-mono tracking-widest uppercase py-2 transition-colors ${
                      isActive 
                        ? "text-purple-accent font-semibold" 
                        : isAi 
                          ? "text-blue-accent" 
                          : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 pt-4 border-t border-border/40">
              <a
                href="#ai-assistant"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-accent border border-blue-accent/30 bg-blue-accent/5 py-3 rounded-lg"
              >
                <Bot size={16} />
                Ask Digital Twin
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

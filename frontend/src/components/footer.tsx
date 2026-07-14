import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/social-icons";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-obsidian-light/20 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-sm text-white tracking-widest">
              ABDUL RAZAK N
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-purple-accent"></span>
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              Systems & AI Architect
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-mono text-center md:text-left">
            © {new Date().getFullYear()} Abdul Razak. Built with Next.js, FastAPI & LangGraph.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/abdul-rasak-n-46b178279/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-purple-accent transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/iamRaz-01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-purple-accent transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:abdulrazak.nasriudeen@gmail.com"
            className="text-muted-foreground hover:text-purple-accent transition-colors"
            aria-label="Email Address"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

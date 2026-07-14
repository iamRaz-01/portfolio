import Hero from "@/components/hero";
import About from "@/components/about";
import Timeline from "@/components/timeline";
import Projects from "@/components/projects";
import SkillNetwork from "@/components/skill-network";
import Certificates from "@/components/certificates";
import Blog from "@/components/blog";
import AiAssistant from "@/components/ai-assistant";
import ParticleBg from "@/components/particle-bg";

export default function Home() {
  return (
    <div className="relative flex flex-col w-full bg-background overflow-hidden">
      {/* Absolute visual meshes overlaying the whole layout */}
      <div className="absolute top-0 inset-x-0 h-screen bg-radial-gradient from-purple-accent/5 to-transparent pointer-events-none z-0"></div>
      <ParticleBg />

      <Hero />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-12">
        <About />
        <AiAssistant />
        <Projects />
        <Timeline />
        <SkillNetwork />
        <Certificates />
        <Blog />
      </div>
    </div>
  );
}

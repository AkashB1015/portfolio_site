import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";
import { projectSlideLeft, projectSlideRight, fadeUp } from "../utils/motionVariants";
import { ArrowUpRight } from "lucide-react";
import { SplitText, TypewriterLabel, LineReveal } from "./TextReveal";

// Local Custom Github Icon SVG component
function GithubIcon({ size = 14, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// Scroll-linked abstract canvas visualizer
function BrowserVisualizer({ projectId, progress }) {
  const prefersReduced = useReducedMotion();

  // Scroll-linked node coordinates drift calculations (active only if motion allowed)
  const node1X = useTransform(progress, [0, 1], [20, prefersReduced ? 20 : 25]);
  const node1Y = useTransform(progress, [0, 1], [15, prefersReduced ? 15 : 10]);

  const node2X = useTransform(progress, [0, 1], [80, prefersReduced ? 80 : 75]);
  const node2Y = useTransform(progress, [0, 1], [45, prefersReduced ? 45 : 50]);

  const node3X = useTransform(progress, [0, 1], [80, prefersReduced ? 80 : 85]);
  const node3Y = useTransform(progress, [0, 1], [15, prefersReduced ? 15 : 20]);

  const centerR = useTransform(progress, [0, 1], [4, prefersReduced ? 4 : 5.5]);

  if (projectId === "roadrescue") {
    return (
      <svg className="w-full h-full text-accent-teal opacity-60" viewBox="0 0 100 60">
        {/* Faux map grid lines */}
        <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="0" y1="45" x2="100" y2="45" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="25" y1="0" x2="25" y2="60" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="50" y1="0" x2="50" y2="60" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="75" y1="0" x2="75" y2="60" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />

        {/* Server Central Node */}
        <motion.circle cx="50" cy="30" r={centerR} fill="none" stroke="#FF6B35" strokeWidth="0.5" />
        <circle cx="50" cy="30" r="1.5" className="fill-accent-ember" />

        {/* Moving Client Nodes (Tied to scroll offsets) */}
        <motion.circle cx={node1X} cy={node1Y} r="1" className="fill-accent-teal" />
        <motion.circle cx={node2X} cy={node2Y} r="1" className="fill-accent-teal" />
        <motion.circle cx={node3X} cy={node3Y} r="1.2" className="fill-accent-gold" />
        <circle cx="20" cy="45" r="1" className="fill-accent-teal" />

        {/* Connecting links redrawing/stretching on scroll */}
        <motion.line x1={node1X} y1={node1Y} x2="50" y2="30" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1" />
        <motion.line x1={node2X} y1={node2Y} x2="50" y2="30" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1" />
        <motion.line x1={node3X} y1={node3Y} x2="50" y2="30" stroke="#E8B84B" strokeWidth="0.25" />
      </svg>
    );
  }

  if (projectId === "think-x") {
    const orbitRotate = useTransform(progress, [0, 1], [0, prefersReduced ? 0 : 45]);
    const outerRotate = useTransform(progress, [0, 1], [0, prefersReduced ? 0 : -35]);

    return (
      <svg className="w-full h-full text-accent-teal opacity-60" viewBox="0 0 100 60">
        {/* Orbit database rings */}
        <motion.circle cx="50" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="2 2"
                       style={{ rotate: orbitRotate, transformOrigin: '50px 30px' }} />
        <motion.circle cx="50" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0.15"
                       style={{ rotate: outerRotate, transformOrigin: '50px 30px' }} />
        
        {/* Core application node */}
        <circle cx="50" cy="30" r="2.5" className="fill-accent-teal" />
        
        {/* Orbiting particles */}
        <circle cx="50" cy="16" r="1" className="fill-accent-ember" />
        <circle cx="50" cy="44" r="1" className="fill-accent-ember" />
        <circle cx="28" cy="30" r="1.2" className="fill-accent-gold" />
        <circle cx="72" cy="30" r="1.2" className="fill-accent-gold" />
      </svg>
    );
  }

  // cookify visualizer: e-commerce database nodes
  return (
    <svg className="w-full h-full text-accent-gold opacity-60" viewBox="0 0 100 60">
      {/* Catalog connection grid */}
      <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="0.1" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.1" />
      
      {/* Spring relational Data JPA database (Gold) vs MongoDB (Teal) */}
      <circle cx="30" cy="20" r="3" className="fill-accent-gold animate-pulse" />
      <circle cx="70" cy="40" r="3" className="fill-accent-teal" />
      
      {/* Center e-commerce ordering cart node */}
      <motion.circle cx="50" cy="30" r={centerR} fill="none" stroke="#FF6B35" strokeWidth="0.5" />
      <circle cx="50" cy="30" r="1.5" className="fill-accent-ember" />

      {/* Floating particles nodes connected to catalog */}
      <motion.line x1="30" y1="20" x2={node1X} y2={node1Y} stroke="currentColor" strokeWidth="0.2" />
      <motion.line x1="70" y1="40" x2={node2X} y2={node2Y} stroke="currentColor" strokeWidth="0.2" />
      <motion.line x1="50" y1="30" x2="30" y2="20" stroke="#FF6B35" strokeWidth="0.3" strokeDasharray="1 1" />
      <motion.line x1="50" y1="30" x2="70" y2="40" stroke="#2DD4BF" strokeWidth="0.3" strokeDasharray="1 1" />

      <motion.circle cx={node1X} cy={node1Y} r="1" className="fill-accent-ember" />
      <motion.circle cx={node2X} cy={node2Y} r="1" className="fill-accent-gold" />
    </svg>
  );
}

// Single Project layout wrapper for parsing local scroll offsets
function ProjectItem({ project, index }) {
  const containerRef = useRef(null);
  
  // Track this specific item scroll progress through viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  const slideVariant = isEven ? projectSlideLeft : projectSlideRight;

  return (
    <motion.div
      ref={containerRef}
      variants={slideVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-120px" }}
      className="perspective-1000 transform-style-3d grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
    >
      {/* Browser Mockup Frame Window */}
      <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="w-full bg-base-900 border border-line rounded-md overflow-hidden shadow-2xl relative group">
          {/* macOS-style Faux Browser Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-base-800 border-b border-line select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
            </div>
            
            {/* Faux URL */}
            <div className="w-2/3 md:w-1/2 bg-base-950 border border-line/60 rounded px-3 py-0.5 text-[10px] font-mono text-ink-400 text-center truncate">
              {project.githubUrl.replace("https://", "")}
            </div>

            {/* Spacer */}
            <div className="w-10" />
          </div>

          {/* Faux Browser Viewport content */}
          <div className="bg-base-950 aspect-[5/3] flex items-center justify-center p-6 relative overflow-hidden">
            {project.imageUrl ? (
              /* TODO: replace with project screenshot */
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover rounded-sm filter brightness-95 hover:brightness-100 transition-all duration-300"
              />
            ) : (
              /* Scroll-linked dynamic nodes visualization */
              <BrowserVisualizer projectId={project.id} progress={scrollYProgress} />
            )}
            
            {/* View Source Code Hover Overlay */}
            <div className="absolute inset-0 bg-base-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-accent-teal text-accent-teal font-mono text-xs flex items-center gap-2 bg-base-950/90 rounded-sm hover:border-accent-ember hover:text-accent-ember transition-colors duration-300"
              >
                <GithubIcon size={14} />
                <span>github.com/AkashB1015</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Content */}
      <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        {/* Eyebrow technology tags list */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {project.tags.map((tag, i) => (
            <span key={i} className="font-mono text-[10px] text-accent-teal tracking-wider uppercase font-semibold">
              {tag}
            </span>
          ))}
        </div>

        {/* Word-by-word letter flip transition title */}
        <SplitText text={project.title} className="text-2xl md:text-4xl" animate={true} />

        <p className="text-ink-400 font-body font-light text-sm md:text-base leading-relaxed">
          {project.description}
        </p>

        {/* Feature Highlights */}
        <ul className="space-y-2.5">
          {project.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-ink-100 font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-ember mt-1.5 inline-block flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Link to Source Code */}
        <div className="pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-accent-ember hover:text-ink-100 transition-colors duration-300"
          >
            <span>VIEW SOURCE CODE</span>
            <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const labelRef = useRef(null);

  return (
    <section 
      id="projects" 
      className="py-24 md:py-36 border-t border-line bg-base-950 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Monospace Eyebrow: Typewriter Label */}
        <div ref={labelRef} className="mb-6 h-5">
          <TypewriterLabel text="03 // PROJECTS" />
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-20 max-w-3xl leading-tight">
          <LineReveal lines={[
            "Featured full-stack platforms",
            "engineered from backend",
            "databases to interfaces."
          ]} />
        </h2>

        {/* Projects Showcase alternating container */}
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

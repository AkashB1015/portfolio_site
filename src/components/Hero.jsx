import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowRight, Download } from "lucide-react";
import { handleMagneticHover, resetMagneticHover, blurReveal } from "../utils/motionVariants";
import { SplitText, TypewriterLabel } from "./TextReveal";
import TechOrbitSphere from "./TechOrbitSphere";

const MARQUEE_ITEMS = [
  "Java", "Spring Boot", "ASP.NET Core", "C#", "React.js", "MySQL", 
  "MongoDB", "AWS", "Docker", "RESTful APIs", "Spring Security", "JWT", 
  "RBAC", "PostgreSQL", "Git", "JavaScript", "Microservices"
];

const DUP_MARQUEE_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  // Scroll exit parallax: Drift the title text and fade it out faster on scroll
  const titleY = useTransform(scrollY, [0, 500], [0, -120]);
  const titleOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const bgY = useTransform(scrollY, [0, 500], [0, -60]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = projectsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between pt-20 md:pt-24 pb-12 overflow-hidden grid-bg"
    >
      {/* Background Abstract Network SVG Graph (with minor scroll parallax drift) */}
      <motion.div 
        style={{ y: prefersReduced ? 0 : bgY }}
        className="absolute top-1/2 right-0 -translate-y-1/2 w-full max-w-[300px] md:max-w-[550px] h-[300px] md:h-[550px] opacity-20 md:opacity-40 pointer-events-none -z-10"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent-teal">
          {/* Paths connecting nodes */}
          <motion.path
            d="M 20,40 L 40,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <motion.path
            d="M 40,25 L 70,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
          <motion.path
            d="M 40,25 L 50,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
          <motion.path
            d="M 50,60 L 80,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <motion.path
            d="M 50,60 L 30,80"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.0 }}
          />
          <motion.path
            d="M 80,50 L 70,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
          
          {/* Pulsing Nodes */}
          <motion.circle cx="20" cy="40" r="1.5" className="fill-accent-teal" />
          <motion.circle cx="40" cy="25" r="1.5" className="fill-accent-ember" />
          <motion.circle
            cx="70"
            cy="30"
            r="1.5"
            className="fill-accent-teal"
            animate={{ scale: [1, 1.8, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.circle cx="80" cy="50" r="1.5" className="fill-accent-teal" />
          <motion.circle
            cx="50"
            cy="60"
            r="1.5"
            className="fill-accent-ember"
            animate={{ scale: [1, 2, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle cx="30" cy="80" r="1.5" className="fill-accent-teal" />
          
          {/* Subtle surrounding rings */}
          <circle cx="50" cy="60" r="6" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" className="text-accent-ember/40 animate-spin" style={{ transformOrigin: '50px 60px', animationDuration: '30s' }} />
          <circle cx="40" cy="25" r="8" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 1" className="text-accent-teal/40 animate-spin" style={{ transformOrigin: '40px 25px', animationDuration: '20s' }} />
        </svg>
      </motion.div>

      {/* Hero Content (Parallax exit tie-in) */}
      <motion.div 
        style={{ y: prefersReduced ? 0 : titleY, opacity: titleOpacity }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center py-20 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-0 max-w-4xl">
            {/* Eyebrow: Typewriter print effect */}
            <div className="mb-4 md:mb-6 block h-5">
              <TypewriterLabel text="SOFTWARE ENGINEER — JAVA & .NET FULL-STACK" animate={true} />
            </div>

            {/* Headline: Word-by-word 3D reveal with custom glowing text accent */}
            <h1 className="text-[2.6rem] sm:text-[4rem] md:text-[5.2rem] lg:text-[4.2rem] xl:text-[5.2rem] font-display font-extrabold text-ink-100 leading-[0.95] tracking-tight mb-6 md:mb-8 select-none">
              <span className="block overflow-hidden py-1">
                <SplitText text="Building secure," delayOffset={0.1} animate={true} />
              </span>
              <span className="block mt-1 sm:mt-2 overflow-hidden py-1">
                <SplitText text="scalable" delayOffset={0.25} animate={true} />{" "}
                <span className="relative inline-block text-accent-ember glow-pulse">
                  <SplitText text="systems." delayOffset={0.35} animate={true} />
                  {/* SVG Underline Drawing */}
                  <span className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-[6px] md:h-[12px] -z-10">
                    <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
                      <motion.path
                        d="M2,6 Q45,10 98,4 C80,8 30,9 10,7"
                        fill="transparent"
                        stroke="rgb(var(--color-accent-ember))"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut", delay: 1.2 }}
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>

            {/* Paragraph: Refined blur-to-sharp reveal */}
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              className="text-ink-400 text-base md:text-xl font-light leading-relaxed max-w-3xl mb-8 md:mb-12 font-body"
            >
              I am a CDAC-trained Software Engineer specializing in designing robust backends with{" "}
              <span className="text-ink-100 font-medium">Java / Spring Boot</span> and{" "}
              <span className="text-ink-100 font-medium">C# / ASP.NET Core</span>, integrated with dynamic{" "}
              <span className="text-ink-100 font-medium">React.js</span> frontends. Focused on secure APIs, RBAC, and scalable architectures.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* View Projects - Filled Ember Button */}
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                onMouseMove={(e) => handleMagneticHover(e, 0.25)}
                onMouseLeave={resetMagneticHover}
                className="group relative inline-flex items-center justify-center gap-2 bg-accent-ember text-base-950 font-mono text-xs font-bold tracking-wider uppercase px-8 py-4 rounded-sm overflow-hidden transition-all duration-300 transform"
              >
                <span>View Projects</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              {/* Resume Button */}
              <a
                href="#contact"
                onMouseMove={(e) => handleMagneticHover(e, 0.25)}
                onMouseLeave={resetMagneticHover}
                className="inline-flex items-center justify-center gap-2 border border-line hover:border-accent-ember/60 px-8 py-4 text-ink-100 hover:text-accent-ember font-mono text-xs font-bold tracking-wider uppercase rounded-sm bg-base-900/50 backdrop-blur-sm transition-all duration-300 transform"
              >
                <span>Download Resume</span>
                <Download size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Draggable 3D Tech Skill Orbiting Sphere */}
          <div className="lg:col-span-5 flex justify-center lg:justify-center">
            <TechOrbitSphere />
          </div>
        </div>
      </motion.div>

      {/* Tech Marquee strip */}
      <div className="w-full overflow-hidden border-y border-line bg-base-900/60 backdrop-blur-sm py-4 mt-16 md:mt-24">
        <div className="flex w-max">
          <div className="flex animate-scroll-marquee whitespace-nowrap gap-12 text-ink-400 font-mono text-xs tracking-wider font-semibold uppercase hover:[animation-play-state:paused] cursor-default">
            {DUP_MARQUEE_ITEMS.map((tech, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-teal"></span>
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gentle bouncing scroll indicator */}
      <div className="flex justify-center mt-6">
        <motion.a
          href="#about"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-ink-400 hover:text-accent-ember transition-colors p-2"
          aria-label="Scroll down to About section"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ChevronDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}

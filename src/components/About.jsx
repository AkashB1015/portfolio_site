import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, blurReveal } from "../utils/motionVariants";
import { LineReveal, TypewriterLabel } from "./TextReveal";

function StatCounter({ value, duration = 1.5, suffix = "", onComplete }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const isFloat = value.toString().includes('.');
    if (isFloat) {
      const end = parseFloat(value);
      const totalSteps = 50;
      const stepTime = (duration * 1000) / totalSteps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const currentVal = (end * (step / totalSteps)).toFixed(2);
        setCount(parseFloat(currentVal));
        if (step >= totalSteps) {
          setCount(end);
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, stepTime);
      return () => clearInterval(timer);
    } else {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) {
        setCount(end);
        if (onComplete) onComplete();
        return;
      }
      const totalSteps = Math.min(end, 50);
      const stepTime = (duration * 1000) / totalSteps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const currentVal = Math.round(end * (step / totalSteps));
        setCount(currentVal);
        if (step >= totalSteps) {
          setCount(end);
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const labelRef = useRef(null);

  // States to trigger card scale-pulse on counter completion
  const [completed, setCompleted] = useState({
    projects: false,
    certs: false,
    stacks: false,
    cgpa: false
  });

  const triggerPulse = (key) => {
    setCompleted(prev => ({ ...prev, [key]: true }));
  };

  return (
    <section 
      id="about" 
      className="py-24 md:py-36 border-t border-line bg-base-950 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Monospace Section Eyebrow: Typewriter reveal */}
        <div ref={labelRef} className="mb-6 h-5">
          <TypewriterLabel text="01 // ABOUT ME" />
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-16 max-w-3xl leading-tight">
          <LineReveal lines={[
            "Architecting solutions at the",
            "intersection of security,",
            "scalability, and code discipline."
          ]} />
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Narrative Bio */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="lg:col-span-7 space-y-6 text-ink-400 font-body font-light text-sm md:text-base leading-relaxed"
          >
            <motion.p variants={blurReveal}>
              Hi, I'm <span className="text-ink-100 font-medium">Akash Bhadane</span>. 
              I design and build enterprise application architectures that deliver high availability and sub-second response times. 
              My fascination with technology lies in composing distinct database layers, routing parameters, and API controllers 
              into unified, secure systems that users love.
            </motion.p>
            <motion.p variants={blurReveal}>
              I specialize in bridging the robust, typed backend power of <span className="text-ink-100 font-medium">Java / Spring Boot</span> and 
              <span className="text-ink-100 font-medium"> C# / ASP.NET Core</span> with fluid frontends designed in <span className="text-ink-100 font-medium">React.js</span>. 
              I write secure, structured APIs using JWT authentication, role-based controls (RBAC), and clean relational or document models.
            </motion.p>
            <motion.p variants={blurReveal}>
              Currently undergoing rigorous training in advanced full-stack technologies at <span className="text-ink-100 font-medium">CDAC Mumbai</span>, 
              I have forged a strict discipline for writing clean, testable, and maintainable codebases. 
              I treat architecture as a craft, aiming always for reliable software solutions.
            </motion.p>

            {/* Currently Status Pill */}
            <motion.div 
              variants={blurReveal}
              className="inline-flex items-center gap-2.5 px-4 py-2 border border-line bg-base-900 rounded-sm text-xs font-mono text-ink-100"
            >
              <span className="w-2 h-2 rounded-full bg-accent-ember animate-pulse"></span>
              <span>Currently: <strong className="text-accent-ember font-normal">PG-DAC at CDAC, Mumbai (2025–2026)</strong></span>
            </motion.div>
          </motion.div>

          {/* Right: Stat Grid with Counters */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6 w-full"
          >
            {/* Stat 1: Projects (Pulsing scale on count end, upgraded from 2 to 3) */}
            <motion.div 
              variants={fadeUp}
              animate={completed.projects ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-ember/40 transition-colors duration-300 rounded-sm"
            >
              <div className="font-mono text-xs text-ink-400 group-hover:text-accent-ember transition-colors">PROJECTS</div>
              <div className="font-display font-bold text-4xl md:text-6xl text-ink-100 mt-2 select-none">
                <StatCounter value="3" onComplete={() => triggerPulse("projects")} />
                <span className="text-accent-ember">+</span>
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Full-Stack production-ready projects built</p>
            </motion.div>

            {/* Stat 2: Credentials */}
            <motion.div 
              variants={fadeUp} 
              animate={completed.certs ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-gold/40 transition-colors duration-300 rounded-sm"
            >
              <div className="font-mono text-xs text-ink-400 group-hover:text-accent-gold transition-colors">CREDENTIALS</div>
              <div className="font-display font-bold text-4xl md:text-6xl text-ink-100 mt-2 select-none">
                <StatCounter value="6" onComplete={() => triggerPulse("certs")} />
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Industry certifications (AWS, OCI, IBM...)</p>
            </motion.div>

            {/* Stat 3: Backend Stacks */}
            <motion.div 
              variants={fadeUp} 
              animate={completed.stacks ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-teal/40 transition-colors duration-300 rounded-sm"
            >
              <div className="font-mono text-xs text-ink-400 group-hover:text-accent-teal transition-colors">BACKEND STACKS</div>
              <div className="font-display font-bold text-4xl md:text-6xl text-ink-100 mt-2 select-none">
                <StatCounter value="2" onComplete={() => triggerPulse("stacks")} />
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Java/Spring &amp; .NET core framework stacks</p>
            </motion.div>

            {/* Stat 4: CGPA */}
            <motion.div 
              variants={fadeUp} 
              animate={completed.cgpa ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-ember/40 transition-colors duration-300 rounded-sm"
            >
              <div className="font-mono text-xs text-ink-400 group-hover:text-accent-ember transition-colors">ACADEMIC CGPA</div>
              <div className="font-display font-bold text-4xl md:text-6xl text-ink-100 mt-2 select-none">
                <StatCounter value="7.99" onComplete={() => triggerPulse("cgpa")} />
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Graduated CS engineering first division</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

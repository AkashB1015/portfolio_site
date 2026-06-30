import { useRef } from "react";
import { motion } from "framer-motion";
import { education } from "../data/education";
import { fadeUp, staggerContainer } from "../utils/motionVariants";
import { LineReveal, TypewriterLabel } from "./TextReveal";

export default function Education() {
  const labelRef = useRef(null);

  return (
    <section 
      id="education" 
      className="py-24 md:py-36 border-t border-line bg-base-950 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Monospace Eyebrow: Typewriter Label */}
        <div ref={labelRef} className="mb-6 h-5">
          <TypewriterLabel text="05 // EDUCATION" />
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-20 max-w-3xl leading-tight">
          <LineReveal lines={[
            "An academic base in CS engineering",
            "reinforced by specialized system programming."
          ]} />
        </h2>

        {/* Timeline container */}
        <div className="relative max-w-3xl mx-auto pl-8 md:pl-16">
          
          {/* Background Track Line (hairline border) */}
          <div className="absolute left-[6px] md:left-[10px] top-2 bottom-2 w-[2px] bg-line" />
          
          {/* Animated drawing active line on scroll */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: false, margin: "-150px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[6px] md:left-[10px] top-2 w-[2px] bg-gradient-to-b from-accent-ember via-accent-ember/65 to-transparent origin-top overflow-hidden"
          >
            {/* Travelling pulse glow current running down */}
            <div className="timeline-pulse" />
          </motion.div>

          {/* Timeline Nodes */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="space-y-16 md:space-y-24"
          >
            {education.map((edu) => (
              <motion.div 
                key={edu.id}
                variants={fadeUp}
                className="relative"
              >
                {/* Bullet node dot */}
                <div className="absolute -left-[34px] md:-left-[66px] top-1.5 flex items-center justify-center">
                  {edu.current ? (
                    <div className="relative w-[14px] h-[14px] md:w-[18px] md:h-[18px] flex items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-accent-ember/30 animate-ping" />
                      <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-accent-ember relative z-10 border-2 border-base-950" />
                    </div>
                  ) : (
                    <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full bg-base-950 border-2 border-line flex items-center justify-center">
                      <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-line" />
                    </div>
                  )}
                </div>

                {/* Card Content Panel */}
                <div className="bg-base-900 border border-line/60 hover:border-line p-6 md:p-8 rounded-sm transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                    
                    {/* Degree & Institutional Details */}
                    <div>
                      <h3 className="font-display font-extrabold text-lg md:text-xl text-ink-100 tracking-tight">
                        {edu.degree}
                      </h3>
                      <p className="font-mono text-xs text-accent-teal mt-1.5 font-medium">
                        {edu.institution} · <span className="font-light text-ink-400">{edu.location}</span>
                      </p>
                    </div>

                    {/* Date badge */}
                    <div className="text-left md:text-right font-mono text-[10px] md:text-xs text-ink-400 bg-base-950/65 px-3 py-1 border border-line rounded-sm h-fit w-fit select-none">
                      {edu.duration}
                    </div>

                  </div>

                  {/* Grade Badge */}
                  <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 bg-accent-gold/5 border border-accent-gold/20 text-accent-gold font-mono text-[10px] font-semibold rounded-sm select-none">
                    <span>{edu.grade}</span>
                  </div>

                  {/* Description details */}
                  <p className="mt-4 text-xs md:text-sm text-ink-400 font-body font-light leading-relaxed">
                    {edu.details}
                  </p>
                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

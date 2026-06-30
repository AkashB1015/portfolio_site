import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { certifications } from "../data/certifications";
import { badgePop } from "../utils/motionVariants";
import * as LucideIcons from "lucide-react";
import { LineReveal, TypewriterLabel } from "./TextReveal";

function CertIcon({ iconName }) {
  const IconComponent = LucideIcons[iconName] || LucideIcons.Award;
  return <IconComponent className="text-accent-gold w-7 h-7 relative z-10" />;
}

export default function Certifications() {
  const [activeCert, setActiveCert] = useState(null);
  const labelRef = useRef(null);

  return (
    <section 
      id="certifications" 
      className="py-24 md:py-36 border-t border-line bg-base-900/10 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Monospace Eyebrow: Typewriter Label */}
        <div ref={labelRef} className="mb-6 h-5">
          <TypewriterLabel text="04 // CERTIFICATIONS" />
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-20 max-w-3xl leading-tight">
          <LineReveal lines={[
            "Validated credentials from leading",
            "technology providers."
          ]} />
        </h2>

        {/* Staggered Badge Trading Card Grid (with continuous idle float) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={badgePop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              // Continuous slow idle float, offset per card to float out of sync
              animate={{
                y: [0, -4, 0]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.25
                }
              }}
              className="relative w-full h-[280px] perspective-1000 group cursor-pointer"
            >
              {/* Card Container for 3D Flip */}
              <div className="absolute inset-0 transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 w-full h-full">
                
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-base-900 border border-line p-6 flex flex-col justify-between items-center rounded-sm">
                  
                  {/* Glowing Badge Area with Shine Sweep */}
                  <div className="relative w-16 h-16 rounded-full bg-base-950 border border-line flex items-center justify-center overflow-hidden">
                    <CertIcon iconName={cert.icon} />
                    
                    {/* Continuous shine sweep element */}
                    <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine-sweep" />
                  </div>

                  {/* Title & Organization */}
                  <div className="text-center space-y-1.5">
                    <h3 className="font-display font-bold text-base text-ink-100 px-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-ink-400">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Verified Credential Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-gold/5 border border-accent-gold/20 text-accent-gold font-mono text-[9px] uppercase tracking-wider rounded-sm select-none">
                    <LucideIcons.ShieldAlert size={10} className="text-accent-gold fill-accent-gold/20" />
                    <span>Verified Credential</span>
                  </div>
                </div>

                {/* Back Face (Detail Face) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-base-800 border border-accent-gold/40 p-6 flex flex-col justify-between items-center text-center rounded-sm">
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-accent-gold border border-accent-gold/30 px-2 py-0.5 rounded-sm">
                      {cert.type}
                    </span>
                    <h4 className="font-display font-bold text-sm text-ink-100 mt-2">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-ink-400 leading-normal font-light">
                      {cert.details}
                    </p>
                  </div>

                  <div className="w-full flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCert(cert);
                      }}
                      className="flex-grow py-2 bg-base-900 border border-line hover:border-accent-gold text-ink-100 hover:text-accent-gold transition-colors duration-300 font-mono text-[10px] tracking-wider rounded-sm"
                    >
                      VIEW CERTIFICATE
                    </button>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 border border-line hover:border-accent-gold bg-base-900 text-ink-400 hover:text-accent-gold rounded-sm transition-colors duration-300"
                      aria-label="Verify credential link"
                    >
                      <LucideIcons.ExternalLink size={12} />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal/Lightbox for Certificate Images */}
        <AnimatePresence>
          {activeCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-base-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-base-900 border border-line rounded-sm p-8 md:p-12 relative cursor-default shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveCert(null)}
                  className="absolute top-4 right-4 text-ink-400 hover:text-accent-ember transition-colors p-2"
                  aria-label="Close certificate detail"
                >
                  <LucideIcons.X size={20} />
                </button>

                {activeCert.imageUrl ? (
                  /* Render Real Certificate Image when supplied */
                  <img
                    src={activeCert.imageUrl}
                    alt={activeCert.title}
                    className="w-full h-auto rounded-sm object-contain"
                  />
                ) : (
                  /* Procedurally render a gorgeous virtual certificate template */
                  <div className="w-full aspect-[4/3] bg-[#0E1013] border-2 border-dashed border-accent-gold/20 flex flex-col justify-between p-6 md:p-10 text-center relative overflow-hidden rounded-sm select-none">
                    
                    {/* Background faint logo watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-accent-gold scale-[3] pointer-events-none">
                      <LucideIcons.Award size={150} />
                    </div>

                    {/* Certificate Header */}
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] md:text-[11px] tracking-[0.25em] text-accent-gold uppercase block">
                        CERTIFICATE OF COMPLETION
                      </span>
                      <div className="w-16 h-[1px] bg-accent-gold/30 mx-auto mt-2" />
                    </div>

                    {/* Certificate Body */}
                    <div className="space-y-4 my-auto">
                      <p className="font-body font-light text-[11px] md:text-sm text-ink-400">
                        This is to certify that the credential for
                      </p>
                      <h3 className="font-display font-extrabold text-xl md:text-3xl text-ink-100 tracking-wide">
                        {activeCert.title}
                      </h3>
                      <p className="font-body font-light text-[11px] md:text-sm text-ink-400">
                        has been successfully awarded and verified by
                      </p>
                      <h4 className="font-mono text-xs md:text-sm text-accent-teal font-semibold">
                        {activeCert.issuer.toUpperCase()}
                      </h4>
                    </div>

                    {/* Certificate Footer */}
                    <div className="flex justify-between items-end border-t border-line/60 pt-4 md:pt-6">
                      <div className="text-left space-y-1">
                        <span className="text-[8px] md:text-[10px] font-mono text-ink-400 block">CREDENTIAL ID</span>
                        <span className="text-[9px] md:text-xs font-mono text-ink-100 tracking-wider">VERIFIED-{activeCert.id.toUpperCase()}-2026</span>
                      </div>

                      {/* Gold Seal Medallion */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent-gold/10 border-2 border-accent-gold flex items-center justify-center relative">
                        <LucideIcons.Award className="text-accent-gold w-6 h-6 md:w-8 md:h-8" />
                        <div className="absolute inset-0 rounded-full border border-dashed border-accent-gold/40 animate-spin" style={{ animationDuration: '20s' }} />
                      </div>

                      <div className="text-right space-y-1">
                        <span className="text-[8px] md:text-[10px] font-mono text-ink-400 block">ISSUED YEAR</span>
                        <span className="text-[9px] md:text-xs font-mono text-ink-100">{activeCert.year}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* External link back inside modal */}
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-xs text-ink-400">
                    Verify this license directly with the official authority.
                  </p>
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-accent-gold text-base-950 font-mono text-[10px] font-bold tracking-widest px-4 py-2.5 rounded-sm hover:bg-accent-gold/90 transition-colors"
                  >
                    <span>VERIFY LICENSE</span>
                    <LucideIcons.ExternalLink size={12} />
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

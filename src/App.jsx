import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

// Import Components
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";

export default function App() {
  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Synchronize Lenis scrolling state with scroll-to-hash overrides
    const handleAnchorClick = (e) => {
      const href = e.target.closest("a")?.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          lenis.scrollTo(targetEl, {
            offset: targetId === "hero" ? 0 : -80,
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Framer Motion scroll progress bar hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-ember to-accent-gold origin-left relative"
          style={{ scaleX }}
        >
          {/* Moving soft glow tip at the end of the progress bar */}
          <div className="absolute top-0 right-0 w-16 h-3 bg-accent-gold/45 rounded-full blur-sm -translate-y-0.5" />
        </motion.div>
      </div>

      {/* Custom Mouse Cursor for Desktop Devices */}
      <CustomCursor />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Layout Wrap */}
      <main className="w-full min-h-screen bg-base-950 text-ink-100 flex flex-col">
        {/* Hero Section */}
        <Hero />

        {/* Section 01: About */}
        <About />

        {/* Section 02: Skills */}
        <Skills />

        {/* Section 03: Projects */}
        <Projects />

        {/* Section 04: Certifications */}
        <Certifications />

        {/* Section 05: Education */}
        <Education />

        {/* Section 06: Contact & Footer */}
        <Contact />
      </main>
    </>
  );
}

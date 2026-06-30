import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", target: "about" },
  { label: "Skills", target: "skills" },
  { label: "Projects", target: "projects" },
  { label: "Certifications", target: "certifications" },
  { label: "Education", target: "education" },
  { label: "Contact", target: "contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme from storage or system preferences, default to dark
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      return prefersLight ? "light" : "dark";
    }
    return "dark";
  });

  // Sync class on documentElement on change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Scroll spy using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.target);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Reusable Switch button markup
  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="w-12 h-6 bg-base-800 border border-line rounded-full p-0.5 flex items-center cursor-pointer relative transition-colors duration-300"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={`w-5 h-5 rounded-full bg-accent-ember flex items-center justify-center shadow-md relative ${
          theme === "dark" ? "ml-auto" : "mr-auto"
        }`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {theme === "dark" ? (
            <Moon size={10} className="text-base-950 fill-base-950" />
          ) : (
            <Sun size={10} className="text-base-950" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
          scrolled
            ? "bg-base-950/75 backdrop-blur-md border-line/60 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="font-display font-bold text-lg md:text-xl tracking-tight text-ink-100 flex items-center gap-1.5"
          >
            <span className="text-accent-ember">AKASH</span>
            <span className="font-light text-ink-400">BHADANE</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1 bg-base-900/60 border border-line/50 px-1.5 py-1 rounded-full backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className={`relative px-4 py-1.5 text-[11px] font-mono tracking-wider font-medium transition-colors duration-300 ${
                    isActive ? "text-base-950 font-bold" : "text-ink-400 hover:text-ink-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-accent-ember rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  {item.label.toUpperCase()}
                </a>
              );
            })}
          </div>

          {/* CTA Link & Toggle Container */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggleButton />
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="text-[11px] font-mono font-bold tracking-widest px-5 py-2.5 border border-line hover:border-accent-ember transition-colors duration-300 rounded-sm bg-base-900 text-ink-100 hover:text-accent-ember"
            >
              LET'S TALK
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggleButton />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-ink-100 hover:text-accent-ember transition-colors p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[53px] left-0 w-full bg-base-950/98 backdrop-blur-lg border-b border-line z-40 md:hidden flex flex-col items-center justify-center gap-6 py-10 px-6"
          >
            {NAV_ITEMS.map((item, idx) => (
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`font-display text-xl font-semibold tracking-wide transition-colors ${
                  activeSection === item.target ? "text-accent-ember" : "text-ink-400 hover:text-ink-100"
                }`}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.04 }}
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="mt-2 w-full text-center py-2.5 border border-accent-ember text-accent-ember font-mono text-xs tracking-wider rounded-sm bg-accent-ember/5 hover:bg-accent-ember/15 transition-all duration-300"
            >
              LET'S TALK
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiDotnet,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub
} from "react-icons/si";

// Specific icon mapping to maintain bundle size tree-shaking
const iconMapping = {
  SiSpringboot: SiSpringboot,
  SiSpringsecurity: SiSpringsecurity,
  SiHibernate: SiHibernate,
  SiDotnet: SiDotnet,
  SiReact: SiReact,
  SiNodedotjs: SiNodedotjs,
  SiJavascript: SiJavascript,
  SiMysql: SiMysql,
  SiPostgresql: SiPostgresql,
  SiMongodb: SiMongodb,
  SiDocker: SiDocker,
  SiGit: SiGit,
  SiGithub: SiGithub
};

const skillsList = [
  { name: "Java", icon: "SiJava", color: "#E85D2C" },
  { name: "Spring Boot", icon: "SiSpringboot", color: "#6DB33F" },
  { name: "Spring Security", icon: "SiSpringsecurity", color: "#6DB33F" },
  { name: "Hibernate", icon: "SiHibernate", color: "#C9941F" },
  { name: "ASP.NET Core", icon: "SiDotnet", color: "#512BD4" },
  { name: "C#", icon: "SiCsharp", color: "#9B4F96" },
  { name: "React.js", icon: "SiReact", color: "#61DAFB" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
  { name: "MySQL", icon: "SiMysql", color: "#00758F" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
  { name: "AWS", icon: "SiAmazonaws", color: "#FF9900" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED" },
  { name: "Git", icon: "SiGit", color: "#F05032" },
  { name: "GitHub", icon: "SiGithub", color: "#FAF8F4" },
  { name: "REST API", icon: null, color: "#0E9488" },
  { name: "JWT", icon: null, color: "#0E9488" },
  { name: "RBAC", icon: null, color: "#0E9488" },
  { name: "Microservices", icon: null, color: "#0E9488" },
  { name: "CI/CD", icon: null, color: "#0E9488" },
  { name: "OOP", icon: null, color: "#C9941F" },
  { name: "Agile", icon: null, color: "#C9941F" }
];

function SkillIcon({ name, className }) {
  if (name === "SiCsharp") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 7 22 17 12 22 2 17 2 7" className="stroke-current opacity-30" />
        <path d="M8.5 10a2.2 2.2 0 1 0 0 4" />
        <path d="M13.5 8.5v7M16 8.5v7M12 10.5h5.5M12 13.5h5.5" />
      </svg>
    );
  }
  if (name === "SiJava") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a3 3 0 0 1 0 6h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <path d="M6 1v3M10 1v3M14 1v3" />
      </svg>
    );
  }
  if (name === "SiAmazonaws" || name === "SiAmazonwebservices") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 14c3.5 4 9 4 12.5 0" />
        <path d="M14 12.5l2 1.5-1 2" />
      </svg>
    );
  }

  const IconComponent = iconMapping[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default function TechOrbitSphere() {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [sphereRadius, setSphereRadius] = useState(180);
  const [renderedPoints, setRenderedPoints] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Math ref variables for 3D rotations, drags, and inertia momentum decay
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);
  const isHovered = useRef(false);

  // Monitor screen sizes to dynamically scale radius or apply fallbacks
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth < 768) {
        setSphereRadius(140);
      } else if (window.innerWidth < 1024) {
        setSphereRadius(195);
      } else {
        setSphereRadius(240);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pre-calculate Golden Spiral / Fibonacci distribution vectors
  const points = useRef([]);
  const connections = useRef([]);

  useEffect(() => {
    const N = skillsList.length;
    const tempPoints = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      tempPoints.push({
        x,
        y,
        z,
        skill: skillsList[i]
      });
    }
    points.current = tempPoints;

    // Map connections based on proximity threshold
    const tempConnections = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = tempPoints[i].x - tempPoints[j].x;
        const dy = tempPoints[i].y - tempPoints[j].y;
        const dz = tempPoints[i].z - tempPoints[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.75) { // Proximity bound on unit sphere
          tempConnections.push([i, j]);
        }
      }
    }
    connections.current = tempConnections;
  }, []);

  // Main 3D render tick animation frame loop
  useEffect(() => {
    if (isMobile) return;

    if (prefersReduced) {
      // Draw static arrangement if reduced motion is requested
      const staticPoints = points.current.map(pt => ({
        ...pt,
        rx: pt.x * sphereRadius,
        ry: pt.y * sphereRadius,
        rz: pt.z * sphereRadius
      }));
      setRenderedPoints(staticPoints);
      return;
    }

    const tick = () => {
      if (isDragging.current) {
        // Friction decay on active drag moves
        velocityX.current *= 0.85;
        velocityY.current *= 0.85;
      } else {
        // Continuous slow idle auto-rotation on Y axis (slow down when hovered)
        const speed = isHovered.current ? 0.0003 : 0.0018;
        rotationY.current += speed;

        // Apply friction-based decay to velocity after user drag release
        rotationX.current += velocityX.current;
        rotationY.current += velocityY.current;
        velocityX.current *= 0.95;
        velocityY.current *= 0.95;
      }

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      const rotated = points.current.map(pt => {
        // Rotate Y Axis (Horizontal)
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;
        const y1 = pt.y;

        // Rotate X Axis (Vertical)
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        return {
          ...pt,
          rx: x2 * sphereRadius,
          ry: y2 * sphereRadius,
          rz: z2 * sphereRadius
        };
      });

      setRenderedPoints(rotated);
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, [sphereRadius, isMobile, prefersReduced]);

  // Pointer drag hooks (combines touch + mouse seamlessly)
  const handlePointerDown = (e) => {
    isDragging.current = true;
    setHasInteracted(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocityX.current = 0;
    velocityY.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;

    const scaleFactor = 0.005; // drag to rotation scale
    rotationY.current -= deltaX * scaleFactor;
    rotationX.current += deltaY * scaleFactor;

    // Track velocities for momentum calculations on release
    velocityX.current = deltaY * scaleFactor;
    velocityY.current = -deltaX * scaleFactor;

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Mobile layout: Simple, performance-friendly static arrangement
  if (isMobile) {
    return (
      <div className="w-full py-10 px-6 text-center select-none" aria-label="Technical skills lists">
        <ul className="flex flex-wrap justify-center gap-2.5 max-w-lg mx-auto">
          {skillsList.map((skill, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className="flex items-center gap-1.5 px-3 py-2 bg-base-900 border border-line text-ink-100 font-mono text-xs rounded-sm shadow-sm"
            >
              {skill.icon && <SkillIcon name={skill.icon} className="w-3.5 h-3.5 text-accent-teal" />}
              <span>{skill.name}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div 
      className="relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing w-full aspect-square max-w-[550px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      style={{ touchAction: "none" }}
    >
      
      {/* Pulse energy core centered behind all orbited tags */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-accent-ember/20 to-accent-teal/20 blur-3xl z-0 pointer-events-none animate-pulse" 
        style={{ animationDuration: '6s' }}
      />

      {/* SVG Canvas for drawing connecting lines */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox={`-${sphereRadius + 50} -${sphereRadius + 50} ${(sphereRadius + 50) * 2} ${(sphereRadius + 50) * 2}`}
      >
        {connections.current.map(([i, j], idx) => {
          const pt1 = renderedPoints[i];
          const pt2 = renderedPoints[j];
          if (!pt1 || !pt2) return null;

          // Fade connections based on depth relative to center
          const avgZ = (pt1.rz + pt2.rz) / 2;
          const lineOpacity = 0.04 + 0.12 * (avgZ + sphereRadius) / (2 * sphereRadius);

          return (
            <line
              key={idx}
              x1={pt1.rx}
              y1={pt1.ry}
              x2={pt2.rx}
              y2={pt2.ry}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-line/35"
              style={{ opacity: lineOpacity }}
            />
          );
        })}
      </svg>

      {/* Accessible semantic list of rotating skills */}
      <ul 
        aria-label="3D Drag to explore technical skills" 
        className="relative w-full h-full"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {renderedPoints.map((pt, index) => {
          // Perspective scale based on Z depth position
          const scale = 0.75 + 0.5 * (pt.rz + sphereRadius) / (2 * sphereRadius);
          
          // Smooth opacity mapping
          const opacity = 0.25 + 0.75 * (pt.rz + sphereRadius) / (2 * sphereRadius);
          
          // Calculate grayscale desaturation for items turned to the background
          const blurValue = Math.max(0, -pt.rz / 60);
          const grayscale = Math.max(0, -pt.rz / sphereRadius * 100);

          return (
            <li
              key={index}
              className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
              style={{
                transform: `translate3d(${pt.rx}px, ${pt.ry}px, ${pt.rz}px) scale(${scale})`,
                zIndex: Math.round(pt.rz + sphereRadius),
                opacity: opacity,
                filter: `blur(${blurValue}px) grayscale(${grayscale}%)`,
                '--skill-color': pt.skill.color || 'rgb(var(--color-accent-teal))',
                '--skill-color-glow': pt.skill.color ? `${pt.skill.color}35` : 'rgba(14,148,136,0.25)'
              }}
            >
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-base-900/80 backdrop-blur-sm border border-line text-ink-100 font-mono text-[9px] sm:text-xs rounded-sm hover:scale-[1.15] hover:border-[var(--skill-color)] hover:text-[var(--skill-color)] hover:shadow-[0_4px_14px_var(--skill-color-glow)] transition-all duration-300 pointer-events-auto"
                style={{
                  borderColor: pt.skill.color ? `${pt.skill.color}35` : undefined
                }}
              >
                {pt.skill.icon ? (
                  <SkillIcon 
                    name={pt.skill.icon} 
                    className="w-3.5 h-3.5 transition-colors" 
                    style={{ color: pt.skill.color }} 
                  />
                ) : (
                  <span className="w-1 h-1 rounded-full bg-accent-teal" />
                )}
                <span>{pt.skill.name}</span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Floating prompt instructional badge (fades out after first interaction) */}
      {!hasInteracted && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 border border-accent-ember/30 bg-base-900/80 text-accent-ember font-mono text-[9px] uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1.5 pointer-events-none animate-bounce">
          <span>↻ Drag to explore</span>
        </div>
      )}
    </div>
  );
}

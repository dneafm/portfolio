import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Zap, Database, Layers, Terminal } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const TAGS = ["DeFi", "Systems", "Workflows", "Operator Tools", "Automation"];

export function Hero() {
  const [activePath, setActivePath] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for subtle parallax depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Perspective transforms for 3D feeling
  const rotateX = useTransform(y, [-20, 20], [5, -5]);
  const rotateY = useTransform(x, [-20, 20], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / 30);
    mouseY.set((e.clientY - centerY) / 30);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePath((prev) => (prev + 1) % 3);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] flex flex-col items-center justify-center py-24 overflow-hidden"
    >
      {/* Background Data Bits */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3
            }}
            animate={{ 
              y: [null, (Math.random() * 100 - 50) + "%"],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-px h-12 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          />
        ))}
      </div>

      {/* 3D Orbital Cog Core (Behind Text) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[1200px]">
        <motion.div 
          style={{ 
            rotateX, 
            rotateY,
            z: -150,
            scale: 1.1
          }}
          initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
          animate={{ opacity: 1, scale: 1.1, rotateX: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="relative w-[1000px] h-[1000px] flex items-center justify-center"
        >
          {/* Perspective Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:100px_100px] opacity-[0.02] dark:opacity-[0.04] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)]" />
          
          <svg 
            className="w-full h-full overflow-visible" 
            viewBox="0 0 800 800"
          >
            <defs>
              <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#1e40af" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="signalPulse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                <stop offset="50%" stopColor="rgba(16, 185, 129, 0.8)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
              </linearGradient>
            </defs>

            {/* Central Intelligent Core */}
            <g transform="translate(400, 400)">
              {/* Inner Energy Core */}
              <motion.circle
                r="35"
                fill="url(#coreGradient)"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                filter="url(#coreGlow)"
              />
              {/* Core Cog Teeth (Inner) */}
              <motion.circle
                r="42"
                className="stroke-blue-500/20 dark:stroke-blue-400/10 fill-none"
                strokeWidth="3"
                strokeDasharray="2 4"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              {/* Graphite Shell */}
              <circle r="55" className="stroke-zinc-800 dark:stroke-zinc-700 fill-none" strokeWidth="2" />
              <circle r="50" className="stroke-zinc-900/50 dark:stroke-zinc-800/50 fill-none" strokeWidth="8" />
              {/* Glass Layer */}
              <circle r="48" fill="rgba(24, 24, 27, 0.3)" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.5" />
              
              {/* Core Markers */}
              {[0, 90, 180, 270].map((angle) => (
                <line
                  key={angle}
                  x1="0" y1="-55" x2="0" y2="-65"
                  transform={`rotate(${angle})`}
                  className="stroke-blue-500/40"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Orbital Rings */}
            <g transform="translate(400, 400)">
              {/* Ring 1: Inner Segmented */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  r="130"
                  className="stroke-blue-500/10 dark:stroke-blue-400/5 fill-none"
                  strokeWidth="1"
                  strokeDasharray="100 60"
                />
                <circle
                  r="130"
                  className="stroke-blue-500/30 dark:stroke-blue-400/20 fill-none"
                  strokeWidth="0.5"
                  strokeDasharray="2 10"
                />
              </motion.g>

              {/* Ring 1.5: Intermediate Cog Ring */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  r="165"
                  className="stroke-zinc-800/40 dark:stroke-zinc-700/30 fill-none"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <circle
                  r="168"
                  className="stroke-blue-500/10 dark:stroke-blue-400/5 fill-none"
                  strokeWidth="0.5"
                />
              </motion.g>

              {/* Ring 2: Middle Cog Teeth */}
              <motion.g
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  r="200"
                  className="stroke-zinc-800 dark:stroke-zinc-700 fill-none"
                  strokeWidth="4"
                  strokeDasharray="4 8"
                />
                <circle
                  r="205"
                  className="stroke-blue-500/20 dark:stroke-blue-400/10 fill-none"
                  strokeWidth="0.5"
                />
                {/* Small Signal Accents on Ring 2 */}
                {[0, 120, 240].map((angle) => (
                  <motion.circle
                    key={angle}
                    cx={200 * Math.cos(angle * Math.PI / 180)}
                    cy={200 * Math.sin(angle * Math.PI / 180)}
                    r="2"
                    className="fill-emerald-500"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: angle / 100 }}
                    filter="url(#ringGlow)"
                  />
                ))}
              </motion.g>

              {/* Satellite Cogs */}
              {[45, 135, 225, 315].map((orbitAngle, i) => (
                <motion.g
                  key={`satellite-${i}`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80 + i * 10, repeat: Infinity, ease: "linear" }}
                >
                  <g transform={`translate(${250}, 0)`}>
                    <motion.circle
                      r="12"
                      className="stroke-zinc-800 dark:stroke-zinc-700 fill-none"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <circle r="4" className="fill-blue-500/20" />
                  </g>
                </motion.g>
              ))}

              {/* Ring 3: Outer Precision */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  r="300"
                  className="stroke-zinc-800/30 dark:stroke-zinc-700/20 fill-none"
                  strokeWidth="0.5"
                  strokeDasharray="200 100"
                />
                {/* Signal Pulse Path */}
                <motion.circle
                  r="300"
                  className="stroke-emerald-500/40 fill-none"
                  strokeWidth="1.5"
                  strokeDasharray="1 599"
                  animate={{ strokeDashoffset: [0, -600] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  filter="url(#ringGlow)"
                />
              </motion.g>

              {/* Technical Labels (Floating) */}
              {[
                { r: 160, angle: -45, label: "SIG.PROC" },
                { r: 240, angle: 135, label: "CRYPTO.ENG" },
                { r: 340, angle: 45, label: "OP.SYS.v3" },
              ].map((item, i) => (
                <g 
                  key={i}
                  transform={`rotate(${item.angle}) translate(${item.r}, 0) rotate(${-item.angle})`}
                >
                  <text
                    className="text-[7px] font-mono fill-zinc-500 dark:fill-zinc-600 font-bold tracking-[0.4em]"
                    textAnchor="middle"
                  >
                    {item.label}
                  </text>
                  <motion.line
                    x1="-15" y1="8" x2="15" y2="8"
                    className="stroke-blue-500/30"
                    strokeWidth="0.5"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i }}
                  />
                </g>
              ))}
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Foreground Content Stack */}
      <div className="relative z-10 max-w-5xl text-center space-y-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-50/30 dark:bg-blue-900/5 border border-blue-100/30 dark:border-blue-900/10 mx-auto backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              DeFi workflows · systems · operator tools
            </span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.85] max-w-5xl mx-auto">
            Designing clarity for <br /> <span className="text-blue-600 dark:text-blue-400">DeFi workflows</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <p className="text-2xl md:text-3xl text-zinc-600 dark:text-zinc-400 font-medium leading-tight">
            Background in crypto design, now moving toward systems, internal tools, and operator-facing interfaces.
          </p>
          <p className="text-xl text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto">
            I turn dense contexts into clearer structures, workflows, and reusable design systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/casefiles"
              className="group relative inline-flex items-center gap-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-14 py-6 text-xs font-black uppercase tracking-[0.35em] hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-2xl shadow-zinc-900/20 dark:shadow-white/10"
            >
              View Casefiles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/cv"
              className="inline-flex items-center gap-3 border-2 border-zinc-200 dark:border-zinc-800 px-14 py-6 text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.35em] hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              Open CV
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {TAGS.map((tag) => (
              <span 
                key={tag}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 px-5 py-2.5 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

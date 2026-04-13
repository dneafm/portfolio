import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Twitter, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactNode {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  meta: string[];
  icon: LucideIcon;
  href: string;
  type: "primary" | "secondary";
}

const CONTACT_NODES: ContactNode[] = [
  {
    id: "email",
    title: "Direct Channel",
    subtitle: "Primary direct channel",
    value: "hello@example.com",
    meta: ["preferred route", "async response: 24–48h"],
    icon: Mail,
    href: "mailto:hello@example.com",
    type: "primary",
  },
  {
    id: "linkedin",
    title: "LinkedIn / Profile",
    subtitle: "Professional context",
    value: "linkedin.com/in/username",
    meta: ["public node", "professional network"],
    icon: Linkedin,
    href: "https://linkedin.com",
    type: "secondary",
  },
  {
    id: "x",
    title: "X / Notes + Signals",
    subtitle: "Public thoughts, experiments, live ideas",
    value: "@username",
    meta: ["notes / signals", "public stream"],
    icon: Twitter,
    href: "https://x.com",
    type: "secondary",
  },
];

export function Contact() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative min-h-[80vh] py-12 px-6 overflow-hidden">
      {/* Background Routing Map */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-40" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(37, 99, 235, 0)" />
              <stop offset="50%" stopColor="rgba(37, 99, 235, 0.6)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
            </linearGradient>
          </defs>

          {/* Faint Base Grid/Routes */}
          <g className="stroke-zinc-100 dark:stroke-zinc-800/50" strokeWidth="0.5" fill="none">
            {/* Main trunk */}
            <path d="M 400 50 L 400 150" />
            
            {/* Route to Email (Middle) */}
            <path d="M 400 150 L 400 250" />
            
            {/* Routes to Bottom Nodes */}
            <path d="M 400 150 C 400 150, 150 150, 150 450" />
            <path d="M 400 150 C 400 150, 650 150, 650 450" />
          </g>

          {/* Active Routes */}
          <AnimatePresence>
            {hoveredNode && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Email Route */}
                {hoveredNode === "email" && (
                  <>
                    <path 
                      d="M 400 50 L 400 250" 
                      className="stroke-blue-500/30" 
                      strokeWidth="1.5" 
                      fill="none" 
                      filter="url(#pathGlow)"
                    />
                    <motion.circle
                      r="2"
                      className="fill-blue-500"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ offsetPath: "path('M 400 50 L 400 250')" }}
                    />
                  </>
                )}

                {/* LinkedIn Route */}
                {hoveredNode === "linkedin" && (
                  <>
                    <path 
                      d="M 400 50 L 400 150 C 400 150, 150 150, 150 450" 
                      className="stroke-blue-500/30" 
                      strokeWidth="1.5" 
                      fill="none" 
                      filter="url(#pathGlow)"
                    />
                    <motion.circle
                      r="2"
                      className="fill-blue-500"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{ offsetPath: "path('M 400 50 L 400 150 C 400 150, 150 150, 150 450')" }}
                    />
                  </>
                )}

                {/* X Route */}
                {hoveredNode === "x" && (
                  <>
                    <path 
                      d="M 400 50 L 400 150 C 400 150, 650 150, 650 450" 
                      className="stroke-blue-500/30" 
                      strokeWidth="1.5" 
                      fill="none" 
                      filter="url(#pathGlow)"
                    />
                    <motion.circle
                      r="2"
                      className="fill-blue-500"
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      style={{ offsetPath: "path('M 400 50 L 400 150 C 400 150, 650 150, 650 450')" }}
                    />
                  </>
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Default Faint Pulse for Email */}
          {!hoveredNode && (
            <motion.circle
              r="1.5"
              className="fill-blue-500/20"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: "path('M 400 50 L 400 250')" }}
            />
          )}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-24">
        {/* Top Header */}
        <header className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">System Status: Ready</span>
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
              Contact / <span className="text-blue-600 dark:text-blue-400">Open Channel</span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
              Available for selected freelance, product, and systems work.
            </p>
          </div>
        </header>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email Card (Full Width) */}
          <div className="md:col-span-2">
            <ContactCard 
              node={CONTACT_NODES[0]} 
              isHovered={hoveredNode === CONTACT_NODES[0].id}
              onHover={() => setHoveredNode(CONTACT_NODES[0].id)}
              onLeave={() => setHoveredNode(null)}
            />
          </div>

          {/* Secondary Cards */}
          {CONTACT_NODES.slice(1).map((node) => (
            <div key={node.id}>
              <ContactCard 
                node={node} 
                isHovered={hoveredNode === node.id}
                onHover={() => setHoveredNode(node.id)}
                onLeave={() => setHoveredNode(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactCard({ 
  node, 
  isHovered, 
  onHover, 
  onLeave 
}: { 
  node: ContactNode; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = node.icon;

  return (
    <motion.a
      href={node.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "group relative block p-8 rounded-2xl border transition-all duration-300 overflow-hidden",
        node.type === "primary" ? "bg-white dark:bg-zinc-900" : "bg-zinc-50/50 dark:bg-zinc-900/50",
        isHovered 
          ? "border-blue-500/50 shadow-2xl shadow-blue-500/10 -translate-y-1" 
          : "border-zinc-100 dark:border-zinc-800 shadow-sm"
      )}
    >
      {/* Corner Markers */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-blue-500/40" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-blue-500/40" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-blue-500/40" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-blue-500/40" 
            />
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col h-full space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
              {node.title}
            </h3>
            <p className="text-zinc-400 dark:text-zinc-500 text-xs font-medium">
              {node.subtitle}
            </p>
          </div>
          <div className={cn(
            "p-3 rounded-xl transition-colors",
            isHovered ? "bg-blue-500/10 text-blue-500" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
          )}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-2xl md:text-3xl font-black tracking-tight transition-colors",
              isHovered ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300"
            )}>
              {node.value}
            </span>
            <ArrowUpRight className={cn(
              "w-6 h-6 transition-all",
              isHovered ? "text-blue-500 translate-x-1 -translate-y-1" : "text-zinc-200 dark:text-zinc-800"
            )} />
          </div>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
            {node.meta.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                  {m}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hover Status Text */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute bottom-4 right-12 text-[8px] font-mono text-blue-500/60 uppercase tracking-[0.2em]"
          >
            Route Active // Pulse Sent
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}

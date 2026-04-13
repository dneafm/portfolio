import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const TAGS = ["Crypto", "Systems", "Operator", "AI", "Design"];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:min-h-[88vh] md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.10),transparent_24%),radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/80 md:top-28" />
        <div className="absolute inset-x-0 bottom-12 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/80 md:bottom-28" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-8 px-6 md:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-6 md:space-y-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.32em] text-zinc-500 dark:text-zinc-400">
              Hoang Pham_Portfolio
            </span>
          </div>

          <div className="space-y-4 md:space-y-5">
            <h1 className="text-[3.2rem] font-black leading-[0.88] tracking-tighter text-zinc-950 dark:text-zinc-50 sm:text-6xl md:text-7xl xl:text-[6.2rem]">
              Design,
              <br />
              <span className="text-blue-600 dark:text-blue-400">systems,</span>
              <br />
              and a little mythology.
            </h1>

            <p className="max-w-xl text-base font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl">
              Crypto-born visual thinking, now turning into workflows, operator tools, and sharper systems.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center md:gap-4 md:pt-2">
            <Link
              to="/casefiles"
              className="group inline-flex items-center justify-center gap-3 bg-zinc-950 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-white transition-all hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-blue-500 md:px-8 md:text-xs"
            >
              View Casefiles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/operator-lab"
              className="inline-flex items-center justify-center gap-3 border border-zinc-300 px-7 py-4 text-[11px] font-black uppercase tracking-[0.28em] text-zinc-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 md:px-8 md:text-xs"
            >
              Open Operator Lab
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 md:gap-3 md:pt-3">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 bg-white/60 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-500 md:px-4 md:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.08 }}
          className="relative mx-auto -mt-3 flex h-[20rem] w-full max-w-[24rem] items-center justify-center md:mt-0 md:h-[32rem] md:max-w-[38rem] lg:h-[42rem]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            className="absolute h-[14.5rem] w-[14.5rem] rounded-full border border-zinc-300/55 dark:border-zinc-700/55 md:h-[25rem] md:w-[25rem]"
          >
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-blue-500/70 md:h-5" />
            <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-violet-500/60 md:h-5" />
            <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-blue-500/50 md:w-5" />
            <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-violet-500/50 md:w-5" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute h-[10rem] w-[10rem] rounded-full border border-dashed border-zinc-400/45 dark:border-zinc-600/45 md:h-[18rem] md:w-[18rem] md:border-2"
          />

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="absolute inset-0 scale-[1.45] rounded-full bg-blue-500/18 blur-3xl dark:bg-blue-500/22" />
            <svg viewBox="0 0 360 420" className="relative h-[14rem] w-[11rem] drop-shadow-[0_0_60px_rgba(59,130,246,0.3)] md:h-[23rem] md:w-[18rem]">
              <defs>
                <linearGradient id="gemEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
                  <stop offset="100%" stopColor="rgba(191,219,254,0.65)" />
                </linearGradient>
                <linearGradient id="gemCenter" x1="28%" y1="0%" x2="72%" y2="100%">
                  <stop offset="0%" stopColor="#eff6ff" />
                  <stop offset="18%" stopColor="#93c5fd" />
                  <stop offset="48%" stopColor="#3b82f6" />
                  <stop offset="78%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="facetBright" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                </linearGradient>
                <linearGradient id="facetDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(37,99,235,0.06)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,0.42)" />
                </linearGradient>
              </defs>

              <path
                d="M180 28 L252 70 L278 154 L244 322 L180 392 L116 322 L82 154 L108 70 Z"
                fill="url(#gemCenter)"
                stroke="url(#gemEdge)"
                strokeWidth="4"
              />
              <path d="M180 28 L108 70 L82 154 L180 124 Z" fill="rgba(255,255,255,0.34)" />
              <path d="M180 28 L252 70 L278 154 L180 124 Z" fill="rgba(255,255,255,0.16)" />
              <path d="M82 154 L180 124 L180 392 L116 322 Z" fill="url(#facetBright)" opacity="0.24" />
              <path d="M278 154 L180 124 L180 392 L244 322 Z" fill="url(#facetDark)" opacity="0.9" />
              <path d="M108 70 L180 124 L252 70" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" />
              <path d="M82 154 L180 124 L278 154" stroke="rgba(255,255,255,0.42)" strokeWidth="2.5" fill="none" />
              <path d="M116 322 L180 220 L244 322" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" fill="none" />
              <path d="M180 28 L180 392" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
              <path d="M108 70 L180 220 L116 322" stroke="rgba(255,255,255,0.18)" strokeWidth="2" fill="none" />
              <path d="M252 70 L180 220 L244 322" stroke="rgba(255,255,255,0.18)" strokeWidth="2" fill="none" />
              <ellipse cx="152" cy="120" rx="34" ry="80" fill="rgba(255,255,255,0.14)" transform="rotate(24 152 120)" />
            </svg>
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute left-[8%] top-[20%] hidden h-20 w-20 rounded-full border border-zinc-400/55 dark:border-zinc-600/55 md:block md:h-24 md:w-24"
          >
            <div className="absolute inset-[18%] rounded-full border border-dashed border-blue-500/50" />
            <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-zinc-500" />
            <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-zinc-500" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[16%] right-[6%] hidden h-24 w-24 rounded-full border border-zinc-400/55 dark:border-zinc-600/55 md:block md:h-32 md:w-32"
          >
            <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-violet-500/45" />
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-zinc-500" />
            <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-zinc-500" />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[15%] top-[56%] h-px w-16 bg-gradient-to-r from-transparent via-blue-500/80 to-transparent md:left-[20%] md:h-2 md:w-24"
          />
          <motion.div
            animate={{ opacity: [0.25, 0.75, 0.25] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute right-[12%] top-[30%] hidden h-px w-24 bg-gradient-to-r from-transparent via-violet-500/80 to-transparent md:block md:w-28"
          />

          <div className="absolute left-[50%] top-[12%] -translate-x-1/2 rounded-full border border-zinc-300/80 bg-white/70 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400 md:left-[44%] md:top-[8%] md:text-[10px]">
            design
          </div>
          <div className="absolute bottom-[18%] left-[5%] rounded-full border border-zinc-300/80 bg-white/70 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400 md:bottom-[20%] md:left-[10%] md:text-[10px]">
            systems
          </div>
          <div className="absolute right-[6%] top-[28%] rounded-full border border-zinc-300/80 bg-white/70 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400 md:right-[18%] md:top-[18%] md:text-[10px]">
            operator
          </div>
        </motion.div>
      </div>
    </section>
  );
}

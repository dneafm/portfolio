import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const TAGS = ["Crypto", "Systems", "Operator", "AI", "Design"];

export function Hero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.10),transparent_24%),radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="absolute inset-x-0 top-28 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/80" />
        <div className="absolute inset-x-0 bottom-28 h-px bg-gradient-to-r from-transparent via-zinc-300/80 to-transparent dark:via-zinc-700/80" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white/70 px-4 py-2 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.32em] text-zinc-500 dark:text-zinc-400">
              Hoang Pham_Portfolio
            </span>
          </div>

          <div className="space-y-5">
            <h1 className="text-5xl font-black leading-[0.88] tracking-tighter text-zinc-950 dark:text-zinc-50 md:text-7xl xl:text-[6.2rem]">
              Design,
              <br />
              <span className="text-blue-600 dark:text-blue-400">systems,</span>
              <br />
              and a little mythology.
            </h1>

            <p className="max-w-xl text-lg font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-xl">
              Crypto-born visual thinking, now turning into workflows, operator tools, and sharper systems.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Link
              to="/casefiles"
              className="group inline-flex items-center justify-center gap-3 bg-zinc-950 px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-white transition-all hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-blue-500"
            >
              View Casefiles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/operator-lab"
              className="inline-flex items-center justify-center gap-3 border border-zinc-300 px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-zinc-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
              Open Operator Lab
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 bg-white/60 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-500"
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
          className="relative mx-auto flex h-[32rem] w-full max-w-[38rem] items-center justify-center lg:h-[42rem]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            className="absolute h-[25rem] w-[25rem] rounded-full border border-zinc-300/70 dark:border-zinc-700/60"
          >
            <div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-blue-500/70" />
            <div className="absolute bottom-0 left-1/2 h-5 w-px -translate-x-1/2 bg-violet-500/60" />
            <div className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-blue-500/50" />
            <div className="absolute right-0 top-1/2 h-px w-5 -translate-y-1/2 bg-violet-500/50" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute h-[18rem] w-[18rem] rounded-full border-2 border-dashed border-zinc-400/60 dark:border-zinc-600/60"
          />

          <motion.div
            animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="absolute inset-0 scale-[1.35] rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/25" />
            <svg viewBox="0 0 320 360" className="relative h-[18rem] w-[16rem] drop-shadow-[0_0_40px_rgba(59,130,246,0.28)] md:h-[22rem] md:w-[20rem]">
              <defs>
                <linearGradient id="gemCore" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dbeafe" />
                  <stop offset="28%" stopColor="#60a5fa" />
                  <stop offset="62%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="facetLine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                  <stop offset="100%" stopColor="rgba(191,219,254,0.18)" />
                </linearGradient>
              </defs>
              <path
                d="M160 24 L246 88 L224 258 L160 334 L96 258 L74 88 Z"
                fill="url(#gemCore)"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="3"
              />
              <path d="M160 24 L160 334" stroke="url(#facetLine)" strokeWidth="2" />
              <path d="M74 88 L246 88" stroke="url(#facetLine)" strokeWidth="2" />
              <path d="M74 88 L160 170 L246 88" stroke="url(#facetLine)" strokeWidth="2" fill="none" />
              <path d="M96 258 L160 170 L224 258" stroke="url(#facetLine)" strokeWidth="2" fill="none" />
              <path d="M96 258 L160 334 L224 258" stroke="url(#facetLine)" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute left-[8%] top-[16%] h-24 w-24 rounded-full border border-zinc-400/60 dark:border-zinc-600/60"
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
            className="absolute bottom-[14%] right-[6%] h-32 w-32 rounded-full border border-zinc-400/60 dark:border-zinc-600/60"
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
            className="absolute left-[20%] top-[55%] h-2 w-24 bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"
          />
          <motion.div
            animate={{ opacity: [0.25, 0.75, 0.25] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute right-[16%] top-[28%] h-px w-28 bg-gradient-to-r from-transparent via-violet-500/80 to-transparent"
          />

          <div className="absolute right-[18%] top-[18%] rounded-full border border-zinc-300/80 bg-white/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
            operator
          </div>
          <div className="absolute bottom-[20%] left-[10%] rounded-full border border-zinc-300/80 bg-white/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
            systems
          </div>
          <div className="absolute left-[44%] top-[8%] rounded-full border border-zinc-300/80 bg-white/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
            design
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
          className="relative mx-auto -mt-1 flex h-[21rem] w-full max-w-[24rem] items-center justify-center md:mt-0 md:h-[32rem] md:max-w-[38rem] lg:h-[42rem]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            className="absolute h-[15rem] w-[15rem] rounded-full border border-zinc-300/45 dark:border-zinc-700/50 md:h-[25rem] md:w-[25rem]"
          >
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-blue-500/70 md:h-5" />
            <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-violet-500/55 md:h-5" />
            <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-blue-500/45 md:w-5" />
            <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-violet-500/45 md:w-5" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute h-[10.25rem] w-[10.25rem] rounded-full border border-dashed border-zinc-400/35 dark:border-zinc-600/40 md:h-[18rem] md:w-[18rem] md:border-2"
          />

          <div className="absolute bottom-[20%] h-14 w-[8.5rem] rounded-[999px] bg-blue-500/18 blur-2xl md:bottom-[18%] md:h-20 md:w-[12rem]" />
          <div className="absolute bottom-[16%] h-8 w-[6.5rem] rounded-[999px] bg-white/10 blur-xl md:h-12 md:w-[9rem]" />

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="absolute inset-0 scale-[1.55] rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/24" />
            <svg viewBox="0 0 360 460" className="relative h-[15rem] w-[11.5rem] drop-shadow-[0_0_70px_rgba(59,130,246,0.28)] md:h-[25rem] md:w-[19rem]">
              <defs>
                <linearGradient id="crystalOuter" x1="18%" y1="0%" x2="82%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="14%" stopColor="#dbeafe" stopOpacity="0.92" />
                  <stop offset="42%" stopColor="#60a5fa" stopOpacity="0.98" />
                  <stop offset="72%" stopColor="#2563eb" stopOpacity="0.96" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.88" />
                </linearGradient>
                <linearGradient id="crystalRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.26)" />
                  <stop offset="100%" stopColor="rgba(30,41,59,0.46)" />
                </linearGradient>
                <linearGradient id="crystalLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.72)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
                </linearGradient>
                <linearGradient id="crystalCore" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                  <stop offset="45%" stopColor="rgba(147,197,253,0.18)" />
                  <stop offset="100%" stopColor="rgba(124,58,237,0.18)" />
                </linearGradient>
                <linearGradient id="reflectionFade" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(191,219,254,0.25)" />
                  <stop offset="100%" stopColor="rgba(191,219,254,0)" />
                </linearGradient>
                <filter id="softBlur">
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>

              <path
                d="M180 24 L254 82 L282 176 L246 338 L180 426 L114 338 L78 176 L106 82 Z"
                fill="url(#crystalOuter)"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="4"
              />
              <path d="M180 24 L106 82 L78 176 L180 136 Z" fill="rgba(255,255,255,0.4)" />
              <path d="M180 24 L254 82 L282 176 L180 136 Z" fill="rgba(255,255,255,0.18)" />
              <path d="M78 176 L180 136 L180 426 L114 338 Z" fill="url(#crystalLeft)" opacity="0.7" />
              <path d="M282 176 L180 136 L180 426 L246 338 Z" fill="url(#crystalRight)" opacity="0.95" />
              <path d="M128 104 L180 136 L234 104" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" fill="none" />
              <path d="M94 204 L180 136 L266 204" stroke="rgba(255,255,255,0.38)" strokeWidth="2.5" fill="none" />
              <path d="M114 338 L180 248 L246 338" stroke="rgba(255,255,255,0.28)" strokeWidth="2.5" fill="none" />
              <path d="M180 24 L180 426" stroke="rgba(255,255,255,0.34)" strokeWidth="2" />
              <path d="M106 82 L180 248 L114 338" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
              <path d="M254 82 L180 248 L246 338" stroke="rgba(255,255,255,0.16)" strokeWidth="2" fill="none" />
              <path d="M146 76 C156 58, 176 48, 198 52" stroke="rgba(255,255,255,0.72)" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M128 116 C146 90, 180 84, 214 92" stroke="rgba(255,255,255,0.28)" strokeWidth="10" strokeLinecap="round" fill="none" filter="url(#softBlur)" />
              <ellipse cx="150" cy="132" rx="30" ry="92" fill="rgba(255,255,255,0.16)" transform="rotate(20 150 132)" />
              <ellipse cx="205" cy="188" rx="22" ry="72" fill="rgba(255,255,255,0.08)" transform="rotate(14 205 188)" />
              <path d="M168 136 L180 116 L192 136 L180 200 Z" fill="url(#crystalCore)" opacity="0.8" />
              <path d="M122 352 C142 338, 158 334, 180 334 C202 334, 218 338, 238 352" stroke="rgba(255,255,255,0.16)" strokeWidth="3" fill="none" />

              <g transform="translate(0, 452) scale(1, -0.42) translate(0, -452)" opacity="0.26">
                <path
                  d="M180 24 L254 82 L282 176 L246 338 L180 426 L114 338 L78 176 L106 82 Z"
                  fill="url(#reflectionFade)"
                />
                <path d="M180 24 L180 426" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              </g>
            </svg>
          </motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute left-[8%] top-[20%] hidden h-20 w-20 rounded-full border border-zinc-400/50 dark:border-zinc-600/50 md:block md:h-24 md:w-24"
          >
            <div className="absolute inset-[18%] rounded-full border border-dashed border-blue-500/45" />
            <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-zinc-500" />
            <div className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-zinc-500" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[17%] right-[6%] hidden h-24 w-24 rounded-full border border-zinc-400/50 dark:border-zinc-600/50 md:block md:h-32 md:w-32"
          >
            <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-violet-500/40" />
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-zinc-500" />
            <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-zinc-500" />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[15%] top-[56%] h-px w-16 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent md:left-[20%] md:h-2 md:w-24"
          />
          <motion.div
            animate={{ opacity: [0.22, 0.7, 0.22] }}
            transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute right-[12%] top-[30%] hidden h-px w-24 bg-gradient-to-r from-transparent via-violet-500/70 to-transparent md:block md:w-28"
          />

          <div className="absolute left-[50%] top-[11%] -translate-x-1/2 rounded-full border border-zinc-300/70 bg-white/65 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/45 dark:text-zinc-400 md:left-[44%] md:top-[8%] md:text-[10px]">
            design
          </div>
          <div className="absolute bottom-[18%] left-[5%] rounded-full border border-zinc-300/70 bg-white/65 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/45 dark:text-zinc-400 md:bottom-[20%] md:left-[10%] md:text-[10px]">
            systems
          </div>
          <div className="absolute right-[6%] top-[28%] rounded-full border border-zinc-300/70 bg-white/65 px-3 py-2 text-[9px] font-black uppercase tracking-[0.24em] text-zinc-500 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/45 dark:text-zinc-400 md:right-[18%] md:top-[18%] md:text-[10px]">
            operator
          </div>
        </motion.div>
      </div>
    </section>
  );
}

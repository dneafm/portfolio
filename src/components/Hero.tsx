import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const TAGS = ["Crypto-native", "Systems thinking", "Workflows", "Operator tools", "AI leverage"];

export function Hero() {
  return (
    <section className="relative min-h-[78vh] flex items-center py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
        <div className="absolute inset-x-0 bottom-24 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.05] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Hoang Pham · Design to systems
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.9]">
              I started in design.
              <br />
              <span className="text-blue-600 dark:text-blue-400">Now I’m moving toward systems.</span>
            </h1>

            <p className="max-w-3xl text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              After years working in crypto, I care more about workflows, operator tools, and clear structure than polished screens alone.
            </p>

            <p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-500 leading-relaxed">
              This portfolio is the transition, from graphic designer to someone building with systems thinking, research, and AI leverage.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
            <Link
              to="/casefiles"
              className="group inline-flex items-center justify-center gap-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-4 text-xs font-black uppercase tracking-[0.28em] hover:bg-blue-600 dark:hover:bg-blue-500 transition-all"
            >
              View Casefiles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/cv"
              className="inline-flex items-center justify-center gap-3 border border-zinc-300 dark:border-zinc-700 px-8 py-4 text-xs font-black uppercase tracking-[0.28em] text-zinc-700 dark:text-zinc-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              Open CV
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-500 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full bg-white/60 dark:bg-zinc-900/30"
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

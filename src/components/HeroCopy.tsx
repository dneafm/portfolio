import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function HeroCopy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-3xl space-y-3 pt-2 md:space-y-8 md:pt-8 lg:pt-10"
    >
      <div className="inline-flex items-center gap-3 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1.5 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/40 md:px-4 md:py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
        <span className="text-[10px] font-black uppercase tracking-[0.32em] text-zinc-500 dark:text-zinc-400">
          Hoang Pham_Portfolio
        </span>
      </div>

      <div className="space-y-3 md:space-y-5">
        <h1 className="max-w-[8.2ch] text-[2.5rem] font-black leading-[0.84] tracking-[-0.04em] text-zinc-950 dark:text-zinc-50 sm:text-6xl md:max-w-none md:text-7xl md:tracking-tighter xl:text-[6.2rem]">
          Design systems,
          <br />
          <span className="text-blue-600 dark:text-blue-400">creative ops,</span>
          <br />
          and internal tools.
        </h1>

        <p className="max-w-[19.5rem] text-[0.92rem] font-medium leading-[1.55] text-zinc-600 dark:text-zinc-400 md:max-w-xl md:text-xl md:leading-relaxed">
          Built in crypto design, now shifting toward workflows, internal tools, and clearer ways for teams to move faster with less noise.
        </p>
      </div>

      <div className="flex flex-col gap-2.5 pt-2 sm:flex-row sm:items-center md:gap-4 md:pt-2">
        <Link
          to="/casefiles"
          className="group inline-flex w-full items-center justify-center gap-3 bg-zinc-950 px-6 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-white transition-all hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-blue-500 sm:w-auto md:px-8 md:py-4 md:text-xs md:tracking-[0.28em]"
        >
          View Casefiles
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          to="/operator-lab"
          className="inline-flex w-full items-center justify-center gap-3 border border-zinc-300 px-6 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-zinc-700 transition-all hover:border-blue-600 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-blue-400 dark:hover:text-blue-400 sm:w-auto md:px-8 md:py-4 md:text-xs md:tracking-[0.28em]"
        >
          View Operator Lab
        </Link>
      </div>
    </motion.div>
  );
}

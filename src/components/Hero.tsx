import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const HeroCrystalScene = lazy(() => import("./HeroCrystalScene"));

const TAGS = ["Crypto", "Systems", "Operator", "AI", "Design"];

const ORBIT_CARDS = [
  { label: "Crypto", orbit: "outer" as const, size: "sm" as const, start: 18, duration: 40, direction: 1 as const },
  { label: "Systems", orbit: "outer" as const, size: "md" as const, start: 118, duration: 40, direction: 1 as const },
  { label: "Operator", orbit: "outer" as const, size: "md" as const, start: 218, duration: 40, direction: 1 as const },
  { label: "AI", orbit: "inner" as const, size: "sm" as const, start: 74, duration: 28, direction: -1 as const },
  { label: "Design", orbit: "inner" as const, size: "md" as const, start: 228, duration: 28, direction: -1 as const },
];

function OrbitLabelCard({
  label,
  orbit,
  size,
  start,
  duration,
  direction,
}: {
  label: string;
  orbit: "outer" | "inner";
  size: "sm" | "md";
  start: number;
  duration: number;
  direction: 1 | -1;
}) {
  const orbitClass =
    orbit === "outer"
      ? "h-[15rem] w-[15rem] md:h-[26rem] md:w-[26rem]"
      : "h-[10rem] w-[10rem] md:h-[18rem] md:w-[18rem]";
  const radiusClass = orbit === "outer" ? "-translate-y-[7.9rem] md:-translate-y-[13.8rem]" : "-translate-y-[5.4rem] md:-translate-y-[9.5rem]";
  const cardClass =
    size === "md"
      ? "min-w-[8.8rem] px-3.5 py-2.5 text-[10px] tracking-[0.22em] md:min-w-[10.5rem] md:px-4 md:py-3 md:text-[11px]"
      : "min-w-[6.2rem] px-3 py-2.5 text-[10px] tracking-[0.22em] md:min-w-[7rem] md:px-3.5 md:py-3 md:text-[11px]";
  const end = start + direction * 360;

  return (
    <motion.div
      animate={{ rotate: end }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      style={{ rotate: `${start}deg` }}
      className={`pointer-events-none absolute left-1/2 top-1/2 z-20 ${orbitClass} -translate-x-1/2 -translate-y-1/2`}
    >
      <div className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 ${radiusClass} items-center justify-center`}>
        <motion.div
          animate={{ rotate: -end }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          style={{ rotate: `${-start}deg` }}
          className={`rounded-[1.25rem] border border-zinc-300/70 bg-white/72 text-center font-black uppercase text-zinc-600 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/52 dark:text-zinc-300 ${cardClass}`}
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-visible py-16 md:min-h-[88vh] md:py-28">
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
          className="relative mx-auto -mt-1 flex h-[28rem] w-full max-w-[34rem] items-center justify-center overflow-visible px-8 md:mt-0 md:h-[46rem] md:max-w-[54rem] md:px-12 lg:h-[58rem] lg:max-w-[62rem] lg:px-16"
        >
          <div className="absolute inset-x-[10%] bottom-[10%] h-[30%] rounded-full bg-blue-200/8 blur-3xl dark:bg-blue-500/8" />
          <div className="absolute left-1/2 top-[6%] h-[24%] w-[34%] -translate-x-1/2 rounded-full bg-white/8 blur-3xl dark:bg-white/4" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            className="absolute h-[15rem] w-[15rem] rounded-full border border-zinc-300/16 dark:border-zinc-700/20 md:h-[26rem] md:w-[26rem]"
          >
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-blue-500/70 md:h-5" />
            <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-violet-500/55 md:h-5" />
            <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-blue-500/45 md:w-5" />
            <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-violet-500/45 md:w-5" />
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute h-[10rem] w-[10rem] rounded-full border border-dashed border-zinc-400/14 dark:border-zinc-600/18 md:h-[18rem] md:w-[18rem] md:border-2"
          />

          <Suspense
            fallback={
              <div className="absolute inset-0 z-10">
                <div className="absolute inset-x-[24%] bottom-[18%] h-20 rounded-full bg-blue-500/20 blur-3xl md:inset-x-[22%] md:bottom-[16%] md:h-28" />
                <div className="absolute left-1/2 top-1/2 h-[15rem] w-[11rem] -translate-x-1/2 -translate-y-[56%] rounded-[45%] border border-white/25 bg-gradient-to-b from-white/30 via-blue-400/35 to-violet-500/25 shadow-[0_0_80px_rgba(59,130,246,0.28)] backdrop-blur-sm md:h-[24rem] md:w-[17rem]" />
              </div>
            }
          >
            <HeroCrystalScene />
          </Suspense>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute left-[10%] top-[20%] hidden h-16 w-16 rounded-full border border-zinc-400/28 bg-white/6 dark:border-zinc-600/28 dark:bg-white/3 md:block md:h-20 md:w-20"
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
            className="absolute bottom-[19%] right-[10%] hidden h-20 w-20 rounded-full border border-zinc-400/28 bg-white/6 dark:border-zinc-600/28 dark:bg-white/3 md:block md:h-24 md:w-24"
          >
            <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-violet-500/40" />
            <div className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-zinc-500" />
            <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-zinc-500" />
            <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-zinc-500" />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.18, 0.48, 0.18] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[15%] top-[56%] h-px w-16 bg-gradient-to-r from-transparent via-blue-300/70 to-transparent md:left-[20%] md:w-24"
          />
          <motion.div
            animate={{ opacity: [0.16, 0.42, 0.16] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute right-[12%] top-[30%] hidden h-px w-24 bg-gradient-to-r from-transparent via-violet-300/70 to-transparent md:block md:w-28"
          />

          {ORBIT_CARDS.map((card) => (
            <OrbitLabelCard key={card.label} {...card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

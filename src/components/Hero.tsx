import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const HeroCrystalScene = lazy(() => import("./HeroCrystalScene"));

const TAGS = ["Crypto", "Systems", "Operator", "AI", "Design"];

export function Hero() {
  return (
    <section className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen overflow-visible py-16 md:min-h-[100svh] md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,107,255,0.14),transparent_34%),radial-gradient(circle_at_78%_34%,rgba(153,102,204,0.15),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.97),rgba(244,244,245,0.92))] dark:bg-[radial-gradient(circle_at_top,rgba(46,107,255,0.2),transparent_34%),radial-gradient(circle_at_78%_34%,rgba(153,102,204,0.16),transparent_32%),linear-gradient(180deg,rgba(9,9,11,0.95),rgba(3,7,18,0.98))]" />
        <div className="absolute inset-0 w-screen opacity-[0.08] mix-blend-soft-light dark:opacity-[0.12] bg-[linear-gradient(to_right,rgba(24,24,27,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.45)_1px,transparent_1px)] bg-[size:84px_84px]" />
      </div>

      <div className="absolute left-1/2 top-[9%] -z-[1] h-[74vh] w-[74vh] min-h-[420px] min-w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,102,255,0.14),transparent_58%)] blur-3xl" />
      <div className="absolute left-1/2 top-[8%] -z-[1] h-[72vh] w-[72vh] min-h-[420px] min-w-[420px] -translate-x-1/2 opacity-30 blur-[52px] [clip-path:polygon(50%_0%,88%_18%,95%_46%,71%_80%,50%_100%,27%_82%,7%_58%,12%_18%)] bg-[linear-gradient(180deg,rgba(33,97,235,0.9),rgba(153,102,204,0.8))]" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1440px] items-start gap-8 px-6 md:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
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
          className="relative mx-auto -mt-1 flex h-[28rem] w-full min-w-0 max-w-[38rem] items-center justify-center overflow-visible px-0 md:mt-0 md:h-[40rem] md:max-w-[42rem] lg:h-[48rem] lg:max-w-[46rem]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(82,94,152,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(82,94,152,0.08)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)] mix-blend-soft-light opacity-70" />
          <div className="absolute inset-x-[5%] bottom-[8%] h-[34%] rounded-full bg-blue-300/12 blur-3xl dark:bg-blue-500/14" />
          <div className="absolute left-1/2 top-[10%] h-[24%] w-[34%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl dark:bg-white/6" />
          <div className="absolute right-[10%] top-[16%] h-[50%] w-[40%] rounded-full bg-violet-500/14 blur-[120px] dark:bg-violet-500/18" />

          <Suspense
            fallback={
              <div className="absolute inset-0 z-10">
                <div className="absolute inset-x-[20%] bottom-[14%] h-24 rounded-full bg-blue-500/20 blur-3xl md:h-32" />
                <div className="absolute left-1/2 top-1/2 h-[17rem] w-[12rem] -translate-x-1/2 -translate-y-[54%] rounded-[45%] border border-white/20 bg-gradient-to-b from-white/30 via-blue-400/35 to-violet-500/25 shadow-[0_0_90px_rgba(59,130,246,0.3)] backdrop-blur-sm md:h-[26rem] md:w-[18rem]" />
              </div>
            }
          >
            <HeroCrystalScene />
          </Suspense>

          <motion.div
            animate={{ opacity: [0.18, 0.44, 0.18] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[8%] top-[58%] h-px w-24 bg-gradient-to-r from-transparent via-blue-300/70 to-transparent md:w-36"
          />
          <motion.div
            animate={{ opacity: [0.16, 0.36, 0.16] }}
            transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute right-[8%] top-[26%] hidden h-px w-28 bg-gradient-to-r from-transparent via-violet-300/70 to-transparent md:block md:w-40"
          />
        </motion.div>
      </div>
    </section>
  );
}

import { lazy, Suspense } from "react";
import { motion } from "motion/react";

const HeroCrystalScene = lazy(() => import("./HeroCrystalScene"));

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.08 }}
      className="relative mx-auto mt-2 flex h-[25rem] w-[122%] min-w-0 max-w-none -translate-x-[6%] items-center justify-center overflow-visible px-0 sm:h-[27rem] sm:w-[124%] sm:-translate-x-[6%] md:mt-0 md:h-[44rem] md:w-full md:max-w-[44rem] md:translate-x-0 lg:h-[52rem] lg:max-w-[62rem] lg:overflow-visible"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(82,94,152,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(82,94,152,0.08)_1px,transparent_1px)] bg-[size:88px_88px] opacity-60 mix-blend-soft-light [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] md:bg-[size:118px_118px] md:opacity-70" />
      <div className="absolute left-1/2 top-[31%] h-[16%] w-[30%] -translate-x-1/2 rounded-full bg-white/10 blur-3xl dark:bg-white/6 md:top-[28%] md:h-[20%] md:w-[30%]" />
      <div className="absolute right-[12%] top-[31%] h-[24%] w-[18%] rounded-full bg-violet-500/10 blur-[36px] dark:bg-violet-500/14 md:right-[10%] md:top-[26%] md:h-[40%] md:w-[26%] md:blur-[84px] lg:right-[12%] lg:top-[28%] lg:h-[44%] lg:w-[34%] lg:blur-[110px]" />

      <Suspense
        fallback={
          <div className="absolute inset-0 z-10">
            <div className="absolute left-1/2 top-[56%] h-[14rem] w-[10rem] -translate-x-1/2 -translate-y-1/2 rounded-[45%] border border-white/20 bg-gradient-to-b from-white/30 via-blue-400/35 to-violet-500/25 shadow-[0_0_72px_rgba(59,130,246,0.24)] backdrop-blur-sm sm:h-[15.5rem] sm:w-[11rem] md:top-[50%] md:h-[34rem] md:w-[24rem] lg:h-[52rem] lg:w-[36rem]" />
          </div>
        }
      >
        <HeroCrystalScene />
      </Suspense>

      <motion.div
        animate={{ opacity: [0.18, 0.44, 0.18] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[14%] top-[66%] hidden h-px w-24 bg-gradient-to-r from-transparent via-blue-300/70 to-transparent sm:block md:left-[8%] md:top-[58%] md:w-48 lg:w-72"
      />
      <motion.div
        animate={{ opacity: [0.16, 0.36, 0.16] }}
        transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-[8%] top-[28%] hidden h-px w-36 bg-gradient-to-r from-transparent via-violet-300/70 to-transparent md:block md:w-56 lg:w-80"
      />
    </motion.div>
  );
}

import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Workflow, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { Hero } from "../components/Hero";

const journeyChapters = [
  {
    eyebrow: "Background",
    title: "Started in crypto design.",
    aside: "Design under pressure.",
    icon: Sparkles,
    accent: "from-blue-500/20 to-cyan-400/10",
  },
  {
    eyebrow: "Shift",
    title: "Moved toward workflow and ops.",
    aside: "Systems over assets.",
    icon: Workflow,
    accent: "from-violet-500/20 to-fuchsia-400/10",
  },
  {
    eyebrow: "Focus",
    title: "Now building internal tools.",
    aside: "Less noise. Better flow.",
    icon: Wrench,
    accent: "from-emerald-500/20 to-teal-400/10",
  },
];

const proofCards = [
  {
    label: "Casefile",
    title: "DJ Trade",
    description: "An operator-facing trading surface focused on monitoring, review, and decision clarity under uncertainty.",
    to: "/casefiles/dj-trade",
  },
  {
    label: "Casefile",
    title: "Kyber Network",
    description: "Designing for DeFi pressure taught me how to communicate clearly in unstable environments.",
    to: "/casefiles/kyber-network",
  },
  {
    label: "Casefile",
    title: "Factor",
    description: "A move from isolated execution toward reusable systems, structure, and operating rhythm.",
    to: "/casefiles/factor",
  },
  {
    label: "Operator Lab",
    title: "Operator tools in progress",
    description: "Private-facing workflow experiments, research surfaces, and internal-product thinking aimed at real operator pain.",
    to: "/operator-lab",
  },
];

export function Home() {
  return (
    <div className="space-y-24 md:space-y-32">
      <Hero />

      <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-zinc-50/80 px-6 py-8 shadow-[0_24px_90px_rgba(15,23,42,0.05)] backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/45 md:px-10 md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_32%)]" />
        <div className="relative space-y-8 md:space-y-10">
          <div className="max-w-3xl space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-600 dark:text-blue-400">Overview</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl">
              From crypto design to workflow, tooling, and execution support.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {journeyChapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return (
                <motion.article
                  key={chapter.eyebrow}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-zinc-200/70 bg-zinc-100/70 p-5 dark:border-zinc-800 dark:bg-zinc-950/35 md:p-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${chapter.accent} opacity-70 dark:opacity-80`} />
                  <div className="absolute right-4 top-4 text-zinc-950/8 dark:text-white/10">
                    <Icon className="h-14 w-14" strokeWidth={1.2} />
                  </div>
                  <div className="relative space-y-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">{chapter.eyebrow}</p>
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300/80 bg-zinc-100/80 text-[11px] font-black text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200">
                        0{index + 1}
                      </div>
                    </div>
                    <h3 className="max-w-[14rem] text-2xl font-black leading-tight tracking-tight text-zinc-950 dark:text-zinc-50">
                      {chapter.title}
                    </h3>
                    <p className="text-sm font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300">{chapter.aside}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-10 md:space-y-14">
        <div className="flex items-end justify-between gap-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Proof</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl">Then show the work.</h2>
          </div>
          <Link to="/casefiles" className="hidden items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 md:inline-flex">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {proofCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={card.to}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-zinc-200/60 bg-zinc-100/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_24px_90px_rgba(59,130,246,0.06)] dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,244,245,0.72),rgba(244,244,245,0.9))] dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.66),rgba(24,24,27,0.86))]" />
                <div className="relative space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">{card.label}</p>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{card.description}</p>
                </div>
                <div className="relative mt-8 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-zinc-500 transition-colors group-hover:text-blue-600 dark:text-zinc-400 dark:group-hover:text-blue-400">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="rounded-[2rem] border border-zinc-200/70 bg-zinc-100/80 px-6 py-10 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/45 dark:text-zinc-50 md:px-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Next chapter</p>
            <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
              I’m interested in work where design, workflow thinking, and execution support meet.
            </h2>
          </div>
          <div className="space-y-5 md:pl-8">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              If you’re dealing with messy workflows, repeatable creative production, or high-context execution problems, I’m open to talking.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/operator-lab"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white transition-colors hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-blue-400"
              >
                View Operator Lab
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-zinc-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

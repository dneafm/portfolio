import { Link } from "react-router-dom";
import { ArrowRight, Building2, LayoutPanelTop, PanelsTopLeft, Settings2, Workflow } from "lucide-react";
import { motion } from "motion/react";
import { experiments } from "../data";

const offerStack = [
  {
    title: "Internal tools",
    description: "Designed to make day-to-day execution clearer, faster, and easier to run.",
    icon: Settings2,
  },
  {
    title: "Dashboards",
    description: "Decision surfaces that show status, bottlenecks, and what matters now without extra noise.",
    icon: LayoutPanelTop,
  },
  {
    title: "Automation",
    description: "Lightweight workflow systems that reduce manual follow-up, fragmented context, and repeated busywork.",
    icon: PanelsTopLeft,
  },
];

const nicheCards = [
  {
    title: "Property / rental operators",
    description: "Inquiry flow, unit status, maintenance tracking, and owner visibility in one cleaner operating system.",
  },
  {
    title: "Agencies",
    description: "Lead tracking, onboarding, approvals, review queues, and reporting without everything living in chat.",
  },
  {
    title: "Hospitality operators",
    description: "Booking operations, request handling, team coordination, and visibility across the guest workflow.",
  },
];

const processSteps = [
  "Audit one messy workflow first",
  "Map the current state and bottleneck",
  "Build the smallest useful internal system",
  "Prove time saved or visibility gained",
  "Expand into dashboards, workflow layers, and automation",
];

const productProof = experiments.filter((item) => item.id === "agent-board" || item.id === "dj-trade");

export function ProductFocus() {
  return (
    <div className="space-y-24 md:space-y-32">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200/70 bg-zinc-50/85 px-6 py-10 shadow-[0_24px_90px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/45 md:px-10 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_36%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_36%)]" />
        <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-blue-600 dark:text-blue-400">Design-focused version</p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 md:text-6xl">
                Graphic designer building systems for dashboards, workflows, and automation.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-lg">
                I start from graphic craft — layout, hierarchy, clarity — then extend into systems, interfaces, and tools that help teams operate more clearly.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white transition-colors hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-blue-400"
              >
                Discuss a workflow
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/operator-lab"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-zinc-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                View my work
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/55">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">Offer structure</p>
              <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300">
                <p>Design layer, internal tools and admin systems that make execution usable.</p>
                <p>Workflow layer, clearer processes that replace scattered manual work.</p>
                <p>Control layer, dashboards and automation that show what matters and keep things moving.</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-950/55">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">Best-fit clients</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {nicheCards.map((niche) => (
                  <span
                    key={niche.title}
                    className="inline-flex items-center rounded-full border border-zinc-200/80 bg-zinc-100/80 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"
                  >
                    {niche.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">What I do</p>
          <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl">
            Design work for teams stuck in messy operations, scattered tools, and manual processes.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {offerStack.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.75rem] border border-zinc-200/70 bg-zinc-100/70 p-6 dark:border-zinc-800 dark:bg-zinc-900/35"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white/80 text-blue-600 dark:border-zinc-800 dark:bg-zinc-950/65 dark:text-blue-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {nicheCards.map((niche, index) => (
          <motion.article
            key={niche.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.75rem] border border-zinc-200/70 bg-white/80 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-100/80 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/65 dark:text-zinc-300">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">Best-fit niche</p>
              <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">{niche.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{niche.description}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="space-y-10 md:space-y-14">
        <div className="flex items-end justify-between gap-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">Proof</p>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl">Product proof that already points in this systems-and-ops direction.</h2>
          </div>
          <Link to="/operator-lab" className="hidden items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 md:inline-flex">
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {productProof.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/operator-lab/${card.id}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-zinc-200/60 bg-zinc-100/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-[0_24px_90px_rgba(59,130,246,0.06)] dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <div className="relative space-y-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400">{card.status}</p>
                  <h3 className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{card.description}</p>
                </div>
                <div className="relative mt-8 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.24em] text-zinc-500 transition-colors group-hover:text-blue-600 dark:text-zinc-400 dark:group-hover:text-blue-400">
                  Open case
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-zinc-200/70 bg-zinc-100/80 px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900/45 md:grid-cols-[0.95fr_1.05fr] md:px-10 md:py-12">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Delivery model</p>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-zinc-950 dark:text-zinc-50 md:text-4xl">
            Start with one painful workflow, turn it into a reliable system, then expand only after the proof is real.
          </h2>
        </div>
        <div className="space-y-4">
          {processSteps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-[1.25rem] border border-zinc-200/70 bg-white/80 px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950/55">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-[11px] font-black text-white dark:bg-zinc-100 dark:text-zinc-950">
                0{index + 1}
              </div>
              <p className="pt-1 text-sm font-semibold leading-relaxed text-zinc-700 dark:text-zinc-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-zinc-200/70 bg-zinc-100/80 px-6 py-10 text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900/45 dark:text-zinc-50 md:px-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Use this version</p>
            <h2 className="max-w-2xl text-3xl font-black leading-tight tracking-tight md:text-5xl">
              If the goal is product work, this is the sharper story.
            </h2>
          </div>
          <div className="space-y-5 md:pl-8">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              It frames the portfolio around product, systems, ops, growth, and automation instead of a broad creative background.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white transition-colors hover:bg-blue-600 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-blue-400"
              >
                Contact
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/main-portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300/80 px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-zinc-700 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                Back to main portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

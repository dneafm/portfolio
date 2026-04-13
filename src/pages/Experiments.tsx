import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { experiments, type Experiment } from "../data";

function OperatorLabVisual({ exp }: { exp: Experiment }) {
  const shell = "relative h-full w-full overflow-hidden rounded-[18px] border border-white/6 bg-[#0a0c10]";
  const grid = "absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-20";

  if (exp.visual === "signal-triage") {
    const rows = [
      ["ETH", "WHALE_ACCUM", "94%", "REVIEW"],
      ["SOL", "DEV_ACTIVITY", "88%", "LOG"],
      ["ARB", "SOCIAL_SPIKE", "72%", "IGNORE"],
      ["OP", "UNUSUAL_VOL", "45%", "LOG"]
    ];
    return (
      <div className={shell}>
        <div className={grid} />
        <div className="relative h-full p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.28em] text-zinc-500">
            <span className="text-blue-300">Signal_Triage_Matrix</span>
            <span>Live feed</span>
          </div>
          <div className="space-y-2.5">
            {rows.map((row) => (
              <div key={row[0]} className="grid grid-cols-[30px_1fr_34px_40px] items-center gap-2 font-mono text-[8px] text-zinc-400">
                <span>{row[0]}</span>
                <span className="rounded bg-white/5 px-2 py-1 text-[7px] tracking-[0.22em] text-[#9fd5ff]">{row[1]}</span>
                <span className="text-zinc-500">{row[2]}</span>
                <span className="rounded border border-white/8 px-1.5 py-1 text-center text-zinc-300">{row[3]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (exp.visual === "bot-control") {
    return (
      <div className={shell}>
        <div className={grid} />
        <div className="absolute inset-x-5 top-5 h-16 rounded-2xl border border-blue-400/20 bg-[linear-gradient(135deg,rgba(96,165,250,0.14),rgba(37,99,235,0.03))]" />
        <div className="absolute inset-x-[22%] top-5 h-16 skew-x-[-24deg] border-x border-white/5 bg-white/5" />
        <div className="absolute right-5 top-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-600/10">
          <div className="space-y-1 text-center font-mono text-[7px] uppercase tracking-[0.24em] text-red-300">
            <div>risk</div>
            <div>halt all</div>
          </div>
        </div>
        <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-3">
          {[
            ["latency", "12ms"],
            ["slippage", "0.4%"],
            ["pnl day", "+3.9%"]
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-white/6 bg-black/30 p-3">
              <div className="font-mono text-[7px] uppercase tracking-[0.22em] text-zinc-500">{k}</div>
              <div className="mt-2 font-mono text-sm text-blue-200">{v}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (exp.visual === "note-compiler") {
    return (
      <div className={shell}>
        <div className={grid} />
        <div className="grid h-full grid-cols-2 gap-3 p-4 sm:p-5">
          <div className="rounded-2xl border border-white/6 bg-black/30 p-3 font-mono text-[8px] leading-relaxed text-zinc-500">
            <div className="text-zinc-400">RAW_INPUT</div>
            <div className="mt-3 space-y-1">
              <div>"call with the team..."</div>
              <div>sentiment around the launch</div>
              <div>the main issue is unclear</div>
              <div>positioning is missing</div>
            </div>
          </div>
          <div className="rounded-2xl border border-blue-500/10 bg-blue-500/[0.03] p-3 font-mono text-[8px] leading-relaxed text-blue-200">
            <div className="text-blue-300">STRUCTURED_OUTPUT</div>
            <div className="mt-3 space-y-1 text-zinc-400">
              <div>{`{ "entities": ["listing", "sequence"] }`}</div>
              <div>{`- launch issue`}</div>
              <div>{`- source: team call`}</div>
              <div>{`- next: summarize signal`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (exp.visual === "ops-workflow") {
    const items = [
      ["Update validator node", "IN PROGRESS", "blue"],
      ["Multisig key rotation", "BLOCKED", "red"],
      ["Treasury report Q3", "PENDING", "zinc"]
    ] as const;
    return (
      <div className={shell}>
        <div className={grid} />
        <div className="p-4 sm:p-5">
          <div className="mb-4 font-mono text-[8px] uppercase tracking-[0.24em] text-zinc-500">Active operations</div>
          <div className="space-y-3">
            {items.map(([label, state, tone]) => (
              <div key={label} className="flex items-center justify-between rounded-xl border border-white/6 bg-black/30 px-3 py-2.5 font-mono text-[8px] text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${tone === "blue" ? "bg-blue-400" : tone === "red" ? "bg-red-400" : "bg-zinc-500"}`} />
                  <span>{label}</span>
                </div>
                <span className={`rounded px-2 py-1 tracking-[0.2em] ${tone === "blue" ? "bg-blue-500/10 text-blue-200" : tone === "red" ? "bg-red-500/10 text-red-200" : "bg-white/5 text-zinc-400"}`}>{state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (exp.visual === "community-router") {
    return (
      <div className={shell}>
        <div className={grid} />
        <div className="p-4 sm:p-5">
          <div className="mb-4 font-mono text-[8px] uppercase tracking-[0.24em] text-zinc-500">Ingestion feed</div>
          <div className="space-y-3 font-mono text-[8px] text-zinc-400">
            <div className="rounded-xl border border-white/6 bg-black/30 p-3">
              <div className="text-zinc-500">user_287</div>
              <div className="mt-2 text-zinc-300">"...the bridge UI is stuck on confirming for 20 min..."</div>
              <div className="mt-2 text-emerald-300">route: support</div>
            </div>
            <div className="rounded-xl border border-white/6 bg-black/30 p-3">
              <div className="text-zinc-500">whale tracker whisper</div>
              <div className="mt-2 text-zinc-300">"Just deposited 300 ETH into the new vault, fyi"</div>
              <div className="mt-2 text-blue-300">route: growth / signal</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className={grid} />
      <div className="h-full p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.24em] text-zinc-500">
          <span>Sybil rated</span>
          <span className="text-zinc-600">score matrix</span>
        </div>
        <div className="relative h-[calc(100%-24px)] rounded-2xl border border-white/6 bg-black/30">
          <div className="absolute bottom-4 left-6 right-4 top-4">
            <div className="absolute inset-0 border-l border-b border-white/10" />
            {[
              [18, 82, "bg-red-400"],
              [28, 70, "bg-red-300"],
              [38, 62, "bg-orange-300"],
              [60, 44, "bg-emerald-300"],
              [74, 34, "bg-emerald-400"],
              [86, 24, "bg-teal-300"]
            ].map(([x, y, c], i) => (
              <span key={i} className={`absolute h-2.5 w-2.5 rounded-full ${c}`} style={{ left: `${x}%`, top: `${y}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experiments() {
  return (
    <div className="space-y-12 md:space-y-16">
      <header className="max-w-3xl space-y-5 md:space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Operator Lab</h1>
        <p className="text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-xl">
          A self-initiated exploration bridging past roles and future directions. This lab focuses on reducing cognitive load in repeated workflows and making dense information easier to scan, prioritize, and act on through focused experiments.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:gap-8">
        {experiments.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link
              to={`/operator-lab/${exp.id}`}
              className="group block overflow-hidden rounded-[28px] border border-zinc-800/80 bg-[#111318] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.01)] transition-all duration-300 hover:border-blue-400/30 hover:bg-[#13161c] sm:p-5"
            >
              <div className="mb-5 aspect-[1.45/1] overflow-hidden rounded-[22px] border border-white/6 bg-[#0b0e13]">
                <OperatorLabVisual exp={exp} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-blue-300/85">
                    Status: {exp.status}
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-300" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight text-zinc-100">
                  {exp.title}
                </h2>

                <p className="text-[15px] font-medium leading-relaxed text-zinc-400">
                  {exp.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Activity, ArrowRight, Bot, CheckCircle2, Cpu, Filter, Layers, MessageSquare, ShieldAlert, Terminal } from "lucide-react";

export function ExperimentVisualizer({ id, isThumbnail = false }: { id: string; isThumbnail?: boolean }) {
  const containerClass = "w-full h-full bg-[#0a0a0a] text-zinc-300 font-mono flex overflow-hidden relative";

  switch (id) {
    case "exp-01":
      return (
        <div className={`${containerClass} flex-col p-4 md:p-6 text-[10px] md:text-xs`}>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
            <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-blue-500" /> SIGNAL_TRIAGE_MATRIX</div>
            <div className="text-zinc-500">LIVE_FEED</div>
          </div>
          {[
            { asset: "ETH", type: "WHALE_ACCUM", conf: "94%", action: "REVIEW", color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { asset: "SOL", type: "DEV_ACTIVITY", conf: "88%", action: "LOG", color: "text-blue-400", bg: "bg-blue-400/10" },
            { asset: "ARB", type: "SOCIAL_SPIKE", conf: "72%", action: "IGNORE", color: "text-amber-400", bg: "bg-amber-400/10" },
            { asset: "OP", type: "UNUSUAL_VOL", conf: "65%", action: "LOG", color: "text-zinc-400", bg: "bg-zinc-800" },
          ].map((row, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <div className="w-12 font-bold">{row.asset}</div>
              <div className={`px-2 py-0.5 rounded ${row.bg} ${row.color}`}>{row.type}</div>
              <div className="w-12 text-right">{row.conf}</div>
              <div className="w-16 text-right"><span className="border border-zinc-700 px-2 py-0.5 rounded hover:bg-zinc-800 cursor-pointer">{row.action}</span></div>
            </div>
          ))}
        </div>
      );

    case "exp-02":
      return (
        <div className={`${containerClass} p-4 md:p-6 gap-4`}>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 border border-zinc-800 rounded-lg relative overflow-hidden bg-zinc-900/50 p-4 flex flex-col justify-between">
              <div className="text-[10px] text-zinc-500">ALGO_PERFORMANCE</div>
              <svg className="absolute bottom-0 left-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,100 L0,50 L20,60 L40,30 L60,40 L80,10 L100,20 L100,100 Z" fill="rgba(59, 130, 246, 0.1)" />
                <path d="M0,50 L20,60 L40,30 L60,40 L80,10 L100,20" fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex gap-4 h-16">
              <div className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900/50 p-2 flex flex-col justify-center">
                <div className="text-[8px] text-zinc-500">LATENCY</div>
                <div className="text-sm text-emerald-400">12ms</div>
              </div>
              <div className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900/50 p-2 flex flex-col justify-center">
                <div className="text-[8px] text-zinc-500">WIN_RATE</div>
                <div className="text-sm text-blue-400">68.4%</div>
              </div>
            </div>
          </div>
          <div className="w-24 md:w-32 flex flex-col gap-4">
            <div className="h-24 bg-red-500/10 border border-red-500/30 rounded-lg flex flex-col items-center justify-center text-red-500 cursor-pointer hover:bg-red-500/20 transition-colors">
              <ShieldAlert className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold">HALT_ALL</span>
            </div>
            <div className="flex-1 border border-zinc-800 rounded-lg p-2 text-[8px] text-zinc-500 flex flex-col gap-1">
              <div>&gt; SYS_OK</div>
              <div>&gt; MEM_OK</div>
              <div className="text-emerald-400">&gt; TRADING</div>
            </div>
          </div>
        </div>
      );

    case "exp-03":
      return (
        <div className={`${containerClass} p-4 md:p-6 gap-4`}>
          <div className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900/30 p-3 flex flex-col gap-2">
            <div className="text-[10px] text-zinc-500 border-b border-zinc-800 pb-1">RAW_INPUT</div>
            <div className="text-[10px] text-zinc-400 leading-relaxed blur-[0.5px]">
              "Call with the team... they mentioned the new rollup architecture is causing latency issues. Need to check the sequencer logs. Also, tokenomics draft looks good but emission rate is too high."
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1 border border-blue-500/30 rounded-lg bg-blue-500/5 p-3 flex flex-col gap-2">
            <div className="text-[10px] text-blue-400 border-b border-blue-500/30 pb-1 flex justify-between">
              <span>STRUCTURED_OUTPUT</span>
              <Bot className="w-3 h-3" />
            </div>
            <div className="text-[8px] md:text-[10px] text-blue-300/80 whitespace-pre">
{`{
  "entities": ["Rollup", "Sequencer"],
  "issues": [
    "Latency in new arch",
    "Emission rate high"
  ],
  "action_items": [
    "Check sequencer logs"
  ]
}`}
            </div>
          </div>
        </div>
      );

    case "exp-04":
      return (
        <div className={`${containerClass} flex-col p-4 md:p-6`}>
          <div className="text-[10px] text-zinc-500 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ACTIVE_OPERATIONS
          </div>
          <div className="flex flex-col gap-2">
            {[
              { task: "Update validator nodes", status: "IN_PROGRESS", owner: "0xA1...4B", color: "text-blue-400", border: "border-blue-500/30" },
              { task: "Multisig key rotation", status: "BLOCKED", owner: "0x8C...9F", color: "text-red-400", border: "border-red-500/30" },
              { task: "Treasury report Q3", status: "PENDING", owner: "0x2D...1A", color: "text-zinc-400", border: "border-zinc-700" },
            ].map((item, i) => (
              <div key={i} className={`border ${item.border} rounded p-2 md:p-3 flex items-center justify-between bg-zinc-900/30`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.status === 'IN_PROGRESS' ? 'bg-blue-500 animate-pulse' : item.status === 'BLOCKED' ? 'bg-red-500' : 'bg-zinc-600'}`} />
                  <span className="text-[10px] md:text-xs">{item.task}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[8px] md:text-[10px] ${item.color}`}>{item.status}</span>
                  <span className="text-[8px] md:text-[10px] text-zinc-500 bg-zinc-900 px-2 py-1 rounded">{item.owner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "exp-05":
      return (
        <div className={`${containerClass} p-4 md:p-6 gap-4`}>
          <div className="flex-[2] flex flex-col gap-2">
            <div className="text-[10px] text-zinc-500 flex items-center gap-2 mb-2">
              <MessageSquare className="w-3 h-3" /> INGESTION_FEED
            </div>
            {[
              { msg: "Hey, the bridge UI is stuck on 'approving' for 20 mins.", tag: "BUG_REPORT", color: "text-red-400", bg: "bg-red-400/10" },
              { msg: "Just deposited 500 ETH into the new vault. LFG!", tag: "WHALE_ACTION", color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { msg: "When token airdrop sir???", tag: "SPAM", color: "text-zinc-500", bg: "bg-zinc-800/50" },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded p-2 flex flex-col gap-2">
                <div className="text-[10px] text-zinc-400 truncate">"{item.msg}"</div>
                <div className="flex justify-between items-center">
                  <span className={`text-[8px] px-1.5 py-0.5 rounded ${item.bg} ${item.color}`}>{item.tag}</span>
                  <span className="text-[8px] text-zinc-600">Discord #general</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 border-l border-zinc-800 pl-4 flex flex-col gap-4">
            <div className="text-[10px] text-zinc-500">ROUTING</div>
            <div className="border border-blue-500/30 bg-blue-500/5 rounded p-2 flex flex-col gap-2">
              <div className="text-[8px] text-blue-400">SUGGESTED_ACTION</div>
              <div className="text-[10px]">Create Jira Ticket (Bridge UI)</div>
              <button className="bg-blue-500/20 text-blue-400 text-[8px] py-1 rounded mt-1 hover:bg-blue-500/30">EXECUTE</button>
            </div>
          </div>
        </div>
      );

    case "exp-06":
      return (
        <div className={`${containerClass} flex-col p-4 md:p-6 relative`}>
          <div className="text-[10px] text-zinc-500 flex justify-between items-center mb-4">
            <div className="flex items-center gap-2"><Filter className="w-3 h-3" /> SYBIL_MATRIX</div>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-[8px]"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> REAL</span>
              <span className="flex items-center gap-1 text-[8px]"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> SYBIL</span>
            </div>
          </div>
          <div className="flex-1 relative border-l border-b border-zinc-800 ml-4 mb-4">
            <div className="absolute -left-4 top-1/2 -rotate-90 text-[8px] text-zinc-600">ON_CHAIN_VOL</div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-zinc-600">SOCIAL_ENGAGEMENT</div>
            
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800/50 border-r border-dashed border-zinc-700" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-800/50 border-b border-dashed border-zinc-700" />
            
            <div className="absolute top-[20%] left-[80%] w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <div className="absolute top-[15%] left-[85%] w-2.5 h-2.5 bg-emerald-500 rounded-full" />
            
            <div className="absolute top-[80%] left-[20%] w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <div className="absolute top-[85%] left-[15%] w-2 h-2 bg-red-500 rounded-full" />
            <div className="absolute top-[75%] left-[25%] w-1.5 h-1.5 bg-red-500 rounded-full" />
            <div className="absolute top-[90%] left-[10%] w-2 h-2 bg-red-500 rounded-full" />
            
            <div className="absolute top-[60%] left-[40%] w-1.5 h-1.5 bg-zinc-500 rounded-full" />
            <div className="absolute top-[40%] left-[60%] w-1.5 h-1.5 bg-zinc-500 rounded-full" />
          </div>
        </div>
      );

    case "agent-board":
      return (
        <div className={`${containerClass} flex-col p-4 md:p-6`}>
           <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">AGENT_BOARD_LANE_TRIAGE</span>
            </div>
            <div className="flex items-center gap-4 text-[8px] md:text-[10px]">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> BLOCKED: 02</span>
              <span className="flex items-center gap-1 text-emerald-400"><Bot className="w-3 h-3" /> AGENTS_ACTIVE: 03</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 flex-1">
            {/* Lane 1: TODO */}
            <div className="flex flex-col gap-2">
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest px-2 mb-1">Queue</div>
              {[
                { label: "Refine Signal Pattern", tag: "Human" },
                { label: "Audit Fee Engine", tag: "Agent", color: "text-blue-400" }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/60 border border-zinc-800 p-2 rounded-lg space-y-2">
                  <div className="text-[10px] md:text-xs leading-tight">{item.label}</div>
                  <div className="flex justify-between items-center text-[8px]">
                    <span className={item.color || "text-zinc-500"}>{item.tag}</span>
                    <span className="text-zinc-700">PR-41</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Lane 2: ACTIVE */}
            <div className="flex flex-col gap-2">
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest px-2 mb-1">Active Execution</div>
              <div className="bg-red-500/5 border border-red-500/30 p-2 rounded-lg space-y-2 relative">
                <div className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 rounded-full animate-pulse"><ShieldAlert className="w-2.5 h-2.5 text-white" /></div>
                <div className="text-[10px] md:text-xs leading-tight font-bold text-red-500">Fix Sequencer Desync</div>
                <div className="flex justify-between items-center text-[8px] text-red-400/60">
                  <span>BLOCKER: PERSISTENT_RETRY</span>
                </div>
              </div>
              <div className="bg-zinc-900 border border-blue-500/20 p-2 rounded-lg space-y-2">
                <div className="text-[10px] md:text-xs leading-tight">Verify PnL Integrity</div>
                <div className="flex justify-between items-center text-[8px]">
                  <span className="text-blue-400 flex items-center gap-1"><Bot className="w-2 h-2" /> Agent_Alpha</span>
                  <span className="text-emerald-500 font-bold">78% Complete</span>
                </div>
              </div>
            </div>
            {/* Lane 3: PROOF */}
            <div className="flex flex-col gap-2">
              <div className="text-[9px] text-emerald-500/50 uppercase tracking-widest px-2 mb-1">Verified Proof</div>
              <div className="bg-zinc-900/40 border border-zinc-800 p-2 rounded-lg space-y-2 opacity-60">
                <div className="text-[10px] md:text-xs leading-tight italic text-emerald-400/80">Relay Handoff Complete</div>
                <div className="flex items-center gap-2 text-[8px] text-emerald-500">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Evidence: log_4152.txt</span>
                </div>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800 p-2 rounded-lg space-y-2 opacity-60">
                <div className="text-[10px] md:text-xs leading-tight italic text-emerald-400/80">Token Auth Rotated</div>
                <div className="flex items-center gap-2 text-[8px] text-emerald-500">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>Evidence: signed_payload.json</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className={`${containerClass} p-8 flex-col justify-between`}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-lg">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">SYSTEM_READY</span>
              </div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center">
                  <Layers className="w-4 h-4 text-zinc-500" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center relative z-10">
            <div className="relative w-32 h-32 md:w-64 md:h-64 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-blue-500/20 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-zinc-700 rounded-full"
              />
              <Cpu className="w-8 h-8 md:w-12 md:h-12 text-blue-500 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between items-end relative z-10">
            <div className="font-mono text-[10px] text-zinc-600 space-y-1">
              <div>LATENCY: 12ms</div>
              <div>UPTIME: 99.99%</div>
            </div>
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-md font-mono text-[10px] text-blue-400">
              MODE: ANALYTIC
            </div>
          </div>
        </div>
      );
  }
}

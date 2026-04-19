import React from "react";
import { motion } from "motion/react";
import { 
  User, 
  Layout, 
  Bot, 
  CheckCircle2, 
  RefreshCcw, 
  ArrowRight,
  ChevronRight,
  Database,
  Terminal,
  FileText,
  Activity,
  ArrowDown
} from "lucide-react";

export function AgentBoardFlowchart() {
  return (
    <div className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-8 overflow-x-auto relative">
      <div className="min-w-[1000px] flex flex-col items-center py-12">
        
        {/* Step 1: Human Sets Goal */}
        <DiagramBox 
          title="Human sets goal" 
          icon={<User className="w-4 h-4 text-blue-400" />}
          color="border-blue-500/30"
        />

        <VerticalArrow />

        {/* Step 2: AgentBoard Structures Work */}
        <DiagramBox 
          title="AgentBoard structures work" 
          subtitle="context • state • blockers"
          icon={<Layout className="w-4 h-4 text-teal-400" />}
          color="border-teal-500/30"
          highlight
        />

        <VerticalArrow />

        {/* Step 3: Agent Executes Task */}
        <DiagramBox 
          title="Agent executes task" 
          subtitle="writes • builds • tests"
          icon={<Bot className="w-4 h-4 text-orange-400" />}
          color="border-orange-500/30"
        />

        <VerticalArrow />

        {/* Step 4: Proof + Status Recorded */}
        <DiagramBox 
          title="Proof + status recorded" 
          icon={<FileText className="w-4 h-4 text-zinc-400" />}
          color="border-zinc-700"
        />

        <VerticalArrow />

        {/* Decision: Human Reviews */}
        <div className="flex flex-col items-center relative">
          <div className="px-8 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center gap-3 shadow-xl z-10">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-black uppercase text-white tracking-widest">Human reviews</span>
          </div>
          
          <VerticalArrow label="Is Approved?" />

          {/* Logic Split */}
          <div className="flex items-start gap-32">
            {/* NO Path (Loop back) */}
            <div className="flex flex-col items-center group">
               <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 No <RefreshCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />
               </div>
               <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-[9px] font-mono text-orange-400 uppercase tracking-tighter">
                 Refine / Unblock / Iterate
               </div>
               
               {/* Loop Arrow Visual */}
               <div className="absolute left-[20%] top-[40%] h-[45%] w-px border-l border-dashed border-orange-500/40 -z-0">
                  <div className="absolute top-0 left-0 w-24 h-px border-t border-dashed border-orange-500/40" />
                  <div className="absolute bottom-0 left-0 w-24 h-px border-b border-dashed border-orange-500/40" />
               </div>
            </div>

            {/* YES Path */}
            <div className="flex flex-col items-center gap-4">
               <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">
                 Yes
               </div>
               <div className="p-6 bg-emerald-500/5 border border-emerald-500/40 rounded-3xl flex flex-col items-center gap-3 shadow-2xl shadow-emerald-500/5">
                 <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                 <div className="text-center">
                    <div className="text-xs font-black text-white uppercase tracking-widest">Verified Completion</div>
                    <div className="text-[9px] font-mono text-zinc-500 mt-1 uppercase">artifacts • proof • next workflow</div>
                 </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function DiagramBox({ title, subtitle, icon, color, highlight = false }: { title: string; subtitle?: string; icon: React.ReactNode; color: string; highlight?: boolean }) {
  return (
    <div className={`px-10 py-6 rounded-2xl border ${color} ${highlight ? 'bg-zinc-900/50 shadow-2xl' : 'bg-zinc-950/50'} flex flex-col items-center gap-2 min-w-[320px] backdrop-blur-sm`}>
      <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800 mb-1">
        {icon}
      </div>
      <h4 className="text-xs font-black uppercase text-white tracking-widest text-center">{title}</h4>
      {subtitle && (
        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">{subtitle}</p>
      )}
    </div>
  );
}

function VerticalArrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-px h-12 bg-zinc-800 relative">
        <ArrowDown className="w-3 h-3 text-zinc-700 absolute -bottom-1 -left-[5.5px]" />
      </div>
      {label && (
        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest mt-2">{label}</span>
      )}
    </div>
  );
}

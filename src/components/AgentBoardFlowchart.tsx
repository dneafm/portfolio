import React from "react";
import { 
  ClipboardList,
  Layout,
  Bot, 
  CheckCircle2, 
  RefreshCcw, 
  FileText,
  Activity,
  ArrowDown
} from "lucide-react";

export function AgentBoardFlowchart() {
  return (
    <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 px-4 sm:px-6 lg:px-10 2xl:px-16">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center py-8 sm:py-12">
        
        {/* Step 1: Plan milestones and tasks */}
        <DiagramBox 
          title="List milestones and tasks" 
          subtitle="scope • priorities • sequencing"
          icon={<ClipboardList className="w-4 h-4 text-blue-400" />}
          color="border-blue-500/30"
        />

        <VerticalArrow />

        {/* Step 2: Structure work */}
        <DiagramBox 
          title="AgentBoard structures the board" 
          subtitle="context • blockers • progress"
          icon={<Layout className="w-4 h-4 text-teal-400" />}
          color="border-teal-500/30"
          highlight
        />

        <VerticalArrow />

        {/* Step 3: Handoff to agents */}
        <DiagramBox 
          title="Hand off implementation to agents" 
          subtitle="assign • execute • update"
          icon={<Bot className="w-4 h-4 text-orange-400" />}
          color="border-orange-500/30"
        />

        <VerticalArrow />

        {/* Step 4: Review result and record proof */}
        <DiagramBox 
          title="Review results and record proof" 
          subtitle="artifacts • notes • status"
          icon={<FileText className="w-4 h-4 text-zinc-400" />}
          color="border-zinc-700"
        />

        <VerticalArrow />

        {/* Decision: Human Reviews */}
        <div className="flex flex-col items-center relative">
          <div className="px-8 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center gap-3 shadow-xl z-10">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-black uppercase text-white tracking-widest">Progress on track?</span>
          </div>
          
          <VerticalArrow label="Keep moving?" />

          {/* Logic Split */}
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-32">
            {/* NO Path (Loop back) */}
            <div className="flex flex-col items-center group">
               <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 No <RefreshCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-700" />
               </div>
               <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl text-[9px] font-mono text-orange-400 uppercase tracking-tighter">
                 Refine / unblock / hand back
               </div>
               
               {/* Loop Arrow Visual */}
               <div className="absolute left-[12%] top-[42%] hidden h-[43%] w-px border-l border-dashed border-orange-500/40 -z-0 lg:block">
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
                    <div className="text-xs font-black text-white uppercase tracking-widest">Tracked Progress</div>
                    <div className="text-[9px] font-mono text-zinc-500 mt-1 uppercase">milestones • tasks • review loop</div>
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
    <div className={`flex w-full max-w-[min(92vw,420px)] flex-col items-center gap-2 rounded-2xl border px-6 py-5 sm:px-10 sm:py-6 ${color} ${highlight ? 'bg-zinc-900/50 shadow-2xl' : 'bg-zinc-950/50'} backdrop-blur-sm`}>
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

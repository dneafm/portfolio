import React from "react";
import { motion } from "motion/react";
import { 
  Eye, 
  Search, 
  PenTool, 
  ShieldCheck, 
  Zap, 
  RotateCcw,
  ArrowRight,
  ArrowDown,
  Activity,
  CheckCircle2,
  TrendingUp,
  XCircle,
  AlertTriangle
} from "lucide-react";

export function DJTradeFlowchart() {
  return (
    <div className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-8 overflow-x-auto relative">
      <div className="min-w-[1000px] flex flex-col items-center py-12">
        
        {/* Step 1: Market context forms */}
        <DiagramBox 
          title="Market context forms" 
          icon={<Eye className="w-4 h-4 text-blue-400" />}
          color="border-blue-500/30"
        />

        <VerticalArrow />

        {/* Step 2: DJ Trade structures setup */}
        <DiagramBox 
          title="DJ Trade structures setup" 
          subtitle="setup • risk • readiness"
          icon={<Search className="w-4 h-4 text-teal-400" />}
          color="border-teal-500/30"
          highlight
        />

        <VerticalArrow />

        {/* Decision: Ready to trade? */}
        <div className="flex flex-col items-center relative">
          <div className="px-8 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl flex items-center gap-3 shadow-xl z-10">
            <ShieldCheck className="w-4 h-4 text-red-500" />
            <span className="text-xs font-black uppercase text-white tracking-widest">Ready to trade?</span>
          </div>
          
          <VerticalArrow label="Is Valid?" />

          {/* Logic Split */}
          <div className="flex items-start gap-32">
            {/* NO Path (Wait / Refine / Block) */}
            <div className="flex flex-col items-center group">
               <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 No <XCircle className="w-3 h-3 text-red-500" />
               </div>
               <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-[9px] font-mono text-red-400 uppercase tracking-tighter">
                 Wait / Refine / Block
               </div>
               
               {/* Loop Arrow Visual (back to market context) */}
               <div className="absolute left-[20%] top-[40%] h-[45%] w-px border-l border-dashed border-red-500/40 -z-0">
                  <div className="absolute top-0 left-0 w-24 h-px border-t border-dashed border-red-500/40" />
                  <div className="absolute bottom-0 left-0 w-24 h-px border-b border-dashed border-red-500/40" />
               </div>
            </div>

            {/* YES Path */}
            <div className="flex flex-col items-center gap-4">
               <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">
                 Yes
               </div>
               <div className="flex flex-col items-center">
                  <DiagramBox 
                    title="Execute the trade" 
                    subtitle="enter • monitor • exit"
                    icon={<Zap className="w-4 h-4 text-amber-500" />}
                    color="border-emerald-500/30"
                  />
                  
                  <VerticalArrow />

                  <DiagramBox 
                    title="Review + reconcile result" 
                    icon={<RotateCcw className="w-4 h-4 text-zinc-400" />}
                    color="border-zinc-700"
                  />

                  <VerticalArrow />

                  <div className="p-6 bg-blue-500/5 border border-blue-500/40 rounded-3xl flex flex-col items-center gap-3 shadow-2xl shadow-blue-500/5">
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                    <div className="text-center">
                        <div className="text-xs font-black text-white uppercase tracking-widest">Consistency Gain</div>
                        <div className="text-[9px] font-mono text-zinc-500 mt-1 uppercase">Improved method consistency</div>
                    </div>
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
      <h4 className="text-xs font-black uppercase text-white tracking-widest text-center leading-tight">{title}</h4>
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




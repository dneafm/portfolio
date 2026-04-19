import { motion } from "motion/react";
import { DJTradeFlowchart } from "../components/DJTradeFlowchart";
import { AgentBoardFlowchart } from "../components/AgentBoardFlowchart";

export function Experiments() {
  return (
    <div className="space-y-20 pb-20">
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">Operator Lab</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
          A self-initiated exploration bridging past roles and future directions. This lab focuses on reducing cognitive load in repeated workflows, turning isolated scripts and chats into verifiable systems.
        </p>
      </header>

      <div className="space-y-32 border-t border-zinc-100 dark:border-zinc-800 pt-16 mt-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-10"
        >
          <div className="space-y-4 max-w-3xl">
               <div className="flex items-center gap-3">
                 <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                   STATUS: Case Study
                 </div>
                 <motion.div 
                   animate={{ opacity: [0.3, 1, 0.3] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="w-1.5 h-1.5 rounded-full bg-blue-500"
                 />
               </div>
               <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">DJ Trade System Protocol</h2>
               <p className="text-base text-zinc-500 dark:text-zinc-500 leading-relaxed font-mono">Standardizing manual execution to reduce impulse trading. Creates structured decision flows before, during, and after live action.</p>
          </div>
          <DJTradeFlowchart />
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-10"
        >
          <div className="space-y-4 max-w-3xl">
               <div className="flex items-center gap-3">
                 <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                   STATUS: In Progress
                 </div>
                 <motion.div 
                   animate={{ opacity: [0.3, 1, 0.3] }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                 />
               </div>
               <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">AgentBoard Execution Layer</h2>
               <p className="text-base text-zinc-500 dark:text-zinc-500 leading-relaxed font-mono">A coordination protocol preventing human/agent context-loss by strictly linking intents, blockers, and verified artifacts.</p>
          </div>
          <AgentBoardFlowchart />
        </motion.section>
      </div>
    </div>
  );
}

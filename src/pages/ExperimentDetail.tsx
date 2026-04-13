import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Play, Info, Layers, Terminal, Cpu } from "lucide-react";
import { experiments } from "../data";
import { cn } from "@/lib/utils";

export function ExperimentDetail() {
  const { id } = useParams();
  const exp = experiments.find((e) => e.id === id);

  if (!exp) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">Experiment not found</h1>
        <Link to="/experiments" className="text-blue-600 hover:underline">Back to Experiments</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-12 pb-20"
    >
      <header className="space-y-8">
        <Link 
          to="/experiments" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Back to Lab</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                STATUS: {exp.status}
              </div>
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-blue-500"
              />
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-tight">
              {exp.title}
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl">
              {exp.description}
            </p>
          </div>
          
          <button className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
            <Play className="w-4 h-4 fill-current" />
            Launch Prototype
          </button>
        </div>
      </header>

      {/* Main Visualization Mockup */}
      <section className="relative aspect-video bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        
        {/* Mock UI Elements */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-lg">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">SYSTEM_READY</span>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl space-y-2 w-64">
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>SIGNAL_STRENGTH</span>
                  <span className="text-blue-400">98.2%</span>
                </div>
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "98.2%" }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-full bg-blue-500"
                  />
                </div>
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

          <div className="flex justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
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
              <Cpu className="w-12 h-12 text-blue-500 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="font-mono text-[10px] text-zinc-600 space-y-1">
              <div>LATENCY: 12ms</div>
              <div>UPTIME: 99.99%</div>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-md font-mono text-[10px] text-blue-400">
                MODE: ANALYTIC
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-600" />
              Technical Overview
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {exp.details}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Key Objectives</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Reduce cognitive load for high-velocity triage",
                "Minimize intervention latency in automated flows",
                "Provide clear visual hierarchy for system states",
                "Enable direct manipulation of complex data structures"
              ].map((obj, i) => (
                <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{obj}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-400">Operator Log</h3>
            <div className="space-y-4">
              {[
                { date: "2024.03.10", msg: "Initial concept mapped" },
                { date: "2024.03.15", msg: "Signal triage logic refined" },
                { date: "2024.03.22", msg: "UI prototype v1.0 deployed" }
              ].map((log, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-[10px] font-mono text-blue-600 dark:text-blue-400">{log.date}</div>
                  <div className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{log.msg}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

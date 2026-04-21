import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Play, Info, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { experiments } from "../data";
import { ExperimentVisualizer } from "../components/ExperimentVisualizer";
import { DJTradeFlowchart } from "../components/DJTradeFlowchart";
import { AgentBoardFlowchart } from "../components/AgentBoardFlowchart";

export function ExperimentDetail() {
  const { id } = useParams();
  const exp = experiments.find((e) => e.id === id) as any;

  if (!exp) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">Experiment not found</h1>
        <Link to="/experiments" className="text-blue-600 hover:underline">Back to Experiments</Link>
      </div>
    );
  }

  // Case Study Layout
  if (exp.caseStudy) {
    const cs = exp.caseStudy;
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-tight">
              {cs.headline}
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium max-w-3xl leading-relaxed">
              {cs.summary}
            </p>

            {cs.metaStrip && (
              <div className="flex flex-wrap gap-8 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {cs.metaStrip.map((meta: any, i: number) => (
                  <div key={i} className="space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{meta.label}</div>
                    <div className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{meta.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        {cs.images && cs.images[0] && (
          <section className="relative bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl group">
            <img 
              src={cs.images[0].src} 
              alt={cs.images[0].story} 
              className="w-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 text-xs font-mono text-zinc-300 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              [HERO] {cs.images[0].story}
            </div>
          </section>
        )}

        {/* Problem + Idea Section */}
        <div className="space-y-24">
          <section className="space-y-4 max-w-3xl">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">The Problem</h2>
            <div className="space-y-5 text-lg leading-8 font-medium tracking-normal text-zinc-600 dark:text-zinc-300/90">
              {Array.isArray(cs.problem) 
                ? cs.problem.map((p: any, i: number) => <p key={i}>{p}</p>)
                : <p>{cs.problem}</p>}
            </div>
          </section>
          
          {cs.theIdea && (
            <section className="space-y-5 max-w-3xl ml-auto text-right">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">The Idea</h2>
              <div className="space-y-6">
                <div className="space-y-5 text-lg leading-8 font-normal tracking-normal text-zinc-600 dark:text-zinc-300/85">
                  {Array.isArray(cs.theIdea.text)
                    ? cs.theIdea.text.map((p: any, i: number) => <p key={i}>{p}</p>)
                    : <p>{cs.theIdea.text}</p>}
                </div>
                <div className="flex flex-wrap justify-end gap-3">
                  {cs.theIdea.bullets.map((bullet: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-100/70 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
                      <ChevronRight className="w-3 h-3" />
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {cs.outcome && !cs.theIdea && (
            <section className="space-y-4 text-center py-12">
               <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">Outcome</h2>
               <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 leading-relaxed tracking-tight max-w-3xl mx-auto">
                 {cs.outcome}
               </p>
            </section>
          )}
        </div>

        {cs.howItWorks && (
          <section className="space-y-12">
             <div className="flex flex-col gap-2">
               <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">How It Works</h2>
               <p className="text-sm text-zinc-500">A structured breakdown of the system's operational logic and user workflow.</p>
             </div>
             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cs.howItWorks.map((item: any, i: number) => (
                  <div key={i} className="p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl space-y-3">
                    <h3 className="text-sm font-black uppercase tracking-tight text-zinc-800 dark:text-zinc-200">{item.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </section>
        )}

        {cs.bulletPoints && (
          <section className="space-y-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-8">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-6">What Was Designed</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {cs.bulletPoints.map((point: string, i: number) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{point}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.usefulBullets && (
          <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100/80 p-10 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/45 dark:text-zinc-200 group space-y-8">
             <Zap className="absolute top-[-20px] right-[-20px] w-64 h-64 text-zinc-400/10 dark:text-zinc-500/10 -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
             <h2 className="relative z-10 text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-500">What Makes It Useful</h2>
             <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                {cs.usefulBullets.map((bullet: string, i: number) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    <span className="text-base font-medium tracking-tight text-zinc-700 dark:text-zinc-200">{bullet}</span>
                  </div>
                ))}
             </div>
          </section>
        )}

        {exp.id === "dj-trade" && (
          <section className="space-y-8">
             <div className="flex flex-col gap-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">User Journey</h2>
              <p className="text-sm text-zinc-500 max-w-2xl">
                A step-by-step view of how a trader moves from strategy creation to workstation setup, execution, and review inside DJ Trade.
              </p>
             </div>
             <DJTradeFlowchart />
          </section>
        )}

        {cs.aiIntegration && (
          <section className="py-16 border-y border-zinc-100 dark:border-zinc-800 space-y-12">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter leading-tight">
                    {cs.aiIntegration.title}
                  </h2>
                  <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                    {cs.aiIntegration.description}
                  </p>
                </div>
                <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl space-y-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap className="w-32 h-32 text-blue-500" />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Natural Language Queries
                  </div>
                  <div className="space-y-3">
                    {cs.aiIntegration.examples.map((example: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50 hover:border-blue-500/30 transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                         <span className="text-xs font-mono text-zinc-300">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
             <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono italic text-center max-w-2xl mx-auto">
               {cs.aiIntegration.closing}
             </p>
          </section>
        )}

        {exp.id === "agent-board" && (
          <section className="space-y-8">
             <div className="flex flex-col gap-2">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">User Journey</h2>
              <p className="text-sm text-zinc-500 max-w-2xl">
                A step-by-step view of how a user plans milestones and tasks, hands work off to agents, then reviews outcomes and tracks progress in AgentBoard.
              </p>
             </div>
             <AgentBoardFlowchart />
          </section>
        )}

        {cs.images && cs.images.length > 1 && (
          <section className="space-y-12">
            <div className="flex flex-col gap-2 pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">Interface & Contextual Proof</h2>
              <p className="text-sm text-zinc-500">How the visibility layer anchors coordination through artifacts and history.</p>
            </div>
            <div className="grid gap-20">
              {cs.images.slice(1).map((img: any, i: number) => (
                <div key={i} className="space-y-6 max-w-4xl mx-auto w-full">
                  <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                    <img 
                      src={img.src} 
                      alt={img.story} 
                      className="w-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex items-start gap-4 px-4">
                    <div className="font-mono text-[10px] text-blue-500 font-bold bg-blue-500/10 px-2 py-1 rounded">
                      FIG_{i + 1}
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">
                      {img.story}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.outcome && cs.theIdea && (
           <section className="pt-20 border-t border-zinc-100 dark:border-zinc-800 space-y-8 text-center max-w-3xl mx-auto">
             <div className="space-y-4">
               <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400">Outcome</h2>
               <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                 {cs.outcome}
               </p>
             </div>
             {cs.closingLine && (
               <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                 <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-400">
                   {cs.closingLine}
                 </p>
               </div>
             )}
           </section>
        )}
      </motion.div>
    );
  }

  // Default Standard Layout
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
        <ExperimentVisualizer id={exp.id} />
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

import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface CasefileTemplateProps {
  title: string;
  subtitle: string;
  context: string;
  problem: string;
  role: string;
  approach: ReactNode;
  artifacts: ReactNode;
  outcome: string;
  lessons: string;
  nextSteps: string;
}

export function CasefileTemplate({
  title,
  subtitle,
  context,
  problem,
  role,
  approach,
  artifacts,
  outcome,
  lessons,
  nextSteps
}: CasefileTemplateProps) {
  return (
    <article className="space-y-20 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/casefiles" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-12 group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Back to Casefiles
        </Link>
        
        <header className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">{title}</h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">{subtitle}</p>
        </header>
      </motion.div>

      <div className="grid sm:grid-cols-3 gap-12 py-12 border-y border-zinc-100 dark:border-zinc-800">
        <div className="space-y-3">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Context</div>
          <div className="text-sm text-zinc-900 dark:text-zinc-100 font-bold leading-relaxed">{context}</div>
        </div>
        <div className="space-y-3">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Role</div>
          <div className="text-sm text-zinc-900 dark:text-zinc-100 font-bold leading-relaxed">{role}</div>
        </div>
        <div className="space-y-3">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Problem</div>
          <div className="text-sm text-zinc-900 dark:text-zinc-100 font-bold leading-relaxed">{problem}</div>
        </div>
      </div>

      <div className="space-y-24 text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
        <section className="space-y-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 border-b border-zinc-100 dark:border-zinc-800 pb-6">Approach</h2>
          <div className="space-y-6 text-lg">
            {approach}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 border-b border-zinc-100 dark:border-zinc-800 pb-6">Selected Artifacts</h2>
          <div className="space-y-12">
            {artifacts}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 border-b border-zinc-100 dark:border-zinc-800 pb-6">Outcome</h2>
          <div className="text-lg">
            {outcome}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-zinc-100 dark:border-zinc-800">
          <section className="space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">What it taught me</h2>
            <div className="text-[15px] leading-relaxed">
              {lessons}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">What I'd improve next</h2>
            <div className="text-[15px] leading-relaxed">
              {nextSteps}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

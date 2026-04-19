import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { experiments } from "../data";
import { ExperimentVisualizer } from "../components/ExperimentVisualizer";

export function Experiments() {
  return (
    <div className="space-y-20">
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Operator Lab</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xl font-medium leading-relaxed">
          A self-initiated exploration bridging past roles and future directions. This lab focuses on reducing cognitive load in repeated workflows and making dense information easier to scan, prioritize, and act on through focused experiments.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {experiments.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link 
              to={`/experiments/${exp.id}`}
              className="group relative block bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-blue-500/30 dark:hover:border-blue-400/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 p-8 space-y-8 rounded-2xl overflow-hidden"
            >
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />
              <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />
              <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />

              <div className="aspect-video bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden rounded-xl group-hover:border-blue-500/20 transition-colors duration-500">
                <div className="absolute inset-0 pointer-events-none">
                  {(exp as any).caseStudy && (exp as any).caseStudy.images && (exp as any).caseStudy.images[0] ? (
                    <img 
                      src={(exp as any).caseStudy.images[0].src} 
                      alt={exp.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-duration-500" 
                    />
                  ) : (
                    <ExperimentVisualizer id={exp.id} isThumbnail />
                  )}
                </div>
                
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/[0.02] transition-colors duration-500 pointer-events-none" />
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                      STATUS: {exp.status}
                    </div>
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1 h-1 rounded-full bg-blue-500"
                    />
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {exp.title}
                </h2>
                <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-300">
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

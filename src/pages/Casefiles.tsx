import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const casefiles = [
  {
    id: "kyber-network",
    title: "Kyber Network",
    subtitle: "Designing clarity in a fast-moving DeFi environment",
    environment: "DeFi ecosystem",
    problem: "Dense crypto ideas needed to be translated into clearer communication while keeping outputs coherent across fast-moving initiatives.",
    role: "Multimedia Marketing Designer",
    outcome: "Made high-context information easier to process across campaigns, educational content, and ecosystem-facing communication.",
  },
  {
    id: "factor",
    title: "Factor",
    subtitle: "Building reusable systems for faster design execution",
    environment: "DeFi protocol",
    problem: "Recurring design needs created inconsistency and repeated effort across campaigns, internal materials, and product-adjacent communication.",
    role: "Multimedia Marketing Designer",
    outcome: "Improved speed and consistency through reusable structures, modular layouts, and more repeatable workflows.",
  },
  {
    id: "vng",
    title: "VNG / Zingplay",
    subtitle: "High-conversion motion design for mobile gaming",
    environment: "Mobile Gaming Campaign",
    problem: "Needed to create highly engaging, snappy promotional assets to drive user acquisition and communicate in-game rewards.",
    role: "Motion & Marketing Designer",
    outcome: "Delivered versatile, high-quality motion assets that successfully captured the playful brand identity.",
  }
];

export function Casefiles() {
  return (
    <div className="space-y-20">
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Casefiles</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xl font-medium leading-relaxed">
          Selected work at the intersection of crypto context, system thinking, and practical workflow design.
        </p>
      </header>

      <div className="space-y-8">
        {casefiles.map((cf, i) => (
          <motion.div
            key={cf.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link 
              to={`/casefiles/${cf.id}`}
              className="group relative block bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-blue-500/30 dark:hover:border-blue-400/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 p-8 md:p-12 rounded-2xl overflow-hidden"
            >
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />
              <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />
              <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />
              <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-zinc-200 dark:border-zinc-800 group-hover:border-blue-500/40 transition-colors" />

              {/* Hover Line Animation */}
              <motion.div 
                className="absolute bottom-0 left-0 h-[2px] bg-blue-500/40 w-0 group-hover:w-full transition-all duration-700"
              />

              <div className="grid md:grid-cols-12 gap-12 relative z-10">
                <div className="md:col-span-4 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">
                      FILE_{String(i + 1).padStart(2, '0')}
                    </div>
                    <motion.div 
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1 h-1 rounded-full bg-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {cf.title}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{cf.subtitle}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 group-hover:gap-4 transition-all pt-4">
                    Open Casefile <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="md:col-span-8 grid sm:grid-cols-2 gap-8 border-l border-zinc-50 dark:border-zinc-800/50 pl-8 md:pl-12">
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">Environment</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300 font-bold">{cf.environment}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">Role</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-300 font-bold">{cf.role}</div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">Problem</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{cf.problem}</div>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">Outcome</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{cf.outcome}</div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

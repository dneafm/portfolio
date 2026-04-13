import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { notes } from "../data";

export function Notes() {
  return (
    <div className="space-y-20">
      <header className="space-y-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Notes</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-xl font-medium leading-relaxed">
          A lightweight archive of thoughts on designing for high-context users, operator workflows, and clarity in noisy systems.
        </p>
      </header>

      <div className="space-y-2">
        {notes.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link to={`/notes/${note.id}`}>
              <article className="group relative border-b border-zinc-100 dark:border-zinc-800 py-12 hover:bg-white dark:hover:bg-zinc-900/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 -mx-8 px-8 cursor-pointer rounded-2xl overflow-hidden">
                {/* Subtle hover background line */}
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500/40 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"
                />

                <div className="grid md:grid-cols-12 gap-8 items-baseline relative z-10">
                  <div className="md:col-span-2 flex items-center gap-3">
                    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {note.date}
                    </div>
                    <motion.div 
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="md:col-span-9 space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {note.title}
                    </h2>
                    <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-300">
                      {note.excerpt}
                    </p>
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    <ArrowRight className="w-5 h-5 text-zinc-200 dark:text-zinc-800 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

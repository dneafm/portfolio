import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Tag, Share2, Bookmark } from "lucide-react";
import { notes } from "../data";
import { cn } from "@/lib/utils";

export function NoteDetail() {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <h1 className="text-2xl font-bold">Note not found</h1>
        <Link to="/notes" className="text-blue-600 hover:underline">Back to Notes</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-12 pb-20"
    >
      <header className="space-y-8">
        <Link 
          to="/notes" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Back to Archive</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-zinc-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="text-blue-600">{note.id}</span>
            <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <span>{note.date}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 leading-tight">
            {note.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">5 min read</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <Tag className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Research Fragment</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-400 hover:text-blue-600 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-zinc-400 hover:text-blue-600 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 p-8 rounded-2xl mb-12 italic text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
          {note.excerpt}
        </div>
        
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed whitespace-pre-line">
          {note.content}
        </div>
      </article>

      <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-800">
        <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight">Interested in these systems?</h3>
            <p className="text-zinc-400 dark:text-zinc-500 font-medium">Let's discuss how we can build clearer workflows for your protocol.</p>
          </div>
          <Link 
            to="/contact"
            className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors rounded-lg"
          >
            Start a Conversation
          </Link>
        </div>
      </footer>
    </motion.div>
  );
}

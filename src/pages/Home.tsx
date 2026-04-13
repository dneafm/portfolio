import { Link } from "react-router-dom";
import { ArrowRight, Terminal, Network, Workflow } from "lucide-react";
import { motion } from "motion/react";
import { Hero } from "../components/Hero";

export function Home() {
  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <Hero />

      {/* Proof Blocks */}
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
          }
        }}
        className="grid md:grid-cols-3 gap-8"
      >
        {[
          { icon: Network, title: "Crypto Context", desc: "Experience working inside fast-moving DeFi environments where complexity, nuance, and speed shape how communication needs to work." },
          { icon: Workflow, title: "System Thinking", desc: "Interested in reusable structures, modular workflows, and design logic that improve consistency, clarity, and execution over time." },
          { icon: Terminal, title: "Operator Lens", desc: "Drawn toward tools, dashboards, and research surfaces built to reduce friction for people working in dense, high-context systems." }
        ].map((item, i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
            }}
            className="p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6 group hover:border-blue-500/30 dark:hover:border-blue-400/20 transition-all duration-500 relative overflow-hidden"
          >
            {/* Subtle background pulse on hover */}
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/[0.02] transition-colors duration-500" />
            
            <div className="relative z-10 w-10 h-10 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center rounded-lg group-hover:bg-blue-600 transition-all duration-500 group-hover:scale-110">
              <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-500" />
            </div>
            <div className="relative z-10 space-y-3">
              <h3 className="font-bold text-[11px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 flex items-center gap-2">
                {item.title}
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="w-1 h-1 rounded-full bg-blue-500"
                />
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Selected Casefiles */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="space-y-12"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">Selected Casefiles</h2>
          <Link to="/casefiles" className="group text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2">
            View All <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { id: "kyber-network", title: "Kyber Network", label: "KYBER_NETWORK_ASSETS", desc: "Designing clarity inside a fast-moving DeFi environment.", media: { type: "image", src: "/Untitled.png" } },
            { id: "factor", title: "Factor", label: "FACTOR_SYSTEMS", desc: "Building reusable systems for faster, more consistent design execution.", media: { type: "video", src: "/Anim.mp4" } },
            { id: "operator-lab", title: "Operator Lab", label: "OPERATOR_LAB_EXPERIMENTS", desc: "Exploring workflow tools, research surfaces, and operator-oriented systems.", media: { type: "image", src: "/Untitled (1).png" }, link: "/experiments" }
          ].map((casefile, i) => (
            <Link key={casefile.id} to={casefile.link || `/casefiles/${casefile.id}`} className="group block space-y-6">
              <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden flex items-center justify-center rounded-xl transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/5">
                {casefile.media ? (
                  casefile.media.type === "video" ? (
                    <video 
                      poster={(casefile.media as any).poster}
                      autoPlay 
                      loop 
                      muted 
                      playsInline 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <source src={casefile.media.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={casefile.media.src} 
                      alt={casefile.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )
                ) : (
                  <div className="font-mono text-[10px] font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-widest relative z-10 group-hover:text-blue-500/50 transition-colors duration-500">
                    {casefile.label}
                  </div>
                )}
                
                {/* Scanning line effect */}
                <motion.div 
                  initial={{ top: "-100%" }}
                  whileHover={{ top: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-blue-500/20 z-20 pointer-events-none"
                />
                
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/[0.02] transition-colors duration-500" />
                
                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-500/40 transition-colors z-20" />
                <div className="absolute top-2 right-2 w-1 h-1 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-500/40 transition-colors z-20" />
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-500/40 transition-colors z-20" />
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-500/40 transition-colors z-20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                  {casefile.title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{casefile.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* About & Notes Preview */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="grid md:grid-cols-2 gap-24"
      >
        <div className="space-y-8">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 border-b border-zinc-100 dark:border-zinc-800 pb-6">About</h2>
          <div className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed space-y-6 font-medium">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I come from a design background that includes crypto-native work, communication systems, and multidisciplinary execution. My direction is increasingly shaped by workflows, dashboards, internal tools, and environments where clarity matters under complexity.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              I’m most interested in work that helps people navigate dense information, reduce friction, and operate more effectively.
            </motion.p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="space-y-2">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">Notes / Thinking</h2>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-tight">Short writing on crypto UX, workflow design, and operator tools.</p>
            </div>
            <Link to="/notes" className="group text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-2">
              Archive <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ul className="space-y-6">
            {[
              "Designing for high-context users",
              "Clarity in noisy systems",
              "AI-assisted research systems",
              "Workflows and internal tools"
            ].map((note, i) => (
              <motion.li 
                key={i} 
                className="group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to="/notes" className="flex items-center gap-4 text-[15px] font-bold text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group-hover:translate-x-2">
                  <span className="font-mono text-[10px] text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">0{i + 1}</span>
                  {note}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Final CTA */}
      <section className="py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8 leading-tight">
            If you're building tools, workflows, or research surfaces in crypto, <span className="text-blue-600 dark:text-blue-400 underline underline-offset-8 decoration-blue-100 dark:decoration-blue-900/30">let's talk.</span>
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg shadow-zinc-900/10 dark:shadow-white/5 hover:shadow-blue-600/20"
          >
            Contact
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

import { motion } from "motion/react";
import { Download, Mail, Linkedin, Twitter, Globe, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CV() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      
      {/* PAGE 1: CREDIBILITY & FIRST IMPRESSION */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/40 dark:shadow-black/60 min-h-[1100px] font-sans selection:bg-blue-50 dark:selection:bg-blue-900/30 selection:text-blue-700 dark:selection:text-blue-300 relative overflow-hidden transition-colors duration-300"
      >
        {/* Top Header Band */}
        <div className="h-1.5 bg-blue-600 w-full" />

        <div className="p-8 md:p-16">
          {/* Header Section - Page 1 */}
          <header className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20">
            <div className="space-y-6">
              <div>
                <h1 className="text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 mb-3">Hoang Pham</h1>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 max-w-xl leading-tight tracking-tight">
                  Crypto-native designer focused on DeFi workflows, systems, and operator-facing tools
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-y-3 gap-x-4 text-[13px] font-bold text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                  <Mail className="w-3.5 h-3.5" /> hello@hoangpham.design
                </span>
                <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full hidden sm:block" />
                <span className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default">
                  <Globe className="w-3.5 h-3.5" /> hoangpham.design
                </span>
                <div className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full hidden sm:block" />
                <span className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100/50 dark:border-emerald-900/50">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> 
                  Available for select projects
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <button className="group inline-flex items-center gap-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-xl shadow-zinc-900/10 dark:shadow-white/5 hover:shadow-blue-600/20">
                <Download className="w-4 h-4" /> Export Dossier
              </button>
              <div className="flex gap-2">
                <a href="#" className="p-3 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 dark:text-zinc-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-3 bg-zinc-50 dark:bg-zinc-950 text-zinc-400 dark:text-zinc-600 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all rounded-xl border border-zinc-100 dark:border-zinc-800">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </header>

          {/* Page 1 Content Grid */}
          <div className="grid md:grid-cols-12 gap-16">
            
            {/* Left Column: Summary & Top Experience */}
            <div className="md:col-span-8 space-y-20">
              
              {/* Summary */}
              <section className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Executive Summary</h2>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>
                <p className="text-[19px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium italic">
                  "9 years of multidisciplinary design experience across <span className="text-zinc-900 dark:text-zinc-100 font-bold not-italic">visual communication</span>, <span className="text-zinc-900 dark:text-zinc-100 font-bold not-italic">crypto-native environments</span>, and cross-functional creative execution. Strongest at turning dense information into clearer outputs, repeatable workflows, and <span className="text-zinc-900 dark:text-zinc-100 font-bold not-italic">practical systems</span> for high-context teams."
                </p>
              </section>

              {/* Top Experience */}
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Core Experience</h2>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>
                
                <div className="space-y-16">
                  {/* Independent Builder */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="group relative"
                  >
                    <div className="flex flex-col mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">Independent Designer / Builder</h3>
                        <span className="text-[11px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest pt-2">2025 — PRES</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tight">Self-directed / High-Context Freelance</p>
                    </div>
                    <ul className="space-y-4 text-[16px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                        <span>Strategic design partner for <span className="text-zinc-900 dark:text-zinc-100 font-bold">Drift Protocol</span>, focusing on interface clarity and operator-facing workflow optimization.</span>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                        <span>Developing <span className="text-zinc-900 dark:text-zinc-100 font-bold">AI-assisted design systems</span> and automated research surfaces to reduce friction in dense information environments.</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {['Workflow Ops', 'Interface Clarity', 'AI Systems'].map(tag => (
                        <span key={tag} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-black px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/30 uppercase tracking-tight">{tag}</span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Factor */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="group relative"
                  >
                    <div className="flex flex-col mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">Multimedia Marketing Designer</h3>
                        <span className="text-[11px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest pt-2">2024 — 2025</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tight">Factor <span className="text-zinc-300 dark:text-zinc-700 font-normal mx-1">/</span> DeFi Infrastructure</p>
                    </div>
                    <ul className="space-y-4 text-[16px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                        <span>Engineered <span className="text-zinc-900 dark:text-zinc-100 font-bold">modular visual frameworks</span> that scaled across brand, campaign, and product surfaces with 100% consistency.</span>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                        <span>Reduced creative turnaround time by 40% through the implementation of repeatable design workflows and asset libraries.</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {['System Design', 'Visual Ops', 'DeFi Context'].map(tag => (
                        <span key={tag} className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-500 text-[10px] font-black px-3 py-1 rounded-full border border-zinc-100 dark:border-zinc-800 uppercase tracking-tight">{tag}</span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Kyber */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="group relative"
                  >
                    <div className="flex flex-col mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">Multimedia Marketing Designer</h3>
                        <span className="text-[11px] font-black text-zinc-400 dark:text-zinc-600 uppercase tracking-widest pt-2">2022 — 2024</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tight">Kyber Network <span className="text-zinc-300 dark:text-zinc-700 font-normal mx-1">/</span> DeFi Ecosystem</p>
                    </div>
                    <ul className="space-y-4 text-[16px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 shrink-0" />
                        <span>Translated high-complexity DeFi mechanics into <span className="text-zinc-900 dark:text-zinc-100 font-bold">accessible visual narratives</span> for a global crypto-native audience.</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {['Crypto Native', 'Education', 'Visual Comm'].map(tag => (
                        <span key={tag} className="bg-zinc-50 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-500 text-[10px] font-black px-3 py-1 rounded-full border border-zinc-100 dark:border-zinc-800 uppercase tracking-tight">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            </div>

            {/* Right Column: Strengths & Links */}
            <div className="md:col-span-4 space-y-20">
              
              {/* Strengths */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">Strengths</h2>
                </div>
                <div className="space-y-6">
                  {[
                    { title: "Crypto Context", desc: "Deep understanding of DeFi mechanics, liquidity flows, and the visual language of on-chain systems.", variant: "primary" },
                    { title: "Systems Thinking", desc: "Building modular, repeatable, and scalable design logic that improves execution speed and consistency.", variant: "secondary" },
                    { title: "Operator Lens", desc: "Designing for power users and operators who require clarity and speed in dense information environments.", variant: "secondary" }
                  ].map((strength, i) => (
                    <motion.div 
                      key={strength.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={cn(
                        "p-6 rounded-2xl space-y-3 group border transition-all duration-300",
                        strength.variant === "primary" 
                          ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30 hover:border-blue-400" 
                          : "bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-800 hover:border-blue-400"
                      )}
                    >
                      <h4 className={cn(
                        "text-sm font-black uppercase tracking-widest transition-colors",
                        strength.variant === "primary" ? "text-blue-900 dark:text-blue-100" : "text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600"
                      )}>
                        {strength.title}
                      </h4>
                      <p className={cn(
                        "text-[14px] leading-relaxed font-medium transition-colors",
                        strength.variant === "primary" ? "text-blue-800/70 dark:text-blue-300/60" : "text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
                      )}>
                        {strength.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Links */}
              <section className="pt-12 border-t border-zinc-100 dark:border-zinc-800">
                <div className="space-y-6">
                  <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-6">Network</h2>
                  {[
                    { label: "Portfolio", href: "#" },
                    { label: "Casefiles", href: "#" }
                  ].map((link, i) => (
                    <motion.a 
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center justify-between group text-sm font-black text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/20 hover:translate-x-1"
                    >
                      {link.label} <ArrowUpRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all" />
                    </motion.a>
                  ))}
                </div>
              </section>

            </div>
          </div>

          {/* Page 1 Footer */}
          <footer className="mt-32 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <p className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.3em]">Hoang Pham // Dossier_2026 // Page 01</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
              <p className="text-[10px] text-zinc-300 dark:text-zinc-700 font-mono">SIGNAL_STRENGTH: HIGH</p>
            </div>
          </footer>

        </div>
      </motion.div>

      {/* PAGE 2: DEPTH & SUPPORTING PROOF */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xl shadow-black/40 dark:shadow-black/60 min-h-[1100px] font-sans selection:bg-blue-50 dark:selection:bg-blue-900/30 selection:text-blue-700 dark:selection:text-blue-300 relative overflow-hidden transition-colors duration-300"
      >
        <div className="p-8 md:p-16">
          {/* Header Section - Page 2 (Smaller) */}
          <header className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-10 mb-16">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">Hoang Pham</h1>
              <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
              <p className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Dossier // Supporting Proof</p>
            </div>
            <p className="text-[10px] text-zinc-300 dark:text-zinc-700 font-mono">REF: 0x71C...4D2</p>
          </header>

          {/* Page 2 Content Grid */}
          <div className="grid md:grid-cols-12 gap-16">
            
            {/* Left Column: Remaining Experience */}
            <div className="md:col-span-8 space-y-16">
              
              {/* Prior Experience */}
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">Prior Experience</h2>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>
                
                <div className="space-y-12">
                  {/* Role 4 */}
                  <div className="group">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Senior Graphic Designer</h3>
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">2019 — 2022</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tight mb-4">Creative Agency Context</p>
                    <p className="text-[15px] text-zinc-500 dark:text-zinc-500 leading-relaxed">
                      Led visual identity projects for tech-focused clients, establishing brand systems and multi-channel creative strategies. Focused on precision and system-led design execution.
                    </p>
                  </div>

                  {/* Role 5 */}
                  <div className="group">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Visual Designer</h3>
                      <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">2016 — 2019</span>
                    </div>
                    <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tight mb-4">In-house Creative Team</p>
                    <p className="text-[15px] text-zinc-500 dark:text-zinc-500 leading-relaxed">
                      Executed high-volume creative assets while maintaining strict brand guidelines. Developed internal workflows to streamline asset production for marketing teams.
                    </p>
                  </div>
                </div>
              </section>

              {/* Selected Projects / Proof */}
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">Selected Proof Blocks</h2>
                  <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Protocol Brand Systems</h4>
                    <p className="text-[13px] text-zinc-500 dark:text-zinc-500 leading-relaxed">Developed modular brand architectures for three DeFi protocols, ensuring visual consistency across all touchpoints.</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Workflow Automation</h4>
                    <p className="text-[13px] text-zinc-500 dark:text-zinc-500 leading-relaxed">Built custom Figma plugins and automation scripts that reduced manual asset generation by 60%.</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Stack & Education */}
            <div className="md:col-span-4 space-y-16">
              
              {/* Stack */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">Capabilities</h2>
                </div>
                <div className="space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">Design Stack</h4>
                    <div className="space-y-2">
                      {['Figma (Advanced Systems)', 'Framer (Prototyping)', 'Adobe Creative Suite', 'Motion Design'].map(tool => (
                        <div key={tool} className="flex items-center justify-between text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
                          <span>{tool}</span>
                          <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">System Stack</h4>
                    <div className="space-y-2">
                      {['Cursor / AI Workflows', 'n8n / Automation', 'Linear / Ops', 'Technical Research'].map(tool => (
                        <div key={tool} className="flex items-center justify-between text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">
                          <span>{tool}</span>
                          <div className="w-1 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">Education</h2>
                </div>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Bachelor of Design</p>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-500 font-medium">Multimedia & Visual Comm / 2016</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">DeFi Deep Dive</p>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-500 font-medium">Independent Certification / 2022</p>
                  </div>
                </div>
              </section>

              {/* Extras */}
              <section className="pt-10 border-t border-zinc-100 dark:border-zinc-800">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Location</p>
                  <p className="text-[13px] font-semibold text-zinc-700 dark:text-zinc-300">Remote / Global</p>
                </div>
              </section>

            </div>
          </div>

          {/* Page 2 Footer */}
          <footer className="mt-32 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
            <p className="text-[10px] font-black text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.3em]">Hoang Pham // Dossier_2026 // Page 02</p>
            <p className="text-[10px] text-zinc-200 dark:text-zinc-800 font-mono">END_OF_DOSSIER</p>
          </footer>

        </div>
      </motion.div>

    </div>
  );
}

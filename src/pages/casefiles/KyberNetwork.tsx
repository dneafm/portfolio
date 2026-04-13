import { CasefileTemplate } from "@/components/CasefileTemplate";
import { LazyVideo } from "@/components/LazyVideo";

export function KyberNetwork() {
  return (
    <CasefileTemplate
      title="Kyber Network"
      subtitle="Designing clarity in a fast-moving DeFi environment"
      context="DeFi Ecosystem / Fast-moving crypto setting"
      role="Multimedia Marketing Designer"
      problem="Dense crypto ideas needed to be translated into clearer communication while keeping outputs coherent across fast-moving initiatives."
      approach={
        <>
          <p>
            Working inside a fast-moving DeFi environment required more than just producing marketing assets. The core challenge was translating dense crypto context into clearer communication for crypto-native audiences.
          </p>
          <p>
            I focused on coherence and clarity in a noisy environment. Because the team needed to ship quickly and often, repeated outputs needed consistency. The value was not just in polished visuals, but in making high-context information easier to process across campaigns, educational content, and ecosystem-facing communication.
          </p>
        </>
      }
      artifacts={
        <>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden rounded-xl relative group">
              <LazyVideo 
                src="/volatile banner.mp4" 
                poster="/Untitled (2).png"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 rounded-xl pointer-events-none" />
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">CAMPAIGN_VISUALS</span>
              <span className="font-mono text-[10px] text-blue-500/70">VOLATILE_TRADING_MAYHEM</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden rounded-xl relative group">
              <LazyVideo 
                src="/KyberAI nft.mp4" 
                poster="/Untitled (3).png"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 rounded-xl pointer-events-none" />
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">BRAND_IDENTITY</span>
              <span className="font-mono text-[10px] text-blue-500/70">KYBER_AI_CORE</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden rounded-xl relative group">
              <LazyVideo 
                src="/long version.mp4" 
                poster="/Untitled (4).png"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 rounded-xl pointer-events-none" />
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">LAUNCH_TRAILER</span>
              <span className="font-mono text-[10px] text-blue-500/70">APE_SMART_POWERED</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden rounded-xl relative group">
              <LazyVideo 
                src="/thank you doodle.mp4" 
                poster="/Untitled (5).png"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 rounded-xl pointer-events-none" />
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">COMMUNITY_ENGAGEMENT</span>
              <span className="font-mono text-[10px] text-blue-500/70">THANK_YOU_DOODLE</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h3 className="font-mono text-sm text-zinc-400 uppercase tracking-widest">Static Assets & Campaign Graphics</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Untitled.png",
              "Untitled (1).png",
              "Untitled (2).png",
              "Untitled (3).png",
              "Untitled (4).png",
              "Untitled (5).png",
              "Untitled (6).png"
            ].map((img, i) => (
              <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden rounded-xl relative group">
                <img 
                  src={`/${img}`} 
                  alt={`Kyber Campaign Graphic ${i + 1}`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </>
      }
      outcome="Made high-context information easier to process across campaigns, educational content, and ecosystem-facing communication."
      lessons="Turning complexity into something clearer without flattening the nuance."
      nextSteps="Move even closer to communication systems, reusable frameworks, and operator-facing product surfaces."
    />
  );
}

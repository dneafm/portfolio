import { CasefileTemplate } from "@/components/CasefileTemplate";
import { LazyVideo } from "@/components/LazyVideo";

export function Factor() {
  return (
    <CasefileTemplate
      title="Factor"
      subtitle="Building more repeatable design workflows"
      context="DeFi Protocol"
      role="Multimedia Marketing Designer"
      problem="Recurring design needs created inconsistency and repeated effort across campaigns, internal materials, and product-adjacent communication."
      approach={
        <>
          <p>
            The goal was to move beyond isolated visuals and think more about reusable formats and recurring structure. Design needed to become more useful as a working framework, not just a final artifact.
          </p>
          <p>
            I created lower-friction output patterns and built reusable design logic. This improved consistency across ongoing design work and helped the team move faster without sacrificing clarity through reusable structures, modular layouts, and more repeatable workflows.
          </p>
        </>
      }
      artifacts={
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative group">
            <LazyVideo 
              src="/dapp revamp.mp4" 
              className="w-full h-full"
              showControls
            />
            <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-900/80 px-2 py-1 rounded backdrop-blur-sm">DAPP_REVAMP</span>
            </div>
          </div>
          <div className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative group">
            <LazyVideo 
              src="/mma cubik.mp4" 
              className="w-full h-full"
              showControls
            />
            <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-900/80 px-2 py-1 rounded backdrop-blur-sm">MODULAR_LAYOUTS</span>
            </div>
          </div>
          <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative group sm:col-span-2">
            <LazyVideo 
              src="/Anim.mp4" 
              className="w-full h-full"
              showControls
            />
            <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-900/80 px-2 py-1 rounded backdrop-blur-sm">ANIMATION_SYSTEMS</span>
            </div>
          </div>
        </div>
      }
      outcome="Improved speed and consistency through reusable structures, modular layouts, and more repeatable workflows."
      lessons="Good design is not only expression, it is also structure."
      nextSteps="Keep moving toward workflows, components, internal tooling, dashboards, and structures that reduce friction."
    />
  );
}

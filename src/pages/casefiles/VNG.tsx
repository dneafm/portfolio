import { CasefileTemplate } from "@/components/CasefileTemplate";
import { LazyVideo } from "@/components/LazyVideo";

export function VNG() {
  return (
    <CasefileTemplate
      title="VNG / Zingplay"
      subtitle="High-conversion motion design for mobile gaming"
      context="Mobile Gaming Campaign"
      role="Motion & Marketing Designer"
      problem="Needed to create highly engaging, snappy promotional assets to drive user acquisition and communicate in-game rewards clearly within a short attention span."
      approach={
        <>
          <p>
            For the "Océano De Suerte" campaign, the goal was to capture the playful, vibrant energy of the Zingplay brand while clearly communicating the real-world prizes available to players.
          </p>
          <p className="mt-4">
            I focused on snappy pacing and seamless transitions—like using the fishing bobber to pull the viewer underwater into the prize reveal. This approach ensures the viewer stays hooked through the entire ad lifecycle, balancing character animation with clear, conversion-driven typography.
          </p>
        </>
      }
      artifacts={
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative group">
              <LazyVideo 
                src="/232.mp4" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                showControls
              />
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
            </div>
            <div className="aspect-square bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative group">
              <LazyVideo 
                src="/244.mp4" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                showControls
              />
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
            </div>
            <div className="aspect-video bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative group sm:col-span-2">
              <LazyVideo 
                src="/Comp2.mp4" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                showControls
              />
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">Image campaign set</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {['1', '2', '3', '4', '5', '6'].map((image) => (
                <div key={image} className="bg-zinc-900 border border-zinc-800 overflow-hidden relative group rounded-sm">
                  <img
                    src={`/vng/vng-${image}.png`}
                    alt={`VNG campaign visual ${image}`}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      outcome="Delivered versatile, high-quality motion assets that successfully captured the playful brand identity while driving campaign engagement."
      lessons="Designing for consumer mobile gaming requires a completely different visual vocabulary than B2B or DeFi—prioritizing immediate visual impact, bright color palettes, and rapid reward communication."
      nextSteps="Continue leveraging versatile motion design skills across different brand identities."
    />
  );
}

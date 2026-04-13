import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

export function LazyVideo({ src, poster, className, showControls = false }: { src: string; poster?: string; className?: string; showControls?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isCover, setIsCover] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.play().catch(err => {
        console.warn("Autoplay failed:", err);
      });
    }
  }, [src]);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (ref.current) {
      ref.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCover(!isCover);
  };

  const videoElement = (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      loop
      muted={showControls ? isMuted : true}
      playsInline
      preload="auto"
      controls={showControls}
      className={`w-full h-full transition-all duration-500 ${isCover ? 'object-cover' : 'object-contain'} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoadedData={() => setIsLoaded(true)}
      onError={() => {
        console.error("Video failed to load:", src);
        setIsLoaded(true); // Stop showing loading on error
      }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  return (
    <div className={`relative group w-full h-full overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm">
          <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      
      {videoElement}

      {showControls && (
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button 
            onClick={toggleFit} 
            className="p-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full backdrop-blur-sm transition-colors border border-zinc-700/50"
            title={isCover ? "Show untrimmed" : "Fill container"}
          >
            {isCover ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
          <button 
            onClick={toggleMute} 
            className="p-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-full backdrop-blur-sm transition-colors border border-zinc-700/50"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}

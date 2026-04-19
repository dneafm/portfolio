import { HeroBackground } from "./HeroBackground";
import { HeroCopy } from "./HeroCopy";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative w-full overflow-visible pt-0 pb-3 md:min-h-[100svh] md:pt-0 md:pb-14 lg:left-1/2 lg:right-1/2 lg:ml-[-50vw] lg:mr-[-50vw] lg:w-screen lg:overflow-visible">
      <HeroBackground />

      <div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1440px] items-start gap-2 px-5 pt-3 md:min-h-[100svh] md:gap-14 md:px-6 md:pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-10 lg:pt-8">
        <HeroCopy />
        <HeroVisual />
      </div>
    </section>
  );
}

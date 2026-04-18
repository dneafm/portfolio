export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-x-0 -top-12 bottom-0 pointer-events-none md:-top-12">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_78%,transparent_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,107,255,0.22),transparent_38%),radial-gradient(circle_at_78%_34%,rgba(153,102,204,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,244,245,0.94))] dark:bg-[radial-gradient(circle_at_top,rgba(46,107,255,0.28),transparent_38%),radial-gradient(circle_at_78%_34%,rgba(153,102,204,0.22),transparent_34%),linear-gradient(180deg,rgba(9,9,11,0.97),rgba(3,7,18,0.99))]" />
          <div className="absolute inset-0 w-full bg-[linear-gradient(to_right,rgba(24,24,27,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.45)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.08] mix-blend-soft-light dark:opacity-[0.12] lg:w-screen" />
        </div>
      </div>

      <div className="absolute left-1/2 top-[1%] -z-[1] h-[58vh] w-[58vh] min-h-[320px] min-w-[320px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(61,102,255,0.14),transparent_58%)] blur-3xl md:h-[74vh] md:w-[74vh] md:min-h-[420px] md:min-w-[420px]" />
      <div className="absolute left-1/2 top-[0%] -z-[1] h-[56vh] w-[56vh] min-h-[320px] min-w-[320px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(33,97,235,0.9),rgba(153,102,204,0.8))] opacity-25 blur-[42px] [clip-path:polygon(50%_0%,88%_18%,95%_46%,71%_80%,50%_100%,27%_82%,7%_58%,12%_18%)] md:h-[72vh] md:w-[72vh] md:min-h-[420px] md:min-w-[420px] md:opacity-30 md:blur-[52px]" />
    </>
  );
}

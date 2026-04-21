import { CasefileTemplate } from "@/components/CasefileTemplate";

const artifacts = [
  {
    src: "/dj-djtrade_v3_live_shell_overview.png",
    label: "CONTROL_SURFACE",
    detail: "Hero overview showing live state, system health, and operator guidance in one trading control surface.",
  },
  {
    src: "/dj-djtrade_v3_reports_snapshot_drawer.png",
    label: "SNAPSHOT_DRAWER",
    detail: "Drill-down evidence layer for inspecting what changed and why it matters.",
  },
  {
    src: "/dj-djtrade_v3_reports_compare_ui.png",
    label: "COMPARE_VIEW",
    detail: "Supports side-by-side review, comparison, and faster decision-making.",
  },
  {
    src: "/dj-djtrade_v3_live_degraded_connection_ui.png",
    label: "DEGRADED_STATE",
    detail: "Makes failure states visible so the operator can judge trust before acting.",
  },
];

export function DJTrade() {
  return (
    <CasefileTemplate
      title="DJ Trade"
      subtitle="Built a trading operations surface for monitoring, reconciliation, and execution clarity."
      context="Operator-facing trading workflow / high-noise monitoring environment"
      role="Product design, workflow design, interface design, and implementation direction"
      problem="Trading activity was fragmented across reports, states, and execution signals. The issue was not lack of data, but operator overload: too many moving parts, unclear priority, and weak visibility into what deserved attention first."
      approach={
        <>
          <p>
            DJ Trade started as an attempt to make dense trading activity easier to monitor, review, and act on. I approached it less like a market dashboard and more like an operational surface: what needs attention now, what changed, what is degraded, and what decision should happen next.
          </p>
          <p>
            The work focused on scanability under pressure, clearer comparison paths, and stronger trust signals before execution. DJ Trade is where new strategies are forged, tested, and turned into operational workflows. Reports were treated as live workflow objects rather than static outputs, so the interface could support follow-up and judgment instead of just display.
          </p>
        </>
      }
      artifacts={
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
              <img
                src={artifacts[0].src}
                alt="DJ Trade reporting queue hero screenshot"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{artifacts[0].label}</span>
              <span className="max-w-xl text-right text-xs text-zinc-500 dark:text-zinc-400">{artifacts[0].detail}</span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {artifacts.slice(1).map((artifact) => (
              <div key={artifact.label} className="space-y-4">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                  <img
                    src={artifact.src}
                    alt={artifact.label}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2 px-1">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">{artifact.label}</div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{artifact.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      outcome="The result moved the experience away from a generic market dashboard and toward a decision-support tool. Its value is not only visual polish, but the way it structures noisy trading context into clearer operational judgment."
      lessons="In trading workflows, clarity comes less from simplification and more from useful structure. Operators need to see priority, confidence, and degraded conditions without digging through noise."
      nextSteps="I would push the system further with stronger execution-readiness views, more explicit follow-up states, and tighter links between reports, comparison, and action history."
    />
  );
}

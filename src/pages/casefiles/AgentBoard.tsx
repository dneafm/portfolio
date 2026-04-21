import { CasefileTemplate } from "@/components/CasefileTemplate";

const artifacts = [
  {
    src: "/casefiles/agentboard/agentboard-projects-workspace.jpg",
    label: "PROJECTS_WORKSPACE",
    detail: "Projects workspace keeps global triage, blocked tasks, project priorities, progress, and durable project links visible in one board-native surface.",
  },
  {
    src: "/casefiles/agentboard/agentboard-deerflow-agents.jpg",
    label: "DEERFLOW_AGENTS",
    detail: "Agent operations view keeps runtime health, active versus idle lanes, recent results, and ownership visible when the operator needs to inspect who is working and what to send next.",
  },
  {
    src: "/casefiles/agentboard/agentboard-rangepilot-task-picks.jpg",
    label: "TASK_PICKS",
    detail: "Task picks view shows how AgentBoard turns a project into a real operating queue, with NOW versus NEXT lanes, current agent assignment, verification state, and the next decision kept visible together.",
  },
];

export function AgentBoard() {
  return (
    <CasefileTemplate
      title="AgentBoard / HumanBoard"
      subtitle="Built a board-native decision system for turning messy information into prioritized action."
      context="Knowledge operations / AI-assisted workflow / prioritization system"
      role="Product concept, information architecture, workflow design, prioritization model, and implementation direction"
      problem="Knowledge tools often collect too much and decide too little. Backlogs become archives, research turns into noise, long-horizon goals get flattened into the same daily list, and in AI-heavy workflows task context often gets trapped inside scattered chats or one vendor layer."
      approach={
        <>
          <p>Knowledge tools often collect too much and decide too little. Backlogs become archives. Research turns into noise. Long-horizon goals get flattened into the same daily list.</p>
          <p>AI workflows add another layer of fragility. Task context and decisions often live inside scattered chats, or worse, inside one vendor layer.</p>
          <p>I designed AgentBoard as a shared operational layer for that mess. It moves tasks, context, blockers, proofs, and handoffs out of fragile chat state and into a board-native system the team can actually work from.</p>
          <p>Separate lanes help different kinds of work stay legible. Active work stays active. Bridge paths stay visible. Longer-horizon opportunities stay present without pretending they are urgent.</p>
        </>
      }
      artifacts={
        <div className="space-y-12">
          <div className="space-y-4">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 dark:border-zinc-800">
              <img
                src={artifacts[0].src}
                alt="AgentBoard review center screenshot"
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
      outcome="The result behaves more like an operating surface than a note archive. Its value is in helping a person or team decide what matters now, what should be tested soon, and what should stay on a lower-frequency watchlist until the evidence changes."
      lessons="Judgment-heavy workflows need structure more than storage. The hard part is not capturing information, but creating review loops that keep priority, evidence, and optionality legible without turning everything into urgency."
      nextSteps="I would push it further with cleaner evidence views, stronger bridge and incubation workflows, and tighter support for multi-agent handoffs without losing human judgment at the center."
    />
  );
}

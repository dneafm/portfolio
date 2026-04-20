export const notes = [
  {
    id: "note-01",
    title: "Designing for high-context users",
    date: "2024-03-15",
    excerpt: "Why standard UX advice often falls short when building for experienced users in complex domains like DeFi.",
    content: `
      Standard UX advice often prioritizes simplicity and "reducing cognitive load" above all else. That works well for many consumer apps, but it can become limiting when the audience needs more context to make good decisions.

      In DeFi, someone is rarely just "sending money." They may be managing liquidity, monitoring slippage, and balancing risk across multiple protocols. Hiding too much of that complexity behind a "simple" interface can actually increase risk.

      ### A Different Mental Model
      In these environments, people often need visibility and control more than hand-holding. The interface should help them understand what is happening and act with confidence.

      ### Key Principles:
      1. **Useful density**: Use space to surface what matters.
      2. **Direct interaction**: Let people work with the information itself, not only through abstract forms.
      3. **Clear reasoning**: Show the "why" behind the numbers.
    `
  },
  {
    id: "note-02",
    title: "Clarity in crypto",
    date: "2024-02-28",
    excerpt: "Balancing the need to explain complex mechanics with the need to keep interfaces clean and actionable.",
    content: `
      The crypto space is notorious for jargon and technical complexity. Designing for clarity means translating these mechanics into a language that is both accurate and accessible.

      ### The Translation Layer
      We need to bridge the gap between "on-chain reality" and "user perception." This involves:
      - Visualizing smart contract states.
      - Explaining transaction lifecycles.
      - Providing clear feedback for asynchronous actions.
    `
  },
  {
    id: "note-03",
    title: "Designing for active workflows",
    date: "2024-01-12",
    excerpt: "The difference between designing for passive consumption and task-heavy work.",
    content: `
      Some users want to be entertained or complete one simple task. Others need to stay in control of a messy process and move through it quickly.

      ### Design for Control
      - **Keyboard-first support**: Experienced users rely on shortcuts.
      - **Flexible layouts**: Let people decide what information matters most.
      - **Batch actions**: Support faster execution when the work repeats.
    `
  },
  {
    id: "note-04",
    title: "Dashboards and decision surfaces",
    date: "2023-11-05",
    excerpt: "A dashboard is only useful if it helps you make a decision. Otherwise, it's just decoration.",
    content: `
      Too many dashboards are just "data graveyards." A true decision surface highlights the information that requires action.

      ### Actionable Data
      - **Thresholds and Alerts**: Don't just show a number; show if it's "good" or "bad."
      - **Contextual Actions**: Provide the button to fix the problem right next to the data showing the problem.
    `
  },
  {
    id: "note-05",
    title: "AI-assisted work",
    date: "2023-09-20",
    excerpt: "Moving beyond the chat interface to integrate AI into actual work.",
    content: `
      Chatbots are only the starting point. The more interesting use of AI is inside real work, where it can help people move faster, notice patterns, and reduce repetitive effort.

      ### Beyond the Chatbox
      - **Workflow assistance**: Predicting the next step in a complex process.
      - **Synthesis of raw input**: Turning scattered logs and notes into clearer takeaways.
    `
  }
];

export const experiments: any[] = [
  {
    id: "dj-trade",
    title: "DJ Trade: Standardizing Trading Workflow",
    status: "Case Study",
    description: "Built a tool to standardize trading workflow and reduce decision chaos during live execution.",
    details: "DJ Trade turns manual trading from a messy, memory-heavy process into a more structured operating workflow, with clearer readiness checks, review surfaces, and execution context.",
    caseStudy: {
      headline: "Built a tool to standardize trading workflow and reduce decision chaos during live execution",
      summary: "DJ Trade turns manual trading from a messy, memory-heavy process into a more structured operating workflow, with clearer readiness checks, review surfaces, and execution context.",
      metaStrip: [
        { label: "Role", value: "Product design, workflow design, trading operations UX" },
        { label: "Focus", value: "Manual trading standardization" },
        { label: "Outcome", value: "Clearer execution, review, and discipline" }
      ],
      problem: [
        "Manual trading breaks down in predictable ways.",
        "The issue is rarely just market direction.",
        "It is the workflow around the trade: entries influenced by emotion, inconsistent setup judgment, scattered context, skipped risk checks, and weak post-trade review.",
        "A trader may have a method in theory...",
        "But not a system that helps apply it consistently in practice."
      ],
      theIdea: {
        text: [
          "DJ Trade was designed as a tool to standardize how trades are prepared, monitored, and reviewed.",
          "Instead of treating trading like a sequence of isolated clicks...",
          "It treats it like an operational workflow.",
          "DJ Trade is where new strategies are forged, tested, and turned into operational workflows.",
          "Reports are treated as live workflow objects rather than static outputs, so the interface can support follow-up and judgment instead of just display.",
          "It helps keep these parts connected:"
        ],
        bullets: ["Market context", "Setup quality", "Readiness checks", "Execution state", "Risk controls", "Degraded conditions", "Post-trade review"]
      },
      aiIntegration: {
        title: "DJ Trade brings AI directly into the trading workflow.",
        description: "Instead of switching between charts, notes, and separate AI chats, traders can describe setups in plain language and get immediate decision support inside the product itself.",
        examples: [
          "“I’d buy on a chart like this”",
          "“I’d sell when structure starts looking like that”",
          "“Does this setup match my method?”",
          "“What changed since the last review?”"
        ],
        closing: "By keeping AI inside the workflow, DJ Trade makes discretionary trading faster, clearer, and more consistent, without turning it into a black-box automation tool."
      },
      howItWorks: [
        { title: "Structured setup review", desc: "A trade starts with clearer context, not just a feeling from the chart." },
        { title: "Readiness before execution", desc: "The tool checks whether the setup is actually ready, instead of letting execution happen on impulse." },
        { title: "Risk visible in the workflow", desc: "Position logic, degraded conditions, and trade readiness become part of the process, not an afterthought." },
        { title: "Live context during the trade", desc: "The trader can monitor what changed, what matters, and whether conditions still support the position." },
        { title: "Better exit and settlement visibility", desc: "Execution outcome and settlement details are easier to review after the trade closes." },
        { title: "Post-trade learning loop", desc: "The trade becomes something that can be reviewed and improved, not just remembered vaguely." }
      ],
      usefulBullets: [
        "Reduces emotional and inconsistent execution",
        "Makes trade preparation more repeatable",
        "Brings risk and readiness checks forward",
        "Helps traders act with more structure under pressure",
        "Improves visibility during degraded or uncertain conditions",
        "Supports post-trade review and method refinement"
      ],
      outcome: "DJ Trade moves manual trading away from reactive chart-watching and toward a more standardized operational method. The value is not only better interface clarity. It is the ability to apply a trading method with more consistency, better checks, and stronger review.",
      closingLine: "DJ Trade helps standardize manual trading so decisions rely less on memory and impulse, and more on structured workflow.",
      images: [
        { src: "/dj-djtrade_v3_reports_queue_wording_live_full.png", role: "hero", story: "Reporting queue reframed as a live operational surface, not a passive dashboard." },
        { src: "/dj-djtrade_v3_reports_snapshot_drawer.png", role: "support-1", story: "Snapshot drawer showing drill-down depth, evidence inspection, and review continuity." },
        { src: "/dj-djtrade_v3_reports_compare_ui.png", role: "support-2", story: "Compare view for evaluating what changed and why it matters before acting." },
        { src: "/dj-djtrade_v3_live_degraded_connection_ui.png", role: "support-3", story: "Degraded-state handling that keeps operator trust visible under imperfect live conditions." }
      ]
    }
  },
  {
    id: "agent-board",
    title: "AgentBoard: Command Center for Human + AI Execution",
    status: "Case Study / In Progress",
    description: "A work-management layer for operators building with AI. It makes priorities, blockers, proofs, and next actions legible.",
    details: "AgentBoard is built for real execution, not fake productivity. It gives you a live workspace where projects, blockers, proof of work, and agent activity stay connected, so you can move from idea to verified outcome without losing context.",
    caseStudy: {
      headline: "Built a coordination layer for working with AI agents without losing context, proof, or control",
      summary: "AgentBoard helps humans and AI agents work inside a shared operational system, where tasks, blockers, verification, artifacts, and handoffs stay connected from start to finish.",
      metaStrip: [
        { label: "Role", value: "Product design, workflow design, system thinking" },
        { label: "Focus", value: "Human + agent collaboration" },
        { label: "Outcome", value: "Clearer execution, review, and handoff" }
      ],
      problem: [
        "Working with agents gets messy fast.",
        "The issue is usually not raw agent capability.",
        "It is everything around the agent: context scattered across chats, unclear task state, invisible blockers, weak handoffs, 'done' without proof, and expensive retries...",
        "Most agent workflows generate activity.",
        "Fewer generate reliable progress."
      ],
      theIdea: {
        text: [
          "AgentBoard was designed as the coordination layer between human intent and agent execution.",
          "Instead of treating agents like isolated chat threads...",
          "It treats them like collaborators inside a visible work system.",
          "The system is opinionated about priority, proof, blockers, and next action, so work stays reviewable instead of dissolving into chat history.",
          "It keeps these parts connected:"
        ],
        bullets: ["Task context", "Project state", "Blockers", "Proof notes", "Artifacts", "Handoffs", "Next actions"]
      },
      howItWorks: [
        { title: "Structured task intake", desc: "Each task starts with a goal, context, constraints, and priority." },
        { title: "Shared project visibility", desc: "AgentBoard makes active, blocked, next, and completed work legible." },
        { title: "Agent execution with continuity", desc: "Agents work from structured history instead of restarting from blank context." },
        { title: "Proof tied to the task", desc: "Artifacts, notes, screenshots, and verification stay attached to the work." },
        { title: "Human-in-the-loop review", desc: "Humans can approve, redirect, or refine without breaking continuity." },
        { title: "Reusable workflow learning", desc: "Repeated patterns can become templates, runbooks, or stable systems." }
      ],
      usefulBullets: [
        "Reduces context loss",
        "Makes blockers visible earlier",
        "Improves handoff quality",
        "Makes agent work easier to review",
        "Turns outputs into verifiable progress",
        "Creates a foundation for repeatable human + agent workflows"
      ],
      outcome: "AgentBoard moves agent collaboration away from scattered conversations and toward a real operating system for work. The value is not just faster execution. It is better continuity, better review, and better trust in what got done.",
      closingLine: "AgentBoard solves the coordination problem around AI agents, not just the execution problem.",
      images: [
        { src: "/casefiles/agentboard/agentboard-review-center-focus.png", role: "hero", story: "Review center view showing prioritized work, proof, and next action in one operating surface." },
        { src: "/casefiles/agentboard/agentboard-roadmap-structure.png", role: "support-1", story: "Lane structure view showing roadmap shape, sequencing, and project-level prioritization." },
        { src: "/agentboard-detail-drawer.jpg", role: "support-2", story: "Detail drawer showing blocker, proof note, and handoff depth instead of shallow task tracking." }
      ]
    }
  }
];

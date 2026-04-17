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

export type ExperimentVisualType =
  | "signal-triage"
  | "bot-control"
  | "note-compiler"
  | "ops-workflow"
  | "community-router"
  | "sybil-triage";

export type Experiment = {
  id: string;
  title: string;
  status: string;
  description: string;
  details: string;
  visual: ExperimentVisualType;
};

export const experiments: Experiment[] = [
  {
    id: "exp-01",
    title: "Crypto research triage",
    status: "Concept",
    description: "A concept for reviewing market signals, research fragments, and watchlist movement in one focused view for faster scanning and prioritization.",
    details: "This experiment explores a high-density review interface for crypto analysts. It groups and surfaces raw inputs in a way that makes scanning and prioritization faster.",
    visual: "signal-triage"
  },
  {
    id: "exp-02",
    title: "Bot supervision panel",
    status: "Concept / Early prototype",
    description: "A dashboard concept for supervising automated trading flows while keeping manual intervention clear, fast, and deliberate.",
    details: "A supervision interface for algorithmic trading. The focus is how quickly someone can understand a bot's state, inspect alerts, and take manual control if needed.",
    visual: "bot-control"
  },
  {
    id: "exp-03",
    title: "AI Note Compiler",
    status: "In progress",
    description: "A workflow experiment for converting raw notes, scattered observations, and incomplete research into more structured summaries, insights, and reusable knowledge.",
    details: "Using LLMs to synthesize fragmented research. The tool takes voice notes, screenshots, references, and text snippets, then restructures them into clearer insight objects and reusable knowledge blocks.",
    visual: "note-compiler"
  },
  {
    id: "exp-04",
    title: "Team workflow tracker",
    status: "Concept",
    description: "A lightweight concept aimed at reducing friction in recurring coordination, structured input, and operational follow-through.",
    details: "A tool for managing operational debt in small teams. It focuses on recurring tasks, structured updates, and closing the loop on things that usually slip between handoffs.",
    visual: "ops-workflow"
  },
  {
    id: "exp-05",
    title: "Community inbox triage",
    status: "Concept",
    description: "An AI-assisted triage interface that sorts Discord and Telegram feeds by urgency, relevance, and follow-up intent.",
    details: "This explores a routing layer for community operations. The goal is to turn noisy incoming chat streams into clearer queues for support, product feedback, reputation risk, and growth opportunities.",
    visual: "community-router"
  },
  {
    id: "exp-06",
    title: "Retention and sybil review",
    status: "Concept",
    description: "A visual matrix that plots users based on on-chain behavior versus social and product engagement signals.",
    details: "This experiment maps retention quality and sybil suspicion into one review surface. It is meant to help teams separate real user value from incentive-only activity faster.",
    visual: "sybil-triage"
  }
];

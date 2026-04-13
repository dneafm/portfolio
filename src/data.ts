export const notes = [
  {
    id: "note-01",
    title: "Designing for high-context users",
    date: "2024-03-15",
    excerpt: "Why standard UX advice often fails when building for power users in complex domains like DeFi.",
    content: `
      Standard UX advice often prioritizes simplicity and "reducing cognitive load" above all else. While this is great for consumer apps, it can be a hindrance for high-context users—operators who need to see the full state of a system to make informed decisions.

      In DeFi, an operator isn't just "sending money." They are managing liquidity, monitoring slippage, and balancing risk across multiple protocols. Hiding this complexity behind a "simple" interface actually increases risk by obscuring critical information.

      ### The Operator Mental Model
      An operator doesn't want a "wizard" that guides them through a process. They want a "dashboard" that gives them the tools to execute their own strategy.

      ### Key Principles:
      1. **Information Density over White Space**: Use space to show more data, not less.
      2. **Direct Manipulation**: Allow users to interact with the data directly, rather than through abstract forms.
      3. **System Transparency**: Show the "why" behind the numbers.
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
    title: "Operator workflows",
    date: "2024-01-12",
    excerpt: "The difference between designing for a passive consumer and an active operator.",
    content: `
      A passive consumer wants to be entertained or to complete a simple task. An active operator wants to control a system.

      ### Design for Control
      - **Keyboard First**: Power users rely on shortcuts.
      - **Customizable Layouts**: Let the user decide what information is most important.
      - **Batch Operations**: Allow for high-velocity execution.
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
    excerpt: "Moving beyond the chat interface to integrate AI into actual workflows.",
    content: `
      Chatbots are just the beginning. The real power of AI in design is in "ambient intelligence"—systems that anticipate user needs and provide contextual assistance without being asked.

      ### Beyond the Chatbox
      - **Auto-complete for Workflows**: Predicting the next step in a complex process.
      - **Synthesis of Raw Data**: Turning logs into insights automatically.
    `
  }
];

export const experiments = [
  {
    id: "exp-01",
    title: "Crypto Signal Triage Surface",
    status: "Concept",
    description: "A concept for reviewing market signals, research fragments, and watchlist movement in one focused environment designed for faster scanning and prioritization.",
    details: "This experiment explores a high-density triage interface for crypto analysts. It uses a 'signal-first' layout where raw data is automatically categorized and prioritized based on user-defined weights."
  },
  {
    id: "exp-02",
    title: "Bot Control Panel Concept",
    status: "Concept / Early prototype",
    description: "An operator-facing dashboard idea for supervising automated trading flows while keeping manual intervention clear, fast, and deliberate.",
    details: "A supervision interface for algorithmic trading. The focus is on 'intervention latency'—how quickly an operator can understand a bot's state and take manual control if necessary."
  },
  {
    id: "exp-03",
    title: "AI Note Compiler",
    status: "In progress",
    description: "A workflow experiment for converting raw notes, scattered observations, and incomplete research into more structured summaries, insights, and reusable knowledge.",
    details: "Using LLMs to synthesize fragmented research. The tool takes voice notes, screenshots, and text snippets and builds a cohesive knowledge graph."
  },
  {
    id: "exp-04",
    title: "Internal Ops Workflow Tool",
    status: "Concept",
    description: "A lightweight internal-tool concept aimed at reducing friction in recurring coordination, structured input, and operational follow-through.",
    details: "A tool for managing 'operational debt' in small teams. It focuses on closing the loop on recurring tasks that often fall through the cracks."
  }
];

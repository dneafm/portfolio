---
name: portfolio-safe-push
description: "Use when the user asks to push the current `portfolio` repo to GitHub from the shared workspace, especially when local scratch files or untracked tooling may be present. Examples: 'push current portfolio to github', 'commit and push portfolio', 'publish portfolio main branch'."
---

# Safe Push for Portfolio

Use this when working in `F:\backtest\portfolio` and the goal is to publish the current repo state without leaking workspace junk.

## Workflow

1. Confirm repo state.
   - `git -C portfolio status --short`
   - `git -C portfolio status -sb`
   - `git -C portfolio branch --show-current`
   - `git -C portfolio log -1 --oneline`

2. Check what is already ahead of GitHub.
   - `git -C portfolio ls-remote origin refs/heads/main`
   - `git -C portfolio log --oneline origin/main..HEAD`

3. Inspect tracked changes before staging.
   - `git -C portfolio diff --stat`
   - `git -C portfolio diff -- <path>`

4. Treat common local noise as local-only unless the user explicitly wants it committed.
   - `.claude/`
   - `AGENTS.md`
   - `CLAUDE.md`
   - `_local_archive/`
   - `tmp_*.py`
   - `tmp_*.ps1`
   - zip files
   - logs
   - `.gitnexus/`

5. Stage only intentional tracked files.
   - If there are no new tracked changes and `main` is already ahead, just push.
   - If a tracked ignore rule is missing for local tooling, stage `.gitignore` deliberately.

6. Commit with a concrete message only for intentional tracked changes.

7. Push the branch.
   - `git -C portfolio push origin main`

8. Refresh the local index after the push.
   - `npx gitnexus analyze`

9. Report back clearly.
   - Which commits were pushed
   - Whether `main` is now in sync with `origin/main`
   - Which local untracked files were intentionally left alone

## Guardrails

- Never add all untracked files by default.
- Never treat the whole shared workspace as repo content.
- If multiple tracked changes exist and intent is unclear, pause and confirm before committing.
- Leave unrelated local edits untouched.
- Prefer a tiny cleanup commit over accidentally pushing scratch files.

## Good Outcome

The repo ends the task with:

- intentional tracked changes committed
- `main` synced to GitHub
- local scratch files still local

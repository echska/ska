---
name: starter-skill
description: Build and execute small, repeatable implementation workflows with a consistent structure: clarify scope, plan work, implement changes, validate outcomes, and summarize results. Use when a request is underspecified, when consistent delivery quality is needed across tasks, or when Codex should follow a reusable step-by-step execution template.
---

# Starter Skill

## Overview
Use this skill to run a compact delivery workflow that keeps implementation predictable and reviewable.
Favor this workflow for multi-step engineering tasks where scope, validation, and handoff quality matter.

## Workflow
1. Restate the goal in one sentence and list assumptions.
2. Inspect relevant files and constraints before editing.
3. Make the smallest viable change that solves the request.
4. Run targeted checks for the changed surface area.
5. Summarize what changed, why, and how it was validated.

## Output Format
- **Goal:** concise objective statement.
- **Plan:** 2-5 concrete steps.
- **Changes:** file-by-file summary.
- **Validation:** exact commands and outcomes.
- **Risks/Follow-ups:** only if needed.

## Quality Bar
- Keep diffs minimal and easy to review.
- Prefer deterministic commands over manual steps.
- Call out unknowns explicitly instead of guessing.
- Do not claim validation you did not run.

## References
- Use `references/checklist.md` for a quick pre-delivery checklist.

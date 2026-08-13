# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Accepted Prototype Decisions

- Keep the borderless, full-viewport presentation treatment.
- Page 3 uses `public/pages/page-3-filled-v3.png`, with a dark navy, cyan, and gold financial-education/security illustration fully covering the original right-hand placeholder. Keep its clean, muted olive-gold rounded outline consistent with the other content cards; do not restore broken-image remnants or side bands. Preserve the page text and layout.
- On page 9, the visible email address links to `mailto:info@jdi-justice.io`. Keep that hotspot aligned directly over the rendered email text. The visible website address remains display-only and must not be clickable until the domain is ready.

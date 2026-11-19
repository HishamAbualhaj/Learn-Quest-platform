<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project design conventions

- Use `rounded-md` for UI corners by default. Use another radius only when the user explicitly requests it; circular loading indicators are functional shapes.
- Use `text-sm` (14px) as the minimum size for user-facing text, including captions, labels, badges, metadata, and helper text. Avoid `text-xs` or smaller arbitrary font sizes.
- Use the existing theme colors in `src/index.css` and Tailwind classes for styling.

- Primary action buttons use `bg-action text-action-foreground hover:bg-action-hover` in both themes. Keep lavender for dark-mode accents, not primary button fills.

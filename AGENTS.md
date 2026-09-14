<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Veltan marketing (blueprint)

This repo is the **public marketing site**. The product app is a **separate repo** (`emma-tumo/Veltan`, branch `app`, live at https://veltan-app.vercel.app). Read `docs/two-repos.md` and `docs/phase-1-auth.md` before changing auth, login, or anything that hands users to the app.

Phase 1 accounts: **Supabase Auth**. Google create-or-login. Do not reintroduce Better Auth social providers.


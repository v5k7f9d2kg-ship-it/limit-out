# Limit Out — Project Handoff

What this is: "Limit Out" is a solo arcade/reflex duck-hunting game (static PWA — HTML/JS/service worker, no build step, no backend).

## Project location
- Local project folder: `C:\Users\curry\Downloads\limit-out-site`
- Confirmed git repo root (`git rev-parse --show-toplevel`)

## GitHub
- Repo: https://github.com/v5k7f9d2kg-ship-it/limit-out
- Default branch: `master`
- Account `v5k7f9d2kg-ship-it` signs in via **"Continue with Apple"** — no password set.
  - Primary email is now `curryje@gmail.com` (verified). The original primary was an
    Apple private-relay address (`v5k7f9d2kg@privaterelay.appleid.com`); GitHub sudo-mode
    verification only emails the primary, so if you ever add/change emails again and get
    stuck in a "verify via email but nothing arrives" loop, check that Apple ID relay
    forwarding is still on (appleid.apple.com → Sign-In and Security → Apps Using Apple ID → GitHub).

## Deployment — Railway
- **Live URL:** https://limit-out-production.up.railway.app
- Project name on Railway: `pretty-generosity` (auto-generated name, not renamed)
- Service name: `limit-out`, environment: `production`
- GitHub integration: Railway's GitHub App is installed with access scoped to **only** the
  `limit-out` repo (not all repos). Auto-deploy is on for `master` — every `git push` redeploys.
- Builder: Railway's default Railpack, detected as a static site once files were at repo root
  (see "Known issue — resolved" below). No custom build/start command needed.
- Public networking: a Railway-generated domain was issued (`*.up.railway.app`). No custom
  domain attached yet.

## Known issue — resolved (2026-08-24)
The repo originally had all site files nested one level down in `limit-out-site/` (that
layout was intentional for a manual **drag-and-drop-to-Netlify** deploy — see the file
`DRAG-THIS-FOLDER.txt` for the original instructions, now stale). Railway's builder needs
the app at the repo root, so it failed the first deploy ("Railpack could not determine how
to build the app"). Fixed by moving `index.html`, `manifest.webmanifest`, `sw.js`, and
`icons/` up to the repo root via `git mv`, then pushing — Railway auto-redeployed successfully.

If you ever restore the old nested layout for a Netlify drag-and-drop deploy, remember
Railway will break again until the files are back at root.

## Normal update workflow
```bash
git add .
git commit -m "describe the change"
git push
```
Railway picks up the push and redeploys automatically — no manual step needed.

## Other
- There's a separate, unrelated project: a multi-sport fitness training app ("TriFlex")
  — not part of this game, mentioned only so it isn't confused with Limit Out.

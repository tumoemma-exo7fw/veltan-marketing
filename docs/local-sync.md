# Keep the cloud workspace and your PC in sync

Both sides use the **`main`** branch of this marketing repo. Cloud agents
commit and push; on your Windows PC you `git pull` so the files match.
Use **Git Bash** (not PowerShell).

## Which remote is which

**Vercel Hobby** (project `veltan-marketing`) deploys from GitHub
`tumoemma-exo7fw/veltan-marketing`, branch `main`. That GitHub push is
what rebuilds live captbdger.

How remotes look depends on **how the cloud agent was started**:

| How the agent started | Typical `origin` | GitHub push from the cloud |
| --- | --- | --- |
| GitHub marketing repo (`tumoemma-exo7fw/veltan-marketing`) | GitHub | **Works.** Creds are injected at start. `git push origin main` publishes to Vercel. |
| Cursor Origin marketing clone | Cursor Origin | **May fail** (`could not read Username for 'https://github.com'`). Then Emma pushes GitHub from the PC (below). |

On your PC, `git remote -v` tells you the name. If you cloned from GitHub,
that clone’s `origin` is usually GitHub (not Origin).

Do **not** ask Emma to paste a PAT or any secret into chat. Do **not** add
secrets to the repo.

## On your PC (Git Bash)

Clone path: `C:\Users\EMMYY\code\veltan-marketing`

Copy-paste. Run these in the folder where you cloned this repo.

If GitHub is `origin` (typical after cloning `veltan-marketing`):

```bash
git checkout main
git pull origin main
```

If GitHub is named `github` instead:

```bash
git checkout main
git pull github main
```

To publish **your** PC commits to GitHub (this is what Vercel Hobby builds):

```bash
git push origin main
```

(Use `git push github main` if that is the GitHub remote name on that clone.)

## GitHub push from the cloud machine

**GitHub-started agents (this repo as origin):** after a real change,
commit on `main` and run:

```bash
git push origin main
```

If the GitHub remote is named `github` instead:

```bash
git push github main
```

`Everything up-to-date` is a successful proof that auth works.

**Origin-only agents (no GitHub login):** the cloud machine can push
Origin but not GitHub. After you have the latest `main` on your PC (from
pulling this marketing repo), push GitHub yourself in Git Bash:

```bash
git checkout main
git remote add github https://github.com/tumoemma-exo7fw/veltan-marketing.git
git push github main
```

If `git remote add` says the remote already exists, skip that line and run:

```bash
git checkout main
git pull origin main
git push github main
```

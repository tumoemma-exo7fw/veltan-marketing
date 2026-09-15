# Keep the cloud workspace and your PC in sync

Both sides use the **`main`** branch of this marketing repo. Cloud agents
commit and push; on your Windows PC you `git pull` so the files match.
Use **Git Bash** (not PowerShell).

## Which remote is which

This cloud workspace has two remotes that matter:

| Remote | What it is |
| --- | --- |
| `origin` | Cursor Origin — this marketing repo. Cloud agents push here by default. |
| `github` | GitHub **`tumoemma-exo7fw/veltan-marketing`**. |

**Vercel Hobby** (project `veltan-marketing`) deploys from GitHub
`tumoemma-exo7fw/veltan-marketing`, branch `main`. A push that only lands
on Origin does **not** update the live site.

On your PC, `git remote -v` tells you the name. If you cloned from GitHub,
that clone’s `origin` is usually GitHub (not Origin).

## On your PC (Git Bash)

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

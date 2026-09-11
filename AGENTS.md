# math.avasan.org Repository Guidance

## Purpose and Product Boundary

`math.avasan.org` is Julio's public math workspace. It is a deliberately
simplified sibling of `cs.avasan.org` and selectively uses math curriculum from
`instruction-material/classes.jacobdanderson.net`.

Keep these constraints intact:

- Graph Sketcher is the primary experience and is rendered at `/`.
- Keep `/graph-sketcher` as a compatible alias for existing bookmarks.
- The public course library lives at `/courses` and contains exactly the 15
  canonical math courses from Early Elementary A through AP Calculus.
- Courses and Graph Sketcher are anonymous. Graph documents remain in browser
  tab storage unless the student downloads a project.
- The only Math-specific Scratch activity is project `1367463968`, presented
  as a coordinate-learning game from the Graph Sketcher header. Keep it in the
  reviewed one-entry allowlist, load its exact `scratch.mit.edu` embed only
  after an explicit student action, and destroy the frame when the dialog
  closes. Do not add this project to CS, Classes, or Instruction Material, add
  other external interactives implicitly, or connect the game to accounts,
  graph contents, storage, or analytics.
- `/admin` is an unlisted, noindex handoff to the single protected Admin at
  `https://cs.avasan.org/admin`; do not create a second teacher account system.
- When school-authorized aggregate collection is enabled, Math may attempt only
  one daily `graph-open` count and exact-course `course-open` count per browser
  tab. Never retry an ambiguous attempt without an identifier. Respect DNT/GPC
  and never attach a student, account, graph, page, or device identifier.
- Keep the aggregate-usage setting in the reviewed
  `front-end/src/config/classroom-usage.json` source. The browser, release
  metadata, and production proxy must derive from that same committed boolean;
  do not make tracking depend on a mutable workflow or host variable.
- Do not send graph contents, imported files, coordinates, expressions, or
  annotations to a backend or analytics.
- Do not add accounts, Admin, tutoring, scheduler, booking, Zoom, tuition,
  payment, freelance, intake, or expectation-setting flows.
- Preserve the Graph Sketcher license notices and bounded import/export safety
  controls.

Any change that expands these boundaries requires an explicit product
decision.

## Downstream and Git Policy

- `origin` is `git@github.com:anderson-webops/math.avasan.org.git`; commit and
  push completed downstream work there.
- `cs-upstream` is `git@github.com:anderson-webops/cs.avasan.org.git`; use it as
  the read-only source for the site shell and hardened Graph Sketcher.
- `upstream` is
  `git@github.com:instruction-material/classes.jacobdanderson.net.git`; use it
  as the read-only source for selected math curriculum.
- Inspect upstream changes and replay only compatible work. Never blindly
  merge, reset, rebase, or push to either upstream remote.
- Do not recreate upstream tags. Make a downstream release tag only when the
  user explicitly requests a validated release.
- Release only an annotated semver tag at the exact `origin/main` revision.
  Never overwrite an existing semver tag.
- Preserve unrelated work already present in the working tree.

After a coherent change is validated, commit it with a concise present-tense
subject and push it to `origin`.

## Repository Shape

- `front-end/`: Vue 3/Vite SSG site, public course reader, and Graph Sketcher.
- `front-end/test/`: Vitest coverage for courses, graphing, routing, and
  accessibility-adjacent behavior.

This is a static-only site. Do not add a backend workspace or accounts. The
only possible `/api` route is the cookie-stripping same-origin proxy for the
bounded anonymous usage endpoint described above.

The reviewed production source is the exact `front-end/dist` output built with
its release identity and served by the native TLS Nginx virtual host through an
atomic release symlink. It must return `404` for every undeclared `/api`
request and match the checked-in security headers, Admin handoff, no-store
release metadata, branded true-404 behavior, and logging policy. The optional
usage proxy is a native include selected solely from committed source.

Do not add Docker, a container registry, Netlify, or another deployment
configuration that can produce different files or behavior from the same
release source.

Math course media remains sourced from
`https://static.classes.jacobdanderson.net`. Missing upstream media must remain
clearly identified as pending; do not fabricate placeholder assets.

## Dependency and Lockfile Discipline

- Use the pinned npm toolchain and root `package-lock.json`; do not mix package
  managers.
- Use Node `24.18.1` and npm `12.0.2` for local, CI, and production builds.
- Keep manifests and the lockfile synchronized. Never hand-edit dependency
  resolutions.
- When dependencies change, require a clean `npm ci` and `npm audit` before
  committing.

## Required Validation

Before committing or pushing code or dependency changes, run:

```bash
npm run lint
npm run typecheck
npm run -w front-end test:unit
npm run build
git diff --check
```

Run relevant browser and accessibility checks for changed public flows.
Validation must specifically confirm that `/` is the grapher, `/courses`
contains exactly the 15 math courses, `/graph-sketcher` remains compatible, and
graph work stays browser-local.

## Direct Delivery and Pull Requests

- After a coherent change set passes the repository's required checks, default to committing it and pushing it directly to the repository's default branch. Do not open a pull request unless the user explicitly asks for one, branch protection requires it, or an external-contribution policy makes direct integration inappropriate.
- For a release-worthy application change, update the project version as required, create an annotated tag, and publish or update the corresponding GitHub release in the same work session. Keep documentation-only, formatting-only, and other non-deployable housekeeping changes as committed and pushed source changes without inventing an application release.
- Never force-push a shared branch or move an existing published tag unless the user explicitly authorizes that exact history rewrite.
- If automation or repository policy creates a pull request, review it, wait for required checks, merge it when safe, and remove the merged branch before wrapping up. Do not leave redundant pull requests or branches open.
- Treat commit, push, tag, and GitHub release publication as source delivery only. Do not claim or perform production deployment unless it was separately authorized and verified.

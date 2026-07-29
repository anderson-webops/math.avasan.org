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
- `/admin` is an unlisted, noindex handoff to the single protected Admin at
  `https://cs.avasan.org/admin`; do not create a second teacher account system.
- When school-authorized aggregate collection is enabled, Math may report only
  one daily `graph-open` count and exact-course `course-open` counts. Respect
  DNT/GPC and never attach a student, account, graph, page, or device identifier.
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
- Preserve unrelated work already present in the working tree.

After a coherent change is validated, commit it with a concise present-tense
subject and push it to `origin`.

## Repository Shape

- `front-end/`: Vue 3/Vite SSG site, public course reader, and Graph Sketcher.
- `front-end/test/`: Vitest coverage for courses, graphing, routing, and
  accessibility-adjacent behavior.

This is a static-only site. Do not add a backend workspace or accounts. The
only `/api` route is the cookie-stripping same-origin proxy for the bounded
anonymous usage endpoint described above.

Math course media remains sourced from
`https://static.classes.jacobdanderson.net`. Missing upstream media must remain
clearly identified as pending; do not fabricate placeholder assets.

## Dependency and Lockfile Discipline

- Use the pinned npm toolchain and root `package-lock.json`; do not mix package
  managers.
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

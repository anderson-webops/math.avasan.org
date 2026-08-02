# math.avasan.org

`math.avasan.org` is Julio's public math workspace. Graph Sketcher is the
homepage, and the complete math course sequence is available at `/courses`.

## Public Site

- `/`: browser-based Graph Sketcher
- `/graph-sketcher` → `/graph-sketcher/`: compatible Graph Sketcher alias
- `/courses` → `/courses/`: all 15 math courses
- `/admin`: handoff to Julio’s single protected classroom Admin

Graph Sketcher supports plotted functions, editable data series, annotations,
fit-to-data controls, imports, and SVG, PNG, CSV, and project exports. A
recovery copy stays in the current browser tab. Graph contents are not sent to
another service.

## Math Courses

The course library follows the canonical upstream math pathway:

1. Early Elementary A: Numbers, Operations, and Measurement
2. Early Elementary B: Arithmetic, Fractions, and Geometry
3. Late Elementary A: Multiplication, Division, and Geometry
4. Late Elementary B: Fractions, Decimals, Units, and Coordinates
5. Pre-Algebra A
6. Pre-Algebra B
7. Algebra 1A
8. Algebra 1B
9. Geometry A
10. Geometry B
11. Algebra 2A
12. Algebra 2B
13. Pre-Calculus and Trigonometry A
14. Pre-Calculus and Trigonometry B
15. AP Calculus

Current math content is selectively ported from
[`instruction-material/classes.jacobdanderson.net`](https://github.com/instruction-material/classes.jacobdanderson.net).
Course media uses
[`static.classes.jacobdanderson.net`](https://static.classes.jacobdanderson.net).
Unavailable upstream media remains labeled as pending instead of being
replaced with fabricated assets.

## Downstream Policy

- `origin`: `git@github.com:anderson-webops/math.avasan.org.git`
- `cs-upstream`: read-only source for the simplified Julio site shell and
  hardened Graph Sketcher
- `upstream`: read-only source for current math curriculum

Adopt upstream work selectively. Do not merge or reset this repository onto an
upstream branch, push downstream changes to an upstream remote, or copy
upstream tags.

## Development

Use the pinned npm toolchain:

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run -w front-end test:unit
npm run build
npm run a11y
```

`npm run audit:static-media` checks every referenced course asset against the
live static host. On the deployment host, the same read-only check can avoid
NAT-hairpin routing by setting `STATIC_COURSE_MEDIA_MIRROR` to the absolute
path of the canonical `static.classes.jacobdanderson.net` checkout.

The site is static-only: there is no backend workspace, account service, or
general analytics collector. If school-authorized aggregate collection is
explicitly enabled, the site attempts at most one Math course-open count per
course and one coarse Graph Sketcher-open count per browser tab and UTC day
through the shared classroom service. Failed or ambiguous attempts are not
retried, which favors avoiding duplicates over exact counts. It honors Do Not
Track and Global Privacy Control and never sends graph contents or student
identifiers. The reviewed state is committed in
`front-end/src/config/classroom-usage.json`, so a release tag cannot be rebuilt
with a different tracking setting. Graph contents remain in the current browser
tab unless the student downloads a project.

Production serves the repository's exact built static output through the
native Nginx host and atomic release symlink. Docker, container registries,
Netlify, and alternate build paths are not supported. The checked-in native
policy supplies the strict API boundary and the dormant, credential-stripping
usage proxy selected only from committed source. Build identity, host
requirements, atomic promotion, and the required public verification gate are
documented in
[`docs/production-deployment.md`](docs/production-deployment.md).

The independent browser adaptation of GraphSketcher is distributed under its
original Omni Source License 2007 terms. See
`docs/third-party/graphsketcher-omni-source-license.txt`.

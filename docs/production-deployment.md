# Production deployment

Math has one reviewed static build output: `front-end/dist`. The native host is
the only supported production serving path. Nginx serves an immutable release
checkout through the atomic `/srv/math.avasan.org/current` symlink; Docker,
container registries, Netlify, and alternate builds are not deployment paths.

## Release identity and privacy state

Every build writes `/release.json` with the root package version, the exact
40-character source revision, and the committed `classroomUsageEnabled`
boolean. A deployment must reject missing, `unknown`, or mismatched identity.
The browser, release metadata, and optional bounded proxy all derive their
usage state from `front-end/src/config/classroom-usage.json`; no workflow or
host variable may silently change it.

Aggregate collection remains disabled until Julio has the necessary school or
district approval and public privacy contact. The disabled native include
returns `404`. If a reviewed source change later enables it, the native release
uses the credential-stripping include in `deploy/nginx`, which accepts only the
exact bounded same-origin POST and forwards no student, browser, network, or
graph identity.

## Prepare and promote

Create a clean checkout beneath `/srv/math.avasan.org/releases/<revision>` as
the unprivileged deployment user. The checkout must use the canonical
`anderson-webops/math.avasan.org` origin, and its `HEAD`, fetched
`origin/main`, and annotated `v<package-version>` tag must resolve to the same
commit. Run:

```bash
deploy/direct/prepare-static-release.sh \
  /srv/math.avasan.org/releases/<revision>
```

The preparation gate pins Node/npm, performs the repository checks, builds the
exact revision, validates release metadata, and selects the reviewed usage
include from the committed boolean.

As root, promote that prepared checkout with:

```bash
deploy/direct/promote-static-release.sh \
  /srv/math.avasan.org/releases/<revision>
```

Promotion validates the candidate, installs byte-identical policy snippets,
and proves from `nginx -T` that the maps, server policy, and selected usage
snippet are each loaded exactly once before activation. It then atomically
moves `current`, tests and reloads Nginx, checks release identity and headers,
verifies the Admin handoff, and requires branded true `404` responses for
unknown and generated legacy artifact paths. A failed gate restores the prior
symlink and snippets, then smoke-checks that restored release. Promotion
requires `current` to resolve to a complete prior release beneath
`/srv/math.avasan.org/releases`; it deliberately fails closed instead of using
an unverified first deployment as its own rollback target. Before the first
managed promotion, preserve the verified live build as an immutable release
and point `current` to it.
Do not record deployment success before promotion and public smoke checks pass.

## Nginx contract

The promotion script installs the maps, server policy, and selected usage
policy as stable root-owned files under `/etc/nginx/snippets`. Include the maps
snippet once in Nginx's `http` context and include the server-policy snippet
inside the existing Math HTTPS virtual host so its current IPv4/IPv6,
certificates, HTTP/2, and HTTP/3 settings stay intact. Keeping these snippets
outside the release symlink ensures an older static release can still be
restored and Nginx reloaded. `deploy/nginx/default.conf` is a minimal standalone
reference for a native port-80 test server; production port 80 should remain an
HTTPS redirect.

The effective HTTPS host must:

- use `try_files $uri $uri/ =404;` for ordinary requests;
- serve the small branded `/404.html` with a true `404` status;
- send CSP, COOP, CORP, HSTS, referrer, permissions, nosniff, and framing
  protections on all responses;
- serve `/release.json` with `Cache-Control: no-store`;
- redirect `/admin` and `/admin/` to `https://cs.avasan.org/admin` with
  `X-Robots-Tag: noindex` and `Cache-Control: no-store`;
- return `404` for `/api`, every `/api/` path, and the usage route while the
  committed usage setting is disabled; and
- return the branded `404` for `/404`, generated `.html` aliases, direct nested
  `index.html` artifacts, and build-only `.vite` metadata while preserving the
  canonical `/`, `/courses/`, and `/graph-sketcher/` pages; and
- keep access logs off unless a school-approved, documented, short-retention
  security purpose exists.

The exact root paths in the checked-in policy assume the standard `/srv`
layout. If the server uses a different existing release root, change all such
paths together and preserve the atomic symlink and immutable release boundary.

## Public gate

Run the `Verify production deployment` workflow with the released version,
full revision, and usage state matching `/release.json`. It verifies Graph
Sketcher, its alias, all 15 course titles, release identity, COOP/CORP and other
security headers, the no-store Admin handoff, branded unknown-route responses,
and the closed API boundary. Verify forced IPv4 and IPv6 separately and confirm
DNS remained unchanged.

Static files being copied is not enough. The public gate must pass before the
five-minute deployer records the revision as successful; a later `--if-newer`
run must then skip that exact revision.

# Production deployment

Math has one reviewed static runtime. It contains the exact `front-end/dist`
tree plus the three Nginx policy snippets declared by
`deploy/static-artifact.json`. The native host is the only supported production
serving path. Nginx serves an immutable, content-addressed artifact through the
atomic `/srv/math.avasan.org/current` symlink. Math has no application process,
Node runtime, package manager, container, database, queue, cache, or writable
release state in production.

Static and redirect-only behavior is monitored through the existing pages,
redirects, and `/release.json`. Do not add artificial `/healthz` or `/readyz`
routes to this static site.

## Release identity and privacy state

Every build writes `/release.json` with the root package version, the exact
40-character source revision, and the committed `classroomUsageEnabled`
boolean. A deployment rejects missing, `unknown`, or mismatched identity. The
browser, release metadata, and optional bounded proxy all derive their usage
state from `front-end/src/config/classroom-usage.json`; no workflow or host
variable may silently change it.

Aggregate collection remains disabled until Julio has the necessary school or
district approval and public privacy contact. The disabled native include
returns `404`. If a reviewed source change later enables it, the immutable
artifact contains the credential-stripping include that accepts only the exact
bounded same-origin POST. It forwards no student, browser, network, or graph
identity.

The optional coordinate game is a separate, student-initiated Scratch embed.
No Scratch frame or request exists until a student selects the launcher. Course
images from another origin are also explicit links, not automatic page loads.
The production CSP permits automatic image and media loading only from this
site, `data:`, and `blob:` sources. External live content is not covered by the
Math release identity.

## Build and provenance boundary

The `release-artifact` CI job runs only for an annotated `v<package-version>`
tag after every required lint, type, test, browser, accessibility, dependency,
native-package, build, and artifact-contract job succeeds. It first proves the
tag resolves to the exact `origin/main` commit and matches `package.json`. It
then rebuilds that exact GitHub source revision, packages the complete static
runtime, records its SHA-256, and creates GitHub Actions build provenance with
the pinned `.github/workflows/ci.yml` workflow and exact tag ref.
The uploaded CI artifact contains:

- `math.avasan.org-v<version>-<revision>-static.tar.gz`;
- the JSON packaging receipt;
- the SHA-256 file; and
- the GitHub provenance bundle.

Publish the unchanged archive, receipt, checksum, and provenance bundle from
that successful tag workflow as release assets. Do not rebuild from a
production checkout.

The production promoter never executes a candidate checkout, candidate shell
script, package manifest expression, Node command, Git hook, or Git ref. It
accepts only the archive whose bytes have provenance for the expected exact
annotated version tag, `main` commit, and pinned CI workflow. The separately
installed trusted
artifact verifier independently checks every path, type, mode, size, hash,
required file, release identity, usage setting, and Nginx policy byte.

## Install trusted helpers

The privileged helpers are a separate administrative trust boundary. Review
their source first, copy only the exact reviewed release source into a
root-owned, non-writable staging directory, and run this installer from that
staging directory:

```bash
deploy/direct/install-trusted-helpers.sh
```

The installer rejects user-owned or writable source, parent directories,
files, symlinks, and an unprotected GitHub CLI. It creates an immutable,
versioned helper beneath `/usr/local/libexec/math-avasan-static-release/` and
the protected artifact, incoming, recovery, and GitHub verification
directories. It does not change the live release or Nginx configuration.
Installing a new helper version requires a new source review. Never run the
installer or promoter directly from a deployment checkout.

## Prepare a release artifact

Ordinary release delivery should use the CI-built assets. The unprivileged
preparation helper exists for exact local rehearsal and reproducibility checks.
It requires the expected commit from an independent caller, exports that exact
commit with `git archive`, builds only the tracked export in a fresh temporary
directory, fixes the production origin, clears build identity overrides, runs
the full gate, and produces the same bounded artifact:

```bash
EXPECTED_SOURCE_REVISION=<40-character-commit> \
NODE_BIN_DIR=/opt/node-24.18.1/bin \
deploy/direct/prepare-static-release.sh \
  /path/to/clean/checkout \
  /path/to/unprivileged/artifact-output
```

Ignored local environment files, stale build output, untracked files, and
other checkout-local content cannot enter that build. This local artifact is
not production-authorized unless the pinned GitHub workflow separately
attested the exact archive bytes.

## One-time legacy rollback transition

Before the first artifact-format activation, use the installed root-owned
helper to capture the exact reviewed `v1.0.16` static release at
`cc774b9c75c425f97bb5c6768f31985ae4ad0cfc` and the exact installed snippets:

```bash
/usr/local/libexec/math-avasan-static-release/<helper-version>/deploy/direct/prepare-legacy-rollback.sh \
  <current-40-character-commit> \
  /srv/math.avasan.org/.deployment-recovery
```

Review and record the printed SHA-256. The promoter accepts that bounded
legacy archive only during the transition from the existing
`/srv/math.avasan.org/releases` tree. It seals the archive under the protected
artifact root and compares its release identity with the active release. It
does not rebuild, reinterpret, or mutate the old release. Later promotions use
only complete artifact-format releases.

Rollback acceptance is version-aware. The trusted helper recognizes only the
exact sealed v1.0.16 identity for the legacy profile, verifies the restored
snippet bytes and effective Nginx inclusion, compares served static security
headers with the policy captured inside that sealed artifact, and exercises the
routes documented for v1.0.16. It never asks the retained artifact to satisfy
new-only CSP or encoded-route requirements. Candidate acceptance remains on the
current strict policy and route matrix.

## Promote and roll back

Copy the unchanged CI archive and provenance bundle to an operator-controlled
location. Supply the independently reviewed archive SHA-256, candidate commit,
and currently active commit to the installed helper:

```bash
/usr/local/libexec/math-avasan-static-release/<helper-version>/deploy/direct/promote-static-release.sh \
  /absolute/path/math.avasan.org-v<version>-<revision>-static.tar.gz \
  /absolute/path/provenance-bundle.jsonl \
  <archive-sha256> \
  <candidate-40-character-commit> \
  <candidate-semver-version> \
  <current-40-character-commit>
```

For the one-time legacy transition only, append the reviewed legacy archive and
its SHA-256 as the seventh and eighth arguments.

Promotion copies untrusted inputs into a root-only incoming directory, verifies
GitHub provenance offline against the exact annotated version tag, unpacks with
compressed-byte, expanded-byte, file-count, file-size, traversal, and
execution-time bounds, verifies
the full manifest, seals the root-owned tree, and re-verifies any existing
content-addressed target. It then records protected recovery state, installs
the artifact-bound snippets, verifies their effective inclusion through
`nginx -T`, validates and reloads the stricter candidate policy before
waiting for the exact pre-reload Nginx worker generation to retire, atomically
changes `current`, and checks IPv4 and
IPv6 release identity, security headers, canonical routes, encoded legacy
aliases, the Admin handoff, true 404 behavior, and unsafe-method rejection.

Any failure after mutation restores the independently verified prior release
and its exact snippets, reloads Nginx, and repeats acceptance checks. A failed
rollback retains the root-only recovery record and blocks another promotion
until an operator reviews it. Keep the prior immutable release for rollback.
Do not record deployment success before promotion and public smoke checks pass.
The recovery path stops before policy or content mutation if prior-artifact
verification fails. CI fault-injects a late IPv6 candidate acceptance failure
after real activation and proves exact v1.0.16 content, policy, identity,
dual-stack behavior, and recovery-record cleanup are restored.
The same test runs a disposable master with deliberately lingering old workers,
so candidate activation cannot occur merely because a graceful reload command
returned. A retirement timeout fails closed and retains protected recovery
state for operator review.

The installed promoter requires a protected executable `/usr/bin/gh` with
attestation verification support. Install that host prerequisite through the
normal server package-management review before attempting activation; never
skip provenance verification because the CLI is absent.

## Nginx contract

The artifact supplies the maps, server policy, and selected usage policy at
the established root-owned paths under `/etc/nginx/snippets`. Include the maps
snippet once in Nginx's `http` context and include the server-policy snippet
inside the existing Math HTTPS virtual host. Preserve its current IPv4/IPv6,
certificates, HTTP/2, HTTP/3, DNS, and redirect settings.

The effective HTTPS host must:

- use `try_files $uri $uri/ =404;` for ordinary requests;
- serve the small branded `/404.html` with a true `404` status;
- send CSP, COOP, CORP, HSTS, referrer, permissions, nosniff, and framing
  protections on all responses;
- allow child frames from exactly `https://scratch.mit.edu` after explicit
  student action;
- serve `/release.json` with `Cache-Control: no-store`;
- redirect `/admin` and `/admin/` to `https://cs.avasan.org/admin` with
  `X-Robots-Tag: noindex` and `Cache-Control: no-store`;
- return `404` for `/api`, every `/api/` path, and the usage route while the
  committed usage setting is disabled;
- return the branded `404` for `/python-ide`, normalized or percent-encoded
  generated `.html` aliases, nested `index.html` artifacts, and build-only
  `.vite` metadata; and
- keep access logs off unless a school-approved, documented, short-retention
  security purpose exists.

## Public gate

Run the `Verify production deployment` workflow with the released version,
full revision, and usage state matching `/release.json`. It verifies Graph
Sketcher, its alias, all 15 course titles, release identity, security headers,
the no-store Admin handoff, branded unknown-route responses, the closed API
boundary, and the exact Scratch CSP source. The core gate must not depend on
Scratch or another external media host being available. Verify the player
manually after release, then verify forced IPv4 and IPv6 separately and confirm
DNS remained unchanged.

Source delivery, CI attestation, release publication, production activation,
and verified-live state are separate milestones. Static files being copied is
not deployment acceptance.

# Security, identity, and system workflow audit — 2026-07-29

## Scope

This audit covered authentication, authorization, privilege promotion and
demotion, the Admin handoff, classroom-usage reporting, browser storage,
untrusted graph and course content, backend and proxy boundaries, dependency
integrity, CI, container execution, deployment identity, and public route
behavior.

> Historical note (2026-08-02): the container delivery path described below
> has since been retired. Production now uses the checked-in native Nginx
> policy and atomic static-release scripts. The findings remain as an audit
> record, not current deployment instructions.

## Effective access model

| Actor                     | Allowed application action                                                        | Privileged state                 |
| ------------------------- | --------------------------------------------------------------------------------- | -------------------------------- |
| Public student or visitor | Read the public courses; create, import, edit, and download graphs in the browser | None                             |
| Teacher using Admin       | Follow `/admin` to the separately protected CS Admin application                  | None in this repository          |
| Site maintainer           | Change source or promote a reviewed artifact through GitHub and hosting controls  | External control-plane role only |

The Math application has no user database, login, session, password reset,
role assignment, impersonation, promotion, or demotion workflow. `/admin` does
not imitate authorization: it is an unlisted, no-store, noindex handoff to
`https://cs.avasan.org/admin`. Authentication, teacher authorization, student
access, and any promotion or demotion belong exclusively to that separate
classroom system. Maintainer onboarding and offboarding belong to GitHub and
the hosting provider.

## Backend and system boundary

The release is a static Vue application served by unprivileged Nginx. It has
no application server, database, secret-bearing runtime, or local privileged
API.

The only backend-shaped route is an optional anonymous aggregate-usage proxy.
It is disabled in the committed release configuration, so every `/api` path
returns `404`. Enabling it requires a reviewed source change and new versioned
release. The dormant enabled configuration accepts only an exact same-origin
JSON `POST`, rejects query strings, limits the body to 2 KB, verifies the
upstream TLS certificate, disables retries, starts from an empty upstream
header set, strips credentials and browser/network identity, hides cookies,
and has bounded connect/send/read timeouts. An unavailable classroom service
cannot stop the static Math site.

Graph work stays in the current browser tab's `sessionStorage` or in files the
student explicitly downloads. Imports are processed in a worker with byte,
time, XML-element, series, point, annotation, and expression limits. Exported
XML/SVG text is escaped. Browser tests verify that graph editing, importing,
clearing, and exporting do not call APIs or analytics.

## Findings and remediation

### Hardened untrusted rendered content

Course Markdown was already intended to be data, but raw HTML rejection was
implicit. Structured data was serialized directly into script bodies.

Remediation: raw Markdown HTML is explicitly disabled and regression-tested
against executable links and elements. JSON-LD now passes through one
serializer that escapes HTML-significant and JavaScript line-separator
characters.

### Hardened browser and routing policy

The existing container policy was restrictive, but it did not declare
cross-origin opener/resource isolation, the longest applicable HSTS boundary,
or no-store behavior for the Admin handoff.

Remediation: added same-origin opener and resource policies, HSTS with
subdomains, and no-store Admin responses. The release continues to deny
framing, objects, arbitrary connections, inline scripts, undeclared APIs, and
soft-200 unknown routes.

### Hardened dependency and target-platform reproducibility

The previous toolchain and dependency tree were behind the supported
production baseline and did not make all Linux native bindings explicit.
Docker also did not consume the repository npm policy before installing.

Remediation: aligned local, CI, manifest, and container declarations on Node
`24.18.1` and npm `12.0.2`; upgraded compatible direct dependencies; added a
strict lifecycle-script allowlist; copied `.npmrc` into the build before the
clean install; and explicitly locked the Linux x64/ARM64 glibc/musl bindings
required by esbuild, Oxc, Rolldown, and Lightning CSS. Clean simulated ARM64
glibc and musl installs now fail if any required native package is absent.

TypeScript 6 and Node 24 types are intentionally retained: TypeScript 7 is not
yet compatible with this Vue toolchain, and Node 26 types would not describe
the pinned Node 24 runtime. Oxc binding versions follow the exact wrapper
versions in the dependency graph rather than unrelated newer wrapper
generations.

### Hardened CI, publishing, and container execution

Remediation: disabled persisted checkout credentials, pinned third-party
actions to verified commits, aligned every job on the exact toolchain, added
full/production/provenance/dependency/native-platform gates, added an ARM64
build job, added Dependabot coverage for npm, Actions, and Docker, updated
CodeQL, pinned both container bases by digest, and made the already
unprivileged Nginx runtime user explicit as UID 101.

The Node builder base contains the npm version bundled by the upstream Node
image, whose package metadata is independently reported by Trivy. The first
build step replaces it with the repository-pinned npm before dependency
installation, and the entire builder stage is discarded. The shipped Nginx
runtime image has no detected OS vulnerability.

At the audit date, npm `12.0.2` is the latest registry release, but an
independent installation of the npm CLI still reports upstream advisories in
its own bundled `brace-expansion` and `tar` copies. No fixed npm release is
available. Those copies are not application dependencies or part of the
production image. Build use is constrained to integrity-locked registry
artifacts and strict lifecycle handling, and the npm version must be advanced
as soon as an upstream fixed release exists.

### Corrected browser-test attribution

Chrome's own clock, Safe Browsing, variations, and account-service requests
were being attributed to the application by the privacy test.

Remediation: the test now evaluates same-origin and origin- or
referrer-attributed page traffic while continuing to trap application beacons,
WebSockets, event streams, cross-origin requests, API routes, analytics paths,
and write requests.

### Classified history-only secret findings

Three historical Gitleaks findings were inspected. Two are literal PEM
boundary checks and one is a documented public random-code alphabet; none is a
credential. Fingerprint-specific suppressions were added so those exact false
positives do not weaken current-source or future-history scanning.

## Residual operational requirements

- GitHub and hosting administrators must enforce MFA and remove maintainers
  promptly when access changes.
- Authentication, authorization, and role changes must remain in the
  separately protected classroom system and must not be recreated in this
  public static site.
- Aggregate usage must remain disabled unless the documented school/district
  authorization and privacy prerequisites are satisfied.
- A source release is complete only after the public host reports the same
  commit and the post-deployment suite passes.
- Private-repository GitHub job availability is not a release gate for this
  workspace sweep; equivalent local clean validation remains required.
- The 1,493 unavailable course-media references are all in the repository's
  explicit known-pending inventory; no unknown or unnoted missing media was
  found.
- The latest npm CLI's bundled dependency advisories remain an upstream build
  tool issue with no released package-manager fix; they do not enter the
  static production artifact.

## Local validation evidence

- Exact Node `24.18.1` and npm `12.0.2`.
- Clean lockfile install with strict lifecycle-script handling: successful.
- Full and production-only npm audits: 0 vulnerabilities.
- Registry provenance: 810 verified package signatures and 247 verified
  attestations.
- Dependency graph: no missing, invalid, or extraneous package.
- Native dependency lock: 22 explicit Linux x64/ARM64 glibc/musl entries.
- Target installs: clean Linux ARM64 glibc and musl simulations, each
  confirming six required native packages.
- Lint and typecheck: passed.
- Unit tests: 40 files and 225 tests passed.
- Static build and executable-script verification: passed.
- Browser flows: eight navigation, privacy, import, clear, and export tests
  passed.
- Accessibility: 24 route, viewport, theme, and reduced-motion scenarios
  passed WCAG A/AA axe checks.
- Static media: 1,530 references checked; no unknown, unnoted, unchecked, or
  unreachable-origin result.
- Trivy: 0 development dependency vulnerabilities, 0 production dependency
  vulnerabilities, 0 Dockerfile misconfigurations, and 0 current-source
  secrets.
- Gitleaks: no unsuppressed leak in the current source or 2,187-commit history.
- Pinned production Nginx image: 0 detected OS vulnerabilities.

Docker and Nginx executables were not available in the local environment. The
container definition and Nginx policy were source-tested and scanned locally;
the built-container smoke remains an independent CI gate rather than an
unverified local claim.

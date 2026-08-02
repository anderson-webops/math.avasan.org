# Security policy

## Supported release

Only the latest release on the `v1.x` line is supported. The public deployment
must expose `/release.json` so operators can compare its version and full source
revision with the current release.

## Product boundary

`math.avasan.org` is a static student site. It has no local accounts, roles,
sessions, password reset, database, or general API. `/admin` is only a handoff
to the separately protected classroom Admin at `https://cs.avasan.org/admin`.
Graph documents stay in browser tab storage unless a student explicitly
downloads a project.

Anonymous classroom usage collection is disabled in committed source by
default. If it is enabled after the required school/privacy review, only the
allowlisted aggregate events and course identifiers may cross the reviewed
cookie- and credential-stripping proxy.

## Reporting

Report a suspected vulnerability privately through GitHub Security Advisories
for this repository. Do not include real student data, credentials, private
graph documents, or other sensitive material in an issue or test case.

Include the affected release, route or component, reproduction conditions,
impact, and any suggested mitigation. Avoid testing against real students or
attempting to access the classroom Admin without authorization.

## Release requirements

Security releases require a clean locked install, full and production-only
dependency audits, registry-signature verification, dependency-tree and Linux
ARM64 native-package checks, lint, typecheck, unit/browser/accessibility tests,
static build and native-host policy checks, and secret scanning. A
source release and a live deployment are separate states; the live release is
confirmed only when the public post-deployment probe passes.

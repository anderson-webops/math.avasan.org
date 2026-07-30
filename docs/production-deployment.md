# Production deployment

Math has one reviewed static build output: `front-end/dist`. Production may
serve those exact files through either the repository's unprivileged static
Nginx container or the host's TLS Nginx virtual server. These are serving
envelopes for the same release, not separate application builds.

Direct host-static serving is supported only while the committed
`classroomUsageEnabled` value is `false`. In that state every `/api` request
must return `404`, so the host does not recreate or bypass the dormant proxy.
If aggregate collection is enabled, deploy the reviewed container unless an
equivalent host proxy receives a separate security review. Netlify remains
unsupported because it cannot enforce the reviewed credential stripping and
upstream TLS controls required by that optional proxy.

## Release

Every production build writes `/release.json` into `front-end/dist` with its
semantic version, exact 40-character source revision, and aggregate-usage
state. A deployment must build the intended revision, preserve that exact
output, and refuse to record success unless `/release.json` matches the
revision and package version being deployed.

The standard source keeps aggregate classroom usage disabled in
`front-end/src/config/classroom-usage.json`. That reviewed, committed value is
the single source of truth for the browser, release metadata, and optional
container proxy; a workflow or host variable cannot silently change a build
from the same revision.
Set it to `true` only after the privacy-notice contact, school or district
authorization, and the shared classroom service are ready. Changing it requires
a source commit, version increment, annotated tag, and new release.

### Versioned container release

1. Update the root package version.
2. Complete the required repository validation.
3. Create an annotated `vMAJOR.MINOR.PATCH` tag whose version matches the root
   package version, then push that tag to `origin`.
4. The `Release production container` workflow validates the source and
   publishes traceable GHCR tags for the semantic version and full `sha-...`
   revision. It deliberately does not publish `latest`.
5. Record the immutable image digest from the workflow summary. Production
   should pin that digest rather than either mutable registry tag.

The release image contains the same reviewed `front-end/dist` output and
release metadata as a direct host-static deployment.

## Host-static serving

The current production host builds the intended source revision and atomically
serves the resulting `front-end/dist` directory. Its TLS virtual host must:

- use `try_files $uri $uri/ =404;` for ordinary static requests, without an
  `index.html` fallback that turns unknown paths into soft `200` responses;
- apply the Content Security Policy, HSTS, Referrer Policy, Permissions Policy,
  X-Content-Type-Options, and framing protections from `nginx/default.conf`;
- serve `/release.json` with `Cache-Control: no-store`;
- redirect `/admin` and `/admin/` to `https://cs.avasan.org/admin` with the
  noindex response policy;
- return `404` for `/api`, every `/api/` path, and both methods on
  `/api/classroom-usage` while aggregate usage is disabled; and
- keep access logs off unless the school or district has approved a specific,
  short-lived security-log purpose and retention period.

Before recording a host-static deployment as successful, verify that
`/release.json` matches the deployed source revision and version, `/` returns
`200`, and multiple synthetic unknown paths return `404`. Then run the full
post-deployment gate below.

## Container serving

Run the pinned, unprivileged image behind the host's TLS-terminating virtual
host and bind container port `8080` to host loopback. Preserve the public hostname
`math.avasan.org`, forward ordinary site requests to the container, and do not
add another general API proxy. The application container disables access logs;
keep any outer proxy logs off unless the school or district has approved a
specific short-lived security-log purpose and retention period.

The collection-disabled image returns `404` for every
`/api/classroom-usage` request and contains no active proxy directive. When the
committed release source explicitly enables aggregate collection, the container
resolves `cs.avasan.org` only after a request reaches the exact
`POST /api/classroom-usage` route. Failure to resolve or reach CS can therefore
fail an optional count with a bounded gateway error, but cannot prevent Nginx
or the static Math site from starting. The enabled proxy:

- verifies the CS TLS certificate and hostname against the system CA bundle;
- requires the browser's exact Math origin and classroom request header before
  forwarding, and rejects query strings, so cross-site forms, no-CORS requests,
  and identity-shaped URL parameters fail closed;
- starts with an empty upstream header set and sends only fixed protocol fields,
  stripping cookies, authorization, forwarding addresses, referrers, and any
  other browser-provided headers;
- supplies the fixed Math origin expected by the classroom service;
- disables automatic upstream retry so one POST cannot be counted twice; and
- exposes no other `/api` route.

## Post-deployment gate

Run the `Verify production deployment` workflow with the released version and
full source revision. Its usage-proxy selection must match the immutable
aggregate-usage state in `/release.json`; enable it when collection is enabled.
The probe checks:

- the deployed release identity;
- Graph Sketcher at `/` and its `/graph-sketcher` alias;
- all 15 course titles at `/courses`;
- security headers;
- the noindex `/admin` handoff to CS;
- rejection of undeclared API paths and non-POST usage requests; and
- when selected, a harmless invalid event through the CS proxy that cannot
  increment a classroom count.

Publishing an image or copying static files is not by itself a deployment. Do
not describe the Math site as updated until this post-deployment gate passes
against the public hostname.

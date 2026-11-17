# Reviewed Upstream Alignment

Math retains its anonymous 15-course library and browser-local Graph Sketcher.
Upstream repositories supply compatible curriculum and shell changes; their
account, classroom, IDE, provider and unrelated-course applications remain
separate products.

## Reviewed Sources

The curriculum review covers `c90e28cab02406b1aa5e054aef96f2c373c8fc5e` through
`10344255d3856efe0cf83d136cbf606c82c795a2`: 53 commits and 933 changed paths.
The four later commits through `79ec402af0f1b0749b90945caf156786d10eb267` affect
Machine Learning and Python. Their shared implementation-artifact change is
guarded specifically to Machine Learning. They add no applicable Math changes.
The reviewed CS shell remains `a598c84aa14f3a08b6b9ec9c39dd406d1868dcc5`.

## Curriculum Coverage

- Four Elementary courses use all eight Materials/Projects modules, including
  80 method/worked-example pairs, 97 supplied task sets, the two complete raw
  Early Elementary A escape-game activities and 160 optional cases. The
  character-budget table and constrained grid-route inputs are included.
- Pre-Algebra A/B and Geometry A/B retain the supplied unit cases, reviews,
  supplementary practice and construction resources. Course-gated adapters
  preserve the Math-owned pacing, source activities and optional placement.
- Algebra 1A retains its newer 26 authored readings, 28 complete practice tasks
  with 84 questions and answers, and shared error-analysis cases. Historical
  Algebra 1A/1B method/example pairs and both Algebra 2 reading/checkpoint
  baselines are restored without replacing that newer work. Progress coverage
  includes 126 Algebra history bindings and five Math-only title aliases.
- Pre-Calculus A/B and AP Calculus include all supplied unit/review cases,
  both AP portfolios and rubrics, and the optional root-test extension.
  Profit-ratio sign conditions, rational-function domain restrictions and
  divisor-zero exclusions retain their mathematical qualifications.

Adapters reject missing or duplicate source bindings and retain complete
authored instructions. Reading and assignment classification remains explicit;
previously grouped activities have independent task identities and self-checks.
The full-catalog regression binds all 1,064 prior item identities and the 284
module identities/pacing records to the published v1.0.27 baseline, including
existing aliases. Historical reference-archive and capstone bookmarks also
retain their reviewed compatibility mappings.

## Resources And Rendering

Sixteen Markdown documents and 23 SVGs retain their exact upstream bytes.
Markdown is compiled through finite literal imports with a 64 KiB document
limit. Diagrams use explicit Vite URL imports and the existing permitted asset
output. Resource selection stays within the existing `/courses/` reader and
performs no arbitrary file or cross-origin request. Canonical line-ending rules
preserve the fingerprinted Elementary Materials files across local and CI use.

The shared Markdown formatter preserves code literals and mathematical values
within numbered answers. Prose cleanup retains fenced and indented blocks;
complete instructional content survives both store and reader processing.
The source resource check evaluates the actual course graph through a
middleware-only Vite loader, including source-bound diagram imports. The
subsequent production build retains the existing strict output verifier.

## Product And Delivery Boundaries

The Graph Sketcher remains the primary route, graph contents remain local,
and aggregate collection stays disabled. Existing media/privacy restrictions,
raw-file rejection, canonical routes and static artifact contract remain intact.
AI, programming, language, finance and unrelated infrastructure work is outside
this Math product. Source qualification and GitHub release publication remain
separate from protected deployment and live acceptance.

## Supported Toolchain Boundaries

Test tools use JSDOM 31 on Node 26. The current Vite SSG release declares its
own JSDOM 28 range, which remains isolated under that renderer. TypeScript 6
retains the parser's published `<6.1` compatibility boundary. Native packages
match their actual consuming versions, including Vite's Rolldown `~1.2` and
the formatter plugin's Oxfmt `^0.35` range. Independent newer native binaries
would violate those producer requirements. The lockfile is generated from
the current workspace manifests and verified per consumer.

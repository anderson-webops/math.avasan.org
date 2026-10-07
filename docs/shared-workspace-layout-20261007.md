# Shared workspace layout sync

Date: October 7, 2026.

## Source and applicability

- Downstream starting revision: 4494c0ed333ba97cca8472a8d16cc28b186bc26d.
- Shared layout source: Classes revision 63cf37f87a51bc2fdb9631e92695e62a60f4f83f.
- The instructor fork now retains the neutral overlay at
  0278d1e29aa284a4f6246f4daa295545042282c0 over upstream 6c52e758.
- This is a selective static Math adaptation. It does not add accounts, a
  backend, IDE projects, scheduling, tutoring-business pages, or additional
  external activities.

## Shared presentation

Math and CS use the same Projects, Supplemental Projects, and Learn reader
structure, assignment/aside presentation, compact course/search controls,
small-screen lesson navigation, and shared view-selection behavior. Concepts
and learning context are separate from required work. Goal-only activity
prompts stay beside their completion evidence instead of disappearing into Learn.
All 15 math courses, resources, bookmarks, aliases, and pending-media notices
remain available.

Graph Sketcher fits the viewport. A compact tools strip and Project menu replace
large always-visible control areas. Settings open beside the coordinate readout
and retain keyboard navigation, focus restoration, and bounded internal scrolling.
The successful restore/save commentary is hidden; genuine storage and operation
errors remain visible. Phone reflow changes only interactive geometry, not saved
projects or export dimensions. Pointer/data conversions use that same geometry.

The Math-only coordinate game remains an explicit, lazy, disposable Scratch
launch. No iframe loads on initial page view. Graph documents stay tab-local;
import/export bounds, shared-device cleanup, privacy links, usage consent policy,
source attribution, and the private CS Admin handoff are unchanged.

## Verification and rollout

- Lint, typechecking, full frontend tests, and production build are required.
- Regressions cover lesson panes, deep links, search/module changes, activity
  instructions, viewport sizing, settings focus/Escape, graph geometry and pointer
  mapping, tab-local storage, cleanup, safe imports, and the exact game allowlist.
- Desktop and phone previews check no horizontal overflow in courses and no page
  scrolling in graph view, including settings open/close.
- Built-output security checks preserve the root grapher, compatible
  /graph-sketcher alias, public /courses, true 404s, and static-only boundary.
- Pinned Node 24.18.1/npm 12.0.2, dependencies, and package-lock.json are unchanged.
  Matching existing dependencies were reused; hosted CI provides npm ci gates.
- This publishes source only. No production activation, database changes,
  credential changes, or mail sending are included.

No migration is needed. Preserve the current deployment and its policies until
an operator separately accepts a complete attested replacement artifact. Roll
back using the retained prior artifact through the existing static native flow.

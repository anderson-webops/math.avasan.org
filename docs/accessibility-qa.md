# Accessibility QA

This checklist complements the automated `npm run a11y` axe smoke suite.

- Test `/`, `/graph-sketcher/`, `/courses/`, and the unlisted `/admin` handoff
  with keyboard-only navigation and a screen reader.
- Confirm the skip link, two-item header navigation, graph toolbar, inspector
  tabs, editable data table, course selector, outline buttons, and resource
  links have visible focus and meaningful accessible names.
- On narrow and wide screens, confirm the graph, tools, inspector, and course
  reader remain usable without clipped controls or horizontal page scrolling.
- Verify inspector tabs support arrow keys, Home, and End, and that focus does
  not enter hidden panels.
- Exercise New, Clear for next student, import, and export confirmation paths.
  Status changes must be announced without moving focus unexpectedly.
- Open the coordinate game with a keyboard and confirm that focus moves into
	the modal dialog. Verify that close controls appear before and after the
	cross-origin player, Tab can leave the player for the final close control, a
	backdrop click removes the Scratch frame, and focus returns to the launcher.
	Escape closes while focus remains in the Math dialog; Scratch owns keystrokes
	while focus is inside its player. At narrow widths, the player must scale
	without horizontal page scrolling.
- Confirm reduced-motion and dark-mode preferences do not obscure focus,
  selected states, graph labels, or validation messages.
- Confirm `/admin` provides a clear keyboard-accessible handoff to Julio’s
  protected Admin, while `/python-ide` and `/student-privacy` render the
  missing-page response. None should appear in navigation or the sitemap.

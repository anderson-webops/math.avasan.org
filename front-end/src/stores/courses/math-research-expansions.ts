import type { MathCoursePatchMap } from "./math-course-enrichment-patch";
import type { RawCourse } from "./types";
import { applyMathCoursePatch } from "./math-course-enrichment-patch";

const mathResearchExpansionPatches = {
	"algebra-1a": {
		expectedModuleCount: 22,
		addedModules: [
			{
				kind: "appendix",
				title: "Standards Map",
				curriculum: [
					{
						title: "Algebra 1A Reference Guide",
						content:
							"**Reference map:** Algebra 1A uses these standards, documentation, and tooling references to keep examples, projects, and expectations aligned with current practice.\n\n**Core references:**\n- Common Core Algebra: https://www.thecorestandards.org/Math/Content/HSA/\n\n**Reference-supported work:** A strong Algebra 1A entry names the standard or documentation page, explains why it matters, and connects it to a visible task such as a worked example, project requirement, assessment item, or reflection prompt.\n\n**Finished Algebra 1A work shows:** Algebra 1A examples, projects, and checkpoints can be traced back to the reference map, not only to project titles."
					},
					{
						title: "Algebra 1A Core Skills",
						content:
							"**Skill map:** Algebra 1A uses these skills for focused review, clear examples, and explicit prerequisite connections before larger projects.\n\n**Core skills:**\n- Align the sequence to standards-backed algebra and functions progressions.\n- Separate lesson, practice, project, review, quiz, and cumulative assessment roles.\n- Adds graphing, modeling, and error-analysis projects rather than only procedural practice.\n\n**Reference role:** For Algebra 1A, use the references to clarify lesson focus, project requirements, and visible course work. Each Algebra 1A core-skill item can become a short explanation, practice check, or focused review path depending on the current need.\n\n**Practice setup:** Algebra 1A lessons and projects are usable when one core skill has a concrete explanation, worked example, practice task, and observable work."
					},
					{
						title: "Algebra 1A Next Topics",
						content:
							"**Growth areas:** Algebra 1A next areas for deeper coverage appear in prerequisite order and connect each addition to a concrete project or checkpoint.\n\n**Expansion topics:**\n- Structure, equivalence, multiple representations, modeling, graph interpretation, and written reasoning.\n- Linear equations, slope, inequalities, systems, and linear modeling.\n\n**Reference role:** For Algebra 1A, use the references to clarify lesson focus, project requirements, and visible course work. Algebra 1A topic additions are strongest when they include vocabulary, one representative example, one common-error check, and one transfer task.\n\n**Bridge rule:** New Algebra 1A topics need a visible connection to a real project. When that connection is unclear in Algebra 1A, a smaller bridge practice comes before the major project."
					},
					{
						title: "Algebra 1A Boundaries",
						content:
							"**Scope boundary:** Algebra 1A scope and extension topics clarify what belongs in this course and what fits better in a prerequisite, follow-up, or separate course. This keeps the course coherent instead of absorbing every adjacent topic.\n\n**Boundary rule:** A topic belongs in Algebra 1A when it directly supports the projects, assessments, and expected skill level. A topic belongs elsewhere when it requires a different prerequisite chain, safety model, or level of depth that would crowd out the core purpose.\n\n**Boundary check:** The Algebra 1A boundary, one near-term extension, and one topic reserved for a later course are explicit."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 1A Prerequisite Check",
						content:
							"**Prerequisite check:** Deeper Algebra 1A work relies on clear prerequisite skills, target references, and first observable success criteria.\n\n**Course check:** Algebra 1A separates prerequisite knowledge, required content, optional enrichment, and reference-only material. Each major skill connects to a project or assessment that shows the skill can be used independently.\n\n**Prerequisite evidence:**\n- At least three Algebra 1A prerequisites are named.\n- Each Algebra 1A module cites a standard, official document, or deliberate toolchain target.\n- The first Algebra 1A success criterion is explicit."
					},
					{
						title: "Algebra 1A Pathway Map",
						content:
							"**Pathway map:** The Algebra 1A pathway organizes prerequisite skills, core concepts, project practice, assessments, enrichment, and reference material in dependency order.\n\n**Ordering rule:** Algebra 1A pathway decisions are based on dependency, not convenience. If any Algebra 1A project expects a skill that has not appeared in a worked example or smaller practice task, a bridge item belongs before that project.\n\n**Pathway is clear when:**\n- Each prerequisite skill has a clear next action.\n- Required Algebra 1A skills appear before the project that depends on them.\n- Optional enrichment is labeled separately from required pacing."
					}
				]
			},
			{
				kind: "appendix",
				title: "Course Roadmap",
				curriculum: [
					{
						title: "Algebra 1A Follow-Up Path",
						content:
							"**Extension path:** These Algebra 1A topics show natural directions after the Algebra 1A core sequence. The Algebra 1A order follows prerequisite dependency so each extension builds on skills already practiced.\n\n**Possible next topics:**\n- Algebraic habits: structure, equivalence, and checking.\n- Functions across tables, graphs, equations, and verbal rules.\n- Modeling with real or provided data.\n- Error-analysis workshops.\n- Cumulative readiness and mixed-practice checks.\n\n**Sequence check:** The Algebra 1A order is defensible when prerequisites are explicit, vocabulary appears before it is required in a project, and every larger build has a smaller earlier checkpoint that exercises the same skill.\n\n**Useful Algebra 1A module pattern:** A complete module states the concept, explains why it matters, includes one worked example, provides one practice task, checks understanding quickly, and offers one extension."
					},
					{
						title: "Algebra 1A Resource Map",
						content:
							"**Resource map:** Algebra 1A materials identify the code, datasets, simulations, version choices, and references used in the course.\n\n**Materials and tools:**\n- Common Core standard map.\n- Desmos or GeoGebra graphing tasks.\n- Worked-example and error-analysis templates.\n\n**Resource roles:** Each Algebra 1A resource has a role: explanation, starter artifact, data source, simulation, rubric, answer check, or extension. Algebra 1A links that are only background references are labeled that way so they do not look like required assignments.\n\n**Safety or delivery boundary:** Algebra 1A uses age-appropriate examples, cited references, and project scopes small enough for an online lesson."
					},
					{
						title: "Algebra 1A Module Alignment Guide",
						content:
							"**Alignment guide:** Strong Algebra 1A modules connect the concept, example, project, and checkpoint to the same module outcome.\n\n**Alignment test:** In a complete Algebra 1A module, the concept, project, and checkpoint all practice the same skill. If the checkpoint for Algebra 1A checks a different skill than the project practices, the module needs a clearer project target before it is ready.\n\n**Aligned modules show:**\n- Each module in Algebra 1A has a named prerequisite and observable outcome.\n- Each project in Algebra 1A has required behavior, test cases, and an extension.\n- The checkpoint format for Algebra 1A matches the work: code trace, rubric, CER response, math justification, security report, or model evaluation.\n- Any toolchain, dataset, simulation, or source-code dependency for Algebra 1A is linked with version or access notes."
					},
					{
						title: "Algebra 1A Reference Map",
						content:
							"**Reference map:** Algebra 1A references are most useful when their role is clear: concept explanation, starter code, dataset, simulation, exam standard, official documentation, or optional background.\n\n**Version note:** Stable Algebra 1A concepts can use long-lived references, while tool versions, code repositories, exam links, data licenses, and simulation URLs need clear version or access notes.\n\n**Reference check:** A useful Algebra 1A reference note states which links or versions are stable, which materials need periodic review, and which materials are reference-only rather than assignments."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 1A Prerequisite Map",
						content:
							'**Map purpose:** The Algebra 1A prerequisite map shows which modules unlock later projects and which topics work as optional enrichment.\n\n**Map reading:** Each Algebra 1A node is a concrete skill or module, not a broad course label. Each dependency edge in Algebra 1A explains the prerequisite in plain language, such as "requires arrays before 2D grids" or "requires variables before simulation state."\n\n**What the map clarifies:**\n- The main Algebra 1A modules or topic clusters are visible in prerequisite order.\n- Each dependency edge in Algebra 1A explains why one idea needs to come before another.\n- Risky Algebra 1A ordering decisions can be spotted before they interrupt a project.'
					},
					{
						title: "Algebra 1A Resource Inventory",
						content:
							"**Inventory purpose:** The Algebra 1A resource inventory identifies source code, starter/reference files, datasets, simulations, diagrams, rubrics, and tool versions used by the course.\n\n**Inventory reading:** A missing resource in Algebra 1A is not automatically a blocker, but it needs a clear classification: required, replaceable, provided, created during the course, optional enrichment, or reference-only. That classification prevents unlisted materials from becoming required by accident.\n\n**Resource checks:**\n- Required Algebra 1A projects have a starter state or equivalent handout.\n- Algebra 1A assessments have a rubric or answer-check method.\n- External Algebra 1A tools or sources are documented with stable URLs."
					}
				]
			},
			{
				kind: "appendix",
				title: "Project Practice Guide",
				curriculum: [
					{
						title: "Algebra 1A Project Ladder",
						content:
							"**Project progression:** These Algebra 1A project types create a progression for Algebra 1A from guided practice to independent capstone work. Every Algebra 1A project names the artifact, required behavior, evidence of correctness, and one extension path.\n\n**Project types:**\n- Model a real or provided dataset.\n- Creates a graph-and-equation story.\n- Repair a worked solution with hidden errors.\n- Builds a standards-aligned mixed review set.\n- Write a short justification for each transformation step.\n\n**Project evidence:** Project work in Algebra 1A is ready when the expected artifact, success criteria, standard scenario, edge case, explanation target, and extension path are clear without guessing what the work is meant to demonstrate.\n\n**Project completion:** Project work in Algebra 1A is complete when the main design, model, proof, or reasoning choice is explained, not only when it runs or produces an answer."
					},
					{
						title: "Algebra 1A Checkpoints",
						content:
							"**Checkpoint map:** These checks identify whether Algebra 1A concepts are ready for the next module.\n\n**Assessment ideas:**\n- Standards-aligned short quizzes.\n- Explains-your-reasoning checkpoints.\n- Graph interpretation checks.\n- Error correction tasks.\n- Cumulative mixed-practice checks every few modules.\n\n**Checkpoint use:** Each Algebra 1A assessment provides evidence for one named skill. The best Algebra 1A checkpoint is small enough to complete quickly but specific enough to reveal whether the concept transfers to a changed example.\n\n**Evidence of proficiency:** Algebra 1A work demonstrates the ability to transfer the same idea to a new example, explain why the result is valid, and identify one limitation or edge case."
					},
					{
						title: "Algebra 1A Rubric",
						content:
							"**Reflection:** Every major Algebra 1A project includes a short note naming the goal, approach, evidence, bug or misconception, and one next improvement.\n\n**Rubric use:** Algebra 1A finished work and the explanation are evaluated separately. A project in Algebra 1A can produce the right output while still needing a stronger explanation, clearer evidence, better edge-case coverage, or a more maintainable structure.\n\n**Project checks:**\n- The project result for Algebra 1A is visible, runnable, or inspectable.\n- A normal case and an edge case for Algebra 1A are tested or justified.\n- The explanation for Algebra 1A does not depend on reading every line or step from notes."
					},
					{
						title: "Algebra 1A Capstone Gate",
						content:
							"**Capstone gate:** Before the Algebra 1A capstone begins, prerequisite modules, project types, and checkpoint style are practiced on smaller artifacts.\n\n**Gate guidance:** The Algebra 1A capstone is ready when it combines known skills in a larger context rather than introducing several untested ideas at once. The first Algebra 1A version stays narrow, demonstrable, and easy to verify before optional polish is added.\n\n**Required Algebra 1A capstone brief:** The target user or problem, exact project result, core concept reused from earlier modules, minimum viable first version, and proof evidence are all explicit.\n\n**Capstone checks:**\n- The Algebra 1A capstone has one ordinary path and one edge, failure, or misconception path.\n- The first milestone can be tested without completing every optional feature.\n- The explanation separates required behavior from polish.\n- Two risks are named with a mitigation, fallback, or narrowed scope."
					}
				],
				supplementalProjects: [
					{
						title: "Practice Project: Model a Real or Provided Dataset",
						content:
							"**Goal:** The Model a Real or Provided Dataset project models, solves, graphs, or justifies relationships in Algebra 1A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Model a real or provided dataset, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Model a Real or Provided Dataset, standards-aligned short quizzes.\n- For Model a Real or Provided Dataset, explain-your-reasoning checkpoints.\n- For Model a Real or Provided Dataset, graph interpretation checks.\n\n**Extension:** In Model a real or provided dataset, add a second example that tests the same idea under a different boundary condition."
					},
					{
						title: "Practice Project: Create a Graph-And-Equation Story",
						content:
							"**Goal:** The Create a Graph-And-Equation Story project models, solves, graphs, or justifies relationships in Algebra 1A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Create a graph-and-equation story, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Create a Graph-And-Equation Story, standards-aligned short quizzes.\n- For Create a Graph-And-Equation Story, explain-your-reasoning checkpoints.\n- For Create a Graph-And-Equation Story, graph interpretation checks.\n\n**Extension:** In Create a graph-and-equation story, add a second example that tests the same idea under a different boundary condition."
					},
					{
						title: "Practice Project: Repair a Worked Solution with Hidden Errors",
						content:
							"**Goal:** The Repair a Worked Solution with Hidden Errors project models, solves, graphs, or justifies relationships in Algebra 1A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Repair a worked solution with hidden errors, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Repair a Worked Solution with Hidden Errors, standards-aligned short quizzes.\n- For Repair a Worked Solution with Hidden Errors, explain-your-reasoning checkpoints.\n- For Repair a Worked Solution with Hidden Errors, graph interpretation checks.\n\n**Extension:** In Repair a worked solution with hidden errors, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					},
					{
						title: "Practice Project: Build a Standards-Aligned Mixed Review Set",
						content:
							"**Goal:** The Build a Standards-Aligned Mixed Review Set project models, solves, graphs, or justifies relationships in Algebra 1A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Build a standards-aligned mixed review set, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Build a Standards-Aligned Mixed Review Set, standards-aligned short quizzes.\n- For Build a Standards-Aligned Mixed Review Set, explain-your-reasoning checkpoints.\n- For Build a Standards-Aligned Mixed Review Set, graph interpretation checks.\n\n**Extension:** In Build a standards-aligned mixed review set, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Write a Short Justification for Each Transformation Step",
						content:
							"**Goal:** The Write a Short Justification for Each Transformation Step project models, solves, graphs, or justifies relationships in Algebra 1A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Write a short justification for each transformation step, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Write a Short Justification for Each Transformation Step, standards-aligned short quizzes.\n- For Write a Short Justification for Each Transformation Step, explain-your-reasoning checkpoints.\n- For Write a Short Justification for Each Transformation Step, graph interpretation checks.\n\n**Extension:** In Write a short justification for each transformation step, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					}
				]
			}
		]
	},
	"algebra-1b": {
		expectedModuleCount: 26,
		addedModules: [
			{
				kind: "appendix",
				title: "Standards Map",
				curriculum: [
					{
						title: "Algebra 1B Reference Guide",
						content:
							"**Reference map:** Algebra 1B uses these standards, documentation, and tooling references to keep examples, projects, and expectations aligned with current practice.\n\n**Core references:**\n- Common Core Algebra: https://www.thecorestandards.org/Math/Content/HSA/\n\n**Reference-supported work:** A strong Algebra 1B entry names the standard or documentation page, explains why it matters, and connects it to a visible task such as a worked example, project requirement, assessment item, or reflection prompt.\n\n**Finished Algebra 1B work shows:** Algebra 1B examples, projects, and checkpoints can be traced back to the reference map, not only to project titles."
					},
					{
						title: "Algebra 1B Core Skills",
						content:
							"**Skill map:** Algebra 1B uses these skills for focused review, clear examples, and explicit prerequisite connections before larger projects.\n\n**Core skills:**\n- Align the sequence to standards-backed algebra and functions progressions.\n- Separate lesson, practice, project, review, quiz, and cumulative assessment roles.\n- Adds graphing, modeling, and error-analysis projects rather than only procedural practice.\n\n**Reference role:** For Algebra 1B, use the references to clarify lesson focus, project requirements, and visible course work. Each Algebra 1B core-skill item can become a short explanation, practice check, or focused review path depending on the current need.\n\n**Practice setup:** Algebra 1B lessons and projects are usable when one core skill has a concrete explanation, worked example, practice task, and observable work."
					},
					{
						title: "Algebra 1B Next Topics",
						content:
							"**Growth areas:** Algebra 1B next areas for deeper coverage appear in prerequisite order and connect each addition to a concrete project or checkpoint.\n\n**Expansion topics:**\n- Structure, equivalence, multiple representations, modeling, graph interpretation, and written reasoning.\n- Polynomials, quadratics, functions, variation, and data modeling.\n\n**Reference role:** For Algebra 1B, use the references to clarify lesson focus, project requirements, and visible course work. Algebra 1B topic additions are strongest when they include vocabulary, one representative example, one common-error check, and one transfer task.\n\n**Bridge rule:** New Algebra 1B topics need a visible connection to a real project. When that connection is unclear in Algebra 1B, a smaller bridge practice comes before the major project."
					},
					{
						title: "Algebra 1B Boundaries",
						content:
							"**Scope boundary:** Algebra 1B scope and extension topics clarify what belongs in this course and what fits better in a prerequisite, follow-up, or separate course. This keeps the course coherent instead of absorbing every adjacent topic.\n\n**Boundary rule:** A topic belongs in Algebra 1B when it directly supports the projects, assessments, and expected skill level. A topic belongs elsewhere when it requires a different prerequisite chain, safety model, or level of depth that would crowd out the core purpose.\n\n**Boundary check:** The Algebra 1B boundary, one near-term extension, and one topic reserved for a later course are explicit."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 1B Prerequisite Check",
						content:
							"**Prerequisite check:** Deeper Algebra 1B work relies on clear prerequisite skills, target references, and first observable success criteria.\n\n**Course check:** Algebra 1B separates prerequisite knowledge, required content, optional enrichment, and reference-only material. Each major skill connects to a project or assessment that shows the skill can be used independently.\n\n**Prerequisite evidence:**\n- At least three Algebra 1B prerequisites are named.\n- Each Algebra 1B module cites a standard, official document, or deliberate toolchain target.\n- The first Algebra 1B success criterion is explicit."
					},
					{
						title: "Algebra 1B Pathway Map",
						content:
							"**Pathway map:** The Algebra 1B pathway organizes prerequisite skills, core concepts, project practice, assessments, enrichment, and reference material in dependency order.\n\n**Ordering rule:** Algebra 1B pathway decisions are based on dependency, not convenience. If any Algebra 1B project expects a skill that has not appeared in a worked example or smaller practice task, a bridge item belongs before that project.\n\n**Pathway is clear when:**\n- Each prerequisite skill has a clear next action.\n- Required Algebra 1B skills appear before the project that depends on them.\n- Optional enrichment is labeled separately from required pacing."
					}
				]
			},
			{
				kind: "appendix",
				title: "Course Roadmap",
				curriculum: [
					{
						title: "Algebra 1B Follow-Up Path",
						content:
							"**Extension path:** These Algebra 1B topics show natural directions after the Algebra 1B core sequence. The Algebra 1B order follows prerequisite dependency so each extension builds on skills already practiced.\n\n**Possible next topics:**\n- Algebraic habits: structure, equivalence, and checking.\n- Functions across tables, graphs, equations, and verbal rules.\n- Modeling with real or provided data.\n- Error-analysis workshops.\n- Cumulative readiness and mixed-practice checks.\n\n**Sequence check:** The Algebra 1B order is defensible when prerequisites are explicit, vocabulary appears before it is required in a project, and every larger build has a smaller earlier checkpoint that exercises the same skill.\n\n**Useful Algebra 1B module pattern:** A complete module states the concept, explains why it matters, includes one worked example, provides one practice task, checks understanding quickly, and offers one extension."
					},
					{
						title: "Algebra 1B Resource Map",
						content:
							"**Resource map:** Algebra 1B materials identify the code, datasets, simulations, version choices, and references used in the course.\n\n**Materials and tools:**\n- Common Core standard map.\n- Desmos or GeoGebra graphing tasks.\n- Worked-example and error-analysis templates.\n\n**Resource roles:** Each Algebra 1B resource has a role: explanation, starter artifact, data source, simulation, rubric, answer check, or extension. Algebra 1B links that are only background references are labeled that way so they do not look like required assignments.\n\n**Safety or delivery boundary:** Algebra 1B uses age-appropriate examples, cited references, and project scopes small enough for an online lesson."
					},
					{
						title: "Algebra 1B Module Alignment Guide",
						content:
							"**Alignment guide:** Strong Algebra 1B modules connect the concept, example, project, and checkpoint to the same module outcome.\n\n**Alignment test:** In a complete Algebra 1B module, the concept, project, and checkpoint all practice the same skill. If the checkpoint for Algebra 1B checks a different skill than the project practices, the module needs a clearer project target before it is ready.\n\n**Aligned modules show:**\n- Each module in Algebra 1B has a named prerequisite and observable outcome.\n- Each project in Algebra 1B has required behavior, test cases, and an extension.\n- The checkpoint format for Algebra 1B matches the work: code trace, rubric, CER response, math justification, security report, or model evaluation.\n- Any toolchain, dataset, simulation, or source-code dependency for Algebra 1B is linked with version or access notes."
					},
					{
						title: "Algebra 1B Reference Map",
						content:
							"**Reference map:** Algebra 1B references are most useful when their role is clear: concept explanation, starter code, dataset, simulation, exam standard, official documentation, or optional background.\n\n**Version note:** Stable Algebra 1B concepts can use long-lived references, while tool versions, code repositories, exam links, data licenses, and simulation URLs need clear version or access notes.\n\n**Reference check:** A useful Algebra 1B reference note states which links or versions are stable, which materials need periodic review, and which materials are reference-only rather than assignments."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 1B Prerequisite Map",
						content:
							'**Map purpose:** The Algebra 1B prerequisite map shows which modules unlock later projects and which topics work as optional enrichment.\n\n**Map reading:** Each Algebra 1B node is a concrete skill or module, not a broad course label. Each dependency edge in Algebra 1B explains the prerequisite in plain language, such as "requires arrays before 2D grids" or "requires variables before simulation state."\n\n**What the map clarifies:**\n- The main Algebra 1B modules or topic clusters are visible in prerequisite order.\n- Each dependency edge in Algebra 1B explains why one idea needs to come before another.\n- Risky Algebra 1B ordering decisions can be spotted before they interrupt a project.'
					},
					{
						title: "Algebra 1B Resource Inventory",
						content:
							"**Inventory purpose:** The Algebra 1B resource inventory identifies source code, starter/reference files, datasets, simulations, diagrams, rubrics, and tool versions used by the course.\n\n**Inventory reading:** A missing resource in Algebra 1B is not automatically a blocker, but it needs a clear classification: required, replaceable, provided, created during the course, optional enrichment, or reference-only. That classification prevents unlisted materials from becoming required by accident.\n\n**Resource checks:**\n- Required Algebra 1B projects have a starter state or equivalent handout.\n- Algebra 1B assessments have a rubric or answer-check method.\n- External Algebra 1B tools or sources are documented with stable URLs."
					}
				]
			},
			{
				kind: "appendix",
				title: "Project Practice Guide",
				curriculum: [
					{
						title: "Algebra 1B Project Ladder",
						content:
							"**Project progression:** These Algebra 1B project types create a progression for Algebra 1B from guided practice to independent capstone work. Every Algebra 1B project names the artifact, required behavior, evidence of correctness, and one extension path.\n\n**Project types:**\n- Model a real or provided dataset.\n- Creates a graph-and-equation story.\n- Repair a worked solution with hidden errors.\n- Builds a standards-aligned mixed review set.\n- Write a short justification for each transformation step.\n\n**Project evidence:** Project work in Algebra 1B is ready when the expected artifact, success criteria, standard scenario, edge case, explanation target, and extension path are clear without guessing what the work is meant to demonstrate.\n\n**Project completion:** Project work in Algebra 1B is complete when the main design, model, proof, or reasoning choice is explained, not only when it runs or produces an answer."
					},
					{
						title: "Algebra 1B Checkpoints",
						content:
							"**Checkpoint map:** These checks identify whether Algebra 1B concepts are ready for the next module.\n\n**Assessment ideas:**\n- Standards-aligned short quizzes.\n- Explains-your-reasoning checkpoints.\n- Graph interpretation checks.\n- Error correction tasks.\n- Cumulative mixed-practice checks every few modules.\n\n**Checkpoint use:** Each Algebra 1B assessment provides evidence for one named skill. The best Algebra 1B checkpoint is small enough to complete quickly but specific enough to reveal whether the concept transfers to a changed example.\n\n**Evidence of proficiency:** Algebra 1B work demonstrates the ability to transfer the same idea to a new example, explain why the result is valid, and identify one limitation or edge case."
					},
					{
						title: "Algebra 1B Rubric",
						content:
							"**Reflection:** Every major Algebra 1B project includes a short note naming the goal, approach, evidence, bug or misconception, and one next improvement.\n\n**Rubric use:** Algebra 1B finished work and the explanation are evaluated separately. A project in Algebra 1B can produce the right output while still needing a stronger explanation, clearer evidence, better edge-case coverage, or a more maintainable structure.\n\n**Project checks:**\n- The project result for Algebra 1B is visible, runnable, or inspectable.\n- A normal case and an edge case for Algebra 1B are tested or justified.\n- The explanation for Algebra 1B does not depend on reading every line or step from notes."
					},
					{
						title: "Algebra 1B Capstone Gate",
						content:
							"**Capstone gate:** Before the Algebra 1B capstone begins, prerequisite modules, project types, and checkpoint style are practiced on smaller artifacts.\n\n**Gate guidance:** The Algebra 1B capstone is ready when it combines known skills in a larger context rather than introducing several untested ideas at once. The first Algebra 1B version stays narrow, demonstrable, and easy to verify before optional polish is added.\n\n**Required Algebra 1B capstone brief:** The target user or problem, exact project result, core concept reused from earlier modules, minimum viable first version, and proof evidence are all explicit.\n\n**Capstone checks:**\n- The Algebra 1B capstone has one ordinary path and one edge, failure, or misconception path.\n- The first milestone can be tested without completing every optional feature.\n- The explanation separates required behavior from polish.\n- Two risks are named with a mitigation, fallback, or narrowed scope."
					}
				],
				supplementalProjects: [
					{
						title: "Practice Project: Model a Real or Provided Dataset",
						content:
							"**Goal:** The Model a Real or Provided Dataset project models, solves, graphs, or justifies relationships in Algebra 1B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Model a real or provided dataset, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Model a Real or Provided Dataset, standards-aligned short quizzes.\n- For Model a Real or Provided Dataset, explain-your-reasoning checkpoints.\n- For Model a Real or Provided Dataset, graph interpretation checks.\n\n**Extension:** In Model a real or provided dataset, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					},
					{
						title: "Practice Project: Create a Graph-And-Equation Story",
						content:
							"**Goal:** The Create a Graph-And-Equation Story project models, solves, graphs, or justifies relationships in Algebra 1B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Create a graph-and-equation story, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Create a Graph-And-Equation Story, standards-aligned short quizzes.\n- For Create a Graph-And-Equation Story, explain-your-reasoning checkpoints.\n- For Create a Graph-And-Equation Story, graph interpretation checks.\n\n**Extension:** In Create a graph-and-equation story, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Repair a Worked Solution with Hidden Errors",
						content:
							"**Goal:** The Repair a Worked Solution with Hidden Errors project models, solves, graphs, or justifies relationships in Algebra 1B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Repair a worked solution with hidden errors, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Repair a Worked Solution with Hidden Errors, standards-aligned short quizzes.\n- For Repair a Worked Solution with Hidden Errors, explain-your-reasoning checkpoints.\n- For Repair a Worked Solution with Hidden Errors, graph interpretation checks.\n\n**Extension:** In Repair a worked solution with hidden errors, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					},
					{
						title: "Practice Project: Build a Standards-Aligned Mixed Review Set",
						content:
							"**Goal:** The Build a Standards-Aligned Mixed Review Set project models, solves, graphs, or justifies relationships in Algebra 1B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Build a standards-aligned mixed review set, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Build a Standards-Aligned Mixed Review Set, standards-aligned short quizzes.\n- For Build a Standards-Aligned Mixed Review Set, explain-your-reasoning checkpoints.\n- For Build a Standards-Aligned Mixed Review Set, graph interpretation checks.\n\n**Extension:** In Build a standards-aligned mixed review set, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Write a Short Justification for Each Transformation Step",
						content:
							"**Goal:** The Write a Short Justification for Each Transformation Step project models, solves, graphs, or justifies relationships in Algebra 1B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Write a short justification for each transformation step, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Write a Short Justification for Each Transformation Step, standards-aligned short quizzes.\n- For Write a Short Justification for Each Transformation Step, explain-your-reasoning checkpoints.\n- For Write a Short Justification for Each Transformation Step, graph interpretation checks.\n\n**Extension:** In Write a short justification for each transformation step, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					}
				]
			}
		]
	},
	"algebra-2a": {
		expectedModuleCount: 16,
		addedModules: [
			{
				kind: "appendix",
				title: "Standards Map",
				curriculum: [
					{
						title: "Algebra 2A Reference Guide",
						content:
							"**Reference map:** Algebra 2A uses these standards, documentation, and tooling references to keep examples, projects, and expectations aligned with current practice.\n\n**Core references:**\n- Common Core Algebra: https://www.thecorestandards.org/Math/Content/HSA/\n\n**Reference-supported work:** A strong Algebra 2A entry names the standard or documentation page, explains why it matters, and connects it to a visible task such as a worked example, project requirement, assessment item, or reflection prompt.\n\n**Finished Algebra 2A work shows:** Algebra 2A examples, projects, and checkpoints can be traced back to the reference map, not only to project titles."
					},
					{
						title: "Algebra 2A Core Skills",
						content:
							"**Skill map:** Algebra 2A uses these skills for focused review, clear examples, and explicit prerequisite connections before larger projects.\n\n**Core skills:**\n- Align the sequence to standards-backed algebra and functions progressions.\n- Separate lesson, practice, project, review, quiz, and cumulative assessment roles.\n- Adds graphing, modeling, and error-analysis projects rather than only procedural practice.\n\n**Reference role:** For Algebra 2A, use the references to clarify lesson focus, project requirements, and visible course work. Each Algebra 2A core-skill item can become a short explanation, practice check, or focused review path depending on the current need.\n\n**Practice setup:** Algebra 2A lessons and projects are usable when one core skill has a concrete explanation, worked example, practice task, and observable work."
					},
					{
						title: "Algebra 2A Next Topics",
						content:
							"**Growth areas:** Algebra 2A next areas for deeper coverage appear in prerequisite order and connect each addition to a concrete project or checkpoint.\n\n**Expansion topics:**\n- Structure, equivalence, multiple representations, modeling, graph interpretation, and written reasoning.\n- Complex numbers, quadratics, polynomial division, rational functions, radical functions, and piecewise functions.\n\n**Reference role:** For Algebra 2A, use the references to clarify lesson focus, project requirements, and visible course work. Algebra 2A topic additions are strongest when they include vocabulary, one representative example, one common-error check, and one transfer task.\n\n**Bridge rule:** New Algebra 2A topics need a visible connection to a real project. When that connection is unclear in Algebra 2A, a smaller bridge practice comes before the major project."
					},
					{
						title: "Algebra 2A Boundaries",
						content:
							"**Scope boundary:** Algebra 2A scope and extension topics clarify what belongs in this course and what fits better in a prerequisite, follow-up, or separate course. This keeps the course coherent instead of absorbing every adjacent topic.\n\n**Boundary rule:** A topic belongs in Algebra 2A when it directly supports the projects, assessments, and expected skill level. A topic belongs elsewhere when it requires a different prerequisite chain, safety model, or level of depth that would crowd out the core purpose.\n\n**Boundary check:** The Algebra 2A boundary, one near-term extension, and one topic reserved for a later course are explicit."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 2A Prerequisite Check",
						content:
							"**Prerequisite check:** Deeper Algebra 2A work relies on clear prerequisite skills, target references, and first observable success criteria.\n\n**Course check:** Algebra 2A separates prerequisite knowledge, required content, optional enrichment, and reference-only material. Each major skill connects to a project or assessment that shows the skill can be used independently.\n\n**Prerequisite evidence:**\n- At least three Algebra 2A prerequisites are named.\n- Each Algebra 2A module cites a standard, official document, or deliberate toolchain target.\n- The first Algebra 2A success criterion is explicit."
					},
					{
						title: "Algebra 2A Pathway Map",
						content:
							"**Pathway map:** The Algebra 2A pathway organizes prerequisite skills, core concepts, project practice, assessments, enrichment, and reference material in dependency order.\n\n**Ordering rule:** Algebra 2A pathway decisions are based on dependency, not convenience. If any Algebra 2A project expects a skill that has not appeared in a worked example or smaller practice task, a bridge item belongs before that project.\n\n**Pathway is clear when:**\n- Each prerequisite skill has a clear next action.\n- Required Algebra 2A skills appear before the project that depends on them.\n- Optional enrichment is labeled separately from required pacing."
					}
				]
			},
			{
				kind: "appendix",
				title: "Course Roadmap",
				curriculum: [
					{
						title: "Algebra 2A Follow-Up Path",
						content:
							"**Extension path:** These Algebra 2A topics show natural directions after the Algebra 2A core sequence. The Algebra 2A order follows prerequisite dependency so each extension builds on skills already practiced.\n\n**Possible next topics:**\n- Algebraic habits: structure, equivalence, and checking.\n- Functions across tables, graphs, equations, and verbal rules.\n- Modeling with real or provided data.\n- Error-analysis workshops.\n- Cumulative readiness and mixed-practice checks.\n\n**Sequence check:** The Algebra 2A order is defensible when prerequisites are explicit, vocabulary appears before it is required in a project, and every larger build has a smaller earlier checkpoint that exercises the same skill.\n\n**Useful Algebra 2A module pattern:** A complete module states the concept, explains why it matters, includes one worked example, provides one practice task, checks understanding quickly, and offers one extension."
					},
					{
						title: "Algebra 2A Resource Map",
						content:
							"**Resource map:** Algebra 2A materials identify the code, datasets, simulations, version choices, and references used in the course.\n\n**Materials and tools:**\n- Common Core standard map.\n- Desmos or GeoGebra graphing tasks.\n- Worked-example and error-analysis templates.\n\n**Resource roles:** Each Algebra 2A resource has a role: explanation, starter artifact, data source, simulation, rubric, answer check, or extension. Algebra 2A links that are only background references are labeled that way so they do not look like required assignments.\n\n**Safety or delivery boundary:** Algebra 2A uses age-appropriate examples, cited references, and project scopes small enough for an online lesson."
					},
					{
						title: "Algebra 2A Module Alignment Guide",
						content:
							"**Alignment guide:** Strong Algebra 2A modules connect the concept, example, project, and checkpoint to the same module outcome.\n\n**Alignment test:** In a complete Algebra 2A module, the concept, project, and checkpoint all practice the same skill. If the checkpoint for Algebra 2A checks a different skill than the project practices, the module needs a clearer project target before it is ready.\n\n**Aligned modules show:**\n- Each module in Algebra 2A has a named prerequisite and observable outcome.\n- Each project in Algebra 2A has required behavior, test cases, and an extension.\n- The checkpoint format for Algebra 2A matches the work: code trace, rubric, CER response, math justification, security report, or model evaluation.\n- Any toolchain, dataset, simulation, or source-code dependency for Algebra 2A is linked with version or access notes."
					},
					{
						title: "Algebra 2A Reference Map",
						content:
							"**Reference map:** Algebra 2A references are most useful when their role is clear: concept explanation, starter code, dataset, simulation, exam standard, official documentation, or optional background.\n\n**Version note:** Stable Algebra 2A concepts can use long-lived references, while tool versions, code repositories, exam links, data licenses, and simulation URLs need clear version or access notes.\n\n**Reference check:** A useful Algebra 2A reference note states which links or versions are stable, which materials need periodic review, and which materials are reference-only rather than assignments."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 2A Prerequisite Map",
						content:
							'**Map purpose:** The Algebra 2A prerequisite map shows which modules unlock later projects and which topics work as optional enrichment.\n\n**Map reading:** Each Algebra 2A node is a concrete skill or module, not a broad course label. Each dependency edge in Algebra 2A explains the prerequisite in plain language, such as "requires arrays before 2D grids" or "requires variables before simulation state."\n\n**What the map clarifies:**\n- The main Algebra 2A modules or topic clusters are visible in prerequisite order.\n- Each dependency edge in Algebra 2A explains why one idea needs to come before another.\n- Risky Algebra 2A ordering decisions can be spotted before they interrupt a project.'
					},
					{
						title: "Algebra 2A Resource Inventory",
						content:
							"**Inventory purpose:** The Algebra 2A resource inventory identifies source code, starter/reference files, datasets, simulations, diagrams, rubrics, and tool versions used by the course.\n\n**Inventory reading:** A missing resource in Algebra 2A is not automatically a blocker, but it needs a clear classification: required, replaceable, provided, created during the course, optional enrichment, or reference-only. That classification prevents unlisted materials from becoming required by accident.\n\n**Resource checks:**\n- Required Algebra 2A projects have a starter state or equivalent handout.\n- Algebra 2A assessments have a rubric or answer-check method.\n- External Algebra 2A tools or sources are documented with stable URLs."
					}
				]
			},
			{
				kind: "appendix",
				title: "Project Practice Guide",
				curriculum: [
					{
						title: "Algebra 2A Project Ladder",
						content:
							"**Project progression:** These Algebra 2A project types create a progression for Algebra 2A from guided practice to independent capstone work. Every Algebra 2A project names the artifact, required behavior, evidence of correctness, and one extension path.\n\n**Project types:**\n- Model a real or provided dataset.\n- Creates a graph-and-equation story.\n- Repair a worked solution with hidden errors.\n- Builds a standards-aligned mixed review set.\n- Write a short justification for each transformation step.\n\n**Project evidence:** Project work in Algebra 2A is ready when the expected artifact, success criteria, standard scenario, edge case, explanation target, and extension path are clear without guessing what the work is meant to demonstrate.\n\n**Project completion:** Project work in Algebra 2A is complete when the main design, model, proof, or reasoning choice is explained, not only when it runs or produces an answer."
					},
					{
						title: "Algebra 2A Checkpoints",
						content:
							"**Checkpoint map:** These checks identify whether Algebra 2A concepts are ready for the next module.\n\n**Assessment ideas:**\n- Standards-aligned short quizzes.\n- Explains-your-reasoning checkpoints.\n- Graph interpretation checks.\n- Error correction tasks.\n- Cumulative mixed-practice checks every few modules.\n\n**Checkpoint use:** Each Algebra 2A assessment provides evidence for one named skill. The best Algebra 2A checkpoint is small enough to complete quickly but specific enough to reveal whether the concept transfers to a changed example.\n\n**Evidence of proficiency:** Algebra 2A work demonstrates the ability to transfer the same idea to a new example, explain why the result is valid, and identify one limitation or edge case."
					},
					{
						title: "Algebra 2A Rubric",
						content:
							"**Reflection:** Every major Algebra 2A project includes a short note naming the goal, approach, evidence, bug or misconception, and one next improvement.\n\n**Rubric use:** Algebra 2A finished work and the explanation are evaluated separately. A project in Algebra 2A can produce the right output while still needing a stronger explanation, clearer evidence, better edge-case coverage, or a more maintainable structure.\n\n**Project checks:**\n- The project result for Algebra 2A is visible, runnable, or inspectable.\n- A normal case and an edge case for Algebra 2A are tested or justified.\n- The explanation for Algebra 2A does not depend on reading every line or step from notes."
					},
					{
						title: "Algebra 2A Capstone Gate",
						content:
							"**Capstone gate:** Before the Algebra 2A capstone begins, prerequisite modules, project types, and checkpoint style are practiced on smaller artifacts.\n\n**Gate guidance:** The Algebra 2A capstone is ready when it combines known skills in a larger context rather than introducing several untested ideas at once. The first Algebra 2A version stays narrow, demonstrable, and easy to verify before optional polish is added.\n\n**Required Algebra 2A capstone brief:** The target user or problem, exact project result, core concept reused from earlier modules, minimum viable first version, and proof evidence are all explicit.\n\n**Capstone checks:**\n- The Algebra 2A capstone has one ordinary path and one edge, failure, or misconception path.\n- The first milestone can be tested without completing every optional feature.\n- The explanation separates required behavior from polish.\n- Two risks are named with a mitigation, fallback, or narrowed scope."
					}
				],
				supplementalProjects: [
					{
						title: "Practice Project: Model a Real or Provided Dataset",
						content:
							"**Goal:** The Model a Real or Provided Dataset project models, solves, graphs, or justifies relationships in Algebra 2A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Model a real or provided dataset, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Model a Real or Provided Dataset, standards-aligned short quizzes.\n- For Model a Real or Provided Dataset, explain-your-reasoning checkpoints.\n- For Model a Real or Provided Dataset, graph interpretation checks.\n\n**Extension:** In Model a real or provided dataset, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Create a Graph-And-Equation Story",
						content:
							"**Goal:** The Create a Graph-And-Equation Story project models, solves, graphs, or justifies relationships in Algebra 2A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Create a graph-and-equation story, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Create a Graph-And-Equation Story, standards-aligned short quizzes.\n- For Create a Graph-And-Equation Story, explain-your-reasoning checkpoints.\n- For Create a Graph-And-Equation Story, graph interpretation checks.\n\n**Extension:** In Create a graph-and-equation story, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Repair a Worked Solution with Hidden Errors",
						content:
							"**Goal:** The Repair a Worked Solution with Hidden Errors project models, solves, graphs, or justifies relationships in Algebra 2A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Repair a worked solution with hidden errors, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Repair a Worked Solution with Hidden Errors, standards-aligned short quizzes.\n- For Repair a Worked Solution with Hidden Errors, explain-your-reasoning checkpoints.\n- For Repair a Worked Solution with Hidden Errors, graph interpretation checks.\n\n**Extension:** In Repair a worked solution with hidden errors, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Build a Standards-Aligned Mixed Review Set",
						content:
							"**Goal:** The Build a Standards-Aligned Mixed Review Set project models, solves, graphs, or justifies relationships in Algebra 2A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Build a standards-aligned mixed review set, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Build a Standards-Aligned Mixed Review Set, standards-aligned short quizzes.\n- For Build a Standards-Aligned Mixed Review Set, explain-your-reasoning checkpoints.\n- For Build a Standards-Aligned Mixed Review Set, graph interpretation checks.\n\n**Extension:** In Build a standards-aligned mixed review set, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Write a Short Justification for Each Transformation Step",
						content:
							"**Goal:** The Write a Short Justification for Each Transformation Step project models, solves, graphs, or justifies relationships in Algebra 2A with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Write a short justification for each transformation step, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Write a Short Justification for Each Transformation Step, standards-aligned short quizzes.\n- For Write a Short Justification for Each Transformation Step, explain-your-reasoning checkpoints.\n- For Write a Short Justification for Each Transformation Step, graph interpretation checks.\n\n**Extension:** In Write a short justification for each transformation step, add one transfer case with a changed assumption and document what still works."
					}
				]
			}
		]
	},
	"algebra-2b": {
		expectedModuleCount: 13,
		addedModules: [
			{
				kind: "appendix",
				title: "Standards Map",
				curriculum: [
					{
						title: "Algebra 2B Reference Guide",
						content:
							"**Reference map:** Algebra 2B uses these standards, documentation, and tooling references to keep examples, projects, and expectations aligned with current practice.\n\n**Core references:**\n- Common Core Algebra: https://www.thecorestandards.org/Math/Content/HSA/\n\n**Reference-supported work:** A strong Algebra 2B entry names the standard or documentation page, explains why it matters, and connects it to a visible task such as a worked example, project requirement, assessment item, or reflection prompt.\n\n**Finished Algebra 2B work shows:** Algebra 2B examples, projects, and checkpoints can be traced back to the reference map, not only to project titles."
					},
					{
						title: "Algebra 2B Core Skills",
						content:
							"**Skill map:** Algebra 2B uses these skills for focused review, clear examples, and explicit prerequisite connections before larger projects.\n\n**Core skills:**\n- Align the sequence to standards-backed algebra and functions progressions.\n- Separate lesson, practice, project, review, quiz, and cumulative assessment roles.\n- Adds graphing, modeling, and error-analysis projects rather than only procedural practice.\n\n**Reference role:** For Algebra 2B, use the references to clarify lesson focus, project requirements, and visible course work. Each Algebra 2B core-skill item can become a short explanation, practice check, or focused review path depending on the current need.\n\n**Practice setup:** Algebra 2B lessons and projects are usable when one core skill has a concrete explanation, worked example, practice task, and observable work."
					},
					{
						title: "Algebra 2B Next Topics",
						content:
							"**Growth areas:** Algebra 2B next areas for deeper coverage appear in prerequisite order and connect each addition to a concrete project or checkpoint.\n\n**Expansion topics:**\n- Structure, equivalence, multiple representations, modeling, graph interpretation, and written reasoning.\n- Logarithms, sequences, matrices, probability, statistics, and trigonometric foundations.\n\n**Reference role:** For Algebra 2B, use the references to clarify lesson focus, project requirements, and visible course work. Algebra 2B topic additions are strongest when they include vocabulary, one representative example, one common-error check, and one transfer task.\n\n**Bridge rule:** New Algebra 2B topics need a visible connection to a real project. When that connection is unclear in Algebra 2B, a smaller bridge practice comes before the major project."
					},
					{
						title: "Algebra 2B Boundaries",
						content:
							"**Scope boundary:** Algebra 2B scope and extension topics clarify what belongs in this course and what fits better in a prerequisite, follow-up, or separate course. This keeps the course coherent instead of absorbing every adjacent topic.\n\n**Boundary rule:** A topic belongs in Algebra 2B when it directly supports the projects, assessments, and expected skill level. A topic belongs elsewhere when it requires a different prerequisite chain, safety model, or level of depth that would crowd out the core purpose.\n\n**Boundary check:** The Algebra 2B boundary, one near-term extension, and one topic reserved for a later course are explicit."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 2B Prerequisite Check",
						content:
							"**Prerequisite check:** Deeper Algebra 2B work relies on clear prerequisite skills, target references, and first observable success criteria.\n\n**Course check:** Algebra 2B separates prerequisite knowledge, required content, optional enrichment, and reference-only material. Each major skill connects to a project or assessment that shows the skill can be used independently.\n\n**Prerequisite evidence:**\n- At least three Algebra 2B prerequisites are named.\n- Each Algebra 2B module cites a standard, official document, or deliberate toolchain target.\n- The first Algebra 2B success criterion is explicit."
					},
					{
						title: "Algebra 2B Pathway Map",
						content:
							"**Pathway map:** The Algebra 2B pathway organizes prerequisite skills, core concepts, project practice, assessments, enrichment, and reference material in dependency order.\n\n**Ordering rule:** Algebra 2B pathway decisions are based on dependency, not convenience. If any Algebra 2B project expects a skill that has not appeared in a worked example or smaller practice task, a bridge item belongs before that project.\n\n**Pathway is clear when:**\n- Each prerequisite skill has a clear next action.\n- Required Algebra 2B skills appear before the project that depends on them.\n- Optional enrichment is labeled separately from required pacing."
					}
				]
			},
			{
				kind: "appendix",
				title: "Course Roadmap",
				curriculum: [
					{
						title: "Algebra 2B Follow-Up Path",
						content:
							"**Extension path:** These Algebra 2B topics show natural directions after the Algebra 2B core sequence. The Algebra 2B order follows prerequisite dependency so each extension builds on skills already practiced.\n\n**Possible next topics:**\n- Algebraic habits: structure, equivalence, and checking.\n- Functions across tables, graphs, equations, and verbal rules.\n- Modeling with real or provided data.\n- Error-analysis workshops.\n- Cumulative readiness and mixed-practice checks.\n\n**Sequence check:** The Algebra 2B order is defensible when prerequisites are explicit, vocabulary appears before it is required in a project, and every larger build has a smaller earlier checkpoint that exercises the same skill.\n\n**Useful Algebra 2B module pattern:** A complete module states the concept, explains why it matters, includes one worked example, provides one practice task, checks understanding quickly, and offers one extension."
					},
					{
						title: "Algebra 2B Resource Map",
						content:
							"**Resource map:** Algebra 2B materials identify the code, datasets, simulations, version choices, and references used in the course.\n\n**Materials and tools:**\n- Common Core standard map.\n- Desmos or GeoGebra graphing tasks.\n- Worked-example and error-analysis templates.\n\n**Resource roles:** Each Algebra 2B resource has a role: explanation, starter artifact, data source, simulation, rubric, answer check, or extension. Algebra 2B links that are only background references are labeled that way so they do not look like required assignments.\n\n**Safety or delivery boundary:** Algebra 2B uses age-appropriate examples, cited references, and project scopes small enough for an online lesson."
					},
					{
						title: "Algebra 2B Module Alignment Guide",
						content:
							"**Alignment guide:** Strong Algebra 2B modules connect the concept, example, project, and checkpoint to the same module outcome.\n\n**Alignment test:** In a complete Algebra 2B module, the concept, project, and checkpoint all practice the same skill. If the checkpoint for Algebra 2B checks a different skill than the project practices, the module needs a clearer project target before it is ready.\n\n**Aligned modules show:**\n- Each module in Algebra 2B has a named prerequisite and observable outcome.\n- Each project in Algebra 2B has required behavior, test cases, and an extension.\n- The checkpoint format for Algebra 2B matches the work: code trace, rubric, CER response, math justification, security report, or model evaluation.\n- Any toolchain, dataset, simulation, or source-code dependency for Algebra 2B is linked with version or access notes."
					},
					{
						title: "Algebra 2B Reference Map",
						content:
							"**Reference map:** Algebra 2B references are most useful when their role is clear: concept explanation, starter code, dataset, simulation, exam standard, official documentation, or optional background.\n\n**Version note:** Stable Algebra 2B concepts can use long-lived references, while tool versions, code repositories, exam links, data licenses, and simulation URLs need clear version or access notes.\n\n**Reference check:** A useful Algebra 2B reference note states which links or versions are stable, which materials need periodic review, and which materials are reference-only rather than assignments."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 2B Prerequisite Map",
						content:
							'**Map purpose:** The Algebra 2B prerequisite map shows which modules unlock later projects and which topics work as optional enrichment.\n\n**Map reading:** Each Algebra 2B node is a concrete skill or module, not a broad course label. Each dependency edge in Algebra 2B explains the prerequisite in plain language, such as "requires arrays before 2D grids" or "requires variables before simulation state."\n\n**What the map clarifies:**\n- The main Algebra 2B modules or topic clusters are visible in prerequisite order.\n- Each dependency edge in Algebra 2B explains why one idea needs to come before another.\n- Risky Algebra 2B ordering decisions can be spotted before they interrupt a project.'
					},
					{
						title: "Algebra 2B Resource Inventory",
						content:
							"**Inventory purpose:** The Algebra 2B resource inventory identifies source code, starter/reference files, datasets, simulations, diagrams, rubrics, and tool versions used by the course.\n\n**Inventory reading:** A missing resource in Algebra 2B is not automatically a blocker, but it needs a clear classification: required, replaceable, provided, created during the course, optional enrichment, or reference-only. That classification prevents unlisted materials from becoming required by accident.\n\n**Resource checks:**\n- Required Algebra 2B projects have a starter state or equivalent handout.\n- Algebra 2B assessments have a rubric or answer-check method.\n- External Algebra 2B tools or sources are documented with stable URLs."
					}
				]
			},
			{
				kind: "appendix",
				title: "Project Practice Guide",
				curriculum: [
					{
						title: "Algebra 2B Project Ladder",
						content:
							"**Project progression:** These Algebra 2B project types create a progression for Algebra 2B from guided practice to independent capstone work. Every Algebra 2B project names the artifact, required behavior, evidence of correctness, and one extension path.\n\n**Project types:**\n- Model a real or provided dataset.\n- Creates a graph-and-equation story.\n- Repair a worked solution with hidden errors.\n- Builds a standards-aligned mixed review set.\n- Write a short justification for each transformation step.\n\n**Project evidence:** Project work in Algebra 2B is ready when the expected artifact, success criteria, standard scenario, edge case, explanation target, and extension path are clear without guessing what the work is meant to demonstrate.\n\n**Project completion:** Project work in Algebra 2B is complete when the main design, model, proof, or reasoning choice is explained, not only when it runs or produces an answer."
					},
					{
						title: "Algebra 2B Checkpoints",
						content:
							"**Checkpoint map:** These checks identify whether Algebra 2B concepts are ready for the next module.\n\n**Assessment ideas:**\n- Standards-aligned short quizzes.\n- Explains-your-reasoning checkpoints.\n- Graph interpretation checks.\n- Error correction tasks.\n- Cumulative mixed-practice checks every few modules.\n\n**Checkpoint use:** Each Algebra 2B assessment provides evidence for one named skill. The best Algebra 2B checkpoint is small enough to complete quickly but specific enough to reveal whether the concept transfers to a changed example.\n\n**Evidence of proficiency:** Algebra 2B work demonstrates the ability to transfer the same idea to a new example, explain why the result is valid, and identify one limitation or edge case."
					},
					{
						title: "Algebra 2B Rubric",
						content:
							"**Reflection:** Every major Algebra 2B project includes a short note naming the goal, approach, evidence, bug or misconception, and one next improvement.\n\n**Rubric use:** Algebra 2B finished work and the explanation are evaluated separately. A project in Algebra 2B can produce the right output while still needing a stronger explanation, clearer evidence, better edge-case coverage, or a more maintainable structure.\n\n**Project checks:**\n- The project result for Algebra 2B is visible, runnable, or inspectable.\n- A normal case and an edge case for Algebra 2B are tested or justified.\n- The explanation for Algebra 2B does not depend on reading every line or step from notes."
					},
					{
						title: "Algebra 2B Capstone Gate",
						content:
							"**Capstone gate:** Before the Algebra 2B capstone begins, prerequisite modules, project types, and checkpoint style are practiced on smaller artifacts.\n\n**Gate guidance:** The Algebra 2B capstone is ready when it combines known skills in a larger context rather than introducing several untested ideas at once. The first Algebra 2B version stays narrow, demonstrable, and easy to verify before optional polish is added.\n\n**Required Algebra 2B capstone brief:** The target user or problem, exact project result, core concept reused from earlier modules, minimum viable first version, and proof evidence are all explicit.\n\n**Capstone checks:**\n- The Algebra 2B capstone has one ordinary path and one edge, failure, or misconception path.\n- The first milestone can be tested without completing every optional feature.\n- The explanation separates required behavior from polish.\n- Two risks are named with a mitigation, fallback, or narrowed scope."
					}
				],
				supplementalProjects: [
					{
						title: "Practice Project: Model a Real or Provided Dataset",
						content:
							"**Goal:** The Model a Real or Provided Dataset project models, solves, graphs, or justifies relationships in Algebra 2B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Model a real or provided dataset, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Model a Real or Provided Dataset, standards-aligned short quizzes.\n- For Model a Real or Provided Dataset, explain-your-reasoning checkpoints.\n- For Model a Real or Provided Dataset, graph interpretation checks.\n\n**Extension:** In Model a real or provided dataset, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					},
					{
						title: "Practice Project: Create a Graph-And-Equation Story",
						content:
							"**Goal:** The Create a Graph-And-Equation Story project models, solves, graphs, or justifies relationships in Algebra 2B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Create a graph-and-equation story, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Create a Graph-And-Equation Story, standards-aligned short quizzes.\n- For Create a Graph-And-Equation Story, explain-your-reasoning checkpoints.\n- For Create a Graph-And-Equation Story, graph interpretation checks.\n\n**Extension:** In Create a graph-and-equation story, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					},
					{
						title: "Practice Project: Repair a Worked Solution with Hidden Errors",
						content:
							"**Goal:** The Repair a Worked Solution with Hidden Errors project models, solves, graphs, or justifies relationships in Algebra 2B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Repair a worked solution with hidden errors, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Repair a Worked Solution with Hidden Errors, standards-aligned short quizzes.\n- For Repair a Worked Solution with Hidden Errors, explain-your-reasoning checkpoints.\n- For Repair a Worked Solution with Hidden Errors, graph interpretation checks.\n\n**Extension:** In Repair a worked solution with hidden errors, add one transfer case with a changed assumption and document what still works."
					},
					{
						title: "Practice Project: Build a Standards-Aligned Mixed Review Set",
						content:
							"**Goal:** The Build a Standards-Aligned Mixed Review Set project models, solves, graphs, or justifies relationships in Algebra 2B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Build a standards-aligned mixed review set, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Build a Standards-Aligned Mixed Review Set, standards-aligned short quizzes.\n- For Build a Standards-Aligned Mixed Review Set, explain-your-reasoning checkpoints.\n- For Build a Standards-Aligned Mixed Review Set, graph interpretation checks.\n\n**Extension:** In Build a standards-aligned mixed review set, change one constraint, input, representation, or success condition and explain what stayed equivalent."
					},
					{
						title: "Practice Project: Write a Short Justification for Each Transformation Step",
						content:
							"**Goal:** The Write a Short Justification for Each Transformation Step project models, solves, graphs, or justifies relationships in Algebra 2B with visible steps and a reasonableness check.\n\n**Outcome:**\n- For Write a short justification for each transformation step, show the rule, equation, graph, table, or transformation being used.\n- Include one standard case and one sign, unit, intercept, domain, or boundary check.\n- Explain how the result is known to be reasonable.\n\n**Checkpoints:**\n- For Write a Short Justification for Each Transformation Step, standards-aligned short quizzes.\n- For Write a Short Justification for Each Transformation Step, explain-your-reasoning checkpoints.\n- For Write a Short Justification for Each Transformation Step, graph interpretation checks.\n\n**Extension:** In Write a short justification for each transformation step, add one transfer case with a changed assumption and document what still works."
					}
				]
			}
		]
	}
} satisfies MathCoursePatchMap;

export function applyMathResearchBackedExpansions(
	courseId: string,
	course: RawCourse
) {
	applyMathCoursePatch(courseId, course, mathResearchExpansionPatches);
}

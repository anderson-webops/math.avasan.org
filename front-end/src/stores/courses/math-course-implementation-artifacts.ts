import type { MathCoursePatchMap } from "./math-course-enrichment-patch";
import type { RawCourse } from "./types";
import { applyMathCoursePatch } from "./math-course-enrichment-patch";

const mathCourseImplementationPatches = {
	"early-elementary-a-math": {
		expectedModuleCount: 22,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Early Elementary A: Discovering Numbers, Operations, and Measurement starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Early Elementary A: Discovering Numbers, Operations, and Measurement uses a low-stakes check-in after every three to five lessons.",
				"Early Elementary A: Discovering Numbers, Operations, and Measurement pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Early Elementary A: Discovering Numbers, Operations, and Measurement includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Early Elementary A: Discovering Numbers, Operations, and Measurement uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Early Elementary A: Discovering Numbers, Operations, and Measurement setup before starting reusable projects."
			],
			safetyPolicy: [
				"Early Elementary A: Discovering Numbers, Operations, and Measurement uses local projects, owned accounts, and approved source repositories.",
				"Early Elementary A: Discovering Numbers, Operations, and Measurement does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Early Elementary A: Discovering Numbers, Operations, and Measurement work."
			],
			courseBoundaries: [
				"Early Elementary A: Discovering Numbers, Operations, and Measurement keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Early Elementary A: Discovering Numbers, Operations, and Measurement does not add adjacent-topic enrichment until the required Early Elementary A: Discovering Numbers, Operations, and Measurement project and completion check exist."
			],
			capstoneExpectations: [
				"Early Elementary A: Discovering Numbers, Operations, and Measurement ends with one anchor modeling project that uses at least two representations.",
				"Early Elementary A: Discovering Numbers, Operations, and Measurement includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Early Elementary A: Discovering Numbers, Operations, and Measurement per-item standards tags when the schema supports item-level metadata.",
				"Create Early Elementary A: Discovering Numbers, Operations, and Measurement worksheet or Desmos asset packs for anchor projects.",
				"Add Early Elementary A: Discovering Numbers, Operations, and Measurement answer keys for error-analysis and mixed-practice checkpoints."
			]
		}
	},
	"early-elementary-b-math": {
		expectedModuleCount: 19,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry uses a low-stakes check-in after every three to five lessons.",
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Early Elementary B: Exploring Arithmetic, Fractions, and Geometry setup before starting reusable projects."
			],
			safetyPolicy: [
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry uses local projects, owned accounts, and approved source repositories.",
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Early Elementary B: Exploring Arithmetic, Fractions, and Geometry work."
			],
			courseBoundaries: [
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry does not add adjacent-topic enrichment until the required Early Elementary B: Exploring Arithmetic, Fractions, and Geometry project and completion check exist."
			],
			capstoneExpectations: [
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry ends with one anchor modeling project that uses at least two representations.",
				"Early Elementary B: Exploring Arithmetic, Fractions, and Geometry includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Early Elementary B: Exploring Arithmetic, Fractions, and Geometry per-item standards tags when the schema supports item-level metadata.",
				"Create Early Elementary B: Exploring Arithmetic, Fractions, and Geometry worksheet or Desmos asset packs for anchor projects.",
				"Add Early Elementary B: Exploring Arithmetic, Fractions, and Geometry answer keys for error-analysis and mixed-practice checkpoints."
			]
		}
	},
	"late-elementary-a-math": {
		expectedModuleCount: 19,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Late Elementary A: Investigating Multiplication, Division, and Geometry starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Late Elementary A: Investigating Multiplication, Division, and Geometry uses a low-stakes check-in after every three to five lessons.",
				"Late Elementary A: Investigating Multiplication, Division, and Geometry pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Late Elementary A: Investigating Multiplication, Division, and Geometry includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Late Elementary A: Investigating Multiplication, Division, and Geometry uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Late Elementary A: Investigating Multiplication, Division, and Geometry setup before starting reusable projects."
			],
			safetyPolicy: [
				"Late Elementary A: Investigating Multiplication, Division, and Geometry uses local projects, owned accounts, and approved source repositories.",
				"Late Elementary A: Investigating Multiplication, Division, and Geometry does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Late Elementary A: Investigating Multiplication, Division, and Geometry work."
			],
			courseBoundaries: [
				"Late Elementary A: Investigating Multiplication, Division, and Geometry keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Late Elementary A: Investigating Multiplication, Division, and Geometry does not add adjacent-topic enrichment until the required Late Elementary A: Investigating Multiplication, Division, and Geometry project and completion check exist."
			],
			capstoneExpectations: [
				"Late Elementary A: Investigating Multiplication, Division, and Geometry ends with one anchor modeling project that uses at least two representations.",
				"Late Elementary A: Investigating Multiplication, Division, and Geometry includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Late Elementary A: Investigating Multiplication, Division, and Geometry per-item standards tags when the schema supports item-level metadata.",
				"Create Late Elementary A: Investigating Multiplication, Division, and Geometry worksheet or Desmos asset packs for anchor projects.",
				"Add Late Elementary A: Investigating Multiplication, Division, and Geometry answer keys for error-analysis and mixed-practice checkpoints."
			]
		}
	},
	"late-elementary-b-math": {
		expectedModuleCount: 20,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates uses a low-stakes check-in after every three to five lessons.",
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates setup before starting reusable projects."
			],
			safetyPolicy: [
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates uses local projects, owned accounts, and approved source repositories.",
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates work."
			],
			courseBoundaries: [
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates does not add adjacent-topic enrichment until the required Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates project and completion check exist."
			],
			capstoneExpectations: [
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates ends with one anchor modeling project that uses at least two representations.",
				"Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates per-item standards tags when the schema supports item-level metadata.",
				"Create Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates worksheet or Desmos asset packs for anchor projects.",
				"Add Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates answer keys for error-analysis and mixed-practice checkpoints."
			]
		}
	},
	"pre-algebra-a": {
		expectedModuleCount: 10,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Pre-Algebra A starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Pre-Algebra A uses a low-stakes check-in after every three to five lessons.",
				"Pre-Algebra A pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Pre-Algebra A includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Pre-Algebra A uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Pre-Algebra A setup before starting reusable projects."
			],
			safetyPolicy: [
				"Pre-Algebra A uses local projects, owned accounts, and approved source repositories.",
				"Pre-Algebra A does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Pre-Algebra A work."
			],
			courseBoundaries: [
				"Pre-Algebra A keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Pre-Algebra A does not add adjacent-topic enrichment until the required Pre-Algebra A project and completion check exist."
			],
			capstoneExpectations: [
				"Pre-Algebra A ends with one anchor modeling project that uses at least two representations.",
				"Pre-Algebra A includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Pre-Algebra A per-item standards tags when the schema supports item-level metadata.",
				"Create Pre-Algebra A worksheet or Desmos asset packs for anchor projects.",
				"Add Pre-Algebra A answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 1,
				moduleTitle: "PAA1-PAA2 Arithmetic Foundations",
				expectedExistingCount: 1,
				items: [
					{
						title: "PAA1-PAA2 Arithmetic Foundations Transfer Practice",
						content:
							"**Project goal:** Use PAA1-PAA2 Arithmetic Foundations in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PAA1-PAA2 Arithmetic Foundations case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PAA1-PAA2 Arithmetic Foundations variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PAA1-PAA2 Arithmetic Foundations includes the direct case and the changed case.\n- The PAA1-PAA2 Arithmetic Foundations explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 2,
				moduleTitle: "PAA3-PAA7 Fractions and Arithmetic",
				expectedExistingCount: 1,
				items: [
					{
						title: "PAA3-PAA7 Fractions and Arithmetic Transfer Practice",
						content:
							"**Project goal:** Turn PAA3-PAA7 Fractions and Arithmetic into a short variation with an observable result, one boundary case, and a concise explanation.\n\n**Work sequence:**\n1. Name the concept or rule that must carry over.\n2. Complete a direct PAA3-PAA7 Fractions and Arithmetic case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PAA3-PAA7 Fractions and Arithmetic cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PAA3-PAA7 Fractions and Arithmetic variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PAA3-PAA7 Fractions and Arithmetic includes the direct case and the changed case.\n- The PAA3-PAA7 Fractions and Arithmetic explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 4,
				moduleTitle: "Check-In #1",
				expectedExistingCount: 0,
				items: [
					{
						title: "Checkpoint: Check-In #1",
						content:
							"**Project goal:** Complete focused practice for Check-In #1: identify which earlier skill is secure and which one needs another example.\n\n**Work sequence:**\n1. Choose one representative problem from the review topic.\n2. Solve a direct version, then solve a changed version with different numbers, input, or wording.\n3. Write a short note naming the rule, strategy, or vocabulary that made the second version work.\n\n**Completion checks:**\n- The direct case and changed case are both complete.\n- The explanation names the skill being checked.\n- One likely mistake is identified with the check that would catch it."
					},
					{
						title: "Check-In #1 Changed-Case Review",
						content:
							"**Project goal:** Use Check-In #1 in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. Choose one representative problem from the review topic.\n2. Solve a direct version, then solve a changed version with different numbers, input, or wording.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The direct case and changed case are both complete.\n- The explanation names the skill being checked.\n- One likely mistake is identified with the check that would catch it."
					}
				]
			},
			{
				index: 5,
				moduleTitle: "PAA13-PAA17 Expressions and Sequences",
				expectedExistingCount: 1,
				items: [
					{
						title: "PAA13-PAA17 Expressions and Sequences Transfer Practice",
						content:
							"**Project goal:** Extend PAA13-PAA17 Expressions and Sequences with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PAA13-PAA17 Expressions and Sequences case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PAA13-PAA17 Expressions and Sequences cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PAA13-PAA17 Expressions and Sequences variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PAA13-PAA17 Expressions and Sequences includes the direct case and the changed case.\n- The PAA13-PAA17 Expressions and Sequences explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 7,
				moduleTitle: "Check-In #2 and Capstone",
				expectedExistingCount: 0,
				items: [
					{
						title: "Checkpoint: Check-In #2 and Capstone",
						content:
							"**Project goal:** Complete focused practice for Check-In #2 and Capstone: identify which earlier skill is secure and which one needs another example.\n\n**Work sequence:**\n1. Choose one representative problem from the review topic.\n2. Solve a direct version, then solve a changed version with different numbers, input, or wording.\n3. Write a short note naming the rule, strategy, or vocabulary that made the second version work.\n\n**Completion checks:**\n- The direct case and changed case are both complete.\n- The explanation names the skill being checked.\n- One likely mistake is identified with the check that would catch it."
					},
					{
						title: "Check-In #2 and Capstone Changed-Case Review",
						content:
							"**Project goal:** Turn Check-In #2 and Capstone into a short variation with an observable result, one boundary case, and a concise explanation.\n\n**Work sequence:**\n1. Name the concept or rule that must carry over.\n2. Solve a direct version, then solve a changed version with different numbers, input, or wording.\n3. Write a short note naming the rule, strategy, or vocabulary that made the second version work.\n\n**Completion checks:**\n- The direct case and changed case are both complete.\n- The explanation names the skill being checked.\n- One likely mistake is identified with the check that would catch it."
					}
				]
			}
		]
	},
	"pre-algebra-b": {
		expectedModuleCount: 10,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Pre-Algebra B starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Pre-Algebra B uses a low-stakes check-in after every three to five lessons.",
				"Pre-Algebra B pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Pre-Algebra B includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Pre-Algebra B uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Pre-Algebra B setup before starting reusable projects."
			],
			safetyPolicy: [
				"Pre-Algebra B uses local projects, owned accounts, and approved source repositories.",
				"Pre-Algebra B does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Pre-Algebra B work."
			],
			courseBoundaries: [
				"Pre-Algebra B keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Pre-Algebra B does not add adjacent-topic enrichment until the required Pre-Algebra B project and completion check exist."
			],
			capstoneExpectations: [
				"Pre-Algebra B ends with one anchor modeling project that uses at least two representations.",
				"Pre-Algebra B includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Pre-Algebra B per-item standards tags when the schema supports item-level metadata.",
				"Create Pre-Algebra B worksheet or Desmos asset packs for anchor projects.",
				"Add Pre-Algebra B answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 0,
				moduleTitle: "Pre-Algebra B Kick-Off",
				expectedExistingCount: 1,
				items: [
					{
						title: "Pre-Algebra B Kick-Off Transfer Practice",
						content:
							"**Project goal:** Build one additional Pre-Algebra B Kick-Off practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two Pre-Algebra B Kick-Off cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The Pre-Algebra B Kick-Off variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for Pre-Algebra B Kick-Off includes the direct case and the changed case.\n- The Pre-Algebra B Kick-Off explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 3,
				moduleTitle:
					"PAB6-PAB9 Lines, Angles, Triangles, and Similarity",
				expectedExistingCount: 1,
				items: [
					{
						title: "PAB6-PAB9 Lines, Angles, Triangles, and Similarity Transfer Practice",
						content:
							"**Project goal:** Build one additional PAB6-PAB9 Lines, Angles, Triangles, and Similarity practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two PAB6-PAB9 Lines, Angles, Triangles, and Similarity cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PAB6-PAB9 Lines, Angles, Triangles, and Similarity variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PAB6-PAB9 Lines, Angles, Triangles, and Similarity includes the direct case and the changed case.\n- The PAB6-PAB9 Lines, Angles, Triangles, and Similarity explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 4,
				moduleTitle: "PAB10-PAB14 Polygons, Area, Circles, and Solids",
				expectedExistingCount: 1,
				items: [
					{
						title: "PAB10-PAB14 Polygons, Area, Circles, and Solids Transfer Practice",
						content:
							"**Project goal:** Extend PAB10-PAB14 Polygons, Area, Circles, and Solids with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PAB10-PAB14 Polygons, Area, Circles, and Solids case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PAB10-PAB14 Polygons, Area, Circles, and Solids cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PAB10-PAB14 Polygons, Area, Circles, and Solids variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PAB10-PAB14 Polygons, Area, Circles, and Solids includes the direct case and the changed case.\n- The PAB10-PAB14 Polygons, Area, Circles, and Solids explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 6,
				moduleTitle:
					"PAB15-PAB19 Factors, Multiples, and Number Structure",
				expectedExistingCount: 1,
				items: [
					{
						title: "PAB15-PAB19 Factors, Multiples, and Number Structure Transfer Practice",
						content:
							"**Project goal:** Turn PAB15-PAB19 Factors, Multiples, and Number Structure into a short variation with an observable result, one boundary case, and a concise explanation.\n\n**Work sequence:**\n1. Name the concept or rule that must carry over.\n2. Complete a direct PAB15-PAB19 Factors, Multiples, and Number Structure case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PAB15-PAB19 Factors, Multiples, and Number Structure cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PAB15-PAB19 Factors, Multiples, and Number Structure variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PAB15-PAB19 Factors, Multiples, and Number Structure includes the direct case and the changed case.\n- The PAB15-PAB19 Factors, Multiples, and Number Structure explanation names what stayed stable and what had to change."
					}
				]
			}
		]
	},
	"algebra-1a": {
		expectedModuleCount: 25,
		developmentMetadata: {
			priority: "urgent",
			standards: [
				"Common Core High School Algebra: Seeing Structure, Creating Equations, Reasoning with Equations and Inequalities, and Modeling.",
				"Common Core Algebra research-backed source map."
			],
			sourcePolicy:
				"Content-only math course. Use course modules plus generated practice, modeling, and error-analysis tasks; worksheets or Desmos links are added as media assets when created.",
			assessmentCadence: [
				"Algebra 1A starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Algebra 1A uses a low-stakes check-in after every three to five lessons.",
				"Algebra 1A pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Algebra 1A includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Algebra 1A uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Algebra 1A setup before starting reusable projects."
			],
			safetyPolicy: [
				"Algebra 1A uses local projects, owned accounts, and approved source repositories.",
				"Algebra 1A does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Algebra 1A work."
			],
			courseBoundaries: [
				"Algebra 1A keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Algebra 1A does not add adjacent-topic enrichment until the required Algebra 1A project and completion check exist."
			],
			capstoneExpectations: [
				"Algebra 1A ends with one anchor modeling project that uses at least two representations.",
				"Algebra 1A includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Algebra 1A per-item standards tags when the schema supports item-level metadata.",
				"Create Algebra 1A worksheet or Desmos asset packs for anchor projects.",
				"Add Algebra 1A answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 0,
				moduleTitle: "AA1 Algebraic Properties",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for AA1 Algebraic Properties in Algebra 1A that moves from a labeled example to independent transfer. The practice check is solving a direct case and explaining the rule or property used at the key step.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The final check confirms the answer through verifying the answer by substitution, estimation, graph inspection, units, or context."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AA1 Algebraic Properties solution. The error begins with a solution with one plausible algebraic or representation mistake that needs to be located and repaired; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses connection between symbolic work and at least one table, graph, diagram, or verbal interpretation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 1,
				moduleTitle: "AA2 Solving Single-Step Linear Equations",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1A AA2 Solving Single-Step Linear Equations. The check combines one solved model, three new problems, and one justification task tied to movement between a rate table, a line graph, and a symbolic equation.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AA2 Solving Single-Step Linear Equations to analyze two pricing plans, travel patterns, or savings paths where the slope and intercept have different meanings. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AA2 Solving Single-Step Linear Equations scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to movement between a rate table, a line graph, and a symbolic equation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 2,
				moduleTitle:
					"AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AA3 Module Project: Movie Star Status (with Maddie Van Beek) to analyze a short realistic situation where the chosen algebraic representation affects the answer. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AA3 Module Project: Movie Star Status (with Maddie Van Beek) scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 3,
				moduleTitle: "AA4 Solving Multi-Step Linear Equations",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for AA4 Solving Multi-Step Linear Equations in Algebra 1A that moves from a labeled example to independent transfer. The practice check is calculating slope or intercept from two pieces of evidence and explaining what each value means.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring movement between a rate table, a line graph, and a symbolic equation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n- The final check confirms the answer through substituting a point, inspecting the graph scale, and stating the unit attached to the rate."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AA4 Solving Multi-Step Linear Equations solution. The error begins with a solution that treats the y-intercept as a rate or uses two points in the wrong order; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses movement between a rate table, a line graph, and a symbolic equation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 4,
				moduleTitle:
					"AA5 Module Project: Free Swag! (with Amisha Sisodiya)",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AA5 Module Project: Free Swag! (with Amisha Sisodiya) solution. The error begins with a solution with one plausible algebraic or representation mistake that needs to be located and repaired; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses connection between symbolic work and at least one table, graph, diagram, or verbal interpretation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 5,
				moduleTitle: "AA6 Slope and Rate of Change",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AA6 Slope and Rate of Change that separates procedure, representation, and interpretation. The set builds confidence with calculating slope or intercept from two pieces of evidence and explaining what each value means before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: movement between a rate table, a line graph, and a symbolic equation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AA6 Slope and Rate of Change using two pricing plans, travel patterns, or savings paths where the slope and intercept have different meanings. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports movement between a rate table, a line graph, and a symbolic equation.\n3. Complete the calculation or graph analysis, then use this check: substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AA6 Slope and Rate of Change separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 6,
				moduleTitle:
					"AA7 Module Project: Community Data Analysis (with Davin Lee)",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for AA7 Module Project: Community Data Analysis (with Davin Lee) in Algebra 1A that moves from a labeled example to independent transfer. The practice check is solving a direct case and explaining the rule or property used at the key step.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The final check confirms the answer through verifying the answer by substitution, estimation, graph inspection, units, or context."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AA7 Module Project: Community Data Analysis (with Davin Lee) solution. The error begins with a solution with one plausible algebraic or representation mistake that needs to be located and repaired; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses connection between symbolic work and at least one table, graph, diagram, or verbal interpretation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 7,
				moduleTitle: "AA8 Slope-Intercept Form",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for AA8 Slope-Intercept Form. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on calculating slope or intercept from two pieces of evidence and explaining what each value means.\n3. Convert the same idea into another form through movement between a rate table, a line graph, and a symbolic equation.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1A AA8 Slope-Intercept Form. The task uses two pricing plans, travel patterns, or savings paths where the slope and intercept have different meanings or starts from a solution that treats the y-intercept as a rate or uses two points in the wrong order.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: movement between a rate table, a line graph, and a symbolic equation.\n3. Solve or correct the task and document substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 8,
				moduleTitle: "AA9 Point-Slope Form",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1A AA9 Point-Slope Form. The check combines one solved model, three new problems, and one justification task tied to movement between a rate table, a line graph, and a symbolic equation.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AA9 Point-Slope Form to analyze two pricing plans, travel patterns, or savings paths where the slope and intercept have different meanings. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AA9 Point-Slope Form scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to movement between a rate table, a line graph, and a symbolic equation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 9,
				moduleTitle: "AA10 Graphing Inequalities",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for AA10 Graphing Inequalities. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on solving the inequality and justifying the boundary, shading, and inclusion or exclusion mark.\n3. Convert the same idea into another form through translation between inequality notation, a number line or coordinate graph, and a verbal constraint.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a boundary value, flipped inequality sign, or shaded region that contradicts the written constraint.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1A AA10 Graphing Inequalities. The task uses a budget, capacity, distance, or eligibility constraint where many answers can be valid or starts from a solution that shades the wrong side or forgets to reverse the sign after multiplying by a negative.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: translation between inequality notation, a number line or coordinate graph, and a verbal constraint.\n3. Solve or correct the task and document testing one value inside the solution set, one outside it, and the boundary value.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 10,
				moduleTitle:
					"AA11 Module Project: Predicting Avalanches (with Ruby Lee)",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AA11 Module Project: Predicting Avalanches (with Ruby Lee) using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AA11 Module Project: Predicting Avalanches (with Ruby Lee) separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 11,
				moduleTitle: "AA12 Solving Linear Systems by Graphing",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AA12 Solving Linear Systems by Graphing that separates procedure, representation, and interpretation. The set builds confidence with calculating slope or intercept from two pieces of evidence and explaining what each value means before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: movement between a rate table, a line graph, and a symbolic equation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AA12 Solving Linear Systems by Graphing using two pricing plans, travel patterns, or savings paths where the slope and intercept have different meanings. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports movement between a rate table, a line graph, and a symbolic equation.\n3. Complete the calculation or graph analysis, then use this check: substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AA12 Solving Linear Systems by Graphing separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 12,
				moduleTitle: "AA13 Solving Linear Systems by Substitution",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AA13 Solving Linear Systems by Substitution that separates procedure, representation, and interpretation. The set builds confidence with calculating slope or intercept from two pieces of evidence and explaining what each value means before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: movement between a rate table, a line graph, and a symbolic equation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AA13 Solving Linear Systems by Substitution using two pricing plans, travel patterns, or savings paths where the slope and intercept have different meanings. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports movement between a rate table, a line graph, and a symbolic equation.\n3. Complete the calculation or graph analysis, then use this check: substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AA13 Solving Linear Systems by Substitution separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 13,
				moduleTitle: "AA14 Solving Linear Systems by Elimination",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for AA14 Solving Linear Systems by Elimination in Algebra 1A that moves from a labeled example to independent transfer. The practice check is calculating slope or intercept from two pieces of evidence and explaining what each value means.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring movement between a rate table, a line graph, and a symbolic equation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a graph with a misleading scale, a reversed rate, or an intercept that is not meaningful in context.\n- The final check confirms the answer through substituting a point, inspecting the graph scale, and stating the unit attached to the rate."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AA14 Solving Linear Systems by Elimination solution. The error begins with a solution that treats the y-intercept as a rate or uses two points in the wrong order; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: substituting a point, inspecting the graph scale, and stating the unit attached to the rate.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses movement between a rate table, a line graph, and a symbolic equation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 14,
				moduleTitle:
					"AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj)",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj) to analyze a short realistic situation where the chosen algebraic representation affects the answer. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj) scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 15,
				moduleTitle:
					"AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky)",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky) to analyze a short realistic situation where the chosen algebraic representation affects the answer. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky) scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 16,
				moduleTitle: "AA17 Master Project: Algebra 1A",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1A AA17 Master Project: Algebra 1A. The check combines one solved model, three new problems, and one justification task tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires verifying the answer by substitution, estimation, graph inspection, units, or context.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AA17 Master Project: Algebra 1A to analyze a short realistic situation where the chosen algebraic representation affects the answer. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AA17 Master Project: Algebra 1A scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 18,
				moduleTitle: "Check-In #1",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for Check-In #1. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on checking linear readiness through slope, intercepts, equations, inequalities, and systems constraints.\n3. Convert the same idea into another form through movement between a verbal situation, rate table, coordinate graph, and linear equation or system.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a reversed rate, graph scale mismatch, boundary value, or solution point that satisfies only one constraint.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1A Check-In #1. The task uses a linear readiness scenario such as comparing membership plans, delivery fees, savings rates, or two budget constraints or starts from a solution that uses the correct-looking line but misreads the rate, intercept, inequality boundary, or system intersection.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: movement between a verbal situation, rate table, coordinate graph, and linear equation or system.\n3. Solve or correct the task and document testing the solution in the original equation or constraints, inspecting the graph, and stating the units.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 19,
				moduleTitle: "Check-In #2",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use Check-In #2 to analyze a linear readiness scenario such as comparing membership plans, delivery fees, savings rates, or two budget constraints. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: testing the solution in the original equation or constraints, inspecting the graph, and stating the units.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The Check-In #2 scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to movement between a verbal situation, rate table, coordinate graph, and linear equation or system.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 20,
				moduleTitle: "Check-In #3",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed Check-In #3 solution. The error begins with a solution that uses the correct-looking line but misreads the rate, intercept, inequality boundary, or system intersection; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: testing the solution in the original equation or constraints, inspecting the graph, and stating the units.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses movement between a verbal situation, rate table, coordinate graph, and linear equation or system when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 21,
				moduleTitle: "Reference Archive: Algebra 1A",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for Reference Archive: Algebra 1A that separates procedure, representation, and interpretation. The set builds confidence with solving a direct case and explaining the rule or property used at the key step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for Reference Archive: Algebra 1A using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for Reference Archive: Algebra 1A separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			}
		],
		addedModules: [
			{
				kind: "appendix",
				title: "Algebra 1A: Project Taxonomy and Assessment Implementation",
				curriculum: [
					{
						title: "Algebra 1A Structure Decision",
						content:
							"**Concept path:** Algebra 1A supplemental projects provide explicit practice sets, application/modeling projects, error-analysis tasks, and enrichment. Core curriculum items remain focused on concept instruction, worked examples, and guided practice. Existing imported module projects can remain in curriculum for continuity, and every module also exposes at least two explicit Algebra 1A project/practice options in the project area.\n\n**Evidence target:** Algebra 1A makes it possible to distinguish required concept instruction from optional, remedial, and enrichment project work without reading the entire module."
					},
					{
						title: "Algebra 1A Assessment Cadence",
						content:
							"**Readiness check:** Algebra 1A uses a short formative check after each major topic, a cumulative mixed-practice check every few modules, and an error-analysis task before moving into a new representation type. The cadence keeps fluency, interpretation, and written reasoning connected instead of treating them as separate courses.\n\n**Evidence of proficiency:** A complete response in Algebra 1A solves, explains, checks reasonableness, and identifies a common algebraic error."
					},
					{
						title: "Algebra 1A Representation Balance",
						content:
							"**Concept path:** Each Algebra 1A project includes at least two representations when reasonable: equation, graph, table, verbal rule, diagram, or contextual model. The representation change is part of the concept, not a formatting step, because it shows whether the same relationship is understood from multiple angles.\n\n**Evidence target:** The work demonstrates the ability to translate between Algebra 1A representations and explain what each one reveals."
					},
					{
						title: "Algebra 1A Worked Example Density",
						content:
							"**Concept path:** Each new Algebra 1A skill includes one clean worked example, one flawed example to repair, and one transfer problem with changed numbers or context. The clean example models notation, the flawed example exposes a likely misconception, and the transfer example checks whether the method survives a changed surface form.\n\n**Evidence target:** The work demonstrates the ability to explain the difference between Algebra 1A procedure and reason."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 1A Practice Set Conversion",
						content:
							"**Project goal:** Convert one Algebra 1A topic into a practice set with a worked example, three independent problems, one representation task, and one explanation prompt. The set makes the skill teachable without turning into a list of disconnected exercises.\n\n**Practice-set structure:**\n1. Begin with a worked example that shows the setup, the algebraic move, and a reasonableness check.\n2. Add one direct problem that follows the same structure so the core procedure is visible.\n3. Add one changed-number or changed-context problem that checks whether the method transfers.\n4. Add one graph, table, diagram, or verbal interpretation task so the relationship is not only symbolic.\n5. End with an explanation prompt asking why the method works or what common mistake it avoids.\n\n**Completion checks:**\n- Problems are sequenced from direct to transfer.\n- One problem requires graph, table, diagram, or context interpretation.\n- The answer key includes reasoning, not just final answers."
					},
					{
						title: "Algebra 1A Modeling or Error-Analysis Task",
						content:
							"**Project goal:** Build either a contextual model or an error-analysis task for one Algebra 1A topic. A modeling task starts with quantities, units, constraints, and a relationship to represent. An error-analysis task starts with a plausible flawed solution and asks what assumption or algebraic move caused the error.\n\n**Completion checks:**\n- The Algebra 1A task asks why, not only what.\n- The work checks units or context.\n- A likely Algebra 1A misconception is named in the review notes."
					}
				]
			},
			{
				kind: "appendix",
				title: "Standards-Mapped Algebra Architecture",
				curriculum: [
					{
						title: "Course Scope Map",
						content:
							"**Concept path:** This standards-facing course spine builds from concept explanation to worked example, guided practice, mixed practice, project application, and assessment rather than appearing as a flat worksheet list.\n\n**Scope:**\n- Expressions and patterns with structure, equivalence, and verbal-to-symbol translation.\n- Linear relationships, slope, intercepts, tables, graphs, and contextual interpretation.\n- Solving linear equations and inequalities with reasonableness checks.\n- Systems of linear equations and inequalities using graphing, substitution, elimination, and constraints.\n- Introductory function thinking across tables, graphs, equations, and verbal rules.\n\n**Evidence target:** The course makes it possible to point to the topic family, representation type, and modeling role for each major module."
					},
					{
						title: "Course Item Labels",
						content:
							"**Concept path:** Use clear labels such as Lesson, Practice, Check-in, Project, Targeted Review, Enrichment, or Assessment. The label makes the purpose of each item obvious: introducing a concept, practicing a skill, checking mastery, reviewing a gap, or extending the idea.\n\n**Label rules:** A Lesson introduces vocabulary, representation, and a worked example. Practice builds fluency with near-transfer problems. A Check-in samples mastery without becoming a full unit test. A Project applies algebra to a context, model, or comparison. Targeted Review revisits a named gap, while Enrichment changes a constraint or adds a second method.\n\n**Course-specific labels:** Algebra 1A labels distinguish expression translation, linear-equation fluency, graph/table interpretation, systems reasoning, and introductory function notation.\n\n**Evidence target:** A reader can tell which items teach, which items practice, which items assess, which items extend, and which algebra strand is being checked before opening the detailed prompt."
					},
					{
						title: "Required Anchor and Extension Projects",
						content:
							"**Project goal:** Each algebra course includes one required anchor modeling project and one optional extension project. For this course, the anchor centers on a linear or systems model such as comparing phone plans, fundraising rates, taxi fares, break-even points, or two-constraint scheduling. The project defines quantities, chooses representations, solves, interprets, and checks reasonableness. The extension keeps the same mathematical structure but changes one meaningful constraint, comparison, or method so transfer becomes visible.\n\n**Anchor structure:**\n1. Name the context, variables, units, domain, and question being answered.\n2. Represent the relationship with table, graph, equation, verbal rule, and solution-point interpretation.\n3. Solve with visible algebra and explain why that method fits the context.\n4. Check the answer through substitution, graph inspection, units, estimation, or a boundary case.\n5. Write a conclusion that interprets the result rather than only reporting a value.\n\n**Extension structure:** change the rate, starting value, inequality boundary, or second constraint so the graph and equation must both be rechecked. The extension records what stayed equivalent, what changed, and which representation made the change easiest to inspect.\n\n**Completion checks:**\n- At least two representations are used and compared.\n- The answer is interpreted in context with a reasonableness check.\n- The rubric separates procedure, representation, interpretation, and error-analysis evidence.\n- A targeted review note identifies the prerequisite skill to revisit if the anchor project breaks down."
					},
					{
						title: "Practice Set Types",
						content:
							"**Readiness check:** Rotate six practice formats: worked example, near-transfer fluency, error analysis, interleaved mixed set, retrieval spiral, and compact application set. The formats are not random worksheet styles; each one checks a different kind of algebra understanding, from procedure to transfer to misconception repair.\n\n**Course emphasis:** In this course, practice sets prioritize near-transfer equation solving, slope/intercept interpretation, graph-to-equation translation, systems constraints, and reasonableness checks for units and domains.\n\n**Set design:** Worked examples show notation and reasoning. Near-transfer sets keep the same structure with changed numbers. Error analysis asks what step failed and why. Interleaved sets mix old and new skills. Retrieval spirals revisit prior units. Compact applications connect equations, graphs, tables, or written interpretation to a short context.\n\n**Evidence target:** The work demonstrates the ability to solve, explain, identify a common error, and transfer the same idea to a changed context."
					}
				],
				supplementalProjects: [
					{
						title: "Anchor Project: Modeling Task Blueprint",
						content:
							"**Project goal:** Draft the required anchor modeling project around a linear relationship or systems scenario with two quantities that can be represented by table, graph, equation, and written interpretation. Name the context, variables, representation choices, solution method, and reasonableness check. The blueprint makes the task usable as a course anchor rather than a single exercise by showing how the same model can be introduced, practiced, assessed, and extended.\n\n**Representation requirement:** Include table, graph, equation, verbal rule, and solution-point interpretation, then state which representation best supports calculation and which one best supports interpretation.\n\n**Completion checks:**\n- The project uses at least two representations.\n- The answer is interpreted in context.\n- The rubric checks both procedure and explanation."
					},
					{
						title: "Extension Project: Changed Constraint",
						content:
							"**Project goal:** Extend the anchor project by making this course-specific change: change the rate, starting value, inequality boundary, or second constraint so the graph and equation must both be rechecked. The extension tests whether the method is understood structurally: a changed condition may preserve the same relationship, require a new representation, or expose where the starting model was too narrow.\n\n**Comparison target:** Reuse table, graph, equation, verbal rule, and solution-point interpretation where useful, then explain which representation changes most clearly and which one hides the change.\n\n**Completion checks:**\n- The changed constraint is stated in the language of a linear or systems model such as comparing phone plans, fundraising rates, taxi fares, break-even points, or two-constraint scheduling.\n- The work explains why the baseline method still works or must change.\n- The result is compared against the baseline case with units, domain, or representation evidence."
					}
				]
			}
		]
	},
	"algebra-1b": {
		expectedModuleCount: 29,
		developmentMetadata: {
			priority: "urgent",
			standards: [
				"Common Core High School Functions, Algebra, Statistics, and Modeling standards.",
				"Common Core Algebra research-backed source map."
			],
			sourcePolicy:
				"Content-only math course. Use course modules plus generated practice, modeling, and error-analysis tasks; worksheets or Desmos links are added as media assets when created.",
			assessmentCadence: [
				"Algebra 1B starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Algebra 1B uses a low-stakes check-in after every three to five lessons.",
				"Algebra 1B pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Algebra 1B includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Algebra 1B uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Algebra 1B setup before starting reusable projects."
			],
			safetyPolicy: [
				"Algebra 1B uses local projects, owned accounts, and approved source repositories.",
				"Algebra 1B does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Algebra 1B work."
			],
			courseBoundaries: [
				"Algebra 1B keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Algebra 1B does not add adjacent-topic enrichment until the required Algebra 1B project and completion check exist."
			],
			capstoneExpectations: [
				"Algebra 1B ends with one anchor modeling project that uses at least two representations.",
				"Algebra 1B includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Algebra 1B per-item standards tags when the schema supports item-level metadata.",
				"Create Algebra 1B worksheet or Desmos asset packs for anchor projects.",
				"Add Algebra 1B answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 0,
				moduleTitle: "AB1 Introduction to Polynomials",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1B AB1 Introduction to Polynomials. The check combines one solved model, three new problems, and one justification task tied to organization of the pattern with notation, a table, and one graph or structured calculation.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires verifying one small case by hand and comparing it with the general rule or calculation.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AB1 Introduction to Polynomials to analyze a repeated pattern, coded message, data transformation, or structured calculation with multiple steps. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AB1 Introduction to Polynomials scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to organization of the pattern with notation, a table, and one graph or structured calculation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 1,
				moduleTitle: "AB2 Multiplying Polynomials",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1B AB2 Multiplying Polynomials. The check combines one solved model, three new problems, and one justification task tied to organization of the pattern with notation, a table, and one graph or structured calculation.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires verifying one small case by hand and comparing it with the general rule or calculation.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AB2 Multiplying Polynomials to analyze a repeated pattern, coded message, data transformation, or structured calculation with multiple steps. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AB2 Multiplying Polynomials scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to organization of the pattern with notation, a table, and one graph or structured calculation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 2,
				moduleTitle: "AB3 Fractions with Polynomials",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AB3 Fractions with Polynomials to analyze a rate, density, geometry, or inverse-variation situation where some values are impossible. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: testing candidate answers in the original expression and stating every excluded value.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AB3 Fractions with Polynomials scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to showing restrictions with symbolic work, a table of safe inputs, and a graph or written domain statement.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 3,
				moduleTitle:
					"AB4 Module Project: Smart and Elegant (with Amy Katz)",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB4 Module Project: Smart and Elegant (with Amy Katz) using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB4 Module Project: Smart and Elegant (with Amy Katz) separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 4,
				moduleTitle: "AB5 Solving Quadratics by Factoring",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for AB5 Solving Quadratics by Factoring in Algebra 1B that moves from a labeled example to independent transfer. The practice check is finding roots, vertex information, or a key value and explaining which form made that step efficient.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring connection between factored form, standard form, graph features, and zeros or vertex information.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a sign error in factoring, a missing negative in the quadratic formula, or a root that is misread from the graph.\n- The final check confirms the answer through substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AB5 Solving Quadratics by Factoring solution. The error begins with a solution that reports both roots but never connects them to the question being answered; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses connection between factored form, standard form, graph features, and zeros or vertex information when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 5,
				moduleTitle: "AB6 Special Factorizations",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1B AB6 Special Factorizations. The check combines one solved model, three new problems, and one justification task tied to connection between factored form, standard form, graph features, and zeros or vertex information.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a sign error in factoring, a missing negative in the quadratic formula, or a root that is misread from the graph.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AB6 Special Factorizations to analyze height, area, revenue, or path data where the maximum, minimum, or zero has a real interpretation. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AB6 Special Factorizations scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to connection between factored form, standard form, graph features, and zeros or vertex information.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 6,
				moduleTitle: "AB7 Solving Quadratics by Completing the Square",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AB7 Solving Quadratics by Completing the Square that separates procedure, representation, and interpretation. The set builds confidence with finding roots, vertex information, or a key value and explaining which form made that step efficient before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between factored form, standard form, graph features, and zeros or vertex information.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign error in factoring, a missing negative in the quadratic formula, or a root that is misread from the graph.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB7 Solving Quadratics by Completing the Square using height, area, revenue, or path data where the maximum, minimum, or zero has a real interpretation. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between factored form, standard form, graph features, and zeros or vertex information.\n3. Complete the calculation or graph analysis, then use this check: substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB7 Solving Quadratics by Completing the Square separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 7,
				moduleTitle: "AB8 Quadratic Formula",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for AB8 Quadratic Formula. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on finding roots, vertex information, or a key value and explaining which form made that step efficient.\n3. Convert the same idea into another form through connection between factored form, standard form, graph features, and zeros or vertex information.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a sign error in factoring, a missing negative in the quadratic formula, or a root that is misread from the graph.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1B AB8 Quadratic Formula. The task uses height, area, revenue, or path data where the maximum, minimum, or zero has a real interpretation or starts from a solution that reports both roots but never connects them to the question being answered.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: connection between factored form, standard form, graph features, and zeros or vertex information.\n3. Solve or correct the task and document substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 8,
				moduleTitle:
					"AB9 Module Project: The Half-Court Challenge (with Ian Kennedy)",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for AB9 Module Project: The Half-Court Challenge (with Ian Kennedy). The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on solving a direct case and explaining the rule or property used at the key step.\n3. Convert the same idea into another form through connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1B AB9 Module Project: The Half-Court Challenge (with Ian Kennedy). The task uses a short realistic situation where the chosen algebraic representation affects the answer or starts from a solution with one plausible algebraic or representation mistake that needs to be located and repaired.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Solve or correct the task and document verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 9,
				moduleTitle: "AB10 Graphing Vertex Form",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AB10 Graphing Vertex Form that separates procedure, representation, and interpretation. The set builds confidence with finding roots, vertex information, or a key value and explaining which form made that step efficient before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between factored form, standard form, graph features, and zeros or vertex information.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign error in factoring, a missing negative in the quadratic formula, or a root that is misread from the graph.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB10 Graphing Vertex Form using height, area, revenue, or path data where the maximum, minimum, or zero has a real interpretation. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between factored form, standard form, graph features, and zeros or vertex information.\n3. Complete the calculation or graph analysis, then use this check: substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB10 Graphing Vertex Form separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 10,
				moduleTitle: "AB11 Graphing Standard Form",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AB11 Graphing Standard Form that separates procedure, representation, and interpretation. The set builds confidence with solving a direct case and explaining the rule or property used at the key step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB11 Graphing Standard Form using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB11 Graphing Standard Form separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 11,
				moduleTitle: "AB12 Transformations",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1B AB12 Transformations. The check combines one solved model, three new problems, and one justification task tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires verifying the answer by substitution, estimation, graph inspection, units, or context.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AB12 Transformations to analyze a short realistic situation where the chosen algebraic representation affects the answer. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AB12 Transformations scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 12,
				moduleTitle:
					"AB13 Module Project: Put Me in Coach! (with Tom Dethlefs)",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for AB13 Module Project: Put Me in Coach! (with Tom Dethlefs). The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on solving a direct case and explaining the rule or property used at the key step.\n3. Convert the same idea into another form through connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1B AB13 Module Project: Put Me in Coach! (with Tom Dethlefs). The task uses a short realistic situation where the chosen algebraic representation affects the answer or starts from a solution with one plausible algebraic or representation mistake that needs to be located and repaired.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Solve or correct the task and document verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 13,
				moduleTitle: "AB14 Introduction to Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1B AB14 Introduction to Functions. The check combines one solved model, three new problems, and one justification task tied to tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a domain restriction, reused variable name, inverse-output mixup, or graph point that is not a function.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires testing a selected input, naming any restricted input, and explaining what the output represents.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AB14 Introduction to Functions to analyze a rule-based process such as scoring, pricing, conversion, or chained transformations. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AB14 Introduction to Functions scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 14,
				moduleTitle: "AB15 Function Composition and Inverse Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for AB15 Function Composition and Inverse Functions. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on evaluating, composing, or comparing functions while keeping input restrictions explicit.\n3. Convert the same idea into another form through tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a domain restriction, reused variable name, inverse-output mixup, or graph point that is not a function.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1B AB15 Function Composition and Inverse Functions. The task uses a rule-based process such as scoring, pricing, conversion, or chained transformations or starts from a solution that treats f(x) as multiplication or forgets which output becomes the next input.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n3. Solve or correct the task and document testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 15,
				moduleTitle: "AB16 Module Project: J.T. Phone Home",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB16 Module Project: J.T. Phone Home using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB16 Module Project: J.T. Phone Home separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 16,
				moduleTitle: "AB17 Absolute Value and Exponential Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AB17 Absolute Value and Exponential Functions that separates procedure, representation, and interpretation. The set builds confidence with identifying the starting value, growth or decay factor, and meaning of a selected input value before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: comparison of a table of repeated multiplication, an exponential equation, and a graph with intercept or asymptote behavior.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes confusing percent change with the multiplier, using a negative input without context, or treating growth as linear.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB17 Absolute Value and Exponential Functions using population, depreciation, savings, temperature change, or half-life style behavior over repeated intervals. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports comparison of a table of repeated multiplication, an exponential equation, and a graph with intercept or asymptote behavior.\n3. Complete the calculation or graph analysis, then use this check: verifying the first two intervals, naming the domain that makes sense, and comparing the pattern to a linear alternative.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB17 Absolute Value and Exponential Functions separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 17,
				moduleTitle: "AB18 Direct and Inverse Variation",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for AB18 Direct and Inverse Variation in Algebra 1B that moves from a labeled example to independent transfer. The practice check is evaluating, composing, or comparing functions while keeping input restrictions explicit.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a domain restriction, reused variable name, inverse-output mixup, or graph point that is not a function.\n- The final check confirms the answer through testing a selected input, naming any restricted input, and explaining what the output represents."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AB18 Direct and Inverse Variation solution. The error begins with a solution that treats f(x) as multiplication or forgets which output becomes the next input; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses tracking inputs and outputs through notation, a table, a graph, and a verbal rule when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 18,
				moduleTitle: "AB19 Data Modeling",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1B AB19 Data Modeling. The check combines one solved model, three new problems, and one justification task tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires verifying the answer by substitution, estimation, graph inspection, units, or context.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use AB19 Data Modeling to analyze a short realistic situation where the chosen algebraic representation affects the answer. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The AB19 Data Modeling scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 19,
				moduleTitle:
					"AB20 Module Project: The Mysteries of Light (with Blake Eaton)",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AB20 Module Project: The Mysteries of Light (with Blake Eaton) that separates procedure, representation, and interpretation. The set builds confidence with solving a direct case and explaining the rule or property used at the key step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB20 Module Project: The Mysteries of Light (with Blake Eaton) using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB20 Module Project: The Mysteries of Light (with Blake Eaton) separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 20,
				moduleTitle:
					"AB21 Module Project: Radiofungi (with Sunanda Sharma)",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for AB21 Module Project: Radiofungi (with Sunanda Sharma) that separates procedure, representation, and interpretation. The set builds confidence with solving a direct case and explaining the rule or property used at the key step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for AB21 Module Project: Radiofungi (with Sunanda Sharma) using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for AB21 Module Project: Radiofungi (with Sunanda Sharma) separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 21,
				moduleTitle: "AB22 Master Project: Algebra 1B",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for AB22 Master Project: Algebra 1B in Algebra 1B that moves from a labeled example to independent transfer. The practice check is solving a direct case and explaining the rule or property used at the key step.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The final check confirms the answer through verifying the answer by substitution, estimation, graph inspection, units, or context."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed AB22 Master Project: Algebra 1B solution. The error begins with a solution with one plausible algebraic or representation mistake that needs to be located and repaired; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses connection between symbolic work and at least one table, graph, diagram, or verbal interpretation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 23,
				moduleTitle: "Check-In #1",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 1B Check-In #1. The check combines one solved model, three new problems, and one justification task tied to translation between function notation, a table, a nonlinear graph, and a factored, vertex, absolute-value, or exponential rule.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a domain mismatch, exponent-rule slip, sign error in factoring, or graph feature interpreted without context.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires substituting a selected input, checking the graph feature, and explaining whether the model behavior fits the context.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use Check-In #1 to analyze a nonlinear readiness scenario such as a projectile path, area relationship, savings growth, or linear-versus-quadratic comparison. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: substituting a selected input, checking the graph feature, and explaining whether the model behavior fits the context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The Check-In #1 scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to translation between function notation, a table, a nonlinear graph, and a factored, vertex, absolute-value, or exponential rule.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 24,
				moduleTitle: "Check-In #2",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 1B Check-In #2. The task uses a nonlinear readiness scenario such as a projectile path, area relationship, savings growth, or linear-versus-quadratic comparison or starts from a solution that calculates a root, vertex, or growth value but does not connect it to the question being asked.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: translation between function notation, a table, a nonlinear graph, and a factored, vertex, absolute-value, or exponential rule.\n3. Solve or correct the task and document substituting a selected input, checking the graph feature, and explaining whether the model behavior fits the context.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 25,
				moduleTitle: "Reference Archive: Algebra 1B",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for Reference Archive: Algebra 1B that separates procedure, representation, and interpretation. The set builds confidence with solving a direct case and explaining the rule or property used at the key step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for Reference Archive: Algebra 1B using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for Reference Archive: Algebra 1B separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			}
		],
		addedModules: [
			{
				kind: "appendix",
				title: "Algebra 1B: Project Taxonomy and Assessment Implementation",
				curriculum: [
					{
						title: "Algebra 1B Structure Decision",
						content:
							"**Concept path:** Algebra 1B supplemental projects provide explicit practice sets, application/modeling projects, error-analysis tasks, and enrichment. Core curriculum items remain focused on concept instruction, worked examples, and guided practice. Existing imported module projects can remain in curriculum for continuity, and every module also exposes at least two explicit Algebra 1B project/practice options in the project area.\n\n**Evidence target:** Algebra 1B makes it possible to distinguish required concept instruction from optional, remedial, and enrichment project work without reading the entire module."
					},
					{
						title: "Algebra 1B Assessment Cadence",
						content:
							"**Readiness check:** Algebra 1B uses a short formative check after each major topic, a cumulative mixed-practice check every few modules, and an error-analysis task before moving into a new representation type. The cadence keeps fluency, interpretation, and written reasoning connected instead of treating them as separate courses.\n\n**Evidence of proficiency:** A complete response in Algebra 1B solves, explains, checks reasonableness, and identifies a common algebraic error."
					},
					{
						title: "Algebra 1B Representation Balance",
						content:
							"**Concept path:** Each Algebra 1B project includes at least two representations when reasonable: equation, graph, table, verbal rule, diagram, or contextual model. The representation change is part of the concept, not a formatting step, because it shows whether the same relationship is understood from multiple angles.\n\n**Evidence target:** The work demonstrates the ability to translate between Algebra 1B representations and explain what each one reveals."
					},
					{
						title: "Algebra 1B Worked Example Density",
						content:
							"**Concept path:** Each new Algebra 1B skill includes one clean worked example, one flawed example to repair, and one transfer problem with changed numbers or context. The clean example models notation, the flawed example exposes a likely misconception, and the transfer example checks whether the method survives a changed surface form.\n\n**Evidence target:** The work demonstrates the ability to explain the difference between Algebra 1B procedure and reason."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 1B Practice Set Conversion",
						content:
							"**Project goal:** Convert one Algebra 1B topic into a practice set with a worked example, three independent problems, one representation task, and one explanation prompt. The set makes the skill teachable without turning into a list of disconnected exercises.\n\n**Practice-set structure:**\n1. Begin with a worked example that shows the setup, the algebraic move, and a reasonableness check.\n2. Add one direct problem that follows the same structure so the core procedure is visible.\n3. Add one changed-number or changed-context problem that checks whether the method transfers.\n4. Add one graph, table, diagram, or verbal interpretation task so the relationship is not only symbolic.\n5. End with an explanation prompt asking why the method works or what common mistake it avoids.\n\n**Completion checks:**\n- Problems are sequenced from direct to transfer.\n- One problem requires graph, table, diagram, or context interpretation.\n- The answer key includes reasoning, not just final answers."
					},
					{
						title: "Algebra 1B Modeling or Error-Analysis Task",
						content:
							"**Project goal:** Build either a contextual model or an error-analysis task for one Algebra 1B topic. A modeling task starts with quantities, units, constraints, and a relationship to represent. An error-analysis task starts with a plausible flawed solution and asks what assumption or algebraic move caused the error.\n\n**Completion checks:**\n- The Algebra 1B task asks why, not only what.\n- The work checks units or context.\n- A likely Algebra 1B misconception is named in the review notes."
					}
				]
			},
			{
				kind: "appendix",
				title: "Standards-Mapped Algebra Architecture",
				curriculum: [
					{
						title: "Course Scope Map",
						content:
							"**Concept path:** This standards-facing course spine builds from concept explanation to worked example, guided practice, mixed practice, project application, and assessment rather than appearing as a flat worksheet list.\n\n**Scope:**\n- Function notation and multiple representations.\n- Absolute value and piecewise/nonlinear introductions.\n- Exponent rules and exponential functions.\n- Quadratic functions, equations, factoring, graphing, and model comparison.\n- Introductory data modeling and comparison of linear, quadratic, and exponential behavior.\n\n**Evidence target:** The course makes it possible to point to the topic family, representation type, and modeling role for each major module."
					},
					{
						title: "Course Item Labels",
						content:
							"**Concept path:** Use clear labels such as Lesson, Practice, Check-in, Project, Targeted Review, Enrichment, or Assessment. The label makes the purpose of each item obvious: introducing a concept, practicing a skill, checking mastery, reviewing a gap, or extending the idea.\n\n**Label rules:** A Lesson introduces vocabulary, representation, and a worked example. Practice builds fluency with near-transfer problems. A Check-in samples mastery without becoming a full unit test. A Project applies algebra to a context, model, or comparison. Targeted Review revisits a named gap, while Enrichment changes a constraint or adds a second method.\n\n**Course-specific labels:** Algebra 1B labels separate function notation, absolute-value or piecewise behavior, exponent rules, quadratic structure, and model comparison.\n\n**Evidence target:** A reader can tell which items teach, which items practice, which items assess, which items extend, and which algebra strand is being checked before opening the detailed prompt."
					},
					{
						title: "Required Anchor and Extension Projects",
						content:
							"**Project goal:** Each algebra course includes one required anchor modeling project and one optional extension project. For this course, the anchor centers on a quadratic or exponential comparison such as projectile height, revenue, savings growth, area optimization, or choosing between linear and nonlinear models. The project defines quantities, chooses representations, solves, interprets, and checks reasonableness. The extension keeps the same mathematical structure but changes one meaningful constraint, comparison, or method so transfer becomes visible.\n\n**Anchor structure:**\n1. Name the context, variables, units, domain, and question being answered.\n2. Represent the relationship with function notation, table, graph, factored or vertex form, intercepts, and contextual meaning.\n3. Solve with visible algebra and explain why that method fits the context.\n4. Check the answer through substitution, graph inspection, units, estimation, or a boundary case.\n5. Write a conclusion that interprets the result rather than only reporting a value.\n\n**Extension structure:** change the starting value, growth factor, vertex, domain restriction, or comparison model so the best representation may change. The extension records what stayed equivalent, what changed, and which representation made the change easiest to inspect.\n\n**Completion checks:**\n- At least two representations are used and compared.\n- The answer is interpreted in context with a reasonableness check.\n- The rubric separates procedure, representation, interpretation, and error-analysis evidence.\n- A targeted review note identifies the prerequisite skill to revisit if the anchor project breaks down."
					},
					{
						title: "Practice Set Types",
						content:
							"**Readiness check:** Rotate six practice formats: worked example, near-transfer fluency, error analysis, interleaved mixed set, retrieval spiral, and compact application set. The formats are not random worksheet styles; each one checks a different kind of algebra understanding, from procedure to transfer to misconception repair.\n\n**Course emphasis:** In this course, practice sets prioritize function input/output notation, exponent-pattern fluency, factoring and graph features, model selection, and comparison between linear, quadratic, and exponential behavior.\n\n**Set design:** Worked examples show notation and reasoning. Near-transfer sets keep the same structure with changed numbers. Error analysis asks what step failed and why. Interleaved sets mix old and new skills. Retrieval spirals revisit prior units. Compact applications connect equations, graphs, tables, or written interpretation to a short context.\n\n**Evidence target:** The work demonstrates the ability to solve, explain, identify a common error, and transfer the same idea to a changed context."
					}
				],
				supplementalProjects: [
					{
						title: "Anchor Project: Modeling Task Blueprint",
						content:
							"**Project goal:** Draft the required anchor modeling project around a nonlinear relationship where function notation, graph features, and contextual interpretation all matter. Name the context, variables, representation choices, solution method, and reasonableness check. The blueprint makes the task usable as a course anchor rather than a single exercise by showing how the same model can be introduced, practiced, assessed, and extended.\n\n**Representation requirement:** Include function notation, table, graph, factored or vertex form, intercepts, and contextual meaning, then state which representation best supports calculation and which one best supports interpretation.\n\n**Completion checks:**\n- The project uses at least two representations.\n- The answer is interpreted in context.\n- The rubric checks both procedure and explanation."
					},
					{
						title: "Extension Project: Changed Constraint",
						content:
							"**Project goal:** Extend the anchor project by making this course-specific change: change the starting value, growth factor, vertex, domain restriction, or comparison model so the best representation may change. The extension tests whether the method is understood structurally: a changed condition may preserve the same relationship, require a new representation, or expose where the starting model was too narrow.\n\n**Comparison target:** Reuse function notation, table, graph, factored or vertex form, intercepts, and contextual meaning where useful, then explain which representation changes most clearly and which one hides the change.\n\n**Completion checks:**\n- The changed constraint is stated in the language of a quadratic or exponential comparison such as projectile height, revenue, savings growth, area optimization, or choosing between linear and nonlinear models.\n- The work explains why the baseline method still works or must change.\n- The result is compared against the baseline case with units, domain, or representation evidence."
					}
				]
			}
		]
	},
	"geometry-a": {
		expectedModuleCount: 9,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Geometry A starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Geometry A uses a low-stakes check-in after every three to five lessons.",
				"Geometry A pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Geometry A includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Geometry A uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Geometry A setup before starting reusable projects."
			],
			safetyPolicy: [
				"Geometry A uses local projects, owned accounts, and approved source repositories.",
				"Geometry A does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Geometry A work."
			],
			courseBoundaries: [
				"Geometry A keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Geometry A does not add adjacent-topic enrichment until the required Geometry A project and completion check exist."
			],
			capstoneExpectations: [
				"Geometry A ends with one anchor modeling project that uses at least two representations.",
				"Geometry A includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Geometry A per-item standards tags when the schema supports item-level metadata.",
				"Create Geometry A worksheet or Desmos asset packs for anchor projects.",
				"Add Geometry A answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 6,
				moduleTitle: "Check-In #3 and Geometry A Capstone",
				expectedExistingCount: 1,
				items: [
					{
						title: "Check-In #3 and Geometry A Capstone Changed-Case Review",
						content:
							"**Project goal:** Turn Check-In #3 and Geometry A Capstone into a short variation with an observable result, one boundary case, and a concise explanation.\n\n**Work sequence:**\n1. Name the concept or rule that must carry over.\n2. Solve a direct version, then solve a changed version with different numbers, input, or wording.\n3. Write a short note naming the rule, strategy, or vocabulary that made the second version work.\n\n**Completion checks:**\n- The direct case and changed case are both complete.\n- The explanation names the skill being checked.\n- One likely mistake is identified with the check that would catch it."
					}
				]
			}
		]
	},
	"geometry-b": {
		expectedModuleCount: 9,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Geometry B starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Geometry B uses a low-stakes check-in after every three to five lessons.",
				"Geometry B pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Geometry B includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Geometry B uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Geometry B setup before starting reusable projects."
			],
			safetyPolicy: [
				"Geometry B uses local projects, owned accounts, and approved source repositories.",
				"Geometry B does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Geometry B work."
			],
			courseBoundaries: [
				"Geometry B keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Geometry B does not add adjacent-topic enrichment until the required Geometry B project and completion check exist."
			],
			capstoneExpectations: [
				"Geometry B ends with one anchor modeling project that uses at least two representations.",
				"Geometry B includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Geometry B per-item standards tags when the schema supports item-level metadata.",
				"Create Geometry B worksheet or Desmos asset packs for anchor projects.",
				"Add Geometry B answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 6,
				moduleTitle: "Check-In #2 and Geometry B Capstone",
				expectedExistingCount: 1,
				items: [
					{
						title: "Check-In #2 and Geometry B Capstone Changed-Case Review",
						content:
							"**Project goal:** Turn Check-In #2 and Geometry B Capstone into a short variation with an observable result, one boundary case, and a concise explanation.\n\n**Work sequence:**\n1. Name the concept or rule that must carry over.\n2. Solve a direct version, then solve a changed version with different numbers, input, or wording.\n3. Write a short note naming the rule, strategy, or vocabulary that made the second version work.\n\n**Completion checks:**\n- The direct case and changed case are both complete.\n- The explanation names the skill being checked.\n- One likely mistake is identified with the check that would catch it."
					}
				]
			}
		]
	},
	"algebra-2a": {
		expectedModuleCount: 19,
		developmentMetadata: {
			priority: "urgent",
			standards: [
				"Common Core High School Functions, Number and Quantity, Algebra, and Modeling standards.",
				"Common Core Algebra research-backed source map."
			],
			sourcePolicy:
				"Content-only math course. Use course modules plus generated practice, modeling, and error-analysis tasks; worksheets or Desmos links are added as media assets when created.",
			assessmentCadence: [
				"Algebra 2A starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Algebra 2A uses a low-stakes check-in after every three to five lessons.",
				"Algebra 2A pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Algebra 2A includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Algebra 2A uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Algebra 2A setup before starting reusable projects."
			],
			safetyPolicy: [
				"Algebra 2A uses local projects, owned accounts, and approved source repositories.",
				"Algebra 2A does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Algebra 2A work."
			],
			courseBoundaries: [
				"Algebra 2A keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Algebra 2A does not add adjacent-topic enrichment until the required Algebra 2A project and completion check exist."
			],
			capstoneExpectations: [
				"Algebra 2A ends with one anchor modeling project that uses at least two representations.",
				"Algebra 2A includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Algebra 2A per-item standards tags when the schema supports item-level metadata.",
				"Create Algebra 2A worksheet or Desmos asset packs for anchor projects.",
				"Add Algebra 2A answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 0,
				moduleTitle: "ALA1 Complex Numbers",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for ALA1 Complex Numbers. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on applying the rule carefully and describing the pattern or structure that justifies each step.\n3. Convert the same idea into another form through organization of the pattern with notation, a table, and one graph or structured calculation.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 2A ALA1 Complex Numbers. The task uses a repeated pattern, coded message, data transformation, or structured calculation with multiple steps or starts from a solution that gets a numeric answer but cannot identify which rule or structure produced it.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: organization of the pattern with notation, a table, and one graph or structured calculation.\n3. Solve or correct the task and document verifying one small case by hand and comparing it with the general rule or calculation.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 1,
				moduleTitle: "ALA2 Quadratic Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for ALA2 Quadratic Functions. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on finding roots, vertex information, or a key value and explaining which form made that step efficient.\n3. Convert the same idea into another form through connection between factored form, standard form, graph features, and zeros or vertex information.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a sign error in factoring, a missing negative in the quadratic formula, or a root that is misread from the graph.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 2A ALA2 Quadratic Functions. The task uses height, area, revenue, or path data where the maximum, minimum, or zero has a real interpretation or starts from a solution that reports both roots but never connects them to the question being answered.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: connection between factored form, standard form, graph features, and zeros or vertex information.\n3. Solve or correct the task and document substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 2,
				moduleTitle: "ALA3 Graphing Quadratic Functions",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALA3 Graphing Quadratic Functions using height, area, revenue, or path data where the maximum, minimum, or zero has a real interpretation. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between factored form, standard form, graph features, and zeros or vertex information.\n3. Complete the calculation or graph analysis, then use this check: substituting a root or vertex value, comparing against the graph shape, and stating whether the answer is reasonable.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALA3 Graphing Quadratic Functions separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 3,
				moduleTitle: "Check-In #1",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for Check-In #1 that separates procedure, representation, and interpretation. The set builds confidence with checking function-family readiness through transformations, composition, inverse reasoning, logarithms, and quadratic method choice before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: tracking a function through notation, transformation description, composition table, inverse check, and exponential or logarithmic form.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a transformation-order mistake, unrestricted inverse, mismatched sequence index, or logarithm used without domain context.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for Check-In #1 using an advanced-function readiness scenario such as repeated discounts, transformed measurements, dose decay, or inverse conversion. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports tracking a function through notation, transformation description, composition table, inverse check, and exponential or logarithmic form.\n3. Complete the calculation or graph analysis, then use this check: testing a small input, verifying inverse or composition behavior, and comparing the symbolic result with the graph or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for Check-In #1 separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 4,
				moduleTitle: "ALA4 Higher Degree Polynomials",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for ALA4 Higher Degree Polynomials that separates procedure, representation, and interpretation. The set builds confidence with applying the rule carefully and describing the pattern or structure that justifies each step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: organization of the pattern with notation, a table, and one graph or structured calculation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALA4 Higher Degree Polynomials using a repeated pattern, coded message, data transformation, or structured calculation with multiple steps. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports organization of the pattern with notation, a table, and one graph or structured calculation.\n3. Complete the calculation or graph analysis, then use this check: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALA4 Higher Degree Polynomials separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 5,
				moduleTitle: "ALA5 Polynomial Division",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for ALA5 Polynomial Division that separates procedure, representation, and interpretation. The set builds confidence with applying the rule carefully and describing the pattern or structure that justifies each step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: organization of the pattern with notation, a table, and one graph or structured calculation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALA5 Polynomial Division using a repeated pattern, coded message, data transformation, or structured calculation with multiple steps. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports organization of the pattern with notation, a table, and one graph or structured calculation.\n3. Complete the calculation or graph analysis, then use this check: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALA5 Polynomial Division separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 6,
				moduleTitle: "ALA6 Zeros of Polynomials",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for ALA6 Zeros of Polynomials in Algebra 2A that moves from a labeled example to independent transfer. The practice check is applying the rule carefully and describing the pattern or structure that justifies each step.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring organization of the pattern with notation, a table, and one graph or structured calculation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The final check confirms the answer through verifying one small case by hand and comparing it with the general rule or calculation."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed ALA6 Zeros of Polynomials solution. The error begins with a solution that gets a numeric answer but cannot identify which rule or structure produced it; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses organization of the pattern with notation, a table, and one graph or structured calculation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 7,
				moduleTitle: "ALA7 Graphing Polynomials",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for ALA7 Graphing Polynomials that separates procedure, representation, and interpretation. The set builds confidence with applying the rule carefully and describing the pattern or structure that justifies each step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: organization of the pattern with notation, a table, and one graph or structured calculation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALA7 Graphing Polynomials using a repeated pattern, coded message, data transformation, or structured calculation with multiple steps. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports organization of the pattern with notation, a table, and one graph or structured calculation.\n3. Complete the calculation or graph analysis, then use this check: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALA7 Graphing Polynomials separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 8,
				moduleTitle: "Check-In #2",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for Check-In #2 in Algebra 2A that moves from a labeled example to independent transfer. The practice check is checking function-family readiness through transformations, composition, inverse reasoning, logarithms, and quadratic method choice.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring tracking a function through notation, transformation description, composition table, inverse check, and exponential or logarithmic form.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a transformation-order mistake, unrestricted inverse, mismatched sequence index, or logarithm used without domain context.\n- The final check confirms the answer through testing a small input, verifying inverse or composition behavior, and comparing the symbolic result with the graph or context."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed Check-In #2 solution. The error begins with a solution that performs symbolic steps correctly but loses the input-output meaning or allowed domain; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: testing a small input, verifying inverse or composition behavior, and comparing the symbolic result with the graph or context.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses tracking a function through notation, transformation description, composition table, inverse check, and exponential or logarithmic form when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 9,
				moduleTitle: "ALA8 Rational Functions",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 2A ALA8 Rational Functions. The task uses a rule-based process such as scoring, pricing, conversion, or chained transformations or starts from a solution that treats f(x) as multiplication or forgets which output becomes the next input.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n3. Solve or correct the task and document testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 10,
				moduleTitle: "ALA9 Rational Function Operations",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for ALA9 Rational Function Operations in Algebra 2A that moves from a labeled example to independent transfer. The practice check is evaluating, composing, or comparing functions while keeping input restrictions explicit.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a domain restriction, reused variable name, inverse-output mixup, or graph point that is not a function.\n- The final check confirms the answer through testing a selected input, naming any restricted input, and explaining what the output represents."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed ALA9 Rational Function Operations solution. The error begins with a solution that treats f(x) as multiplication or forgets which output becomes the next input; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses tracking inputs and outputs through notation, a table, a graph, and a verbal rule when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 11,
				moduleTitle: "ALA10 Radical Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 2A ALA10 Radical Functions. The check combines one solved model, three new problems, and one justification task tied to tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing a domain restriction, reused variable name, inverse-output mixup, or graph point that is not a function.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires testing a selected input, naming any restricted input, and explaining what the output represents.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use ALA10 Radical Functions to analyze a rule-based process such as scoring, pricing, conversion, or chained transformations. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The ALA10 Radical Functions scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 12,
				moduleTitle: "ALA11 Piecewise Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for ALA11 Piecewise Functions in Algebra 2A that moves from a labeled example to independent transfer. The practice check is evaluating, composing, or comparing functions while keeping input restrictions explicit.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a domain restriction, reused variable name, inverse-output mixup, or graph point that is not a function.\n- The final check confirms the answer through testing a selected input, naming any restricted input, and explaining what the output represents."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed ALA11 Piecewise Functions solution. The error begins with a solution that treats f(x) as multiplication or forgets which output becomes the next input; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses tracking inputs and outputs through notation, a table, a graph, and a verbal rule when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 13,
				moduleTitle: "Check-In #3",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use Check-In #3 to analyze an advanced-function readiness scenario such as repeated discounts, transformed measurements, dose decay, or inverse conversion. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: testing a small input, verifying inverse or composition behavior, and comparing the symbolic result with the graph or context.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The Check-In #3 scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to tracking a function through notation, transformation description, composition table, inverse check, and exponential or logarithmic form.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 15,
				moduleTitle: "Reference Archive: Algebra 2A",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for Reference Archive: Algebra 2A that separates procedure, representation, and interpretation. The set builds confidence with solving a direct case and explaining the rule or property used at the key step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for Reference Archive: Algebra 2A using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for Reference Archive: Algebra 2A separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			}
		],
		addedModules: [
			{
				kind: "appendix",
				title: "Algebra 2A: Project Taxonomy and Assessment Implementation",
				curriculum: [
					{
						title: "Algebra 2A Structure Decision",
						content:
							"**Concept path:** Algebra 2A supplemental projects provide explicit practice sets, application/modeling projects, error-analysis tasks, and enrichment. Core curriculum items remain focused on concept instruction, worked examples, and guided practice. Existing imported module projects can remain in curriculum for continuity, and every module also exposes at least two explicit Algebra 2A project/practice options in the project area.\n\n**Evidence target:** Algebra 2A makes it possible to distinguish required concept instruction from optional, remedial, and enrichment project work without reading the entire module."
					},
					{
						title: "Algebra 2A Assessment Cadence",
						content:
							"**Readiness check:** Algebra 2A uses a short formative check after each major topic, a cumulative mixed-practice check every few modules, and an error-analysis task before moving into a new representation type. The cadence keeps fluency, interpretation, and written reasoning connected instead of treating them as separate courses.\n\n**Evidence of proficiency:** A complete response in Algebra 2A solves, explains, checks reasonableness, and identifies a common algebraic error."
					},
					{
						title: "Algebra 2A Representation Balance",
						content:
							"**Concept path:** Each Algebra 2A project includes at least two representations when reasonable: equation, graph, table, verbal rule, diagram, or contextual model. The representation change is part of the concept, not a formatting step, because it shows whether the same relationship is understood from multiple angles.\n\n**Evidence target:** The work demonstrates the ability to translate between Algebra 2A representations and explain what each one reveals."
					},
					{
						title: "Algebra 2A Worked Example Density",
						content:
							"**Concept path:** Each new Algebra 2A skill includes one clean worked example, one flawed example to repair, and one transfer problem with changed numbers or context. The clean example models notation, the flawed example exposes a likely misconception, and the transfer example checks whether the method survives a changed surface form.\n\n**Evidence target:** The work demonstrates the ability to explain the difference between Algebra 2A procedure and reason."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 2A Practice Set Conversion",
						content:
							"**Project goal:** Convert one Algebra 2A topic into a practice set with a worked example, three independent problems, one representation task, and one explanation prompt. The set makes the skill teachable without turning into a list of disconnected exercises.\n\n**Practice-set structure:**\n1. Begin with a worked example that shows the setup, the algebraic move, and a reasonableness check.\n2. Add one direct problem that follows the same structure so the core procedure is visible.\n3. Add one changed-number or changed-context problem that checks whether the method transfers.\n4. Add one graph, table, diagram, or verbal interpretation task so the relationship is not only symbolic.\n5. End with an explanation prompt asking why the method works or what common mistake it avoids.\n\n**Completion checks:**\n- Problems are sequenced from direct to transfer.\n- One problem requires graph, table, diagram, or context interpretation.\n- The answer key includes reasoning, not just final answers."
					},
					{
						title: "Algebra 2A Modeling or Error-Analysis Task",
						content:
							"**Project goal:** Build either a contextual model or an error-analysis task for one Algebra 2A topic. A modeling task starts with quantities, units, constraints, and a relationship to represent. An error-analysis task starts with a plausible flawed solution and asks what assumption or algebraic move caused the error.\n\n**Completion checks:**\n- The Algebra 2A task asks why, not only what.\n- The work checks units or context.\n- A likely Algebra 2A misconception is named in the review notes."
					}
				]
			},
			{
				kind: "appendix",
				title: "Standards-Mapped Algebra Architecture",
				curriculum: [
					{
						title: "Course Scope Map",
						content:
							"**Concept path:** This standards-facing course spine builds from concept explanation to worked example, guided practice, mixed practice, project application, and assessment rather than appearing as a flat worksheet list.\n\n**Scope:**\n- Sequences and stronger function review.\n- Parent-function transformations and representation transfer.\n- Combining, composing, and inverting functions.\n- Exponential and logarithmic functions with interpretation.\n- Deeper quadratic methods, complex numbers, and method comparison.\n\n**Evidence target:** The course makes it possible to point to the topic family, representation type, and modeling role for each major module."
					},
					{
						title: "Course Item Labels",
						content:
							"**Concept path:** Use clear labels such as Lesson, Practice, Check-in, Project, Targeted Review, Enrichment, or Assessment. The label makes the purpose of each item obvious: introducing a concept, practicing a skill, checking mastery, reviewing a gap, or extending the idea.\n\n**Label rules:** A Lesson introduces vocabulary, representation, and a worked example. Practice builds fluency with near-transfer problems. A Check-in samples mastery without becoming a full unit test. A Project applies algebra to a context, model, or comparison. Targeted Review revisits a named gap, while Enrichment changes a constraint or adds a second method.\n\n**Course-specific labels:** Algebra 2A labels identify sequence reasoning, parent-function transformations, composition/inverse work, exponential-logarithmic interpretation, and advanced quadratic methods.\n\n**Evidence target:** A reader can tell which items teach, which items practice, which items assess, which items extend, and which algebra strand is being checked before opening the detailed prompt."
					},
					{
						title: "Required Anchor and Extension Projects",
						content:
							"**Project goal:** Each algebra course includes one required anchor modeling project and one optional extension project. For this course, the anchor centers on a function-transformation or inverse-model project such as temperature conversion, dose decay, repeated discounts, transformed sensor readings, or comparing exact and approximate quadratic methods. The project defines quantities, chooses representations, solves, interprets, and checks reasonableness. The extension keeps the same mathematical structure but changes one meaningful constraint, comparison, or method so transfer becomes visible.\n\n**Anchor structure:**\n1. Name the context, variables, units, domain, and question being answered.\n2. Represent the relationship with symbolic function rules, transformation descriptions, composition tables, inverse checks, logarithmic form, and graph behavior.\n3. Solve with visible algebra and explain why that method fits the context.\n4. Check the answer through substitution, graph inspection, units, estimation, or a boundary case.\n5. Write a conclusion that interprets the result rather than only reporting a value.\n\n**Extension structure:** change the transformation order, inverse restriction, sequence index, exponential base, or quadratic method and compare the effect. The extension records what stayed equivalent, what changed, and which representation made the change easiest to inspect.\n\n**Completion checks:**\n- At least two representations are used and compared.\n- The answer is interpreted in context with a reasonableness check.\n- The rubric separates procedure, representation, interpretation, and error-analysis evidence.\n- A targeted review note identifies the prerequisite skill to revisit if the anchor project breaks down."
					},
					{
						title: "Practice Set Types",
						content:
							"**Readiness check:** Rotate six practice formats: worked example, near-transfer fluency, error analysis, interleaved mixed set, retrieval spiral, and compact application set. The formats are not random worksheet styles; each one checks a different kind of algebra understanding, from procedure to transfer to misconception repair.\n\n**Course emphasis:** In this course, practice sets prioritize representation transfer, domain/range language, composition order, inverse verification, logarithmic interpretation, complex-number or quadratic-method comparison.\n\n**Set design:** Worked examples show notation and reasoning. Near-transfer sets keep the same structure with changed numbers. Error analysis asks what step failed and why. Interleaved sets mix old and new skills. Retrieval spirals revisit prior units. Compact applications connect equations, graphs, tables, or written interpretation to a short context.\n\n**Evidence target:** The work demonstrates the ability to solve, explain, identify a common error, and transfer the same idea to a changed context."
					}
				],
				supplementalProjects: [
					{
						title: "Anchor Project: Modeling Task Blueprint",
						content:
							"**Project goal:** Draft the required anchor modeling project around a function family or sequence model where transformation, inverse, composition, or logarithmic interpretation changes the meaning of the result. Name the context, variables, representation choices, solution method, and reasonableness check. The blueprint makes the task usable as a course anchor rather than a single exercise by showing how the same model can be introduced, practiced, assessed, and extended.\n\n**Representation requirement:** Include symbolic function rules, transformation descriptions, composition tables, inverse checks, logarithmic form, and graph behavior, then state which representation best supports calculation and which one best supports interpretation.\n\n**Completion checks:**\n- The project uses at least two representations.\n- The answer is interpreted in context.\n- The rubric checks both procedure and explanation."
					},
					{
						title: "Extension Project: Changed Constraint",
						content:
							"**Project goal:** Extend the anchor project by making this course-specific change: change the transformation order, inverse restriction, sequence index, exponential base, or quadratic method and compare the effect. The extension tests whether the method is understood structurally: a changed condition may preserve the same relationship, require a new representation, or expose where the starting model was too narrow.\n\n**Comparison target:** Reuse symbolic function rules, transformation descriptions, composition tables, inverse checks, logarithmic form, and graph behavior where useful, then explain which representation changes most clearly and which one hides the change.\n\n**Completion checks:**\n- The changed constraint is stated in the language of a function-transformation or inverse-model project such as temperature conversion, dose decay, repeated discounts, transformed sensor readings, or comparing exact and approximate quadratic methods.\n- The work explains why the baseline method still works or must change.\n- The result is compared against the baseline case with units, domain, or representation evidence."
					}
				]
			}
		]
	},
	"algebra-2b": {
		expectedModuleCount: 16,
		developmentMetadata: {
			priority: "urgent",
			standards: [
				"Common Core High School Algebra, Functions, Statistics and Probability, Trigonometric Functions, and Modeling standards.",
				"Common Core Algebra research-backed source map."
			],
			sourcePolicy:
				"Content-only math course. Use course modules plus generated practice, modeling, and error-analysis tasks; worksheets or Desmos links are added as media assets when created.",
			assessmentCadence: [
				"Algebra 2B starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Algebra 2B uses a low-stakes check-in after every three to five lessons.",
				"Algebra 2B pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Algebra 2B includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Algebra 2B uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Algebra 2B setup before starting reusable projects."
			],
			safetyPolicy: [
				"Algebra 2B uses local projects, owned accounts, and approved source repositories.",
				"Algebra 2B does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Algebra 2B work."
			],
			courseBoundaries: [
				"Algebra 2B keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Algebra 2B does not add adjacent-topic enrichment until the required Algebra 2B project and completion check exist."
			],
			capstoneExpectations: [
				"Algebra 2B ends with one anchor modeling project that uses at least two representations.",
				"Algebra 2B includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Algebra 2B per-item standards tags when the schema supports item-level metadata.",
				"Create Algebra 2B worksheet or Desmos asset packs for anchor projects.",
				"Add Algebra 2B answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 0,
				moduleTitle: "ALB1 Introduction to Logarithms",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a mixed skill-check for Algebra 2B ALB1 Introduction to Logarithms. The check combines one solved model, three new problems, and one justification task tied to comparison of a table of repeated multiplication, an exponential equation, and a graph with intercept or asymptote behavior.\n\n**Steps:**\n1. Name the rule, property, graph feature, or representation being practiced.\n2. Write a solved model with a visible reasonableness check.\n3. Add two routine problems and one problem containing confusing percent change with the multiplier, using a negative input without context, or treating growth as linear.\n4. Add a justification question that asks why the selected method fits the problem.\n\n**Completion checks:**\n- Solutions include enough intermediate work to locate arithmetic, algebra, or representation mistakes.\n- At least one prompt requires verifying the first two intervals, naming the domain that makes sense, and comparing the pattern to a linear alternative.\n- The closing note names the misconception most likely to affect the next module."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Use ALB1 Introduction to Logarithms to analyze population, depreciation, savings, temperature change, or half-life style behavior over repeated intervals. The result connects quantities, representation, solution, and interpretation rather than ending at a number.\n\n**Steps:**\n1. State what each quantity represents and what the answer must describe.\n2. Choose an equation, graph, table, or diagram and explain why that representation fits.\n3. Solve the problem and record the verification method: verifying the first two intervals, naming the domain that makes sense, and comparing the pattern to a linear alternative.\n4. Write a conclusion that interprets the result in the original situation.\n\n**Completion checks:**\n- The ALB1 Introduction to Logarithms scenario includes a real constraint such as unit, domain, rate, scale, boundary, or precision.\n- The selected representation is compared with one alternate approach tied to comparison of a table of repeated multiplication, an exponential equation, and a graph with intercept or asymptote behavior.\n- The conclusion explains why the answer is valid for the situation."
					}
				]
			},
			{
				index: 1,
				moduleTitle: "ALB2 Exponential and Logarithmic Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for ALB2 Exponential and Logarithmic Functions that separates procedure, representation, and interpretation. The set builds confidence with identifying the starting value, growth or decay factor, and meaning of a selected input value before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: comparison of a table of repeated multiplication, an exponential equation, and a graph with intercept or asymptote behavior.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes confusing percent change with the multiplier, using a negative input without context, or treating growth as linear.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALB2 Exponential and Logarithmic Functions using population, depreciation, savings, temperature change, or half-life style behavior over repeated intervals. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports comparison of a table of repeated multiplication, an exponential equation, and a graph with intercept or asymptote behavior.\n3. Complete the calculation or graph analysis, then use this check: verifying the first two intervals, naming the domain that makes sense, and comparing the pattern to a linear alternative.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALB2 Exponential and Logarithmic Functions separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 2,
				moduleTitle: "ALB3 Arithmetic Sequences",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for ALB3 Arithmetic Sequences in Algebra 2B that moves from a labeled example to independent transfer. The practice check is applying the rule carefully and describing the pattern or structure that justifies each step.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring organization of the pattern with notation, a table, and one graph or structured calculation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The final check confirms the answer through verifying one small case by hand and comparing it with the general rule or calculation."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed ALB3 Arithmetic Sequences solution. The error begins with a solution that gets a numeric answer but cannot identify which rule or structure produced it; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses organization of the pattern with notation, a table, and one graph or structured calculation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 3,
				moduleTitle: "ALB4 Geometric Sequences",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for ALB4 Geometric Sequences in Algebra 2B that moves from a labeled example to independent transfer. The practice check is applying the rule carefully and describing the pattern or structure that justifies each step.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring organization of the pattern with notation, a table, and one graph or structured calculation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The final check confirms the answer through verifying one small case by hand and comparing it with the general rule or calculation."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed ALB4 Geometric Sequences solution. The error begins with a solution that gets a numeric answer but cannot identify which rule or structure produced it; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses organization of the pattern with notation, a table, and one graph or structured calculation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 4,
				moduleTitle: "ALB5 Matrix Operations",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for ALB5 Matrix Operations that separates procedure, representation, and interpretation. The set builds confidence with applying the rule carefully and describing the pattern or structure that justifies each step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: organization of the pattern with notation, a table, and one graph or structured calculation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a copied coefficient, mismatched index, arithmetic slip, or operation performed in the wrong order.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALB5 Matrix Operations using a repeated pattern, coded message, data transformation, or structured calculation with multiple steps. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports organization of the pattern with notation, a table, and one graph or structured calculation.\n3. Complete the calculation or graph analysis, then use this check: verifying one small case by hand and comparing it with the general rule or calculation.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALB5 Matrix Operations separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 5,
				moduleTitle: "Check-In #1",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a checkpoint for Check-In #1 in Algebra 2B that moves from a labeled example to independent transfer. The practice check is checking cumulative modeling readiness through polynomial, rational, trigonometric, probability, statistics, and cross-model interpretation.\n\n**Steps:**\n1. Write one worked example with labels for the given information, algebraic move, and answer check.\n2. Add two near-transfer problems with changed numbers or changed wording.\n3. Add one representation task requiring comparison of polynomial graph features, rational restrictions, trigonometric period/amplitude, probability table, and residual interpretation.\n4. End with one explanation prompt about why the method works.\n\n**Completion checks:**\n- Each answer shows the algebraic rule, representation choice, or property used.\n- One item includes an ignored asymptote, invalid domain value, period mismatch, probability assumption, or model chosen despite poor residual behavior.\n- The final check confirms the answer through testing a domain value, inspecting the graph or residual pattern, and explaining the model limitation in context."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Repair a flawed Check-In #1 solution. The error begins with a solution that fits a formula mechanically but ignores domain, end behavior, periodicity, uncertainty, or model limitations; the finished explanation locates the failure, corrects it, and verifies the corrected result.\n\n**Steps:**\n1. Copy or summarize the flawed solution and mark the first invalid step.\n2. Explain the algebra, graph, table, or context reason that step fails.\n3. Solve the corrected version and include this check: testing a domain value, inspecting the graph or residual pattern, and explaining the model limitation in context.\n4. Write a short prevention note for the same mistake in a future problem.\n\n**Completion checks:**\n- The correction identifies the exact failed assumption or algebraic move.\n- The corrected work uses comparison of polynomial graph features, rational restrictions, trigonometric period/amplitude, probability table, and residual interpretation when useful.\n- The final statement distinguishes the wrong answer from the repaired reasoning."
					}
				]
			},
			{
				index: 6,
				moduleTitle: "ALB6 Probability",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Build a retrieval-and-transfer checkpoint for ALB6 Probability. The checkpoint reviews the core rule, then proves the rule still works when the representation or context changes.\n\n**Steps:**\n1. Define the mathematical idea in one sentence using precise algebra vocabulary.\n2. Solve one direct case focused on solving a direct case and explaining the rule or property used at the key step.\n3. Convert the same idea into another form through connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add one short explanation comparing the direct case and the changed case.\n\n**Completion checks:**\n- Setup, calculation, and interpretation are visible.\n- One problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The review identifies one secure skill and one detail that needs another example."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 2B ALB6 Probability. The task uses a short realistic situation where the chosen algebraic representation affects the answer or starts from a solution with one plausible algebraic or representation mistake that needs to be located and repaired.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Solve or correct the task and document verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 7,
				moduleTitle: "ALB7 Data and Statistics",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Create an error-analysis or modeling task for Algebra 2B ALB7 Data and Statistics. The task uses a short realistic situation where the chosen algebraic representation affects the answer or starts from a solution with one plausible algebraic or representation mistake that needs to be located and repaired.\n\n**Steps:**\n1. Define the context or flawed solution in two to four sentences.\n2. Include one representation requirement: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Solve or correct the task and document verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one comparison explaining why another representation or shortcut is weaker for this problem.\n\n**Completion checks:**\n- The task includes a meaningful constraint such as unit, domain, scale, rate, boundary, or precision.\n- The representation choice is defended and compared with another possible approach.\n- The closing explanation names the mathematical reason the answer or correction is trustworthy."
					}
				]
			},
			{
				index: 8,
				moduleTitle: "ALB8 Trigonometry Basics",
				expectedExistingCount: 1,
				items: [
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALB8 Trigonometry Basics using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALB8 Trigonometry Basics separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 9,
				moduleTitle: "ALB9 Graphing Trigonometric Functions",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for ALB9 Graphing Trigonometric Functions that separates procedure, representation, and interpretation. The set builds confidence with evaluating, composing, or comparing functions while keeping input restrictions explicit before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a domain restriction, reused variable name, inverse-output mixup, or graph point that is not a function.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for ALB9 Graphing Trigonometric Functions using a rule-based process such as scoring, pricing, conversion, or chained transformations. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports tracking inputs and outputs through notation, a table, a graph, and a verbal rule.\n3. Complete the calculation or graph analysis, then use this check: testing a selected input, naming any restricted input, and explaining what the output represents.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for ALB9 Graphing Trigonometric Functions separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 10,
				moduleTitle: "Check-In #2",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for Check-In #2 that separates procedure, representation, and interpretation. The set builds confidence with checking cumulative modeling readiness through polynomial, rational, trigonometric, probability, statistics, and cross-model interpretation before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: comparison of polynomial graph features, rational restrictions, trigonometric period/amplitude, probability table, and residual interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes an ignored asymptote, invalid domain value, period mismatch, probability assumption, or model chosen despite poor residual behavior.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for Check-In #2 using a cumulative modeling scenario such as periodic daylight, concentration over time, production cost, rational rate behavior, or probability decision. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports comparison of polynomial graph features, rational restrictions, trigonometric period/amplitude, probability table, and residual interpretation.\n3. Complete the calculation or graph analysis, then use this check: testing a domain value, inspecting the graph or residual pattern, and explaining the model limitation in context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for Check-In #2 separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			},
			{
				index: 12,
				moduleTitle: "Reference Archive: Algebra 2B",
				expectedExistingCount: 0,
				items: [
					{
						title: "Standards Practice Set",
						content:
							"**Project goal:** Create a short practice set for Reference Archive: Algebra 2B that separates procedure, representation, and interpretation. The set builds confidence with solving a direct case and explaining the rule or property used at the key step before adding a transfer case.\n\n**Steps:**\n1. Present one model problem with the setup and answer check visible.\n2. Add one routine problem, one changed-context problem, and one explanation-only prompt.\n3. Include a representation change: connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n4. Add a one-sentence reflection naming the easiest place to make an error.\n\n**Completion checks:**\n- The worked example explains the transformation instead of only listing steps.\n- The changed-context problem includes a sign, unit, scale, domain, or notation issue that could produce a plausible but wrong answer.\n- The answer key includes reasoning, not only final values."
					},
					{
						title: "Modeling or Error Analysis",
						content:
							"**Project goal:** Build a model for Reference Archive: Algebra 2B using a short realistic situation where the chosen algebraic representation affects the answer. The setup matters: define the quantities, choose a representation, solve, and interpret the result with context.\n\n**Steps:**\n1. Write the known quantities, unknown quantity, and any restrictions.\n2. Choose a representation that supports connection between symbolic work and at least one table, graph, diagram, or verbal interpretation.\n3. Complete the calculation or graph analysis, then use this check: verifying the answer by substitution, estimation, graph inspection, units, or context.\n4. Add one changed condition and predict how the answer or graph changes.\n\n**Completion checks:**\n- Work for Reference Archive: Algebra 2B separates given information, representation, operations, and interpretation.\n- A flawed step, unreasonable answer, or alternate representation is discussed explicitly.\n- The final statement explains why the answer fits the situation."
					}
				]
			}
		],
		addedModules: [
			{
				kind: "appendix",
				title: "Algebra 2B: Project Taxonomy and Assessment Implementation",
				curriculum: [
					{
						title: "Algebra 2B Structure Decision",
						content:
							"**Concept path:** Algebra 2B supplemental projects provide explicit practice sets, application/modeling projects, error-analysis tasks, and enrichment. Core curriculum items remain focused on concept instruction, worked examples, and guided practice. Existing imported module projects can remain in curriculum for continuity, and every module also exposes at least two explicit Algebra 2B project/practice options in the project area.\n\n**Evidence target:** Algebra 2B makes it possible to distinguish required concept instruction from optional, remedial, and enrichment project work without reading the entire module."
					},
					{
						title: "Algebra 2B Assessment Cadence",
						content:
							"**Readiness check:** Algebra 2B uses a short formative check after each major topic, a cumulative mixed-practice check every few modules, and an error-analysis task before moving into a new representation type. The cadence keeps fluency, interpretation, and written reasoning connected instead of treating them as separate courses.\n\n**Evidence of proficiency:** A complete response in Algebra 2B solves, explains, checks reasonableness, and identifies a common algebraic error."
					},
					{
						title: "Algebra 2B Representation Balance",
						content:
							"**Concept path:** Each Algebra 2B project includes at least two representations when reasonable: equation, graph, table, verbal rule, diagram, or contextual model. The representation change is part of the concept, not a formatting step, because it shows whether the same relationship is understood from multiple angles.\n\n**Evidence target:** The work demonstrates the ability to translate between Algebra 2B representations and explain what each one reveals."
					},
					{
						title: "Algebra 2B Worked Example Density",
						content:
							"**Concept path:** Each new Algebra 2B skill includes one clean worked example, one flawed example to repair, and one transfer problem with changed numbers or context. The clean example models notation, the flawed example exposes a likely misconception, and the transfer example checks whether the method survives a changed surface form.\n\n**Evidence target:** The work demonstrates the ability to explain the difference between Algebra 2B procedure and reason."
					}
				],
				supplementalProjects: [
					{
						title: "Algebra 2B Practice Set Conversion",
						content:
							"**Project goal:** Convert one Algebra 2B topic into a practice set with a worked example, three independent problems, one representation task, and one explanation prompt. The set makes the skill teachable without turning into a list of disconnected exercises.\n\n**Practice-set structure:**\n1. Begin with a worked example that shows the setup, the algebraic move, and a reasonableness check.\n2. Add one direct problem that follows the same structure so the core procedure is visible.\n3. Add one changed-number or changed-context problem that checks whether the method transfers.\n4. Add one graph, table, diagram, or verbal interpretation task so the relationship is not only symbolic.\n5. End with an explanation prompt asking why the method works or what common mistake it avoids.\n\n**Completion checks:**\n- Problems are sequenced from direct to transfer.\n- One problem requires graph, table, diagram, or context interpretation.\n- The answer key includes reasoning, not just final answers."
					},
					{
						title: "Algebra 2B Modeling or Error-Analysis Task",
						content:
							"**Project goal:** Build either a contextual model or an error-analysis task for one Algebra 2B topic. A modeling task starts with quantities, units, constraints, and a relationship to represent. An error-analysis task starts with a plausible flawed solution and asks what assumption or algebraic move caused the error.\n\n**Completion checks:**\n- The Algebra 2B task asks why, not only what.\n- The work checks units or context.\n- A likely Algebra 2B misconception is named in the review notes."
					}
				]
			},
			{
				kind: "appendix",
				title: "Standards-Mapped Algebra Architecture",
				curriculum: [
					{
						title: "Course Scope Map",
						content:
							"**Concept path:** This standards-facing course spine builds from concept explanation to worked example, guided practice, mixed practice, project application, and assessment rather than appearing as a flat worksheet list.\n\n**Scope:**\n- Polynomial functions and end behavior.\n- Rational expressions and rational functions.\n- Trigonometric foundations and periodic modeling.\n- Probability, statistics, and model interpretation.\n- Cumulative comparative modeling across function families.\n\n**Evidence target:** The course makes it possible to point to the topic family, representation type, and modeling role for each major module."
					},
					{
						title: "Course Item Labels",
						content:
							"**Concept path:** Use clear labels such as Lesson, Practice, Check-in, Project, Targeted Review, Enrichment, or Assessment. The label makes the purpose of each item obvious: introducing a concept, practicing a skill, checking mastery, reviewing a gap, or extending the idea.\n\n**Label rules:** A Lesson introduces vocabulary, representation, and a worked example. Practice builds fluency with near-transfer problems. A Check-in samples mastery without becoming a full unit test. A Project applies algebra to a context, model, or comparison. Targeted Review revisits a named gap, while Enrichment changes a constraint or adds a second method.\n\n**Course-specific labels:** Algebra 2B labels distinguish polynomial behavior, rational restrictions, trigonometric modeling, probability/statistics, and cumulative model comparison.\n\n**Evidence target:** A reader can tell which items teach, which items practice, which items assess, which items extend, and which algebra strand is being checked before opening the detailed prompt."
					},
					{
						title: "Required Anchor and Extension Projects",
						content:
							"**Project goal:** Each algebra course includes one required anchor modeling project and one optional extension project. For this course, the anchor centers on a cumulative model such as periodic daylight, medication concentration, production cost, rational rate behavior, polynomial trend, or probability-based decision. The project defines quantities, chooses representations, solves, interprets, and checks reasonableness. The extension keeps the same mathematical structure but changes one meaningful constraint, comparison, or method so transfer becomes visible.\n\n**Anchor structure:**\n1. Name the context, variables, units, domain, and question being answered.\n2. Represent the relationship with polynomial graph features, rational domain restrictions, trigonometric period/amplitude, probability tables, residuals, and written model limits.\n3. Solve with visible algebra and explain why that method fits the context.\n4. Check the answer through substitution, graph inspection, units, estimation, or a boundary case.\n5. Write a conclusion that interprets the result rather than only reporting a value.\n\n**Extension structure:** change the domain, asymptote, period, data spread, probability assumption, or competing model and justify whether the original model still fits. The extension records what stayed equivalent, what changed, and which representation made the change easiest to inspect.\n\n**Completion checks:**\n- At least two representations are used and compared.\n- The answer is interpreted in context with a reasonableness check.\n- The rubric separates procedure, representation, interpretation, and error-analysis evidence.\n- A targeted review note identifies the prerequisite skill to revisit if the anchor project breaks down."
					},
					{
						title: "Practice Set Types",
						content:
							"**Readiness check:** Rotate six practice formats: worked example, near-transfer fluency, error analysis, interleaved mixed set, retrieval spiral, and compact application set. The formats are not random worksheet styles; each one checks a different kind of algebra understanding, from procedure to transfer to misconception repair.\n\n**Course emphasis:** In this course, practice sets prioritize domain restrictions, end behavior, asymptotes, period and amplitude, probability interpretation, residual reasoning, and comparison across function families.\n\n**Set design:** Worked examples show notation and reasoning. Near-transfer sets keep the same structure with changed numbers. Error analysis asks what step failed and why. Interleaved sets mix old and new skills. Retrieval spirals revisit prior units. Compact applications connect equations, graphs, tables, or written interpretation to a short context.\n\n**Evidence target:** The work demonstrates the ability to solve, explain, identify a common error, and transfer the same idea to a changed context."
					}
				],
				supplementalProjects: [
					{
						title: "Anchor Project: Modeling Task Blueprint",
						content:
							"**Project goal:** Draft the required anchor modeling project around a higher-algebra modeling situation where choosing polynomial, rational, trigonometric, or statistical representation changes the conclusion. Name the context, variables, representation choices, solution method, and reasonableness check. The blueprint makes the task usable as a course anchor rather than a single exercise by showing how the same model can be introduced, practiced, assessed, and extended.\n\n**Representation requirement:** Include polynomial graph features, rational domain restrictions, trigonometric period/amplitude, probability tables, residuals, and written model limits, then state which representation best supports calculation and which one best supports interpretation.\n\n**Completion checks:**\n- The project uses at least two representations.\n- The answer is interpreted in context.\n- The rubric checks both procedure and explanation."
					},
					{
						title: "Extension Project: Changed Constraint",
						content:
							"**Project goal:** Extend the anchor project by making this course-specific change: change the domain, asymptote, period, data spread, probability assumption, or competing model and justify whether the original model still fits. The extension tests whether the method is understood structurally: a changed condition may preserve the same relationship, require a new representation, or expose where the starting model was too narrow.\n\n**Comparison target:** Reuse polynomial graph features, rational domain restrictions, trigonometric period/amplitude, probability tables, residuals, and written model limits where useful, then explain which representation changes most clearly and which one hides the change.\n\n**Completion checks:**\n- The changed constraint is stated in the language of a cumulative model such as periodic daylight, medication concentration, production cost, rational rate behavior, polynomial trend, or probability-based decision.\n- The work explains why the baseline method still works or must change.\n- The result is compared against the baseline case with units, domain, or representation evidence."
					}
				]
			}
		]
	},
	"pre-calculus-a": {
		expectedModuleCount: 18,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Pre-Calculus and Trigonometry A starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Pre-Calculus and Trigonometry A uses a low-stakes check-in after every three to five lessons.",
				"Pre-Calculus and Trigonometry A pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Pre-Calculus and Trigonometry A includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Pre-Calculus and Trigonometry A uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Pre-Calculus and Trigonometry A setup before starting reusable projects."
			],
			safetyPolicy: [
				"Pre-Calculus and Trigonometry A uses local projects, owned accounts, and approved source repositories.",
				"Pre-Calculus and Trigonometry A does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Pre-Calculus and Trigonometry A work."
			],
			courseBoundaries: [
				"Pre-Calculus and Trigonometry A keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Pre-Calculus and Trigonometry A does not add adjacent-topic enrichment until the required Pre-Calculus and Trigonometry A project and completion check exist."
			],
			capstoneExpectations: [
				"Pre-Calculus and Trigonometry A ends with one anchor modeling project that uses at least two representations.",
				"Pre-Calculus and Trigonometry A includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Pre-Calculus and Trigonometry A per-item standards tags when the schema supports item-level metadata.",
				"Create Pre-Calculus and Trigonometry A worksheet or Desmos asset packs for anchor projects.",
				"Add Pre-Calculus and Trigonometry A answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 0,
				moduleTitle: "PCTA1 Piecewise Functions",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA1 Piecewise Functions Transfer Practice",
						content:
							"**Project goal:** Build one additional PCTA1 Piecewise Functions practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two PCTA1 Piecewise Functions cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA1 Piecewise Functions variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA1 Piecewise Functions includes the direct case and the changed case.\n- The PCTA1 Piecewise Functions explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 1,
				moduleTitle: "PCTA2 Higher-Degree Polynomials",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA2 Higher-Degree Polynomials Transfer Practice",
						content:
							"**Project goal:** Extend PCTA2 Higher-Degree Polynomials with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA2 Higher-Degree Polynomials case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTA2 Higher-Degree Polynomials cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA2 Higher-Degree Polynomials variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA2 Higher-Degree Polynomials includes the direct case and the changed case.\n- The PCTA2 Higher-Degree Polynomials explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 2,
				moduleTitle: "PCTA3 Polynomial Division",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA3 Polynomial Division Transfer Practice",
						content:
							"**Project goal:** Build one additional PCTA3 Polynomial Division practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two PCTA3 Polynomial Division cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA3 Polynomial Division variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA3 Polynomial Division includes the direct case and the changed case.\n- The PCTA3 Polynomial Division explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 3,
				moduleTitle: "PCTA4 Zeros of Polynomials",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA4 Zeros of Polynomials Transfer Practice",
						content:
							"**Project goal:** Turn PCTA4 Zeros of Polynomials into a short variation with an observable result, one boundary case, and a concise explanation.\n\n**Work sequence:**\n1. Name the concept or rule that must carry over.\n2. Complete a direct PCTA4 Zeros of Polynomials case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTA4 Zeros of Polynomials cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA4 Zeros of Polynomials variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA4 Zeros of Polynomials includes the direct case and the changed case.\n- The PCTA4 Zeros of Polynomials explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 4,
				moduleTitle: "PCTA5 Graphing Polynomials",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA5 Graphing Polynomials Transfer Practice",
						content:
							"**Project goal:** Build one additional PCTA5 Graphing Polynomials practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two PCTA5 Graphing Polynomials cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA5 Graphing Polynomials variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA5 Graphing Polynomials includes the direct case and the changed case.\n- The PCTA5 Graphing Polynomials explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 5,
				moduleTitle: "PCTA6 Arithmetic and Geometric Sequences",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA6 Arithmetic and Geometric Sequences Transfer Practice",
						content:
							"**Project goal:** Use PCTA6 Arithmetic and Geometric Sequences in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA6 Arithmetic and Geometric Sequences case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTA6 Arithmetic and Geometric Sequences variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA6 Arithmetic and Geometric Sequences includes the direct case and the changed case.\n- The PCTA6 Arithmetic and Geometric Sequences explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 6,
				moduleTitle: "PCTA7 Area Under a Curve",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA7 Area Under a Curve Transfer Practice",
						content:
							"**Project goal:** Use PCTA7 Area Under a Curve in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA7 Area Under a Curve case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTA7 Area Under a Curve variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA7 Area Under a Curve includes the direct case and the changed case.\n- The PCTA7 Area Under a Curve explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 7,
				moduleTitle: "PCTA8 The Binomial Theorem",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA8 The Binomial Theorem Transfer Practice",
						content:
							"**Project goal:** Use PCTA8 The Binomial Theorem in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA8 The Binomial Theorem case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTA8 The Binomial Theorem variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA8 The Binomial Theorem includes the direct case and the changed case.\n- The PCTA8 The Binomial Theorem explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 9,
				moduleTitle: "PCTA9 Rational Functions",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA9 Rational Functions Transfer Practice",
						content:
							"**Project goal:** Build one additional PCTA9 Rational Functions practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two PCTA9 Rational Functions cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA9 Rational Functions variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA9 Rational Functions includes the direct case and the changed case.\n- The PCTA9 Rational Functions explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 10,
				moduleTitle: "PCTA10 Rational Function Operations",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA10 Rational Function Operations Transfer Practice",
						content:
							"**Project goal:** Extend PCTA10 Rational Function Operations with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA10 Rational Function Operations case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTA10 Rational Function Operations cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA10 Rational Function Operations variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA10 Rational Function Operations includes the direct case and the changed case.\n- The PCTA10 Rational Function Operations explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 11,
				moduleTitle: "PCTA11 Logarithms and Exponents",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA11 Logarithms and Exponents Transfer Practice",
						content:
							"**Project goal:** Extend PCTA11 Logarithms and Exponents with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA11 Logarithms and Exponents case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTA11 Logarithms and Exponents cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA11 Logarithms and Exponents variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA11 Logarithms and Exponents includes the direct case and the changed case.\n- The PCTA11 Logarithms and Exponents explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 12,
				moduleTitle: "PCTA12 Function Inverses and Composition",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA12 Function Inverses and Composition Transfer Practice",
						content:
							"**Project goal:** Extend PCTA12 Function Inverses and Composition with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA12 Function Inverses and Composition case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTA12 Function Inverses and Composition cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA12 Function Inverses and Composition variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA12 Function Inverses and Composition includes the direct case and the changed case.\n- The PCTA12 Function Inverses and Composition explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 13,
				moduleTitle: "PCTA13 Circles and Ellipses",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA13 Circles and Ellipses Transfer Practice",
						content:
							"**Project goal:** Extend PCTA13 Circles and Ellipses with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA13 Circles and Ellipses case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTA13 Circles and Ellipses cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTA13 Circles and Ellipses variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA13 Circles and Ellipses includes the direct case and the changed case.\n- The PCTA13 Circles and Ellipses explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 14,
				moduleTitle: "PCTA14 Parabolas and Hyperbolas",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTA14 Parabolas and Hyperbolas Transfer Practice",
						content:
							"**Project goal:** Use PCTA14 Parabolas and Hyperbolas in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTA14 Parabolas and Hyperbolas case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTA14 Parabolas and Hyperbolas variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTA14 Parabolas and Hyperbolas includes the direct case and the changed case.\n- The PCTA14 Parabolas and Hyperbolas explanation names what stayed stable and what had to change."
					}
				]
			}
		]
	},
	"pre-calculus-b": {
		expectedModuleCount: 17,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"Pre-Calculus and Trigonometry B starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"Pre-Calculus and Trigonometry B uses a low-stakes check-in after every three to five lessons.",
				"Pre-Calculus and Trigonometry B pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"Pre-Calculus and Trigonometry B includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"Pre-Calculus and Trigonometry B uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive Pre-Calculus and Trigonometry B setup before starting reusable projects."
			],
			safetyPolicy: [
				"Pre-Calculus and Trigonometry B uses local projects, owned accounts, and approved source repositories.",
				"Pre-Calculus and Trigonometry B does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy Pre-Calculus and Trigonometry B work."
			],
			courseBoundaries: [
				"Pre-Calculus and Trigonometry B keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"Pre-Calculus and Trigonometry B does not add adjacent-topic enrichment until the required Pre-Calculus and Trigonometry B project and completion check exist."
			],
			capstoneExpectations: [
				"Pre-Calculus and Trigonometry B ends with one anchor modeling project that uses at least two representations.",
				"Pre-Calculus and Trigonometry B includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach Pre-Calculus and Trigonometry B per-item standards tags when the schema supports item-level metadata.",
				"Create Pre-Calculus and Trigonometry B worksheet or Desmos asset packs for anchor projects.",
				"Add Pre-Calculus and Trigonometry B answer keys for error-analysis and mixed-practice checkpoints."
			]
		},
		moduleSupplementalAppends: [
			{
				index: 0,
				moduleTitle: "PCTB1 Trigonometry Basics",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB1 Trigonometry Basics Transfer Practice",
						content:
							"**Project goal:** Use PCTB1 Trigonometry Basics in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB1 Trigonometry Basics case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTB1 Trigonometry Basics variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB1 Trigonometry Basics includes the direct case and the changed case.\n- The PCTB1 Trigonometry Basics explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 1,
				moduleTitle: "PCTB2 Graphs of Sine and Cosine",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB2 Graphs of Sine and Cosine Transfer Practice",
						content:
							"**Project goal:** Build one additional PCTB2 Graphs of Sine and Cosine practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two PCTB2 Graphs of Sine and Cosine cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTB2 Graphs of Sine and Cosine variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB2 Graphs of Sine and Cosine includes the direct case and the changed case.\n- The PCTB2 Graphs of Sine and Cosine explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 2,
				moduleTitle: "PCTB3 Other Trigonometric Graphs",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB3 Other Trigonometric Graphs Transfer Practice",
						content:
							"**Project goal:** Extend PCTB3 Other Trigonometric Graphs with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB3 Other Trigonometric Graphs case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTB3 Other Trigonometric Graphs cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTB3 Other Trigonometric Graphs variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB3 Other Trigonometric Graphs includes the direct case and the changed case.\n- The PCTB3 Other Trigonometric Graphs explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 3,
				moduleTitle: "PCTB4 Trigonometric Equations and Identities",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB4 Trigonometric Equations and Identities Transfer Practice",
						content:
							"**Project goal:** Extend PCTB4 Trigonometric Equations and Identities with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB4 Trigonometric Equations and Identities case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTB4 Trigonometric Equations and Identities cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTB4 Trigonometric Equations and Identities variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB4 Trigonometric Equations and Identities includes the direct case and the changed case.\n- The PCTB4 Trigonometric Equations and Identities explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 4,
				moduleTitle: "PCTB5 Polar Coordinates",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB5 Polar Coordinates Transfer Practice",
						content:
							"**Project goal:** Extend PCTB5 Polar Coordinates with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB5 Polar Coordinates case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTB5 Polar Coordinates cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTB5 Polar Coordinates variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB5 Polar Coordinates includes the direct case and the changed case.\n- The PCTB5 Polar Coordinates explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 5,
				moduleTitle: "PCTB6 Parametric Equations",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB6 Parametric Equations Transfer Practice",
						content:
							"**Project goal:** Build one additional PCTB6 Parametric Equations practice artifact that proves the concept under a changed input, rule, model, or representation.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Change one input, rule, model, representation, or success condition.\n3. Compare the two PCTB6 Parametric Equations cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTB6 Parametric Equations variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB6 Parametric Equations includes the direct case and the changed case.\n- The PCTB6 Parametric Equations explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 7,
				moduleTitle: "PCTB7 Vectors",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB7 Vectors Transfer Practice",
						content:
							"**Project goal:** Use PCTB7 Vectors in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB7 Vectors case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTB7 Vectors variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB7 Vectors includes the direct case and the changed case.\n- The PCTB7 Vectors explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 8,
				moduleTitle: "PCTB8 Matrices Review",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB8 Matrices Review Changed-Case Review",
						content:
							"**Project goal:** Extend PCTB8 Matrices Review with focused transfer practice: identify which earlier skill is secure and which one needs another example.\n\n**Work sequence:**\n1. Choose one representative problem from the review topic.\n2. Solve a direct version, then solve a changed version with different numbers, input, or wording.\n3. Write a short note naming the rule, strategy, or vocabulary that made the second version work.\n\n**Completion checks:**\n- The direct case and changed case are both complete.\n- The explanation names the skill being checked.\n- One likely mistake is identified with the check that would catch it."
					}
				]
			},
			{
				index: 9,
				moduleTitle: "PCTB9 Applications of Matrices",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB9 Applications of Matrices Interaction Variation",
						content:
							"**Project goal:** Use PCTB9 Applications of Matrices in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. Define the user action, state change, and visible response.\n2. Build the smallest interaction first, then add one changed state or edge case.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The action, state update, and feedback loop are all visible.\n- One repeated, invalid, or boundary interaction is tested.\n- The final note explains why the interaction remains predictable."
					}
				]
			},
			{
				index: 10,
				moduleTitle: "PCTB10 Partial Fraction Decomposition",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB10 Partial Fraction Decomposition Transfer Practice",
						content:
							"**Project goal:** Use PCTB10 Partial Fraction Decomposition in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB10 Partial Fraction Decomposition case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTB10 Partial Fraction Decomposition variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB10 Partial Fraction Decomposition includes the direct case and the changed case.\n- The PCTB10 Partial Fraction Decomposition explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 11,
				moduleTitle: "PCTB11 Probability",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB11 Probability Transfer Practice",
						content:
							"**Project goal:** Use PCTB11 Probability in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB11 Probability case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTB11 Probability variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB11 Probability includes the direct case and the changed case.\n- The PCTB11 Probability explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 12,
				moduleTitle: "PCTB12 Limits",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB12 Limits Transfer Practice",
						content:
							"**Project goal:** Use PCTB12 Limits in a second context so the same skill is checked through new evidence, not repetition.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB12 Limits case, then change one condition such as input, representation, constraint, or context.\n3. Add one comparison note explaining what stayed stable and what changed.\n\n**Completion checks:**\n- The PCTB12 Limits variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB12 Limits includes the direct case and the changed case.\n- The PCTB12 Limits explanation names what stayed stable and what had to change."
					}
				]
			},
			{
				index: 13,
				moduleTitle: "PCTB13 Rates of Change",
				expectedExistingCount: 1,
				items: [
					{
						title: "PCTB13 Rates of Change Transfer Practice",
						content:
							"**Project goal:** Extend PCTB13 Rates of Change with focused transfer practice: turn the core concept into a small transfer task with a clear result and an explanation of why it works.\n\n**Work sequence:**\n1. State the core skill from the topic in one sentence.\n2. Complete a direct PCTB13 Rates of Change case, then change one condition such as input, representation, constraint, or context.\n3. Compare the two PCTB13 Rates of Change cases and explain what stayed the same and what changed.\n\n**Completion checks:**\n- The PCTB13 Rates of Change variation states the changed input, representation, constraint, or context before showing the result.\n- Evidence for PCTB13 Rates of Change includes the direct case and the changed case.\n- The PCTB13 Rates of Change explanation names what stayed stable and what had to change."
					}
				]
			}
		]
	},
	"ap-calculus": {
		expectedModuleCount: 30,
		developmentMetadata: {
			priority: "soon",
			standards: [
				"Course-family research profile and authored progression map."
			],
			sourcePolicy:
				"Source-library content course. Original course material has been converted into neutral catalog wording with course-native projects, static-asset placeholders, and source-safe references where available.",
			assessmentCadence: [
				"AP Calculus starts with a diagnostic launch for prerequisite arithmetic, graph reading, and notation.",
				"AP Calculus uses a low-stakes check-in after every three to five lessons.",
				"AP Calculus pacing includes a weekly retrieval spiral plus mixed practice from older skills.",
				"AP Calculus includes one required anchor modeling project and one optional extension."
			],
			toolchain: [
				"AP Calculus uses the linked source repo, browser-based material, or provided artifacts as the setup baseline.",
				"Record any version-sensitive AP Calculus setup before starting reusable projects."
			],
			safetyPolicy: [
				"AP Calculus uses local projects, owned accounts, and approved source repositories.",
				"AP Calculus does not require credentials, paid services, or destructive machine changes unless explicitly documented.",
				"Include a rollback, reset, or troubleshooting note for setup-heavy AP Calculus work."
			],
			courseBoundaries: [
				"AP Calculus keeps prerequisites, core concepts, projects, targeted review, enrichment, and assessments labeled separately.",
				"AP Calculus does not add adjacent-topic enrichment until the required AP Calculus project and completion check exist."
			],
			capstoneExpectations: [
				"AP Calculus ends with one anchor modeling project that uses at least two representations.",
				"AP Calculus includes one optional extension project for deeper transfer or enrichment."
			],
			recommendedNextWork: [
				"Attach AP Calculus per-item standards tags when the schema supports item-level metadata.",
				"Create AP Calculus worksheet or Desmos asset packs for anchor projects.",
				"Add AP Calculus answer keys for error-analysis and mixed-practice checkpoints."
			]
		}
	}
} satisfies MathCoursePatchMap;

export function applyMathCourseImplementationArtifacts(
	courseId: string,
	course: RawCourse
) {
	applyMathCoursePatch(courseId, course, mathCourseImplementationPatches);
}

/// <reference types="cypress" />

const publicCourses = [
	"Early Elementary A: Numbers, Operations, and Measurement",
	"Early Elementary B: Arithmetic, Fractions, and Geometry",
	"Late Elementary A: Multiplication, Division, and Geometry",
	"Late Elementary B: Fractions, Decimals, Units, and Coordinates",
	"Pre-Algebra A",
	"Pre-Algebra B",
	"Algebra 1A",
	"Algebra 1B",
	"Geometry A",
	"Geometry B",
	"Algebra 2A",
	"Algebra 2B",
	"Pre-Calculus and Trigonometry A",
	"Pre-Calculus and Trigonometry B",
	"AP Calculus"
];
const publicCourseGroups = [
	"Elementary",
	"Pre-Algebra",
	"Algebra and Geometry",
	"Advanced"
];

context("Public math navigation", () => {
	beforeEach(() => {
		cy.viewport(1440, 900);
		cy.visit("/");
	});

	it("loads Graph Sketcher as the homepage", () => {
		cy.url().should("eq", `${Cypress.config().baseUrl}/`);
		cy.contains("h1", "Graph Sketcher").should("be.visible");
		cy.contains("button", "Play coordinate game on Scratch").should(
			"be.visible"
		);
		cy.get("iframe[src*='scratch.mit.edu']").should("not.exist");
		cy.contains("button", "Student sign in").should("not.exist");
		cy.get("#course-select").should("not.exist");
	});

	it("loads the reviewed coordinate game only after an explicit click", () => {
		cy.intercept(
			"GET",
			"https://scratch.mit.edu/projects/1367463968/embed",
			{
				body: "<!doctype html><html><body>Scratch game fixture</body></html>",
				headers: { "content-type": "text/html" },
				statusCode: 200
			}
		).as("coordinateGame");

		cy.get("iframe[src*='scratch.mit.edu']").should("not.exist");
		cy.get("a[href*='scratch.mit.edu/projects/1367463968']").should(
			"not.exist"
		);
		cy.contains("button", "Play coordinate game on Scratch").click();
		cy.wait("@coordinateGame");
		cy.get("dialog[open]")
			.should("have.attr", "aria-modal", "true")
			.find("iframe")
			.should(
				"have.attr",
				"src",
				"https://scratch.mit.edu/projects/1367463968/embed"
			)
			.and("have.attr", "referrerpolicy", "no-referrer")
			.and("have.attr", "sandbox", "allow-scripts allow-same-origin");

		cy.contains("button", "Close game").click();
		cy.get("dialog").should("not.exist");
		cy.get("iframe[src*='scratch.mit.edu']").should("not.exist");
		cy.focused().should("contain.text", "Play coordinate game on Scratch");
	});

	it("keeps only the essential public navigation", () => {
		cy.get(".site-nav__link").should("have.length", 2);
		cy.get(".site-nav").contains("a:visible", "Math courses").click();
		cy.url().should("eq", `${Cypress.config().baseUrl}/courses/`);
		cy.contains("h1", "Math courses").should("be.visible");

		cy.get(".site-nav").contains("a:visible", "Graph Sketcher").click();
		cy.url().should("eq", `${Cypress.config().baseUrl}/`);
		cy.contains("h1", "Graph Sketcher").should("be.visible");
		cy.get(".site-nav").should("not.contain", "Python IDE");
		cy.get(".site-nav").should("not.contain", "Student privacy");
		cy.get(".site-nav").should("not.contain", "Admin");
	});

	it("keeps the Graph Sketcher alias available", () => {
		cy.visit("/graph-sketcher/");
		cy.url().should("eq", `${Cypress.config().baseUrl}/graph-sketcher/`);
		cy.contains("h1", "Graph Sketcher").should("be.visible");
	});

	it("keeps Julio’s shared Admin unlisted but available at /admin", () => {
		cy.visit("/admin");
		cy.contains("h1", "Julio’s Admin").should("be.visible");
		cy.contains("a", "Open Julio’s Admin")
			.should("have.attr", "href", "https://cs.avasan.org/admin")
			.and("have.attr", "rel", "noreferrer");
		cy.get(".site-nav").should("not.contain", "Admin");
	});

	it("publishes exactly fifteen math courses in four groups", () => {
		cy.visit("/courses/");
		cy.get("#course-select option").should("have.length", 15);
		cy.get("#course-select option").then(options => {
			expect(
				[...options].map(option => option.textContent?.trim())
			).to.deep.equal(publicCourses);
		});
		cy.get("#course-select optgroup").then(groups => {
			expect(
				[...groups].map(group => group.getAttribute("label"))
			).to.deep.equal(publicCourseGroups);
			expect(
				[...groups].map(
					group => group.querySelectorAll("option").length
				)
			).to.deep.equal([4, 2, 6, 3]);
		});
	});

	it("treats removed classroom pages as missing", () => {
		for (const path of [
			"/course-resource",
			"/python-ide",
			"/student-privacy"
		]) {
			cy.visit(path);
			cy.contains("h1", "Page not found").should("be.visible");
		}
	});
});

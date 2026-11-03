context("production static rendering", () => {
	for (const route of ["/", "/graph-sketcher/", "/courses/", "/admin/"]) {
		it(`preserves scriptless structured metadata and external code at ${route}`, () => {
			cy.request(route).then(response => {
				const document = new DOMParser().parseFromString(
					response.body,
					"text/html"
				);
				const metadata = document.querySelector(
					'[itemtype="https://schema.org/WebSite"]'
				);
				expect(
					metadata
						?.querySelector('[itemprop="name"]')
						?.getAttribute("content")
				).to.equal("Math with Julio");
				expect(
					metadata
						?.querySelector('[itemprop="url"]')
						?.getAttribute("href")
				).to.equal("https://math.avasan.org");
				expect(metadata?.hasAttribute("itemscope")).to.equal(true);
				expect(metadata?.hasAttribute("hidden")).to.equal(true);
				expect(
					[...document.scripts].every(script =>
						Boolean(script.getAttribute("src"))
					)
				).to.equal(true);
				expect(
					[...document.querySelectorAll("*")].some(element =>
						[...element.attributes].some(attribute =>
							/^on/i.test(attribute.name)
						)
					)
				).to.equal(false);
				expect(response.body).not.to.contain(
					"window.__INITIAL_STATE__"
				);
				if (route === "/courses/") {
					expect(
						document.querySelectorAll(
							'[itemtype="https://schema.org/Course"]'
						)
					).to.have.length(15);
				}
			});
		});
	}

	for (const route of ["/", "/graph-sketcher/", "/courses/"]) {
		it(`loads the retained complete stylesheets at ${route}`, () => {
			cy.visit(route);
			cy.document().should(document => {
				expect(
					[...document.styleSheets].some(
						stylesheet =>
							Boolean(stylesheet.href) &&
							stylesheet.cssRules.length > 0
					)
				).to.equal(true);
			});
			cy.get("main").should("be.visible");
		});
	}
});

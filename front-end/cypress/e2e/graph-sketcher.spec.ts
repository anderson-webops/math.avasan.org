import { zipSync } from "fflate";

const legacyGraph = `<?xml version="1.0" encoding="UTF-8"?>
<document xmlns="http://www.omnigroup.com/namespace/OmniGraphSketcher/v1">
	<graph>
		<vertex id="v1" x="1" y="2" />
	</graph>
</document>`;

context("Graph Sketcher browser workspace", () => {
	let forbiddenRequests: string[];

	beforeEach(() => {
		forbiddenRequests = [];
		const siteOrigin = new URL(Cypress.config("baseUrl") as string).origin;

		cy.intercept({ url: "**" }, request => {
			const url = new URL(request.url);
			const requestOrigin = request.headers.origin;
			const requestReferrer = request.headers.referer;
			const isPageInitiated =
				url.origin === siteOrigin ||
				requestOrigin === siteOrigin ||
				(typeof requestReferrer === "string" &&
					requestReferrer.startsWith(siteOrigin));
			if (!isPageInitiated) return;

			const isApiOrAnalytics =
				url.pathname.startsWith("/api") ||
				/(?:analytics|collect|telemetry)/i.test(url.pathname);
			const isWriteRequest = !["GET", "HEAD"].includes(request.method);
			const isCrossOrigin = url.origin !== siteOrigin;
			if (isCrossOrigin || isApiOrAnalytics || isWriteRequest) {
				forbiddenRequests.push(`${request.method} ${request.url}`);
			}
		});

		cy.on("window:before:load", window => {
			Object.defineProperty(window.navigator, "sendBeacon", {
				configurable: true,
				value: (url: string | URL) => {
					forbiddenRequests.push(`BEACON ${String(url)}`);
					return false;
				}
			});
			Object.defineProperty(window, "WebSocket", {
				configurable: true,
				value: class ForbiddenWebSocket {
					constructor(url: string | URL) {
						forbiddenRequests.push(`WEBSOCKET ${String(url)}`);
						throw new Error("WebSocket is disabled in this test.");
					}
				}
			});
			Object.defineProperty(window, "EventSource", {
				configurable: true,
				value: class ForbiddenEventSource {
					constructor(url: string | URL) {
						forbiddenRequests.push(`EVENTSOURCE ${String(url)}`);
						throw new Error(
							"EventSource is disabled in this test."
						);
					}
				}
			});
		});
	});

	afterEach(() => {
		cy.then(() => {
			expect(forbiddenRequests).to.deep.equal([]);
		});
	});

	it("keeps graph edits and exports off APIs and analytics", () => {
		cy.visit("/");
		cy.contains("button", "Sample").click();
		cy.contains("button", "Download project").click();
		cy.contains("button", "CSV").click();
		cy.contains("button", "PNG").click();
	});

	it("imports a legacy archive in the worker and clears it for the next student", () => {
		const archive = zipSync({
			"Project/contents.xml": new TextEncoder().encode(legacyGraph)
		});

		cy.visit("/graph-sketcher/");
		cy.get("input[aria-label='Open or import a graph project']")
			.should("be.enabled")
			.selectFile(
				{
					contents: Cypress.Buffer.from(archive),
					fileName: "classroom.ograph",
					mimeType: "application/zip"
				},
				{ force: true }
			);

		cy.contains(
			"Imported classroom.ograph without modifying the original file."
		).should("be.visible");
		cy.get("#canvas-title").should("contain.text", "classroom");

		cy.contains("button", "Clear for next student").click();
		cy.contains("button", "Confirm clear").click();
		cy.contains(
			"Cleared this tab's graph. It is ready for the next student."
		).should("be.visible");
		cy.window().should(window => {
			expect(
				window.sessionStorage.getItem(
					"math-avasan-graph-sketcher-session-v1"
				)
			).to.equal(null);
		});
	});
});

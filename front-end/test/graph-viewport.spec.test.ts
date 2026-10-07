import { describe, expect, it } from "vitest";
import { graphForViewport, graphPointerToCanvas } from "@/modules/graphViewport";
import {
	createSampleGraphDocument,
	canvasPointToGraph,
	graphPointToCanvas,
	graphDocumentToJson
} from "@/modules/graphSketcher";
describe("interactive graph reflow", () => {
	it("maps pointer positions through wide and tall SVG letterboxing", () => {
		const canvas = { ...createSampleGraphDocument().canvas, width: 900, height: 600 };
		expect(graphPointerToCanvas(canvas, { left: 10, top: 20, width: 1800, height: 600 }, { clientX: 910, clientY: 320 })).toEqual({ x: 450, y: 300 });
		expect(graphPointerToCanvas(canvas, { left: 10, top: 20, width: 450, height: 800 }, { clientX: 235, clientY: 420 })).toEqual({ x: 450, y: 300 });
		expect(graphPointerToCanvas(canvas, { left: 0, top: 0, width: 0, height: 0 }, { clientX: 0, clientY: 0 })).toBeNull();
	});
	it("reflows a phone view without altering saved data or exported dimensions", () => {
		const document = createSampleGraphDocument();
		const before = graphDocumentToJson(document);
		document.annotations.push({
			id: "canvas-note",
			kind: "text",
			coordinateSpace: "canvas",
			x: 100,
			y: 200,
			text: "Synthetic label",
			color: "#000000",
			fontSize: 16,
			strokeWidth: 1
		});
		const original = graphDocumentToJson(document);
		const view = graphForViewport(document, 350);
		expect(view.canvas.width).toBe(350);
		expect(view.canvas.height).toBeGreaterThanOrEqual(440);
		expect(view.series).toBe(document.series);
		expect(graphDocumentToJson(document)).toBe(original);
		const annotation = view.annotations.find(
			item => item.id === "canvas-note"
		)!;
		expect(annotation.x).toBeCloseTo((100 * 350) / document.canvas.width);
		expect(annotation.y).toBeCloseTo(
			(200 * view.canvas.height) / document.canvas.height
		);
		expect(graphForViewport(document, 1000)).toBe(document);
		expect(before).not.toBe(original);
	});
	it("maps pointer coordinates back to the same data values after reflow", () => {
		const document = createSampleGraphDocument();
		const view = graphForViewport(document, 350);
		const point = document.series[0].points[2];
		const canvas = graphPointToCanvas(view, point);
		const data = canvasPointToGraph(view, canvas.x, canvas.y);
		expect(data.x).toBeCloseTo(point.x);
		expect(data.y).toBeCloseTo(point.y);
	});
});

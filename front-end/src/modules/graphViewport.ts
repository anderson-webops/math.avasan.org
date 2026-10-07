import type { GraphDocument } from "./graphSketcher";

export function graphPointerToCanvas(
	canvas: GraphDocument["canvas"],
	rectangle: Pick<DOMRect, "width" | "height" | "left" | "top">,
	pointer: { clientX: number; clientY: number }
) {
	const scale = Math.min(
		rectangle.width / canvas.width,
		rectangle.height / canvas.height
	);
	if (!Number.isFinite(scale) || scale <= 0) return null;
	const offsetX = (rectangle.width - canvas.width * scale) / 2;
	const offsetY = (rectangle.height - canvas.height * scale) / 2;
	return {
		x: (pointer.clientX - rectangle.left - offsetX) / scale,
		y: (pointer.clientY - rectangle.top - offsetY) / scale
	};
}

export function graphForViewport(
	document: GraphDocument,
	width: number
): GraphDocument {
	if (!Number.isFinite(width) || width <= 0 || width > 600) return document;
	const canvas = {
		...document.canvas,
		width: Math.max(320, Math.min(document.canvas.width, width)),
		height: Math.max(440, Math.min(document.canvas.height, 560))
	};
	const xScale = canvas.width / document.canvas.width;
	const yScale = canvas.height / document.canvas.height;
	return {
		...document,
		canvas,
		annotations: document.annotations.map(annotation =>
			annotation.coordinateSpace === "canvas"
				? {
						...annotation,
						x: annotation.x * xScale,
						y: annotation.y * yScale,
						x2:
							annotation.x2 === undefined
								? undefined
								: annotation.x2 * xScale,
						y2:
							annotation.y2 === undefined
								? undefined
								: annotation.y2 * yScale
					}
				: annotation
		)
	};
}

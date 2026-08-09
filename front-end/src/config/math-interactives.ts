import { MATH_COORDINATE_SCRATCH_PROJECT_ID } from "@/modules/resourceUrls";

export const MATH_SCRATCH_INTERACTIVES = Object.freeze([
	Object.freeze({
		description:
			"Choose x and y coordinates to guide the frog toward its next snack.",
		id: "coordinate-bug-eater",
		projectId: MATH_COORDINATE_SCRATCH_PROJECT_ID,
		sourceAuthor: "Avasan2",
		sourceTitle: "Bug Eater remix",
		title: "Bug Eater coordinate game",
		triggerLabel: "Play coordinate game on Scratch"
	})
] as const);

export const coordinateScratchGame = MATH_SCRATCH_INTERACTIVES[0];

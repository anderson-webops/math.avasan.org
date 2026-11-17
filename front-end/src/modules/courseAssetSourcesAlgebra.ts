import algebra2aComplexPlaneV2Url from "../course-assets/algebra-2a/complex-plane-v2.svg?url&no-inline";
import algebra2aPiecewiseFunctionsV2Url from "../course-assets/algebra-2a/piecewise-functions-v2.svg?url&no-inline";
import algebra2aPolynomialBehaviorV2Url from "../course-assets/algebra-2a/polynomial-behavior-v2.svg?url&no-inline";
import algebra2aQuadraticFormsV2Url from "../course-assets/algebra-2a/quadratic-forms-v2.svg?url&no-inline";
import algebra2aQuadraticTransformationsV2Url from "../course-assets/algebra-2a/quadratic-transformations-v2.svg?url&no-inline";
import algebra2aRadicalFunctionsV2Url from "../course-assets/algebra-2a/radical-functions-v2.svg?url&no-inline";
import algebra2aRationalFunctionsV2Url from "../course-assets/algebra-2a/rational-functions-v2.svg?url&no-inline";
import algebra2bArithmeticSequencesV2Url from "../course-assets/algebra-2b/arithmetic-sequences-v2.svg?url&no-inline";
import algebra2bExpLogFamiliesV2Url from "../course-assets/algebra-2b/exp-log-families-v2.svg?url&no-inline";
import algebra2bGeometricSequencesV2Url from "../course-assets/algebra-2b/geometric-sequences-v2.svg?url&no-inline";
import algebra2bLogarithmsReferenceV1Url from "../course-assets/algebra-2b/logarithms-reference-v1.svg?url&no-inline";
import algebra2bMatrixOperationsV2Url from "../course-assets/algebra-2b/matrix-operations-v2.svg?url&no-inline";
import algebra2bProbabilityTablesV2Url from "../course-assets/algebra-2b/probability-tables-v2.svg?url&no-inline";
import algebra2bStatisticsRegressionV2Url from "../course-assets/algebra-2b/statistics-regression-v2.svg?url&no-inline";
import algebra2bTrigGraphsV2Url from "../course-assets/algebra-2b/trig-graphs-v2.svg?url&no-inline";
import algebra2bUnitCircleTrigV2Url from "../course-assets/algebra-2b/unit-circle-trig-v2.svg?url&no-inline";

export const algebraCourseImageUrls: Record<string, string> = {
	"/course-assets/algebra-2a/complex-plane-v2.svg":
		algebra2aComplexPlaneV2Url,
	"/course-assets/algebra-2a/piecewise-functions-v2.svg":
		algebra2aPiecewiseFunctionsV2Url,
	"/course-assets/algebra-2a/polynomial-behavior-v2.svg":
		algebra2aPolynomialBehaviorV2Url,
	"/course-assets/algebra-2a/quadratic-forms-v2.svg":
		algebra2aQuadraticFormsV2Url,
	"/course-assets/algebra-2a/quadratic-transformations-v2.svg":
		algebra2aQuadraticTransformationsV2Url,
	"/course-assets/algebra-2a/radical-functions-v2.svg":
		algebra2aRadicalFunctionsV2Url,
	"/course-assets/algebra-2a/rational-functions-v2.svg":
		algebra2aRationalFunctionsV2Url,
	"/course-assets/algebra-2b/arithmetic-sequences-v2.svg":
		algebra2bArithmeticSequencesV2Url,
	"/course-assets/algebra-2b/exp-log-families-v2.svg":
		algebra2bExpLogFamiliesV2Url,
	"/course-assets/algebra-2b/geometric-sequences-v2.svg":
		algebra2bGeometricSequencesV2Url,
	"/course-assets/algebra-2b/logarithms-reference-v1.svg":
		algebra2bLogarithmsReferenceV1Url,
	"/course-assets/algebra-2b/matrix-operations-v2.svg":
		algebra2bMatrixOperationsV2Url,
	"/course-assets/algebra-2b/probability-tables-v2.svg":
		algebra2bProbabilityTablesV2Url,
	"/course-assets/algebra-2b/statistics-regression-v2.svg":
		algebra2bStatisticsRegressionV2Url,
	"/course-assets/algebra-2b/trig-graphs-v2.svg": algebra2bTrigGraphsV2Url,
	"/course-assets/algebra-2b/unit-circle-trig-v2.svg":
		algebra2bUnitCircleTrigV2Url
};

export const algebraCourseAssetSources: Record<string, () => Promise<string>> =
	{
		"/course-assets/algebra-2a/practice-checks-v1.md": () =>
			import("../course-assets/algebra-2a/practice-checks-v1.md?raw").then(
				module => module.default
			),
		"/course-assets/algebra-2b/practice-checks-v1.md": () =>
			import("../course-assets/algebra-2b/practice-checks-v1.md?raw").then(
				module => module.default
			)
	};

export const algebraCourseAssetCourseIds = [
	"algebra-2a",
	"algebra-2b"
] as const;

export function algebraCourseAssetViewerUrl(
	value: string,
	label: string,
	courseId: string
) {
	const [path, hash = "", extra] = value.split("#");
	if (
		value.length > 512 ||
		extra !== undefined ||
		!Object.hasOwn(algebraCourseAssetSources, path) ||
		path !== `/course-assets/${courseId}/practice-checks-v1.md` ||
		!/^[a-z0-9-]*$/.test(hash)
	) {
		throw new Error("Unsupported Algebra course resource.");
	}
	const query = new URLSearchParams({ asset: value, course: courseId });
	if (label.trim()) query.set("label", label.trim().slice(0, 160));
	return `/courses/?${query}`;
}

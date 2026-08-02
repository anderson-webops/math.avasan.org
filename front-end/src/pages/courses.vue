<script lang="ts" setup>
import { defineAsyncComponent } from "vue";
import { serializeJsonLd } from "@/modules/serializeJsonLd";

defineOptions({ name: "MathCoursesPage" });

const siteUrl = import.meta.env.VITE_SITE_URL || "https://math.avasan.org";
const CourseExplorer = defineAsyncComponent(
	() => import("@/components/CourseExplorer.vue")
);
const courseNames = [
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

useHead({
	link: [{ href: `${siteUrl}/courses/`, rel: "canonical" }],
	script: [
		{
			innerHTML: serializeJsonLd({
				"@context": "https://schema.org",
				"@type": "ItemList",
				itemListElement: courseNames.map((name, index) => ({
					"@type": "Course",
					name,
					position: index + 1,
					provider: {
						"@type": "Person",
						name: "Julio",
						jobTitle: "Grade-school teacher"
					}
				}))
			}),
			key: "math-with-julio-courses",
			type: "application/ld+json"
		}
	]
});
</script>

<template>
	<section class="page-shell page-shell--wide courses-page">
		<header class="courses-header">
			<p class="page-eyebrow">Early elementary through AP Calculus</p>
			<h1 class="page-title">Math courses</h1>
		</header>

		<CourseExplorer />
	</section>
</template>

<style scoped>
.courses-page,
.courses-header {
	display: grid;
	gap: 1rem;
}
</style>

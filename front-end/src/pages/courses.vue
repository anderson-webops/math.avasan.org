<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

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
	link: [{ href: `${siteUrl}/courses/`, rel: "canonical" }]
});
</script>

<template>
	<section class="page-shell page-shell--wide courses-page">
		<header class="courses-header">
			<h1 class="page-title">Math courses</h1>
		</header>

		<CourseExplorer />
		<div hidden itemscope itemtype="https://schema.org/ItemList">
			<div
				v-for="(name, index) in courseNames"
				:key="name"
				itemprop="itemListElement"
				itemscope
				itemtype="https://schema.org/Course"
			>
				<meta itemprop="name" :content="name" />
				<meta itemprop="position" :content="String(index + 1)" />
				<div
					itemprop="provider"
					itemscope
					itemtype="https://schema.org/Person"
				>
					<meta itemprop="name" content="Julio" />
					<meta itemprop="jobTitle" content="Grade-school teacher" />
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.courses-page {
	padding-top: 0.75rem;
	gap: 0.75rem;
}
.courses-header .page-title {
	margin: 0;
	font-size: 1.6rem;
	line-height: 1.2;
}
.courses-page,
.courses-header {
	display: grid;
	gap: 1rem;
}
</style>

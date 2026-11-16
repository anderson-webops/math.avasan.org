<script setup lang="ts">
import { ref, watch } from "vue";
import { loadCourseAssetSection } from "@/modules/courseAssetPreview";
import LazyMarkdownContent from "./LazyMarkdownContent.vue";

const props = defineProps<{
	asset: string;
	course: "algebra-1a" | "algebra-1b";
}>();
const title = ref("Self-check");
const content = ref("");
const error = ref("");
const loading = ref(false);

watch(
	() => props.asset,
	async (asset, _previous, onCleanup) => {
		let current = true;
		onCleanup(() => {
			current = false;
		});
		title.value = "Self-check";
		content.value = "";
		error.value = "";
		loading.value = true;
		try {
			const section = await loadCourseAssetSection(asset);
			if (!current) return;
			title.value = section.title;
			content.value = section.content.replace(/^#[^\n]*\n?/, "").trim();
		} catch (caught) {
			if (current) {
				error.value =
					caught instanceof Error
						? caught.message
						: "This self-check could not be loaded.";
			}
		} finally {
			if (current) loading.value = false;
		}
	},
	{ immediate: true }
);
</script>

<template>
	<section class="course-resource">
		<header>
			<h1 class="page-title">{{ title }}</h1>
			<RouterLink
				class="site-button site-button--secondary"
				:to="`/courses/#${course}`"
				>Courses</RouterLink
			>
		</header>
		<div class="site-surface resource-content" aria-live="polite">
			<p v-if="loading">Loading self-check…</p>
			<p v-else-if="error" role="alert">{{ error }}</p>
			<LazyMarkdownContent v-else :content="content" />
		</div>
	</section>
</template>

<style scoped>
.course-resource {
	display: grid;
	gap: 1rem;
	min-width: 0;
}
.course-resource header {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}
.course-resource h1 {
	margin: 0;
	overflow-wrap: anywhere;
}
.resource-content {
	padding: clamp(1rem, 3vw, 2rem);
	min-width: 0;
	overflow-x: auto;
}
.resource-content :deep(.item-content-markdown) {
	max-width: 100%;
}
</style>

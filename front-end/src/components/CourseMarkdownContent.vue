<script setup lang="ts">
import { ref, watch } from "vue";
import { resolveCourseAssetImages } from "@/modules/courseAssetPreview";
import LazyMarkdownContent from "./LazyMarkdownContent.vue";

const props = defineProps<{ content: string }>();
const content = ref("");
const error = ref("");

watch(
	() => props.content,
	async (value, _previous, onCleanup) => {
		let current = true;
		onCleanup(() => {
			current = false;
		});
		content.value = "";
		error.value = "";
		try {
			const resolved = await resolveCourseAssetImages(value);
			if (current) content.value = resolved;
		} catch {
			if (current) error.value = "This course image could not be loaded.";
		}
	},
	{ immediate: true }
);
</script>

<template>
	<p v-if="error" role="alert">{{ error }}</p>
	<LazyMarkdownContent v-else :content="content" />
</template>

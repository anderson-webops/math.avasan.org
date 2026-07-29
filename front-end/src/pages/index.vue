<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

defineOptions({ name: "HomePage" });

const GraphSketcherWorkspace = defineAsyncComponent(
	() => import("@/components/GraphSketcherWorkspace.vue")
);

useHead({
	link: [
		{
			href: `${import.meta.env.VITE_SITE_URL || "https://math.avasan.org"}/`,
			rel: "canonical"
		}
	]
});
</script>

<template>
	<GraphSketcherWorkspace />
</template>

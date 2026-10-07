<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "~/components/TheHeader.vue";

const route = useRoute();
const graphView = computed(
	() => route.path === "/" || route.path.startsWith("/graph-sketcher")
);
</script>

<template>
	<div class="site-frame" :class="{ 'site-frame--graph': graphView }">
		<a class="skip-link" href="#main-content">Skip to content</a>

		<TheHeader />

		<main id="main-content" class="site-main">
			<RouterView />
		</main>

		<footer class="site-footer">
			<a href="https://cs.avasan.org/student-privacy" rel="noreferrer">
				Student privacy
			</a>
		</footer>
	</div>
</template>

<style scoped>
.site-frame--graph {
	height: 100dvh;
	min-height: 0;
	overflow: hidden;
}
.site-frame--graph .site-main {
	min-height: 0;
}
.site-frame--graph .site-footer {
	padding: 0.15rem 0.5rem;
	flex: 0 0 auto;
	font-size: 0.75rem;
}
.site-footer {
	display: flex;
	justify-content: center;
	padding: 1.25rem 1rem 2rem;
	color: var(--color-ink-soft);
	font-size: 0.9rem;
}

.site-footer a {
	text-underline-offset: 0.22em;
}

.site-footer a:focus-visible {
	outline: 3px solid var(--color-focus);
	outline-offset: 4px;
}
</style>

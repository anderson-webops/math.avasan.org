<script lang="ts" setup>
import TheHeader from "~/components/TheHeader.vue";
</script>

<template>
	<div class="site-frame">
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

<script lang="ts" setup>
defineOptions({ name: "TeacherAdminRedirectPage" });

const adminUrl = "https://cs.avasan.org/admin";
</script>

<template>
	<section class="page-shell admin-redirect-page">
		<div class="site-surface admin-redirect-card">
			<p class="page-eyebrow">Teacher access</p>
			<h1 class="page-title">Julio’s Admin</h1>
			<p>
				Student access and classroom records are managed in Julio’s
				protected classroom Admin.
			</p>
			<a class="admin-redirect-link" :href="adminUrl" rel="noreferrer">
				Open Julio’s Admin
			</a>
		</div>
	</section>
</template>

<style scoped>
.admin-redirect-page {
	display: grid;
	min-height: min(70vh, 44rem);
	place-items: center;
}

.admin-redirect-card {
	display: grid;
	width: min(100%, 36rem);
	gap: 1rem;
	padding: clamp(1.5rem, 4vw, 2.5rem);
	text-align: center;
}

.admin-redirect-card :is(h1, p) {
	margin: 0;
}

.admin-redirect-link {
	justify-self: center;
	border-radius: 999px;
	padding: 0.8rem 1.15rem;
	background: var(--color-button-primary-bg);
	color: var(--color-button-primary-text);
	font-weight: 800;
	text-decoration: none;
}

.admin-redirect-link:focus-visible {
	outline: 3px solid var(--color-focus);
	outline-offset: 4px;
}
</style>

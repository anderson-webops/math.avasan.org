<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import { scratchProjectEmbedUrl } from "@/modules/resourceUrls";

const props = defineProps<{
	description: string;
	projectId: string;
	sourceAuthor: string;
	sourceTitle: string;
	title: string;
	triggerLabel: string;
}>();

const dialogElement = ref<HTMLDialogElement>();
const closeButtonElement = ref<HTMLButtonElement>();
const triggerElement = ref<HTMLButtonElement>();
const isOpen = ref(false);
const embedUrl = computed(() => scratchProjectEmbedUrl(props.projectId));
const dialogId = computed(() => `scratch-project-${props.projectId}-dialog`);
const dialogTitleId = computed(
	() => `scratch-project-${props.projectId}-title`
);
const dialogDescriptionId = computed(
	() => `scratch-project-${props.projectId}-description`
);

async function openDialog() {
	if (!embedUrl.value || isOpen.value) return;

	isOpen.value = true;
	await nextTick();

	const dialog = dialogElement.value;
	if (!dialog) return;

	if (typeof dialog.showModal === "function") {
		if (!dialog.open) dialog.showModal();
	} else {
		dialog.setAttribute("open", "");
	}

	await nextTick();
	closeButtonElement.value?.focus();
}

async function closeDialog() {
	if (!isOpen.value) return;

	const dialog = dialogElement.value;
	if (dialog?.open && typeof dialog.close === "function") {
		dialog.close();
	} else {
		dialog?.removeAttribute("open");
	}

	isOpen.value = false;
	await nextTick();
	triggerElement.value?.focus();
}

function handleCancel(event: Event) {
	event.preventDefault();
	void closeDialog();
}

function handleBackdropClick(event: MouseEvent) {
	if (event.target === event.currentTarget) {
		void closeDialog();
	}
}

onBeforeUnmount(() => {
	const dialog = dialogElement.value;
	if (dialog?.open && typeof dialog.close === "function") {
		dialog.close();
	}
});
</script>

<template>
	<div class="scratch-project-launcher">
		<button
			ref="triggerElement"
			class="scratch-project-trigger"
			type="button"
			aria-haspopup="dialog"
			:aria-controls="isOpen ? dialogId : undefined"
			:aria-expanded="isOpen"
			:disabled="!embedUrl"
			@click="openDialog"
		>
			{{ triggerLabel }}
		</button>

		<dialog
			v-if="isOpen"
			:id="dialogId"
			ref="dialogElement"
			class="scratch-project-dialog"
			aria-modal="true"
			:aria-labelledby="dialogTitleId"
			:aria-describedby="dialogDescriptionId"
			@cancel="handleCancel"
			@click="handleBackdropClick"
		>
			<section class="scratch-project-panel">
				<header class="scratch-project-header">
					<div>
						<p class="scratch-project-kicker">
							Coordinate practice
						</p>
						<h2 :id="dialogTitleId">{{ title }}</h2>
					</div>
					<button
						ref="closeButtonElement"
						class="scratch-project-close"
						type="button"
						@click="closeDialog"
					>
						Close game
					</button>
				</header>

				<p
					:id="dialogDescriptionId"
					class="scratch-project-description"
				>
					{{ description }}
				</p>

				<div class="scratch-project-frame-shell">
					<iframe
						v-if="embedUrl"
						:src="embedUrl"
						:title="`${title}, hosted by Scratch`"
						allow="fullscreen"
						allowfullscreen
						allowtransparency="true"
						frameborder="0"
						height="402"
						loading="eager"
						referrerpolicy="no-referrer"
						sandbox="allow-scripts allow-same-origin"
						scrolling="no"
						width="485"
					/>
				</div>

				<p class="scratch-project-exit-help">
					When keyboard focus is inside Scratch, press Tab until
					“Close game,” then activate it.
				</p>
				<button
					class="scratch-project-close scratch-project-close--footer"
					type="button"
					@click="closeDialog"
				>
					Close game
				</button>

				<p class="scratch-project-source">
					Scratch project “{{ sourceTitle }}” by {{ sourceAuthor }}.
					Scratch loads only while this game window is open.
				</p>
			</section>
		</dialog>
	</div>
</template>

<style scoped>
.scratch-project-launcher {
	display: flex;
	align-items: center;
}

.scratch-project-trigger,
.scratch-project-close {
	border: 1px solid var(--color-border-strong);
	border-radius: var(--radius-pill);
	background: var(--color-button-secondary-bg);
	color: var(--color-ink);
	font: inherit;
	font-weight: 800;
	cursor: pointer;
}

.scratch-project-trigger {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-height: 2.65rem;
	padding: 0.55rem 0.9rem;
	box-shadow: var(--shadow-soft);
}

.scratch-project-trigger:hover,
.scratch-project-close:hover {
	border-color: var(--color-accent);
	color: var(--color-accent-strong);
}

.scratch-project-trigger:focus-visible,
.scratch-project-close:focus-visible {
	outline: 3px solid var(--focus-ring-color);
	outline-offset: 3px;
}

.scratch-project-trigger:disabled {
	cursor: not-allowed;
	opacity: 0.55;
}

.scratch-project-dialog {
	width: min(42rem, calc(100% - 1.5rem));
	max-width: none;
	max-height: calc(100dvh - 1.5rem);
	margin: auto;
	padding: 0;
	border: 0;
	border-radius: var(--radius-lg);
	background: transparent;
	color: var(--color-ink);
	overflow: visible;
}

.scratch-project-dialog::backdrop {
	background: var(--color-overlay);
	backdrop-filter: blur(4px);
}

.scratch-project-panel {
	display: grid;
	gap: 1rem;
	max-height: calc(100dvh - 1.5rem);
	padding: clamp(1rem, 3vw, 1.5rem);
	border: 1px solid var(--color-border-strong);
	border-radius: var(--radius-lg);
	background: var(--color-surface-strong);
	box-shadow: 0 30px 80px -34px rgba(8, 15, 28, 0.72);
	overflow-y: auto;
	animation: scratch-project-enter 180ms ease-out;
}

.scratch-project-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 1rem;
}

.scratch-project-header h2,
.scratch-project-description,
.scratch-project-kicker,
.scratch-project-source {
	margin: 0;
}

.scratch-project-header h2 {
	font-family: var(--font-display);
	font-size: clamp(1.5rem, 4vw, 2.1rem);
	line-height: 1.15;
}

.scratch-project-kicker {
	margin-bottom: 0.25rem;
	color: var(--color-accent);
	font-size: 0.75rem;
	font-weight: 900;
	letter-spacing: 0.12em;
	text-transform: uppercase;
}

.scratch-project-close {
	flex: 0 0 auto;
	min-height: 2.4rem;
	padding: 0.45rem 0.75rem;
}

.scratch-project-description {
	color: var(--color-ink-soft);
	line-height: 1.65;
}

.scratch-project-exit-help {
	margin: 0;
	color: var(--color-ink-soft);
	font-size: 0.82rem;
	line-height: 1.5;
	text-align: center;
}

.scratch-project-frame-shell {
	width: min(100%, 485px);
	aspect-ratio: 485 / 402;
	margin-inline: auto;
	border-radius: var(--radius-md);
	background: #ffffff;
	overflow: hidden;
}

.scratch-project-frame-shell iframe {
	display: block;
	width: 100%;
	height: 100%;
	border: 0;
}

.scratch-project-source {
	color: var(--color-ink-muted);
	font-size: 0.78rem;
	line-height: 1.5;
	text-align: center;
}

.scratch-project-close--footer {
	justify-self: center;
}

@keyframes scratch-project-enter {
	from {
		opacity: 0;
		transform: scale(0.96);
	}
	to {
		opacity: 1;
		transform: scale(1);
	}
}

@media (max-width: 520px) {
	.scratch-project-header {
		align-items: stretch;
		flex-direction: column;
	}

	.scratch-project-close {
		align-self: flex-start;
	}
}

@media (prefers-reduced-motion: reduce) {
	.scratch-project-panel {
		animation: none;
	}
}
</style>

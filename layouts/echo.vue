<script setup lang="ts">
const authStore = useAuth()
const noteStore = useNotes()

const sidebarEl = ref<HTMLElement>()
const sidebarWidth = ref(250)
</script>

<template>
	<div
		ref="sidebarEl"
		class="absolute inset-0 grid grid-rows-[1fr] overflow-hidden"
		:style="{
			gridTemplateColumns: `${sidebarWidth}px 1px auto`,
		}"
	>
		<aside class="bg-background-secondary px-4 pt-4 flex flex-col">
			<header class="flex items-center justify-between">
				<NuxtLink to="/daily">
					<Logo />
				</NuxtLink>
			</header>

			<EchoSingleNotesNav :notes="noteStore.singleNotes" />
			<footer class="mt-auto mb-8 flex flex-col">
				<BaseButton
					variant="secondary"
					:to="`/untitled?new=${noteStore.singleNotes.length + 1}`"
				>
					New Note
				</BaseButton>
				<button
					class="ml-auto mt-4 text-xs"
					@click="authStore.signOut"
				>
					logout
				</button>
			</footer>
		</aside>
		<EchoResizerBar
			v-model="sidebarWidth"
			:min-width="250"
		/>
		<main class="relative flex flex-1 flex-col overflow-hidden">
			<slot />
		</main>
	</div>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>

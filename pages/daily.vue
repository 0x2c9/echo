<script setup lang="ts">
import dayjs from 'dayjs'

definePageMeta({
	layout: 'echo',
})

const dailyContainerEl = ref<HTMLElement>()
const sidebarWidth = ref(340 + 32)

const date = ref(dayjs())
const notes = useNotes()

onMounted(async () => {
	await notes.getNotes()
})
</script>

<template>
	<article
		ref="dailyContainerEl"
		class="absolute inset-0 grid grid-rows-[1fr] overflow-hidden"
		:style="{
			gridTemplateColumns: `auto 1px ${sidebarWidth}px`,
		}"
	>
		<EchoScroller
			v-model="date"
			:saved-notes="notes.dailyNotes"
		/>

		<EchoResizerBar
			v-model="sidebarWidth"
			:min-width="250"
			:reverse="true"
		/>
		<aside class="select-none bg-background-secondary px-4 pt-4">
			<BaseDatepicker v-model="date" />
		</aside>
	</article>
</template>

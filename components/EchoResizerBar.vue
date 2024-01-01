<script setup lang="ts">
const { minWidth = 0, reverse = false } = defineProps<{
	minWidth?: number
	reverse?: boolean
}>()

const elementWidth = defineModel<number>({ required: true })

function onMousedown() {
	document.addEventListener('mousemove', resize, false)
	document.addEventListener('mouseup', () => {
		document.removeEventListener('mousemove', resize, false)
	}, false)
}

function resize(e: MouseEvent) {
	if (reverse) {
		if (window.innerWidth - e.clientX < minWidth) {
			return
		}
		elementWidth.value = window.innerWidth - e.clientX
	} else {
		if (e.clientX < minWidth) {
			return
		}
		elementWidth.value = e.clientX
	}
}
</script>

<template>
	<div
		class="group relative inset-y-0 left-[-8px] z-20 w-4 cursor-col-resize"
		@mousedown="onMousedown"
	>
		<div class="mx-auto h-full w-[1px] bg-neutral-500/40 transition duration-500 ease-out group-hover:bg-primary" />
	</div>
</template>

<script setup lang="ts">
import type { INote } from '~/types'

const { note } = defineProps<{
	note: INote
}>()

const route = useRoute()
const noteStore = useNotes()

const listItem = ref<HTMLElement | null>()
const buttonIsActive = ref(false)

onMounted(() => {
	if (listItem.value) {
		listItem.value.addEventListener(
			'transitionend',
			async () => {
				if (buttonIsActive.value) {
					await noteStore.deleteNoteById(note.id)
					if (note.link === route.params.note || route.params.note === 'untitled') {
						await navigateTo(`/untitled?deleted=${note.link}`, { replace: true })
					}
				}
			},
		)
	}
})
</script>

<template>
	<li
		ref="listItem"
		class="
      text-sm
      hover:bg-faint
      px-2
      w-full
      rounded
      flex
      justify-between
      items-center
      group
      relative
      overflow-hidden
      before:pointer-events-none
      before:absolute
      before:inset-0
      before:bg-red-500
      before:scale-x-0
      before:transform
      before:origin-left
      before:transition-transform
      before:ease-linear
      before:z-0
    "
		:class="buttonIsActive ? 'before:scale-x-100 before:duration-700' : 'before:scale-x-0 before:duration-200'"
	>
		<NuxtLink
			:to="`/${note.link}`"
			class="flex-1 z-50 py-1"
		>
			{{ note.title ? note.title : 'Untitled' }}
		</NuxtLink>
		<button
			class="hidden group-hover:flex z-50"
			@mousedown="buttonIsActive = true"
			@mouseup="buttonIsActive = false"
		>
			<BaseIcon
				name="delete"
				size="14"
			/>
		</button>
	</li>
</template>

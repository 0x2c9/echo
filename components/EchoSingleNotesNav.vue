<script setup lang="ts">
import type { INote } from '~/types'

const { notes } = defineProps<{
	notes: INote[]
}>()
</script>

<template>
	<nav class="w-full relative flex flex-col">
		<TransitionGroup
			name="list"
			tag="ul"
		>
			<EchoSingleNotesNavItem
				v-for="note of notes"
				:key="note.link"
				:note="note"
			/>
		</TransitionGroup>
	</nav>
</template>

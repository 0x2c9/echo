<script setup lang="ts">
import type { INote, INoteUnsaved } from '~/types'

definePageMeta({
	layout: 'echo',
})
const route = useRoute()
const note = ref<INote | INoteUnsaved>({
	title: '',
	content: '',
	link: '',
})

const titleEl = ref<HTMLElement>()
const noteStore = useNotes()
const echoSettings = useEchoSettings()
if (noteStore.singleNotes.length === 0) {
	await noteStore.getNotes()
}

// update note title and link when localNoteTitle changes - local input is needed to keep the changes locally until the user submits the title
const localNoteTitle = ref('')
watch(
	() => localNoteTitle.value,
	(newValue) => {
		note.value.title = newValue
		note.value.link = newValue.replace(/\s/g, '-')
	},
)

watchEffect(
	async () => {
		const newNoteTitle = route.params.note as string
		localNoteTitle.value = ''
		note.value = {
			title: '',
			content: '',
			link: '',
		}
		if (newNoteTitle === 'untitled') {
			titleEl.value?.focus()
			return
		}
		const foundNote = noteStore.getNoteByLink(newNoteTitle)
		if (!foundNote) {
			await navigateTo('/untitled', { replace: true })
			return
		}
		note.value = foundNote
		localNoteTitle.value = note.value.title
	},
)

const submitEventHappened = ref(false)

async function upsertNoteOnTitleChange() {
	if (!note.value.title.trim()) {
		localNoteTitle.value = ''
		return
	}

	const upsertedNote = await noteStore.upsertNote(note.value)
	if (upsertedNote) {
		if (!note.value.id) {
			note.value.id = upsertedNote.id
		}

		route.params.note = note.value.link
		window.history.replaceState({}, '', `/${note.value.link}`)
	}
}

async function onTitleSubmit() {
	submitEventHappened.value = true

	const editorContentEl = document.querySelector('.ProseMirror') as HTMLElement
	if (editorContentEl) {
		editorContentEl.focus()
	}

	await upsertNoteOnTitleChange()
}

async function onTitleBlur() {
	if (!submitEventHappened.value) {
		await upsertNoteOnTitleChange()
	}
	submitEventHappened.value = false
}

onMounted(() => {
	if (route.params.note as string === 'untitled') {
		setTimeout(() => {
			titleEl.value?.focus()
		}, 300)
	}
})
</script>

<template>
	<div class="flex flex-col flex-1 overflow-y-scroll">
		<EchoEditorSettingsBar />

		<div
			class="flex-1 flex flex-col px-4 pt-8 pb-16"
			:class="{
				'w-full max-w-[65ch] mx-auto': echoSettings.centeredMode,
			}"
		>
			<input
				ref="titleEl"
				v-model="localNoteTitle"
				class="text-[22px] font-semibold mb-8 bg-transparent text-primary focus:text-white transition-colors duration-200"
				placeholder="Untitled"
				@keydown.enter.prevent="onTitleSubmit"
				@blur="onTitleBlur"
			>
			<EchoEditor
				v-if="note"
				v-model="note.content"
				:note="note as INote"
			/>
		</div>
	</div>
</template>

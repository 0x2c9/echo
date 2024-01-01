<script setup lang="ts">
import type { Content } from '@tiptap/vue-3'
import { EditorContent, useEditor } from '@tiptap/vue-3'

import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Link from '@tiptap/extension-link'

import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import type { INote } from '@/types'

const { note } = defineProps<{ note: INote }>()
const modelValue = defineModel<Content>({ required: true })
const notes = useNotes()
const debouncedEditorSave = useDebounceFn(async () => {
	await notes.upsertNote(note, true)
}, 1000, { maxWait: 5000 })

const editorSetup = useEditor({
	content: modelValue.value,
	extensions: [
		Document,
		Heading,
		Paragraph,
		Text,
		Link,
		Bold,
		BulletList,
		ListItem,
		TaskItem,
		TaskList,
	],
	async onUpdate({ editor }) {
		const html = editor.getHTML()
		if (modelValue.value !== html) {
			modelValue.value = html
			await debouncedEditorSave()
		}
	},
})

watch(
	() => note.content,
	(content) => {
		if (editorSetup.value && content !== editorSetup.value.getHTML()) {
			editorSetup.value.commands.setContent(content, false)
		}
	},
)

onUnmounted(() => {
	editorSetup.value?.destroy()
})
</script>

<template>
	<EditorContent
		class="
		prose
		prose-echo
		prose-h1:text-[22px]
		prose-h1:font-semibold
		prose-h2:text-xl
		prose-h2:font-semibold
		prose-h3:text-xl
		prose-h3:font-semibold
		prose-p:text-xl
		prose-p:my-0
		prose-li:my-0
		prose-ul:mt-0
		!max-w-none
		flex
		flex-1
		[&>.tiptap]:flex-1
		[&>.tiptap]:w-full
		"
		:editor="editorSetup"
	/>
</template>

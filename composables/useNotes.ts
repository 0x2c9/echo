import { defineStore } from 'pinia'
import type { INote } from '~/types'

export const useNotes = defineStore('Notes', () => {
	const supaClient = useSupabase()
	const notes = ref<INote[]>([])

	const dailyNotes = computed<Record<string, INote>>(() => {
		const dailyNotes: Record<string, INote> = {}
		notes.value.forEach((note) => {
			if (!note.date) {
				return
			}
			dailyNotes[note.date] = note
		})
		return dailyNotes
	})

	const singleNotes = computed<INote[]>(() => {
		return notes.value.filter((note) => {
			return !note.date
		})
	})

	function getNoteByLink(link: string): INote | undefined {
		return notes.value.find((note) => {
			return note.link === link
		})
	}

	async function getNotes() {
		const response = await supaClient.from('notes').select()
		if (response.data?.length) {
			notes.value = response.data as INote[]
		}
	}

	async function upsertNote(note: INote | Partial<INote>, contentUpdateOnly: boolean = false): Promise<INote | undefined> {
		const authStore = useAuth()
		note.user_id = authStore.userId!
		if (!note.title) {
			return
		}
		const response = await supaClient.from('notes').upsert(note).select().single<INote>()
		if ((response.status === 200 || response.status === 201) && !contentUpdateOnly && response.data) {
			// replace the note in the array
			const index = notes.value.findIndex((n) => n.id === response.data?.id)
			if (index > -1) {
				notes.value[index] = response.data!
			} else {
				notes.value.push(response.data)
			}

			return response.data
		}
	}

	async function deleteNoteById(id: string) {
		const idx = notes.value.findIndex((note) => note.id === id)
		if (idx > -1) {
			notes.value.splice(idx, 1)
		}

		await supaClient.from('notes').delete().match({ id })
	}

	return {
		getNotes,
		upsertNote,
		getNoteByLink,
		deleteNoteById,
		dailyNotes,
		singleNotes,
	}
})

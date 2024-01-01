export interface INote {
	id: string
	title: string
	content: string
	link: string
	date?: string
	user_id: string
}

export interface INoteUnsaved {
	id?: string
	title: string
	content: string
	link: string
	date?: string
	user_id?: string
}

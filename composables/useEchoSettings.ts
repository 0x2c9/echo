import { defineStore } from 'pinia'

export const useEchoSettings = defineStore('Echo Settings', () => {
	const centeredMode = ref(false)
	const maxWidth = ref(800)

	return {
		maxWidth,
		centeredMode,
	}
})

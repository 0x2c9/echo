<script setup lang="ts">
const { size = '20', name = 'error' } = defineProps<{
	size?: string
	name: keyof typeof icons
}>()

const icons = useIcons()
</script>

<template>
	<Icon
		:name="icons[name]"
		:size="size"
	/>
</template>

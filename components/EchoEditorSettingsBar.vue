<script setup lang="ts">
const echoSettings = useEchoSettings()
</script>

<template>
	<div class="absolute z-50 inset-x-0 py-1 bg-background-primary/40 backdrop-blur-lg flex px-4">
		<div class="ml-auto">
			<button @click="echoSettings.centeredMode = !echoSettings.centeredMode">
				<BaseIcon name="center" />
			</button>
		</div>
	</div>
</template>

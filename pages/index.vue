<script setup lang="ts">
const authStore = useAuth()

const email = ref('')
const password = ref('')

async function onSubmit() {
	await authStore.signIn({
		email: email.value,
		password: password.value,
	})
}
</script>

<template>
	<div class="mx-auto mt-12 flex w-full max-w-7xl flex-col">
		<form
			class="flex flex-col space-y-4"
			@submit.prevent="onSubmit"
		>
			<input
				v-model="email"
				class="border-1 rounded-lg border border-white bg-transparent p-2 text-white"
				type="email"
				placeholder="email"
			>
			<input
				v-model="password"
				class="border-1 rounded-lg border border-white bg-transparent p-2 text-white"
				type="password"
				placeholder="password"
			>
			<button
				type="submit"
				class="rounded-lg bg-white p-2 font-semibold text-black"
			>
				login
			</button>
		</form>
	</div>
</template>

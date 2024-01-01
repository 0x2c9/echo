<template>
	<div
		id="__default-layout"
		class="flex h-full w-full flex-1 flex-col overflow-x-hidden"
	>
		<header class="relative flex items-center justify-center pt-12">
			<nav class="z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-4">
				<NuxtLink to="/">
					<Logo />
				</NuxtLink>
			</nav>
		</header>
		<main class="z-10 flex flex-1 px-4 ">
			<slot />
		</main>
	</div>
</template>

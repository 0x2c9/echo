<script setup lang="ts">
const {
	type = 'button',
	variant = 'primary',
	small = false,
	to,
	icon,
	iconRight,
} = defineProps<{
	type?: 'submit' | 'button' | 'reset'
	variant?: 'primary' | 'secondary'
	small?: boolean
	to?: string
	icon?: keyof typeof Icons
	iconRight?: keyof typeof Icons
}>()

const Icons = useIcons()

const slots = useSlots()

const computedButtonIconSize = computed(() => small ? '16' : '20')

const computedButtonType = computed(() => to ? undefined : type)
const iconOnly = computed(() => icon && !slots.default)

const component = computed(() => {
	if (to) {
		return resolveComponent('NuxtLink')
	}

	return 'button'
})

const computedButtonClasses = computed(() => {
	return {
		'bg-white text-neutral-950 before:ring-neutral-300/90 after:hover:bg-neutral-100/50 after:active:bg-neutral-200/40': variant === 'primary',
		'bg-neutral-800 text-white before:ring-neutral-950/90 after:hover:bg-neutral-900/10 after:active:bg-neutral-900/20': variant === 'secondary',
		'px-3 h-10 text-base': !small && !iconOnly.value,
		'px-2.5 h-8 text-sm': small && !iconOnly.value,

		'flex items-center justify-center rounded': iconOnly.value,
		'h-10 w-10': !small && iconOnly.value,
		'h-8 w-8': small && iconOnly.value,
	}
})
</script>

<template>
	<component
		:is="component"
		:to="to"
		:type="computedButtonType"
		:class="computedButtonClasses"
		class="
      relative
      inline-flex
      items-center
      rounded-full

      font-semibold
      shadow-[inset_0_1px_0_0_#ffffff1e]

      before:absolute
      before:inset-0
      before:rounded-full
      before:mix-blend-multiply
      before:shadow-sm
      before:ring-1

      after:hover:absolute
      after:hover:inset-0
      after:rounded-full
    "
	>
		<span class="relative z-10 m-auto flex items-center">
			<BaseIcon
				v-if="icon"
				:name="icon"
				:size="computedButtonIconSize"
			/>

			<span
				v-if="!iconOnly"
				:class="{
					'mx-1.5': icon && iconRight,
					'mr-1.5': !icon && iconRight,
					'ml-1.5': icon && !iconRight,
				}"
			>
				<slot />
			</span>
			<BaseIcon
				v-if="iconRight"
				:name="iconRight"
				:size="computedButtonIconSize"
			/>
		</span>
	</component>
</template>

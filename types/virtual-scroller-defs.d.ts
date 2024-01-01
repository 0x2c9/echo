// Type definitions for vue-virtual-scroller
// Project: https://github.com/Akryum/vue-virtual-scroller/
declare module 'vue-virtual-scroller' {
	import type { Component, ComponentOptions } from 'vue'
	import type Vue from 'vue'

	interface RecycleScrollerProps {
		items: any[]
		direction: 'vertical' | 'horizontal'
		itemSize: number
		gridItems: number
		itemSecondarySize: number
		minItemSize: number
		sizeField: string
		typeField: string
		keyField: string
		pageMode: boolean
		prerender: number
		buffer: number
		emitUpdate: boolean
		updateInterval: number
		listClass: string
		itemClass: string
		listTag: string
		itemTag: string
	}

	interface RecycleScrollerEvents {
		resize(): void
		visible(): void
		hidden(): void
		scrollStart(): void
		scrollEnd(): void
	}

	interface DynamicScrollerProps extends RecycleScrollerProps {
	}

	interface DynamicScrollerEvents extends RecycleScrollerEvents {
	}

	interface DynamicScrollerItemProps {
		item: any
		active: boolean
		sizeDependencies: any[]
		watchData: boolean
		tag: string
		emitResize: boolean
	}

	export const RecycleScroller: Component<RecycleScrollerProps, any, any, any, RecycleScrollerEvents>
	export const DynamicScroller: Component<DynamicScrollerProps, any, any, any, DynamicScrollerEvents>
	export const DynamicScrollerItem: Component<DynamicScrollerItemProps, any, any, any>

	export function IdState(options?: {
		idProp?: (vm: any) => any
	}): ComponentOptions<typeof Vue> | typeof Vue
}

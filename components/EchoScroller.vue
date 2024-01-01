<script setup lang="ts">
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import type { INote, INoteUnsaved } from '~/types'

const { savedNotes } = defineProps<{
	savedNotes: Record<string, INote>
}>()

const savedNotesLength = computed(() => {
	if (!savedNotes) {
		return 0
	}
	return Object.keys(savedNotes).length
})

dayjs.extend(isToday)
dayjs.extend(advancedFormat)
interface DynamicScrollerItemProps {
	item: INote
	index: number
	active: boolean
}

// TODO: figure out how to type this properly
interface ScrollerElement extends HTMLElement {
	scrollToItem: (id: number) => void
}

const modelValue = defineModel<dayjs.Dayjs>()
const windowHeight = (window.innerHeight / 100) * 60
const scrollDirection = ref<'up' | 'down'>('down')
const scrollerEl = ref<ScrollerElement>()

const todayId = ref(0)
const dailyNoteItems = ref<INoteUnsaved[]>([])

const { directions, arrivedState } = useScroll(scrollerEl, {
	offset: { // TODO: make some calculations to get a better offset value
		top: 300,
		bottom: 300,
	},
	onScroll() {
		if (directions.bottom && scrollDirection.value === 'up') {
			scrollDirection.value = 'down'
		} else if (directions.top && scrollDirection.value === 'down') {
			scrollDirection.value = 'up'
		}
	},
})

function loadCurrentDates(d = dayjs()) {
	const initialPastDate = d.subtract(10, 'day')
	const initialLoadedDays = 20

	const currentItems: INoteUnsaved[] = []

	for (let i = 0; i < initialLoadedDays; i++) {
		const currentDate = initialPastDate.add(i, 'day')
		const isToday = currentDate.isToday()
		if (isToday) {
			todayId.value = i
		}

		const note = savedNotes[currentDate.format('YYYY-MM-DD')]
		if (note) {
			currentItems.push(note)
		} else {
			currentItems.push({
				date: currentDate.format('YYYY-MM-DD'),
				link: currentDate.format('YYYY-MM-DD'),
				title: dayjs(currentDate).format('ddd, Do MMMM, YYYY'),
				content: '',
			})
		}
	}
	dailyNoteItems.value = currentItems
	if (scrollerEl.value) {
		scrollerEl.value.scrollToItem(10)
	}
}

function loadPastDates() {
	const firstDate = dailyNoteItems.value[0].date
	const firstDateDayjs = dayjs(firstDate)

	for (let i = 1; i <= 10; i++) {
		const currentDate = firstDateDayjs.subtract(i, 'day')
		const note = savedNotes[currentDate.format('YYYY-MM-DD')]

		if (note) {
			dailyNoteItems.value.unshift(note)
		} else {
			dailyNoteItems.value.unshift({
				date: currentDate.format('YYYY-MM-DD'),
				link: currentDate.format('YYYY-MM-DD'),
				title: dayjs(currentDate).format('ddd, Do MMMM, YYYY'),
				content: '',
			})
		}
	}

	if (scrollerEl.value) {
		scrollerEl.value.scrollToItem(10)
	}
}

function loadFutureDates() {
	const lastDate = dailyNoteItems.value[dailyNoteItems.value.length - 1].date
	const lastDateDayjs = dayjs(lastDate)

	for (let i = 1; i <= 10; i++) {
		const currentDate = lastDateDayjs.add(i, 'day')
		const note = savedNotes[currentDate.format('YYYY-MM-DD')]

		if (note) {
			dailyNoteItems.value.push(note)
		} else {
			dailyNoteItems.value.push({
				date: currentDate.format('YYYY-MM-DD'),
				link: currentDate.format('YYYY-MM-DD'),
				title: dayjs(currentDate).format('ddd, Do MMMM, YYYY'),
				content: '',
			})
		}
	}
}

watch(
	() => arrivedState.top,
	(val) => {
		if (val) {
			loadPastDates()
		}
	},
)

watch(
	() => arrivedState.bottom,
	(val) => {
		if (val) {
			loadFutureDates()
		}
	},
)

watch(
	() => modelValue.value,
	(val) => {
		if (dayjs.isDayjs(val)) {
			loadCurrentDates(val)
		}
	},
)

watch(
	() => savedNotesLength.value,
	() => {
		loadCurrentDates()
	},
	{
		immediate: true,
	},
)

function onVisible() {
	if (!scrollerEl.value || !todayId.value)
		return

	scrollerEl.value.scrollToItem(todayId.value)
}
</script>

<template>
	<DynamicScroller
		ref="scrollerEl"
		:items="dailyNoteItems"
		:min-item-size="windowHeight"
		key-field="date"
		class="w-full"
		list-class="px-8 divide-y divide-neutral-900"
		@visible="onVisible"
	>
		<template #default="{ item, index, active }: DynamicScrollerItemProps">
			<DynamicScrollerItem
				:key="item.date"
				class="flex h-full min-h-[60vh] px-4 py-12"
				:item=" item "
				:active=" active "
				:size-dependencies="
					[
						item.content,
					]
				"
				:data-index=" index "
			>
				<div class="flex flex-col w-full">
					<h1 class="text-[22px] font-semibold mb-8 ">
						{{ item.title }}
					</h1>
					<EchoEditor
						v-model="item.content"
						:note="item"
					/>
				</div>
			</DynamicScrollerItem>
		</template>
	</DynamicScroller>
</template>

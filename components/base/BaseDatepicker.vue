<script setup lang="ts">
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/de'

const { disableFutureDates = false } = defineProps<{
	disableFutureDates?: boolean
}>()

dayjs.extend(weekday)

interface IDay {
	date: Dayjs
	dateOfMonth: number
	isDisabled: boolean
	type: 'past' | 'future' | 'current'
	computedClass?: object
}

const modelValue = defineModel<dayjs.Dayjs>()

const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const date = ref(dayjs(modelValue.value))
const initialDate = ref(dayjs(modelValue.value))

const month = computed(() => date.value.month())
const year = computed(() => date.value.year())

function setDate(day: IDay) {
	if (day.type === 'future' && disableFutureDates)
		return

	initialDate.value = day.date
	modelValue.value = day.date
}

function previousMonth() {
	date.value = date.value.subtract(1, 'month')
}

function nextMonth() {
	date.value = date.value.add(1, 'month')
}

function resetDate() {
	date.value = dayjs()
}

const days = computed(() => {
	const firstDayOfMonthIndex = date.value.startOf('month').weekday() - 1
	const lastDayOfPreviousMonth = date.value.subtract(1, 'month').daysInMonth()

	const out: IDay[] = []

	for (let i = 0; i < 42; i++) {
		if (i < firstDayOfMonthIndex) {
			const dateOfMonth = lastDayOfPreviousMonth - firstDayOfMonthIndex + i + 1
			const pastDate = date.value.subtract(1, 'month').date(dateOfMonth)
			out.push({
				date: pastDate,
				dateOfMonth, // index
				isDisabled: false,
				type: 'past',
			})

			continue
		}

		if (i >= firstDayOfMonthIndex + date.value.daysInMonth()) {
			const dateOfMonth = i - firstDayOfMonthIndex - date.value.daysInMonth() + 1
			const futureDate = date.value.add(1, 'month').date(dateOfMonth)
			out.push({
				date: futureDate,
				dateOfMonth,
				isDisabled: disableFutureDates,
				type: 'future',
			})
			continue
		}

		const dateOfMonth = i - firstDayOfMonthIndex + 1
		const currentDate = date.value.date(dateOfMonth)
		out.push({
			date: currentDate,
			dateOfMonth,
			isDisabled: false,
			type: 'current',
		})
	}

	for (const day of out) {
		day.computedClass = getDayClass(day)
	}

	return out
})

function getDayClass(dayObj: IDay) {
	const isSelected = dayObj.date.isSame(initialDate.value, 'day')
	const isToday = dayObj.date.isSame(dayjs(), 'day')

	return {
		'm-[6px] flex aspect-square select-none items-center justify-center rounded-full': true,
		'text-white/30': dayObj.type === 'past' || dayObj.type === 'future',
		'bg-primary text-neutral-950': isSelected,
		'border-2 border-primary': isToday,
		'cursor-default text-white/50': dayObj.isDisabled,
		'cursor-pointer': !dayObj.isDisabled,
		'hover:bg-neutral-500': !isSelected && !isToday && !dayObj.isDisabled,
	}
}
</script>

<template>
	<div class="rounded-lg p-4 bg-neutral-900 border border-neutral-700/40">
		<div class="mx-auto min-w-[300px] max-w-[420px]">
			<div class="mb-4 flex items-center justify-between pl-[10px] pr-2">
				<h1 class="tracking-wide">
					{{ monthLabels[month] }} - {{ year }}
				</h1>
				<div class="flex items-center space-x-5 text-neutral-200 ">
					<button
						class="hover:text-white"
						@click="previousMonth"
					>
						<BaseIcon
							name="chevron-left"
							size="24"
						/>
					</button>
					<button
						class="hover:text-white"
						@click="resetDate"
					>
						<BaseIcon
							name="today"
							size="20"
						/>
					</button>
					<button
						class="hover:text-white"
						@click="nextMonth"
					>
						<BaseIcon
							name="chevron-right"
							size="24"
						/>
					</button>
				</div>
			</div>
			<div class="border-prm grid grid-cols-7 border-b border-neutral-50/20 pb-2">
				<div
					v-for="dayLabel in dayLabels"
					:key="dayLabel"
					class="text-neutral text-center text-sm"
				>
					{{ dayLabel.slice(0, 2) }}
				</div>
			</div>
			<div class="grid grid-cols-7">
				<div
					v-for="day in days"
					:key="`${day.dateOfMonth} + -${day.type}`"
					:class="day.computedClass"
					@click="setDate(day)"
				>
					{{ day.dateOfMonth }}
				</div>
			</div>
		</div>
	</div>
</template>

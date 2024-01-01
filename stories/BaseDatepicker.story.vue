<script setup lang="ts">
import dayjs from 'dayjs'

const date3 = ref(dayjs())
const date4 = ref(dayjs())
</script>

<template>
	<Variant title="Datepicker">
		<BaseDatepicker v-model="date3" />
		{{ date3.format('DD.MM.YYYY') }}
	</Variant>
	<Variant title="Datepicker - Future Dates Disabled">
		<BaseDatepicker
			v-model="date4"
			:disable-future-dates="true"
		/>
		{{ date4.format('DD.MM.YYYY') }}
	</Variant>
</template>

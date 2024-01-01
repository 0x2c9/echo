/* eslint-disable ts/no-unsafe-call */
/* eslint-disable ts/no-unsafe-assignment */
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
	content: [
		'./stories/**/*.vue',
		'./components/**/*.vue',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./composables/**/*.ts',
		'./app.vue',
	],
	theme: {
		fontFamily: {
			inter: ['Inter', 'monospace'],
		},
		extend: {
			colors: {
				'background-primary': '#100F0F',
				'background-secondary': '#1C1B1B',
				'primary': '#CECDC3',
				'muted': '#878580',
				'faint': '#55524E',
				'action': '#62aba4',
			},
			typography: ({ theme }) => ({
				echo: {
					css: {
						'--tw-prose-body': theme('colors.primary'),
						'--tw-prose-headings': theme('colors.primary'),
						'--tw-prose-counters': theme('colors.primary'),
						'--tw-prose-bullets': theme('colors.faint'),
						'--tw-prose-bold': theme('colors.primary'),
						'--tw-prose-links': theme('colors.action'),
						// '--tw-prose-lead': theme(''),
						// '--tw-prose-hr': theme(''),
						// '--tw-prose-quotes': theme(''),
						// '--tw-prose-quote-borders': theme(''),
						// '--tw-prose-captions': theme(''),
						// '--tw-prose-code': theme(''),
						// '--tw-prose-pre-code': theme(''),
						// '--tw-prose-pre-bg': theme(''),
						// '--tw-prose-th-borders': theme(''),
						// '--tw-prose-td-borders': theme(''),

					},
				},
			}),

		},
	},
	corePlugins: {
		textOpacity: false,
		backgroundOpacity: false,
		borderOpacity: false,
	},
	plugins: [
		typography,
	],
} satisfies Partial<Config>

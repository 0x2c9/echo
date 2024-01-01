export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1.0, user-scalable=0',
			title: 'echo',
			meta: [
				{
					name: 'description',
					content: 'echo',
				},
			],
			link: [
				{
					rel: 'icon',
					type: 'image/svg+xml',
					href: './favicon.svg',
				},
			],
		},
		pageTransition: {
			name: 'fade',
			mode: 'out-in',
		},
		layoutTransition: {
			name: 'fade',
			mode: 'out-in',
		},
	},
	css: [
		'@/assets/fonts/inter.css',
		'@/assets/styles.css',
		'vue-virtual-scroller/dist/vue-virtual-scroller.css',
	],
	modules: [
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'@nuxt/devtools',
		'nuxt-icon',
		'nuxt-fable',
	],
	postcss: {
		plugins: {
			tailwindcss: {},
		},
	},
	runtimeConfig: {
		public: {
			supabase: {
				url: '',
				key: '',
			},
		},
	},
	ssr: false,
	typescript: {
		strict: true,
		shim: false,
	},

	vite: {
		vue: {
			script: {
				defineModel: true,
				propsDestructure: true,
			},
		},
	},
	devtools: {
		enabled: false,
	},
})

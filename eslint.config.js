import antfu from '@antfu/eslint-config'

export default antfu(
	{
		stylistic: {
			tab: 2, // 4, or 'tab'
			quotes: 'single', // or 'double',
			indent: 'tab', // or 'space',
		},
		typescript: {
			tsconfigPath: 'tsconfig.json',
			parserOptions: {
				extraFileExtensions: ['.vue'],
			},
		},
		vue: true,
		jsonc: true,
		yml: false,
		overrides: {
			vue: {
				'vue/max-attributes-per-line': [
					'error',
					{
						singleline: {
							max: 1,
						},
						multiline: {
							max: 1,
						},
					},
				],
			},
			typescript: {
				'ts/no-misused-promises': [
					'error',
					{
						checksVoidReturn: false,
					},
				],
			},
		},
	},
	{
		rules: {
			'curly': 'off',
			'no-console': 'off',
			'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
			'style/arrow-parens': ['error', 'always'],
		},
	},

)

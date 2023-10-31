const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte-blocks/**/*.{html,js,svelte,ts}'],

	plugins: [
		require('flowbite-typography'),
		require('flowbite/plugin'),
		require('tailwindcss-animated')
	],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {

				primary: { // This color is actually called "astronaut"! https://icolorpalette.com/color/astronaut-blue
					50: '#8688D5',
					100: '#7779CF',
					200: '#595BC5',
					300: '#4042B5',
					400: '#353797',
					500: '#2A2C79',
					600: '#25266A',
					700: '#20215B',
					800: '#1B1B4B',
					900: '#15163C',
					950: '#131335'
				},
				'secondary': {
					'50': '#faf8fc',
					'100': '#f3eef9',
					'200': '#e9e0f4',
					'300': '#d8c7eb',
					'400': '#bfa3dd',
					'500': '#aa86d0',
					'600': '#8f62bb',
					'700': '#794ea2',
					'800': '#664485',
					'900': '#54386b',
					'950': '#371f4c',
				},
				'accent': {
					'50': '#f1faf9',
					'100': '#dbf2f1',
					'200': '#bce5e3',
					'300': '#86d0ce',
					'400': '#57b9b8',
					'500': '#3c9e9e',
					'600': '#348286',
					'700': '#306a6e',
					'800': '#2e585c',
					'900': '#2a4a4f',
					'950': '#183034',
				},
				'brown': {
					50: '#fdf8f6',
					100: '#f2e8e5',
					200: '#eaddd7',
					300: '#e0cec7',
					400: '#d2bab0',
					500: '#bfa094',
					600: '#a18072',
					700: '#977669',
					800: '#846358',
					900: '#43302b',
				},
			},
			fontFamily: {
				'body': [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'system-ui',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji'
				],
				'sans': [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'system-ui',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'Noto Sans',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji'
				]
			},
			typography: {
				DEFAULT: {
					css: {
						code: {
							color: 'var(--tw-prose-code)',
							fontWeight: '600',
							backgroundColor: '#24292e',
							color: 'white',
							padding: '0.25rem',
						},
						'code::before': {
							content: '',
						},
						'code::after': {
							content: '',
						},
					}
				}
			},
			boxShadow: {
				'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
				'4xl': '0 50px 100px -20px rgba(0, 0, 0, 0.4)',
				'5xl': '0 75px 150px -25px rgba(0, 0, 0, 0.5)',
			},
		},
	},
}

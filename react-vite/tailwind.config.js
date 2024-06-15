/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: '#131234',
				'background-dark': '#252525',
				primary: {
					blue: '#406DE4',
					purple: '#907CE2',
				},
				accent: {
					blue: '#1A9FB5',
					purple: '#A276E9',
				}
			},
		},
	},
	plugins: [],
};

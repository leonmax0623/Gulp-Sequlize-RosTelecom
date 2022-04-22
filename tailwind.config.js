const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
		minWidth: {
			'20': '20rem',
			'2-5': '2.5rem'
		},
		maxWidth: {
			'20': '20rem'
		},
    extend: {
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
      },
      colors: {
        trueGray: colors.trueGray,
        custom: {
          blue: '#293862',
          gray: {
            '1': '#EFEFF0',
            '2': '#8B898C',
            '3': '#F7F6F7',
            '4': '#4B4A50',
            '5': '#FCFCFC',
            '6': '#F0F0F0',
            '7': '#DEDCE0',
            '8': '#79787A',
						'9': '#4D5C86',
            '10': '#9CAAD1',
						'11': '#EFEFF0'
          },
					black: {
						'0': '#100D23'
					},
          red: {
            '2': '#FF4F12',
          },
          brand: {
            '1': '#7800FF',
						'2': '#7700FF',
						'3': '#293862',
            '4': '#F2994A',
            '5': '#FF4F12',
          }
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('tailwindcss-font-inter')()]
}

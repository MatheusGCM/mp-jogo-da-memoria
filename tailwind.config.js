/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gradient-initial': '#FD902A',
        'gradient-final': '#821B12',
        'input-background': '#D9D9D9',
        'button-background': '#FFA608',
        'text-button': '#FF6D00',
        'text-placeholder': '#898989',
        'border-color': '#FF6D00',
      },
      fontFamily: {
        normal: ['Roboto', 'sans-serif'],
        title: ['Kavoon', 'serif'],
      },
      transformOrigin: {
        center: 'center',
      },
    },
  },
  plugins: [],
}

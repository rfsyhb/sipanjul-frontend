/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#242424',
        btn: '#1a1a1a',
        text: '#EAE9E3',
        inactiveBtn: '#212121',
        activeBtn: '#F0AB26',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};


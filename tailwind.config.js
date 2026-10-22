/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: { extend: { colors: { cream: '#FFF8EC', orange: '#EF6C00', leaf: '#176B3A', ink: '#172018', sand: '#F2E6D3', peach: '#FFE0C2' } } },
  plugins: []
};

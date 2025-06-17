// tailwind.config.js
module.exports = {
    theme: {
    extend: {
      colors: {
        cream: '#fdf6f0',        // tom claro, elegante
        rose: '#f43f5e',         // rosa vibrante
        wine: '#5e1f3d',         // vinho principal
        wineDark: '#3e1428',     // vinho escuro
      },
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js",
  ],
  
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),  
    require('tailwind-scrollbar-hide'),
    require("@tailwindcss/aspect-ratio"),
  ],
};

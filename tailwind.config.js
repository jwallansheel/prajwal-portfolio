/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all .js/.jsx/.ts/.tsx files in the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
.fade-enter {
  @apply opacity-0;
}
.fade-enter-active {
  @apply opacity-100 transition-opacity duration-300;
}
.fade-exit {
  @apply opacity-100;
}
.fade-exit-active {
  @apply opacity-0 transition-opacity duration-300;
}



// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('daisyui')
    ],
    daisyui: {
      themes: ["lemonade", "black", "wireframe"], // Ou adicione outros temas que quiser permitir
    }
  }
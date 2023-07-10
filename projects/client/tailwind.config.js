/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "science-blue": {
        50: "#ecf9ff",
        100: "#d4f1ff",
        200: "#b3e8ff",
        300: "#7fdcff",
        400: "#43c5ff",
        500: "#18a4ff",
        600: "#0084ff",
        700: "#006bfb",
        800: "#035ad3",
        900: "#0a4b9e",
        950: "#0c2e5f",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Hind Guntur", ...defaultTheme.fontFamily.sans],
        logo: ["Caprasimo", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
});

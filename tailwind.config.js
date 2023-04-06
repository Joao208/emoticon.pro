const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "accents-6": "#999999",
        "accents-1": "#111111",
        "accents-2": "#333333",
        "geist-success-dark": "#0761D1",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", ...fontFamily.sans],
      },
      width: {
        "9/10": "90%",
      },
      borderRadius: {
        xl: "50px",
      },
    },
  },
  plugins: [],
};

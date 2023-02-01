/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          border: "#9E9E9E",
          light: "#CDCDCD",
        },
        blue: {
          dark: "#014258",
        },
        green: "#3ba26b",
        danger: "#F5321F",
      },
    },
  },
  plugins: [],
};

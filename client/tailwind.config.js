/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      main: ["Poppins", "sans-serif"],
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#EE3131",
      },
      colors: {
        main: "#EE3131",
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};

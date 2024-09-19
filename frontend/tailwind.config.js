/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A594F9",
        second: "#CDC1FF",
        tx: "#161D6F",
        ty: "#E5D9F2",
      },
    },
  },
  plugins: [],
};

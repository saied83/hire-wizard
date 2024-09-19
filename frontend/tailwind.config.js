import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16325B",
        second: "#CDC1FF",
        bgc: "#F5EFFF",
        bgl: "#E5D9F2",
      },
    },
  },
  plugins: [daisyui],
};

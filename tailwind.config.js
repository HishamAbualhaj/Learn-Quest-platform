/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#12131A",
        lightDark: "#1d1e26",
        darkText: "#B6BEC9",
        lightText: "rgba(0, 9, 51, 0.65)",
        login: "#292B33",
        btn: "#4c64D9",
        lightBtn: "#A3B2FF",
      },
    },
  },
  plugins: [],
};

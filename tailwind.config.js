/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // dark mode
        dark: "#12131A",
        lightDark: "#1D1E26",
        textDark: "rgba(255, 255, 255, 0.78)",
        loginDark: "#292B33",
        borderDark: "rgba(255, 255, 255, 0.12)",
        hoverDark: "rgba(255, 255, 255, 0.06)",
        // light mode
        lightText: "rgba(0, 9, 51, 0.65)",
        btn: "#4c64D9",
        lightBtn: "#A3B2FF",
      },
      fontFamily: {
        'terminal' : ['terminal']
      }
    },
  },
  plugins: [],
  safelist: [
    "bg-green-500",
    "bg-red-500",
    "bg-green-400",
    "bg-red-400",
    "bg-blue-400/40",
    "bg-gray-700",
  ],
};

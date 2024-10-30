/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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
        borderLight: "rgba(0, 17, 102, 0.1)",
        lightText: "rgba(0, 6, 38, 0.9)",
        btn: "#4c64D9",
        lightBtn: "#A3B2FF",
        hoverLight: "rgba(0, 21, 128, 0.04)",
      },
      fontFamily: {
        terminal: ["terminal"],
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-green-500",
    "bg-red-500",
    "bg-green-400",
    "bg-red-400",
    "bg-red-400/40",
    "bg-blue-400/40",
    "bg-gray-700",
  ],
};

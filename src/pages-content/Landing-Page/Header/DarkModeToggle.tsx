"use client";
import { Theme } from "@/context/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
const DarkModeToggle = () => {
  const { theme, setTheme } = useContext(Theme) ?? {
    theme: "",
    setTheme: () => {},
  };

  return (
    <button
      data-theme-toggle=""
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
    >
      <FontAwesomeIcon
        className="cursor-pointer w-7 h-7 hover:bg-gray-600 hover:text-white rounded-md p-2"
        icon={theme === "dark" ? faSun : faMoon}
      />
    </button>
  );
};

export default DarkModeToggle;

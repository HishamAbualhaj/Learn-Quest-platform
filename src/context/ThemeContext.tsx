"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const Theme = createContext<{
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
} | null>(null);
function ThemeContext({ children }) {
  const [theme, setThemeData] = useState("dark");

  useEffect(() => {
    let savedTheme = "dark";
    try {
      savedTheme = localStorage.getItem("theme") === "light" ? "light" : "dark";
    } catch {
      /* Storage may be unavailable. */
    }
    setThemeData(savedTheme);
    changeTheme(savedTheme);
  }, []);

  const setTheme: Dispatch<SetStateAction<string>> = (value) => {
    const nextTheme = typeof value === "function" ? value(theme) : value;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      /* Theme still works without persistence. */
    }
    setThemeData(nextTheme);
    changeTheme(nextTheme);
  };

  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
}
function changeTheme(theme: string) {
  document
    .querySelector("html")
    ?.classList.remove(`${theme === "dark" ? "light" : "dark"}`);

  document.querySelector("html")?.classList.add(theme);
}
export default ThemeContext;

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
  const [theme, setThemeData] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  function setTheme(theme) {
    localStorage.setItem("theme", theme);
    setThemeData(theme);
    changeTheme(theme);
  }

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

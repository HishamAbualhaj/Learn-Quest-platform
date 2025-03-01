import React, { createContext, useEffect, useState } from "react";

export const Theme = createContext();
function ThemeContext({ children, themeValue = "dark" }) {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    setTheme(themeValue);
  }, [themeValue]);

  useEffect(() => {
    setTheme(theme)
  }, [theme]);
  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
}

export default ThemeContext;

import React, { createContext, useEffect, useState } from "react";

export const Theme = createContext();
function ThemeContext({ children }) {
  const [theme, setThemeData] = useState(
    localStorage.getItem("theme") || "dark"
  );

  function setTheme(theme) {
    localStorage.setItem("theme", theme);
    setThemeData(theme);
  }


  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
}

export default ThemeContext;

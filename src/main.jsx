import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeContext from "./context/ThemeContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContext>
      <App />
    </ThemeContext>
  </StrictMode>
);

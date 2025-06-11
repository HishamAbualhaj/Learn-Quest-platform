import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThemeContext from "./context/ThemeContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContext>
        <App />
      </ThemeContext>
    </QueryClientProvider>
  </StrictMode>
);

const BACKEND_URL_PRODUCTION =
  import.meta.env.VITE_BACKEND_URL_PRODUCTION || "http://localhost:3002";
const BACKEND_URL_DEVELOPMENT =
  import.meta.env.VITE_BACKEND_URL_DEVELOPMENT || "http://localhost:3002";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? BACKEND_URL_PRODUCTION.replace(/\/$/, "")
    : BACKEND_URL_DEVELOPMENT;

const BACKEND_WEBSOCKET_DEVELOPMENT = import.meta.env
  .VITE_BACKEND_WEBSOCKET_DEVELOPMENT;

const BACKEND_WEBSOCKET_PRODUCTION = import.meta.env
  .VITE_BACKEND_WEBSOCKET_PRODUCTION;

const API_WEB_SOCKET =
  process.env.NODE_ENV === "production"
    ? BACKEND_WEBSOCKET_PRODUCTION.replace(/\/$/, "")
    : BACKEND_WEBSOCKET_DEVELOPMENT;
export { API_WEB_SOCKET };
export default API_BASE_URL;

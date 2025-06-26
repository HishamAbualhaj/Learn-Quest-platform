const BACKEND_URL_PRODUCTION =
  import.meta.env.VITE_BACKEND_URL_PRODUCTION || "http://localhost:3002";
const BACKEND_URL_DEVELOPMENT =
  import.meta.env.VITE_BACKEND_URL_DEVELOPMENT || "http://localhost:3002";
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? BACKEND_URL_PRODUCTION.replace(/\/$/, "")
    : BACKEND_URL_DEVELOPMENT;

export default API_BASE_URL;

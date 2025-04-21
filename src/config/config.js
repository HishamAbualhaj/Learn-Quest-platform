const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-domain.com"
    : "http://localhost:3002";

export default API_BASE_URL;

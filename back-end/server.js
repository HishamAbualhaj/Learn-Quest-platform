import http from "http";
import { signup } from "./api/auth/signup.js";
const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow requests from React app
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // Allow specific methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

  if (req.method === "OPTIONS") {
    // Handle preflight requests
    res.writeHead(204); // No Content
    res.end();
    return;
  }

  if (req.url === "/signup" && req.method === "POST") {
    signup(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

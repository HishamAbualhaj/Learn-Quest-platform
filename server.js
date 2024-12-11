import http from "http";
import fs from "http";
import path from "http";

// Port number
const PORT = 5173;

// Server function
const server = http.createServer((req, res) => {
  const { url, method } = req;

  // Routes
  if (url === "/login" && method === "POST") {
    let body = "";

    // Collect request body data
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const userData = JSON.parse(body);

      // Login logic (placeholder)
      if (userData.username === "admin" && userData.password === "1234") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Login successful" }));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid credentials" }));
      }
    });
  } else if (url === "/signup" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newUser = JSON.parse(body);

      // Save the user (placeholder)
      fs.appendFileSync(
        path.join(__dirname, "users.txt"),
        JSON.stringify(newUser) + "\n"
      );

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User registered successfully" }));
    });
  } else if (url === "/add-course" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newCourse = JSON.parse(body);

      // Save the course (placeholder)
      fs.appendFileSync(
        path.join(__dirname, "courses.txt"),
        JSON.stringify(newCourse) + "\n"
      );

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Course added successfully" }));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

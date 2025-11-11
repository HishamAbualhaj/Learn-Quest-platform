import { updateUserStatus } from "../api/auth/login.js";
import handleResponse from "./handleResponse.js";
import connection from "../config/db.js";
import crypto from "crypto";
async function handleSession(user_id, res, isGoogle = false) {
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";

  try {
    // Handling session storage at database
    const generateSessionId = () => crypto.randomBytes(8).toString("hex");
    // Generating random session id
    const sessionId = generateSessionId();
    const expires = new Date(Date.now() + 3600000 * 24); // 1 day

    const query =
      "INSERT INTO session (session_id, user_id, expires_at) VALUES (?, ?, ?)";
    const result = await connection
      .promise()
      .query(query, [sessionId, user_id, expires]);
    const [data] = result;
    await updateUserStatus(user_id);

    if (data.affectedRows) {
      if (isGoogle) {
        const isProd = process.env.NODE_ENV === "production";
        res.writeHead(200, {
          "Content-Type": "text/html",
          "Set-Cookie": `session_id=${sessionId}; HttpOnly; Path=/; Max-Age=86400; ${
            isProd
              ? `SameSite=None; Secure; Domain=${frontendURL.replace(
                  /^https?:\/\//,
                  ""
                )}`
              : "SameSite=Lax;"
          }`,
        });

        res.end(`
        <html>
          <head>
            <script>
              // Redirect to React route
            window.location.href = '${frontendURL}/';
            </script>
          </head>
          <style>
          @keyframes syncPuls {
              0%, 100% { opacity: 0.9; }
              50% { opacity: 0.4; }
            }
          </style>
          <body style="
              height: calc(100vh - 26px);
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #12131A;
              color: #a66adc;
              font-family: monospace;
              ">
            <div style="
              font-size: 22px;
              font-weight: bold;
              animation: syncPuls 1.5s infinite ease-in-out;
            ">Redirecting...</div></body>
        </html>
      `);
      } else {
        const isProd = process.env.NODE_ENV === "production";
        res.writeHead(200, {
          "Content-Type": "application/json",
          "Set-Cookie": `session_id=${sessionId}; HttpOnly; Path=/; Max-Age=86400; ${
            isProd
              ? `SameSite=None; Secure; Domain=${frontendURL.replace(
                  /^https?:\/\//,
                  ""
                )}`
              : "SameSite=Lax;"
          }`,
        });
        res.end(JSON.stringify({ status: true, data: "Logined In ... " }));
      }
    } else {
      handleResponse(
        res,
        null,
        "Error setting cookies : ",
        null,
        500,
        null,
        "Error to set cookie"
      );
    }
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error Inserting sesssion data : ",
      null,
      500,
      null,
      "Error to Insert session"
    );
    return error;
  }
}
export default handleSession;

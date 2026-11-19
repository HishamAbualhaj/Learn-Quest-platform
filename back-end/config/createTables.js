import { readFile } from "node:fs/promises";
import connection from "./db.js";

try {
  const schema = await readFile(new URL("../sql/schema.sql", import.meta.url), "utf8");
  // schema.sql contains only comments, SET NAMES, and CREATE TABLE statements.
  for (const statement of schema.split(";").map((sql) => sql.trim()).filter(Boolean)) {
    await connection.promise().query(statement);
  }
  console.log("Database tables are ready. Existing tables and data were preserved.");
} catch (error) {
  console.error("Database initialization failed:", error);
  process.exitCode = 1;
} finally {
  await connection.promise().end();
}

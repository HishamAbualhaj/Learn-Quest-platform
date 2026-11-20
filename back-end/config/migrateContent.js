import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { readFile } from "node:fs/promises";
dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ quiet: true });
let db;
try {
  db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectTimeout: 10000,
    ...(process.env.DB_SSL === "true"
      ? {
          ssl: {
            rejectUnauthorized: true,
            ...(process.env.DB_SSL_CA
              ? { ca: await readFile(process.env.DB_SSL_CA, "utf8") }
              : {}),
          },
        }
      : {}),
  });
  for (const table of ["courses", "blog"]) {
    const [columns] = await db.query(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=?",
      [table],
    );
    if (!columns.length) throw new Error("MISSING_TABLE");
    const names = new Set(columns.map((c) => c.COLUMN_NAME));
    if (!names.has("published"))
      await db.query(
        `ALTER TABLE ${table} ADD published TINYINT(1) NOT NULL DEFAULT 1`,
      );
    if (!names.has("featured"))
      await db.query(
        `ALTER TABLE ${table} ADD featured TINYINT(1) NOT NULL DEFAULT 0`,
      );
    await db.query(`ALTER TABLE ${table} ALTER COLUMN published SET DEFAULT 0`);
    const [checks] = await db.query(
      "SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=? AND CONSTRAINT_NAME=?",
      [table, `chk_${table}_publication`],
    );
    if (!checks.length)
      await db.query(
        `ALTER TABLE ${table} ADD CONSTRAINT chk_${table}_publication CHECK (published IN (0,1) AND featured IN (0,1) AND featured <= published)`,
      );
  }
  const schema = await readFile(
    new URL("../sql/content-tables.sql", import.meta.url),
    "utf8",
  );
  for (const statement of schema
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean))
    await db.query(statement);
  const defaults = JSON.parse(
    await readFile(
      new URL("../sql/landing-defaults.json", import.meta.url),
      "utf8",
    ),
  );
  await db.beginTransaction();
  const [seeded] = await db.query(
    "SELECT migration_id FROM content_migrations WHERE migration_id='landing-defaults-v1'",
  );
  if (!seeded.length) {
    for (const [i, [question, answer]] of defaults.faqs.entries())
      await db.query(
        "INSERT IGNORE INTO faqs (content_id,question,answer,sort_order,published,featured) VALUES (?,?,?,?,1,1)",
        [`landing-faq-${i + 1}`, question, answer, i],
      );
    for (const [i, [name, role, , quote]] of defaults.reviews.entries())
      await db.query(
        "INSERT IGNORE INTO testimonials (content_id,name,role,quote,sort_order,published,featured) VALUES (?,?,?,?,?,1,1)",
        [`landing-testimonial-${i + 1}`, name, role, quote, i],
      );
    await db.query(
      "INSERT INTO content_migrations (migration_id) VALUES ('landing-defaults-v1')",
    );
  }
  await db.commit();
  console.log(
    "Content migration complete. Existing items remain published; landing FAQs and testimonials are seeded.",
  );
} catch (error) {
  if (db) await db.rollback().catch(() => {});
  console.error("Content migration failed:", error.code || error.message);
  process.exitCode = 1;
} finally {
  if (db) await db.end();
}

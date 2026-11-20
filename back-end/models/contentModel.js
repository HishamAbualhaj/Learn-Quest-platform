import connection from "../config/db.js";
import generateId from "../utils/generateId.js";
import { publicationFlags } from "../utils/publication.js";
const entities = {
  courses: { table: "courses", id: "course_id" },
  blogs: { table: "blog", id: "blog_id" },
  faqs: { table: "faqs", id: "content_id" },
  testimonials: { table: "testimonials", id: "content_id" },
};
export function contentEntity(kind) {
  if (!Object.hasOwn(entities, kind)) throw new Error("Unknown content type.");
  return entities[kind];
}
export async function setVisibility(kind, id, data) {
  const { table, id: key } = contentEntity(kind);
  const flags = publicationFlags(data);
  const [result] = await connection
    .promise()
    .query(`UPDATE ${table} SET published=?,featured=? WHERE ${key}=?`, [
      Number(flags.published),
      Number(flags.featured),
      id,
    ]);
  if (!result.affectedRows) throw new Error("Content not found.");
  return flags;
}
export async function landingContent() {
  const result = {};
  for (const [kind, { table }] of Object.entries(entities)) {
    const columns =
      kind === "courses"
        ? "course_id,title,description,category,image_url,price"
        : kind === "blogs"
          ? "blog_id,title,subtitle,image_url"
          : "*";
    const [rows] = await connection
      .promise()
      .query(
        `SELECT ${columns} FROM ${table} WHERE published=1 AND featured=1 ORDER BY ${["faqs", "testimonials"].includes(kind) ? "sort_order ASC,content_id ASC" : "created_date DESC"}`,
      );
    result[kind] = rows;
  }
  return result;
}
export async function adminContent(kind, page = 1) {
  if (!["faqs", "testimonials"].includes(kind))
    throw new Error("Unsupported content type.");
  const { table } = contentEntity(kind);
  const [rows] = await connection
    .promise()
    .query(
      `SELECT * FROM ${table} ORDER BY sort_order,content_id LIMIT 11 OFFSET ?`,
      [(page - 1) * 10],
    );
  return {
    rows: rows.slice(0, 10),
    nextPage: rows.length > 10 ? page + 1 : null,
  };
}
export async function saveContent(kind, data) {
  if (!["faqs", "testimonials"].includes(kind))
    throw new Error("Unsupported content type.");
  const { table } = contentEntity(kind);
  const flags = publicationFlags(data);
  const fields =
    kind === "faqs"
      ? ["question", "answer"]
      : ["name", "role", "quote", "stars"];
  for (const field of fields.filter((f) => f !== "stars")) {
    if (typeof data[field] !== "string" || !data[field].trim())
      throw new Error(`${field} is required.`);
  }
  if (
    kind === "testimonials" &&
    (!Number.isInteger(Number(data.stars)) ||
      Number(data.stars) < 1 ||
      Number(data.stars) > 5)
  )
    throw new Error("Stars must be between 1 and 5.");
  const sort = Number(data.sort_order ?? 0);
  if (!Number.isInteger(sort) || sort < 0)
    throw new Error("Order must be a non-negative integer.");
  const id = data.content_id || generateId();
  const columns = [...fields, "sort_order", "published", "featured"];
  const values = [
    ...fields.map((f) => data[f]),
    sort,
    Number(flags.published),
    Number(flags.featured),
  ];
  if (data.content_id) {
    const [result] = await connection
      .promise()
      .query(
        `UPDATE ${table} SET ${columns.map((f) => `${f}=?`).join(",")} WHERE content_id=?`,
        [...values, id],
      );
    if (!result.affectedRows) throw new Error("Content not found.");
  } else
    await connection
      .promise()
      .query(
        `INSERT INTO ${table} (content_id,${columns.join(",")}) VALUES (${[id, ...values].map(() => "?").join(",")})`,
        [id, ...values],
      );
  return id;
}
export async function deleteContent(kind, id) {
  if (!["faqs", "testimonials"].includes(kind))
    throw new Error("Unsupported content type.");
  const { table } = contentEntity(kind);
  await connection
    .promise()
    .query(`DELETE FROM ${table} WHERE content_id=?`, [id]);
}

export async function assertPublished(kind, id) {
  const { table, id: key } = contentEntity(kind);
  const [rows] = await connection
    .promise()
    .query(`SELECT ${key} FROM ${table} WHERE ${key}=? AND published=1`, [id]);
  if (!rows.length) throw new Error("This content is not published.");
}

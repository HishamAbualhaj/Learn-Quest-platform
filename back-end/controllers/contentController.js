import {
  landingContent,
  adminContent,
  saveContent,
  setVisibility,
  deleteContent,
} from "../models/contentModel.js";
function send(res, status, data, nextPage = null) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify({ status: status < 400, data, nextPage }));
}
export async function getLandingContent(req, res) {
  try {
    send(res, 200, await landingContent());
  } catch {
    send(res, 503, "Featured content is temporarily unavailable.");
  }
}
function bodyAction(action) {
  return (req, res) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", async () => {
      try {
        const body = JSON.parse(raw);
        await action(body, res);
      } catch (error) {
        send(
          res,
          error.code ? 503 : 400,
          error.code
            ? "Content is temporarily unavailable. Please try again."
            : error.message,
        );
      }
    });
  };
}
export const getContentAdmin = bodyAction(async (body, res) => {
  const page = Number(body.page ?? 1);
  if (!Number.isInteger(page) || page < 1) throw new Error("Invalid page.");
  const data = await adminContent(body.kind, page);
  send(res, 200, data.rows, data.nextPage);
});
export const saveManagedContent = bodyAction(async (body, res) =>
  send(res, 200, {
    id: await saveContent(body.kind, body),
    msg: "Content saved.",
  }),
);
export const setContentVisibility = bodyAction(async (body, res) =>
  send(res, 200, await setVisibility(body.kind, body.id, body)),
);
export const deleteManagedContent = bodyAction(async (body, res) => {
  await deleteContent(body.kind, body.content_id);
  send(res, 200, "Content deleted.");
});

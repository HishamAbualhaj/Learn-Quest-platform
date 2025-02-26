import handleResponse from "./handleResponse.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
async function getImage(req, res) {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks.toString();
  });
  req.on("end", () => {
    try {
      
      const { image_url } = JSON.parse(body);
      const __filename = fileURLToPath(import.meta.url);

      const __dirname = path.dirname(__filename);

      const uploadDir = path.resolve(__dirname, "../uploads");

      const imagePath = path.join(uploadDir, image_url);
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end('Error downloading image');
          return;
        }
        res.writeHead(200, { "Content-Type": "image/jpg" });
        res.end(data);
      });
    } catch (error) {
      handleResponse(res, error, "Error getting image", null, 500, null, {
        msg: "Error server fetching image",
      });
    }
  });
}

export default getImage;

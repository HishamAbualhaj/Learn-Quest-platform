import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const handleImage = (req, res) => {
  // No route defined then its an image request

  // find current url from this file ,
  const __filename = fileURLToPath(import.meta.url);

  // find current dir for this file
  const __dirname = path.dirname(__filename);

  // resolving current dir with another folder
  const uploadDir = path.resolve(__dirname, "../uploads");

  if (!req.url.split("/")[2]) {
    getNotFoundCourseImage(uploadDir, res);
    return;
  }
  // getting image name from url
  const imagePath = path.join(uploadDir, req.url.split("/")[2]);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      getNotFoundCourseImage(uploadDir, res);
    } else {
      // Determine content type
      const ext = path.extname(imagePath).toLowerCase();
      let contentType = "application/octet-stream";
      if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
      else if (ext === ".png") contentType = "image/png";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

function getNotFoundCourseImage(uploadDir, res) {
  fs.readFile(path.join(uploadDir, "image_not_found.png"), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error downloading image");
      return;
    }
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(data);
  });
  return;
}
export default handleImage;

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

async function deleteImage(imageName) {
  // getting __dirname for absolute file path which is back-end/api/
  const __filename = fileURLToPath(import.meta.url);
  // using this approach because of ES Module
  const __dirname = path.dirname(__filename);

  const uploadDir = path.resolve(__dirname, "../uploads");
  const oldImagePath = path.join(uploadDir, imageName);
  if (fs.existsSync(oldImagePath)) {
    fs.unlink(oldImagePath, (err) => {
      console.log(err);
    });
  }
}

export default deleteImage;

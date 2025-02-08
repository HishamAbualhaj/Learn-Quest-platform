import formidable from "formidable";
import fs from "fs";
import handleResponse from "./handleResponse.js";
async function handleUploads(req, res) {
  const uploadDir = "./uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const form = formidable({ uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      handleResponse(res, err, "Error parsing form : ", null, 500, null, false);
    }
    const uploadedFile = files.image;
    const id = fields.id;

    if (uploadedFile) {
      const newPath = `${uploadDir}/${id}-${uploadedFile[0].originalFilename}`;
      fs.rename(uploadedFile[0].filepath, newPath, (err) => {
        if (err) {
          handleResponse(
            res,
            err,
            "Error uploading image : ",
            null,
            500,
            null,
            false
          );
        } else {
          handleResponse(
            res,
            err,
            "uploading image done ! ",
            200,
            {
              msg: "Uploading image done"
            },
            null,
            true
          );
        }
      });
    } else {
    }
  });
}

export default handleUploads;

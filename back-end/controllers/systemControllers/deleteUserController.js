import handleResponse from "../../utils/handleResponse.js";
import archiveLog from "../../api/system/archiveLogs.js";
import deleteImage from "../../utils/deleteImage.js";
import { deleteUserModel } from "../../models/systemModel.js";
const deleteUserController = (req, res) => {
  let body = "";
  req.on("data", (chunks) => {
    body += chunks;
  });
  req.on("end", () => {
    const { user_id } = JSON.parse(body);
    deleteUserQ(user_id, res);
  });
};

async function deleteUserQ(user_id, res) {
  try {
    const [first_name, image_url, email] = await deleteUserModel(user_id);

    if (image_url) {
      await deleteImage(image_url);
    }
    await archiveLog(
      res,
      user_id,
      "USER",
      `Admin: Deleted User ${first_name}`,
      email
    );

    handleResponse(
      res,
      null,
      null,
      200,
      null,
      {
        isDeleted: true,
        msg: "User deleted Successfully, ",
      },
      null
    );
    return;
  } catch (error) {
    handleResponse(res, error, "Error Deleting user at deleteUserController : ", null, 500, null, {
      isDeleted: false,
      msg: "User deletion failed, ",
    });
  }
}

export default deleteUserController;

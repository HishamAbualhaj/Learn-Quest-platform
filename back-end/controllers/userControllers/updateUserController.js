import connection from "../../config/db.js";
import handleResponse from "../../utils/handleResponse.js";
import isEmailFound from "../../utils/isEmailFound.js";
import log from "../../api/system/logs.js";
import { updateUserModel } from "../../models/userModel.js";
const updateUserController = (req, res) => {
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const {
        first_name,
        last_name,
        email,
        gender,
        birthdate,
        student_id,
        image_url,
        isImageChange,
      } = JSON.parse(body);

      const isEmail = await isEmailFound(email, res);
      if (isEmail && !(await isSameEmail(student_id, email))) {
        return handleResponse(
          res,
          null,
          null,
          200,
          null,
          "Email is Already found !",
          null,
          null,
          false
        );
      }
      await updateUserProfile(
        student_id,
        first_name,
        last_name,
        email,
        birthdate,
        gender,
        image_url,
        isImageChange,
        res
      );
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        "Profile updated successfully!",
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body: ",
        400,
        500,
        "",
        "Error updating profile"
      );
    }
  });
};

// Function to update course details
async function updateUserProfile(
  student_id,
  first_name,
  last_name,
  email,
  birthdate,
  gender,
  image_url,
  isImageChange,
  res
) {
  await updateUserModel(
    student_id,
    first_name,
    last_name,
    email,
    birthdate,
    gender,
    image_url,
    isImageChange
  );
  await log(
    res,
    student_id,
    `User: ${first_name} Updated ${gender === "Male" ? "his" : "her"} profile`,
    email
  );
}

async function isSameEmail(student_id, currentEmail) {
  const query = "select email from user where student_id = ?";
  const result = await connection.promise().query(query, [student_id]);
  const [data] = result;

  const [{ email }] = data;
  return email === currentEmail;
}

export default updateUserController;

import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";
import isEmailFound from "../../utils/isEmailFound.js";
import log from "../../system/logs.js";
const updateUser = (req, res) => {
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", () => {
    try {
      const { first_name, last_name, email, gender, birthdate, student_id } =
        JSON.parse(body);
      console.log(JSON.parse(body));
      (async () => {
        // First, update the course details
        const isEmail = await isEmailFound(email, res);
        if (isEmail) {
          if (await isSameEmail(student_id, email)) {
            // you can edit , its your email
          } else {
            handleResponse(
              res,
              null,
              "",
              200,
              500,
              "Email is Already found !",
              "",
              false
            );
            return;
          }
        }
        await updateUserProfile(
          student_id,
          first_name,
          last_name,
          email,
          birthdate,
          gender,
          res
        );
        handleResponse(
          res,
          null,
          "",
          200,
          500,
          "Profile updated successfully!",
          ""
        );
      })();
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
  res
) {
  const query = `UPDATE user 
    SET first_name = ?, last_name = ?, email = ?, gender = ?, birthdate = ?
    WHERE student_id = ?`;

  await connection
    .promise()
    .query(query, [
      first_name,
      last_name,
      email,
      gender,
      birthdate,
      student_id,
    ]);

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
export default updateUser;

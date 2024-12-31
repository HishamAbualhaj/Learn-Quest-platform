import connection from "../../db/db.js";
import handleResponse from "../../utils/handleResponse.js";

const updateUser = (req, res) => {
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
    console.log(body);
  });

  // Entire body has been received : no more data is coming
  req.on("end", () => {
    try {
      const { first_name, last_name, email, gender, birthdate, student_id } =
        JSON.parse(body);

      (async () => {
        // First, update the course details
        await updateUserProfile(
          first_name,
          last_name,
          email,
          gender,
          birthdate,
          student_id
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
  first_name,
  last_name,
  email,
  gender,
  birthdate,
  student_id
) {
  tabs = tabs.toString();
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
}

export default updateUser;

import connection from "../../db/db.js";
import handleError from "../../utils/handleError.js";
export const signup = (req, res) => {
  let body = "";

  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", () => {
    try {
      const {
        first_name,
        last_name,
        status_user,
        email,
        password,
        gender,
        birthdate,
      } = JSON.parse(body);
      const query = `INSERT INTO user (student_id,first_name, last_name, status_user, email, password, gender, birthdate)
          VALUES ((FLOOR(1 + (RAND() * 1000000)),?, ?, ?, ?, ?, ?, ?)`;

      connection.query(
        query,
        [
          student_id,
          first_name,
          last_name,
          status_user,
          email,
          password,
          gender,
          birthdate,
        ],
        (err) => {
          handleError(err, "Error inserting into user: ", 201, 500);
        }
      );
    } catch (error) {
      handleError(err, "Error parsing request body: ", 201, 400);
    }
  });
};

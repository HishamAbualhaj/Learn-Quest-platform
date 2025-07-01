import url from "url";
import { google } from "googleapis";
import handleResponse from "../utils/handleResponse.js";
import handleSession from "../utils/handleSession.js";
import connection from "../config/db.js";
import isEmailFound from "../utils/isEmailFound.js";
import generateId from "../utils/generateId.js";
const handleGoogleAuth = async (req, res, client) => {
  const parsedUrl = url.parse(req.url, true);

  const { code } = parsedUrl.query;
  if (!code) {
    res.writeHead(400);
    res.end("Missing code");
    return;
  }

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const auth = google.oauth2({ version: "v2", auth: client });

    const user = await auth.userinfo.get();

    const birthPeople = google.people({ version: "v1", auth: client });
    const birthAndGender = await birthPeople.people.get({
      resourceName: "people/me",
      personFields: "birthdays,genders",
    });

    const d = birthAndGender?.data?.birthdays?.[0].date;
    let mysqlDate = null;
    if (d) {
      mysqlDate = `${d.year}-${String(d.month).padStart(2, "0")}-${String(
        d.day
      ).padStart(2, "0")}`;
    } else {
      mysqlDate = `2025-01-01`;
    }

    const gender = birthAndGender?.data.genders?.[0]?.value ?? "male";
    const fetchId = await isEmailFound(user.data.email, res);

    // we don't use google id because it's not compatable with our system id
    // get user id from database
    if (fetchId) {
      await handleSession(fetchId?.data?.[0].student_id, res, true);
    } else {
      // get generated user id
      const id = await googleAuthQ(
        user.data,
        gender.charAt(0).toUpperCase() === "M" ? "Male" : "Female",
        mysqlDate,
        res
      );
      await handleSession(id, res, true);
    }
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error authentication google ",
      null,
      500,
      null,
      "Error to auth google"
    );
  }
};

async function googleAuthQ(
  { email, given_name, family_name },
  gender,
  birthdate,
  res
) {
  try {
    let newId = generateId();
    const query = `INSERT INTO user (student_id,first_name, last_name, status_user, email, gender, birthdate, login_method)
      VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
    await connection
      .promise()
      .query(query, [
        newId,
        given_name,
        family_name,
        1,
        email,
        gender,
        birthdate,
        "google",
      ]);

    return newId;
  } catch (error) {
    handleResponse(
      res,
      error,
      "Error inserting into user google method: ",
      null,
      500,
      null,
      "Error to sign up using google"
    );
    return error;
  }
}

export default handleGoogleAuth;

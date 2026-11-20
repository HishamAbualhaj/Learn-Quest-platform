import { setVisibility } from "../../models/contentModel.js";
import { publicationFlags } from "../../utils/publication.js";
import log from "../../api/system/logs.js";
import handleResponse from "../../utils/handleResponse.js";
import {
  addCourseMaterialModel,
  addCourseModel,
  updateLessonModel,
} from "../../models/systemModel.js";
import generateId from "../../utils/generateId.js";
let response = "";
const addCourseController = (req, res) => {
  response = res;
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const visibility = publicationFlags(JSON.parse(body));
      const course_id = generateId();

      await insertCourse(course_id, JSON.parse(body));
      await setVisibility("courses", course_id, visibility);
      handleResponse(
        res,
        null,
        null,
        200,
        null,
        { id: course_id, msg: "Course added successfully !" },
        null,
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at addCourseController : ",
        null,
        500,
        null,
        "Error adding course",
      );
    }
  });
};
async function insertCourse(
  course_id,
  {
    email,
    student_id,
    title,
    price,
    discount,
    category,
    image_url,
    tabs,
    description,
    materials,
  },
) {
  await addCourseModel(
    course_id,
    title,
    price,
    discount,
    category,
    image_url,
    tabs,
    description,
  );

  let lessons = await insertCourseMaterial(
    materials,
    course_id,
    student_id,
    title,
    email,
  );

  await updateLessonModel(lessons, course_id);
}
async function insertCourseMaterial(data, course_id, student_id, title, email) {
  const lessons = await addCourseMaterialModel(data, course_id);
  await log(response, student_id, `Admin: Added course : ${title}`, email);
  return lessons;
}
export default addCourseController;

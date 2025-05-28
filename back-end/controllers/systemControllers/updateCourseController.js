import handleResponse from "../../utils/handleResponse.js";
import log from "../../api/system/logs.js";
import {
  updateCourseMaterialsModel,
  updateCourseModel,
} from "../../models/systemModel.js";
const updateCourseController = (req, res) => {
  let body = "";
  // Triggering received data from client and collect it
  req.on("data", (chunks) => {
    body += chunks.toString();
  });

  // Entire body has been received : no more data is coming
  req.on("end", async () => {
    try {
      const {
        course_id,
        student_id,
        role,
        email,
        title,
        price,
        discount,
        category,
        image_url,
        tabs,
        description,
        materials,
      } = JSON.parse(body);

      let lessons = await updateCourseMaterials(course_id, materials);
      await updateCourseDetails(
        email,
        course_id,
        student_id,
        title,
        price,
        discount,
        category,
        image_url,
        tabs,
        description,
        lessons,
        res
      );

      handleResponse(
        res,
        null,
        null,
        200,
        null,
        "Course updated successfully!" ,
        null
      );
    } catch (error) {
      handleResponse(
        res,
        error,
        "Error parsing request body at updateCourseController : ",
        null,
        500,
        null,
        "Error updating course"
      );
    }
  });
};

// Function to update course details
async function updateCourseDetails(
  email,
  course_id,
  student_id,
  title,
  price,
  discount,
  category,
  image,
  tabs,
  description,
  lessons,
  res
) {
  await updateCourseModel(
    course_id,
    title,
    price,
    discount,
    category,
    image,
    tabs,
    description,
    lessons
  );
  await log(res, student_id, `Admin: Updated course : ${title}`, email);
}

// Function to update course materials
async function updateCourseMaterials(course_id, data) {
  return await updateCourseMaterialsModel(course_id, data);
}

export default updateCourseController;

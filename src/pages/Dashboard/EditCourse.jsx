import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import CourseAction from "../../components/CourseAction";
function EditCourse() {
  const location = useLocation();
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    //getting course id for edit
    const id = location.pathname.split("/").at(-1);
    setCourseId(id);
  }, []);

  return (
    <CourseAction
      action="edit"
      endpoint="updateCourse"
      method="PUT"
      course_id={courseId}
      title="Edit Course Details"
    />
  );
}

export default EditCourse;

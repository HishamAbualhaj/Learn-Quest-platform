import CourseAction from "../../components/CourseAction";

export default function AddCourse() {
  return (
    <CourseAction
      action="add"
      endpoint="addCourse"
      method="POST"
      course_id={null}
      title="Add Course Details"
    />
  );
}

import CourseAction from "@/components/CourseAction";
import getSession from "@/lib/getSession";

export default async function AddCourse() {
  const { userDataServer } = await getSession();
  return (
    <CourseAction
      action="add"
      endpoint="addCourse"
      method="POST"
      course_id=""
      title="Add Course Details"
      userData={userDataServer[0]}
    />
  );
}

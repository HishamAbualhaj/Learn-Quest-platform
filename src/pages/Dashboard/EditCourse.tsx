import CourseAction from "@/components/CourseAction";
import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getSession from "@/lib/getSession";
import { Course, CourseDataResponse, CourseMaterial } from "@/types";
async function EditCourse({ course_id }: { course_id: string }) {
  const { userDataServer } = await getSession();
  const res = await useFetchServer(
    `${API_BASE_URL}/getCourseData`,
    { course_id: course_id, ...userDataServer[0] },
    "POST"
  );
  let resObj = res.msg as unknown as CourseDataResponse;

  return (
    <CourseAction
      action="edit"
      endpoint="updateCourse"
      method="PUT"
      course_id={course_id}
      title="Edit Course Details"
      userData={userDataServer[0]}
      courseDataResponse={resObj}
    />
  );
}

export default EditCourse;

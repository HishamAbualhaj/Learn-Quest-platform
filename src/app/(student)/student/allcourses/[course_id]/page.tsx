import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getSession from "@/lib/getSession";
import CoursePage from "@/pages/Student/CoursePage";
import { Course, CourseMaterial } from "@/types";

const page = async ({ params }: { params: Promise<{ course_id: string }> }) => {
  const { course_id } = await params;
  const user = (await getSession()).userDataServer;

  const data = await useFetchServer(
    `${API_BASE_URL}/getCourseData`,
    { course_id, ...user[0] },
    "POST"
  );
  const safeMsg = data?.msg?.msg ?? [];
  const [
    courseVideos = [],
    courseMaterial = [],
    courseMaterialAllowedUrl = [],
  ] = safeMsg;

  const mergedMaterials: CourseMaterial[] = [
    ...courseMaterial,
    ...courseMaterialAllowedUrl,
  ].sort(
    (a, b) =>
      new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
  );
  console.log(data);

  return (
    <CoursePage
      user_data={user[0]}
      isEnrolled={data.msg.enrolled}
      courseVideos={mergedMaterials}
      courseData={{ ...courseVideos, course_id }}
    />
  );
};

export default page;

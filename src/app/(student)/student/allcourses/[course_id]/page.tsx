import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getSession from "@/lib/getSession";
import CoursePage from "@/pages-content/Student/CoursePage";
import { Course, CourseMaterial } from "@/types";

const page = async ({ params }: { params: Promise<{ course_id: string }> }) => {
  const { course_id } = await params;
  const user = (await getSession()).userDataServer;

  const data = await useFetchServer(
    `${API_BASE_URL}/getCourseData`,
    { course_id, ...user[0] },
    "POST"
  );
  let resObj = data.msg as unknown as {
    msg: [Course, CourseMaterial[]] | string;
    enrolled: boolean;
  };

  let mergedMaterials: CourseMaterial[] = [];
  let courseVideos: any = {};

  if (typeof resObj.msg !== "string") {
    const safeMsg = resObj.msg ?? [];
    const [
      courseVideosData = {},
      courseMaterial = [],
      courseMaterialAllowedUrl = [],
    ] = safeMsg;
    courseVideos = courseVideosData;
    mergedMaterials = [...courseMaterial, ...courseMaterialAllowedUrl].sort(
      (a, b) =>
        new Date(a.created_date).getTime() - new Date(b.created_date).getTime()
    );
  }

  console.log(data);

  return (
    <CoursePage
      user_data={user[0]}
      isEnrolled={resObj.enrolled}
      courseVideos={mergedMaterials}
      courseData={{ ...courseVideos, course_id }}
    />
  );
};

export default page;

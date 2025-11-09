import EditCourse from "@/pages-content/Dashboard/EditCourse";

const page = async ({ params }: { params: Promise<{ course_id: string }> }) => {
  const { course_id } = await params;

  return <EditCourse course_id={course_id} />;
};

export default page;

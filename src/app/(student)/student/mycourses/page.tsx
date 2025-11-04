import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getQueryClient from "@/lib/getQueryClient";
import getSession from "@/lib/getSession";
import MyCourses from "@/pages/Student/MyCourses";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ type: string; search: string; page: string }>;
}) => {
  const { userDataServer } = await getSession();
  const s = await searchParams;

  const queryClient = getQueryClient();

  const search = s.search || null;
  const type = s.type || null;
  const page = s.page || null;

  await queryClient.prefetchQuery({
    queryKey: ["enrolled_courses", page, type],
    queryFn: async ({ pageParam = 1 }) => {
      return await useFetchServer(
        `${API_BASE_URL}/getEnrolledCourses`,
        {
          page: pageParam,
          student_id: userDataServer?.[0].student_id,
          search_text: search,
          select_data: type,
        },
        "POST"
      );
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyCourses />
    </HydrationBoundary>
  );
};

export default page;

import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getQueryClient from "@/lib/getQueryClient";
import AllCourses from "@/pages-content/Student/AllCourses";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ type: string; search: string }>;
}) => {
  const s = await searchParams;

  const queryClient = getQueryClient();

  const search = s.search || null;
  const type = s.type || null;

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["courses", type],
    queryFn: async ({ pageParam = page }) => {
      return await useFetchServer(
        `${API_BASE_URL}/getCourses`,
        {
          page: pageParam,
          search_text: search,
          select_data: type,
        },
        "POST"
      );
    },
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllCourses />
    </HydrationBoundary>
  );
};

export default page;

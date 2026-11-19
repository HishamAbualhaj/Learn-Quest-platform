import { API_SERVER_BASE_URL } from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getQueryClient from "@/lib/getQueryClient";
import Blog from "@/pages-content/Student/Blog";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await useFetchServer(
        `${API_SERVER_BASE_URL}/getBlogData`,
        {
          page: pageParam,
        },
        "POST",
      );
      if (!result.status) throw new Error(String(result.msg));
      return result;
    },
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Blog />
    </HydrationBoundary>
  );
};

export default page;

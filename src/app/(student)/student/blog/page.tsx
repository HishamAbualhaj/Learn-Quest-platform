import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getQueryClient from "@/lib/getQueryClient";
import Blog from "@/pages/Student/Blog";
const page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: async ({ pageParam = 1 }) => {
      return await useFetchServer(
        `${API_BASE_URL}/getBlogData`,
        {
          page: pageParam,
        },
        "POST"
      );
    },
    initialPageParam: 1,
  });

  return <Blog />;
};

export default page;

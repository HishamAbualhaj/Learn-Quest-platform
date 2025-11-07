import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import Reviews from "@/pages/Dashboard/Reviews";

const page = async () => {
  const res = await useFetchServer(
    `${API_BASE_URL}/getCourses`,
    { page: null },
    "POST"
  );
  return <Reviews courses={res.msg} />;
};

export default page;

import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import Logout from "@/pages-content/auth/Logout";

export const dynamic = "force-dynamic";

const page = async () => {
  await useFetchServer(`${API_BASE_URL}/logout`, null, "GET");
  return <Logout />;
};

export default page;

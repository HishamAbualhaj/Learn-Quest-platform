import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getSession from "@/lib/getSession";
import ChatStudent from "@/pages-content/Student/ChatStudent";
import { User } from "@/types";

const page = async () => {
  const { userDataServer } = await getSession();
  const adminData = await useFetchServer<User>(
    `${API_BASE_URL}/getAdminId`,
    null,
    "GET"
  );


  return (
    <ChatStudent
      userData={userDataServer[0]}
      adminData={adminData.msg[0] as User}
    />
  );
};

export default page;

import getSession from "@/lib/getSession";
import Chat from "@/pages/Dashboard/Chat";

const page = async () => {
  const { userDataServer } = await getSession();

  return <Chat userData={userDataServer[0]} />;
};

export default page;

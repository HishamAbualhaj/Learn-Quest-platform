import Maintenance from "@/pages/Dashboard/Maintenance";
import getSession from "@/lib/getSession";
const page = async () => {
  const { userDataServer } = await getSession();

  return <Maintenance userData={userDataServer[0]} />;
};

export default page;

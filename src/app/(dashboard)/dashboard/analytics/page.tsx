import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import Analytics from "@/pages/Dashboard/Analytics";
import { AnalyticsType } from "@/types";

const page = async () => {
  const res = await useFetchServer<AnalyticsType>(
    `${API_BASE_URL}/getAnalystic`,
    null,
    "GET"
  );

  return <Analytics data={typeof res.msg !== "string" ? res.msg : ""} />;
};

export default page;

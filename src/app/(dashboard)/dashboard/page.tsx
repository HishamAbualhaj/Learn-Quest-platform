import { API_SERVER_BASE_URL } from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import Overview from "@/pages-content/Dashboard/Overview";
import type { AnalyticsType } from "@/types";
export default async function Page() {
  const res = await useFetchServer<AnalyticsType>(
    `${API_SERVER_BASE_URL}/getAnalystic`,
    null,
    "GET",
  );
  return (
    <Overview
      data={res.status && typeof res.msg === "object" ? res.msg : null}
    />
  );
}

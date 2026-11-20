import Overview from "./Overview";
import type { AnalyticsType } from "@/types";
export default function Analytics({ data }: { data: AnalyticsType | string }) {
  return <Overview analytics data={typeof data === "object" ? data : null} />;
}

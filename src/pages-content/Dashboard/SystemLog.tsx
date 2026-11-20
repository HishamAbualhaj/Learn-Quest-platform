"use client";
import { useRef, useState } from "react";
import { Search, RefreshCw, Terminal } from "lucide-react";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AdminHeading,
  AdminEmpty,
  AdminFeedback,
  adminPanel,
} from "@/components/admin/AdminPage";
import type { LogMessage } from "@/types";
export default function SystemLog() {
  const container = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const { dataFetched, isFetching, hasNextPage, loadMore, refetch, error } =
    useInfiniteScroll<LogMessage>({
      fetchFn: async (page) => {
        const res = await useFetch(
          `${API_BASE_URL}/getSystemLog`,
          { page },
          "POST",
        );
        if (!res.status) throw new Error(String(res.msg));
        return res;
      },
      queryKey: ["systemlogs"],
      scrollContainer: container,
      observedEle: null,
      data_id: "log_id",
      retry: 1,
    });
  const logs = dataFetched.filter((log) =>
    `${log.message} ${log.email} ${log.student_id}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <AdminHeading
        title="System log"
        description="Follow platform activity and inspect the details behind each event."
        actions={
          <Button
            variant="outline"
            className="min-h-11"
            disabled={isFetching}
            onClick={refetch}
          >
            <RefreshCw aria-hidden="true" />
            Refresh activity
          </Button>
        }
      />
      <section ref={container} className={adminPanel}>
        <div className="border-b border-borderLight p-5 dark:border-borderDark">
          <label
            htmlFor="log-search"
            className="mb-2 block text-sm font-medium"
          >
            Search loaded activity
          </label>
          <div className="relative max-w-lg">
            <Search
              aria-hidden="true"
              className="absolute top-3.5 left-3 size-4 text-muted-foreground"
            />
            <Input
              id="log-search"
              type="search"
              className="min-h-11 pl-10"
              placeholder="Search event, email, or user ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {dataFetched.length} events loaded. Expand an event to inspect its
            details.
          </p>
        </div>
        <div className="divide-y divide-borderLight dark:divide-borderDark">
          {logs.map((log) => (
            <details key={log.log_id} className="group p-5">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-ring">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-mainClr/10 text-mainClr dark:text-mainClrDark">
                  <Terminal aria-hidden="true" className="size-4" />
                </span>
                <span className="min-w-0 flex-1 text-sm font-medium break-words leading-7">
                  {log.message}
                </span>
                <time className="text-sm text-muted-foreground">
                  {log.time}
                </time>
                <span className="text-sm text-mainClr group-open:hidden dark:text-mainClrDark">
                  Details
                </span>
              </summary>
              <dl className="mt-5 grid gap-5 rounded-md bg-lightLayout p-5 text-sm dark:bg-dark sm:grid-cols-2">
                {[
                  ["Event ID", log.log_id],
                  ["User ID", log.student_id],
                  ["Email", log.email],
                  ["Recorded", String(log.created_date).replace(/[TZ]/g, " ")],
                ].map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="mt-1 break-all font-medium">
                      {value || "Unavailable"}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          ))}
        </div>
        {!logs.length && !isFetching && !error && (
          <AdminEmpty
            title={search ? "No matching events" : "No activity yet"}
            description="Platform events will appear here as they are recorded."
          />
        )}
        <AdminFeedback
          loading={isFetching}
          error={error}
          retry={refetch}
          label="Loading activity"
        />
        {hasNextPage && (
          <div className="border-t border-borderLight p-5 text-center dark:border-borderDark">
            <Button
              variant="outline"
              className="min-h-11"
              onClick={loadMore}
              disabled={isFetching}
            >
              Load more events
            </Button>
          </div>
        )}
      </section>
    </>
  );
}

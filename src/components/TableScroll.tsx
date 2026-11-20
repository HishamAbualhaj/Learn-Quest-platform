"use client";
import useFetch from "@/hooks/useFetch";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import API_BASE_URL from "@/config/config";
import { useState, useRef } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AdminHeading,
  AdminEmpty,
  AdminFeedback,
  adminPanel,
} from "@/components/admin/AdminPage";
interface TableScrollProps<T extends Record<string, any> = any> {
  title: string;
  subtitle: string;
  data_key: string;
  data_id: string;
  endpoint: string;
  columns: {
    key: keyof T | "action";
    label: string;
    render?: (value: any, item: T) => React.ReactNode;
  }[];
  customActions: (data: T, refetch: () => void) => React.ReactNode;
  Component: React.ReactNode;
}
export default function TableScroll<T extends Record<string, any>>({
  title,
  subtitle,
  data_key,
  data_id,
  endpoint,
  columns,
  customActions,
  Component,
}: TableScrollProps<T>) {
  const [search, setSearch] = useState("");
  const dataContainer = useRef<HTMLDivElement | null>(null);
  const { dataFetched, isFetching, hasNextPage, refetch, loadMore, error } =
    useInfiniteScroll<T>({
      fetchFn: async (page) => {
        const res = await useFetch(
          `${API_BASE_URL}/${endpoint}`,
          { page },
          "POST",
        );
        if (!res.status) throw new Error(String(res.msg));
        return res;
      },
      queryKey: ["admin", data_key],
      scrollContainer: dataContainer,
      observedEle: null,
      data_id,
      viewportRoot: true,
      retry: 1,
    });
  const filtered = dataFetched.filter((item) =>
    columns.some(
      (col) =>
        col.key !== "action" &&
        String(item[col.key] ?? "")
          .toLowerCase()
          .includes(search.toLowerCase()),
    ),
  );
  return (
    <>
      <AdminHeading title={title} description={subtitle} actions={Component} />
      <section className={adminPanel} aria-label={`${title} directory`}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-borderLight p-5 dark:border-borderDark">
          <div className="relative w-full sm:max-w-sm">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-3.5 left-3 size-4 text-muted-foreground"
            />
            <Input
              className="min-h-11 pl-10"
              type="search"
              aria-label={`Search loaded ${title.toLowerCase()}`}
              placeholder="Search loaded records..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="min-h-11"
            disabled={isFetching}
            onClick={refetch}
          >
            <RefreshCw
              aria-hidden="true"
              className={
                isFetching ? "animate-spin motion-reduce:animate-none" : ""
              }
            />
            Refresh
          </Button>
          <p className="w-full text-sm text-muted-foreground">
            {dataFetched.length} records loaded
            {search ? ` ? ${filtered.length} matches` : ""}. Load more to search
            additional records.
          </p>
        </div>
        <div ref={dataContainer} className="relative overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">{title} management</caption>
            <thead className="bg-lightLayout/70 dark:bg-hoverDark/30">
              <tr>
                {columns.map((col) => (
                  <th
                    scope="col"
                    key={String(col.key)}
                    className="px-5 py-4 font-medium whitespace-nowrap text-muted-foreground"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-borderLight dark:divide-borderDark">
              {filtered.map((item) => (
                <tr
                  key={item[data_id]}
                  className="transition-colors hover:bg-mainClr/3 dark:hover:bg-mainClrDark/5"
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className="px-5 py-5 align-middle"
                    >
                      {col.key === "action" ? (
                        <div className="flex items-center gap-2">
                          {customActions(item, refetch)}
                        </div>
                      ) : col.render ? (
                        col.render(item[col.key], item)
                      ) : (
                        <span className="block max-w-sm min-w-[100px] break-words leading-6">
                          {item[col.key]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!filtered.length && !isFetching && !error && (
          <AdminEmpty
            title={search ? "No matching records" : "Nothing here yet"}
            description={
              search
                ? "Try another search, or load more records below."
                : "New records will appear here when they are available."
            }
          />
        )}
        <AdminFeedback
          loading={isFetching}
          error={error}
          retry={refetch}
          label={`Loading ${title.toLowerCase()}`}
        />
        {dataFetched.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-borderLight p-5 dark:border-borderDark">
            <p className="text-sm text-muted-foreground">
              {hasNextPage
                ? "More records are available."
                : "You're up to date with this list."}
            </p>
            {hasNextPage && (
              <Button
                variant="outline"
                disabled={isFetching}
                className="min-h-11"
                onClick={loadMore}
              >
                Load more records
              </Button>
            )}
          </div>
        )}
      </section>
    </>
  );
}

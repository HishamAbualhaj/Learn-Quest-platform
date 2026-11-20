import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  FileText,
  Plus,
  Star,
  Users,
} from "lucide-react";
import type { AnalyticsType } from "@/types";
import { AdminHeading, adminPanel } from "@/components/admin/AdminPage";
import RefreshOverview from "@/components/admin/RefreshOverview";
import { Button } from "@/components/ui/button";
export default function Overview({
  data,
  analytics = false,
}: {
  data: AnalyticsType | null;
  analytics?: boolean;
}) {
  const metrics = [
    {
      label: "Total users",
      key: "users",
      icon: Users,
      href: "users",
      caption: "People in your learning community",
    },
    {
      label: "Courses",
      key: "courses",
      icon: BookOpen,
      href: "courses",
      caption: "Learning experiences in your catalog",
    },
    {
      label: "Journal posts",
      key: "blogs",
      icon: FileText,
      href: "blogs",
      caption: "Stories and resources for learners",
    },
    {
      label: "Reviews",
      key: "reviews",
      icon: Star,
      href: "reviews",
      caption: "Feedback from your community",
    },
  ] as const;
  const count = (key: keyof AnalyticsType) =>
    data && Number.isFinite(Number(data[key]))
      ? Number(data[key]).toLocaleString("en-US")
      : "Unavailable";
  const total = Number(data?.users ?? 0);
  const percentage =
    total > 0
      ? Math.min(
          100,
          Math.max(0, (Number(data?.active_users ?? 0) / total) * 100),
        )
      : 0;
  return (
    <>
      <AdminHeading
        title={analytics ? "Platform analytics" : "Your platform, at a glance."}
        description={
          analytics
            ? "Understand your community and content with the latest platform totals."
            : "A clear view of your community, content, and the work that comes next."
        }
        actions={
          <>
            <RefreshOverview />
            <Button asChild className="min-h-11">
              <Link href="/dashboard/courses/add">
                <Plus aria-hidden="true" />
                Create course
              </Link>
            </Button>
          </>
        }
      />
      {!data && (
        <p
          role="alert"
          className="mb-6 rounded-md border border-red-500/30 p-4 text-sm"
        >
          Platform totals are unavailable. Refresh to try again; management
          sections are still accessible.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, key, icon: Icon, href, caption }) => (
          <Link
            key={key}
            href={`/dashboard/${href}`}
            className={`${adminPanel} group p-5 transition-colors hover:border-mainClr/40 focus-visible:outline-2 focus-visible:outline-ring`}
          >
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-md bg-mainClr/10 text-mainClr dark:text-mainClrDark">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 text-muted-foreground group-hover:text-mainClr dark:group-hover:text-mainClrDark"
              />
            </div>
            <p className="mt-6 text-sm font-medium text-muted-foreground">
              {label}
            </p>
            <p
              className={`mt-2 font-semibold tracking-tight tabular-nums ${data ? "text-4xl" : "text-lg"}`}
            >
              {count(key)}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {caption}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className={`${adminPanel} p-6 md:p-7`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Community status</h2>
            <Link
              className="text-sm font-medium text-mainClr hover:underline dark:text-mainClrDark"
              href="/dashboard/users"
            >
              Manage users
            </Link>
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            The current account status of your registered users.
          </p>
          <div className="my-7 grid grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-muted-foreground">Active accounts</p>
              <p className="mt-2 text-3xl font-semibold">
                {count("active_users")}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inactive accounts</p>
              <p className="mt-2 text-3xl font-semibold">
                {count("inactive_users")}
              </p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="h-3 overflow-hidden rounded-md bg-mainClr/10 dark:bg-hoverDark"
          >
            <div
              className="h-full rounded-md bg-action"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {data
              ? `${Math.round(percentage)}% of accounts are active`
              : "Account status unavailable"}
          </p>
        </section>
        {analytics ? (
          <section className={`${adminPanel} p-6 md:p-7`}>
            <h2 className="text-xl font-semibold">Content mix</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              How your published courses and journal posts make up your content
              library.
            </p>
            <div className="mt-8 space-y-7">
              {[
                { label: "Courses", key: "courses" },
                { label: "Journal posts", key: "blogs" },
              ].map(({ label, key }) => {
                const combined =
                  Number(data?.courses ?? 0) + Number(data?.blogs ?? 0);
                const share = combined
                  ? (Number(data?.[key] ?? 0) / combined) * 100
                  : 0;
                return (
                  <div key={key}>
                    <div className="mb-3 flex justify-between gap-3 text-sm">
                      <span className="font-medium">{label}</span>
                      <span className="text-muted-foreground">
                        {count(key as keyof AnalyticsType)}
                        {data ? ` ? ${Math.round(share)}%` : ""}
                      </span>
                    </div>
                    <div
                      aria-hidden="true"
                      className="h-3 overflow-hidden rounded-md bg-mainClr/10 dark:bg-hoverDark"
                    >
                      <div
                        className="h-full rounded-md bg-action"
                        style={{ width: `${share}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-7 text-sm leading-7 text-muted-foreground">
              Snapshot totals. Historical trends are not collected by this
              report.
            </p>
          </section>
        ) : (
          <>
            <section className={`${adminPanel} p-6 md:p-7`}>
              <h2 className="text-xl font-semibold">Make your next move</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Keep your learning platform moving forward.
              </p>
              <div className="mt-5 divide-y divide-borderLight dark:divide-borderDark">
                {[
                  {
                    title: "Build a new course",
                    description: "Turn your expertise into a learning path.",
                    href: "courses/add",
                    icon: BookOpen,
                  },
                  {
                    title: "Write a journal post",
                    description: "Share something worth learning.",
                    href: "blogs/add",
                    icon: FileText,
                  },
                  {
                    title: "Read learner feedback",
                    description: "See what your community is saying.",
                    href: "reviews",
                    icon: Star,
                  },
                ].map(({ title, description, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={`/dashboard/${href}`}
                    className="group flex items-center gap-4 rounded-md py-4 focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-mainClr dark:text-mainClrDark"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold group-hover:underline">
                        {title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground"
                    />
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      <div
        className={`${adminPanel} mt-6 flex flex-wrap items-center justify-between gap-4 p-5 text-sm`}
      >
        <div className="flex items-center gap-3">
          <Clock3
            aria-hidden="true"
            className="size-5 text-mainClr dark:text-mainClrDark"
          />
          <span className="text-muted-foreground">Backend uptime</span>
          <span className="font-medium">{data?.time || "Unavailable"}</span>
        </div>
        <span className="text-muted-foreground">
          Counts reflect the latest overview request.
        </span>
      </div>
    </>
  );
}

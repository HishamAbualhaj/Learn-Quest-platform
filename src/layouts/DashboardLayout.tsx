"use client";
import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  ShieldCheck,
  Star,
  Terminal,
  Users,
  X,
} from "lucide-react";
import PlatformBrand from "@/components/PlatformBrand";
import UserStatus from "@/pages-content/Landing-Page/Header/UserStatus";

const sections = [
  {
    title: "Workspace",
    links: [{ title: "Overview", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Manage",
    links: [
      { title: "Users", href: "/dashboard/users", icon: Users },
      { title: "Courses", href: "/dashboard/courses", icon: BookOpen },
      { title: "Journal", href: "/dashboard/blogs", icon: FileText },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "Reviews", href: "/dashboard/reviews", icon: Star },
      { title: "Messages", href: "/dashboard/chat", icon: MessageSquare },
    ],
  },
  {
    title: "Platform",
    links: [
      { title: "Analytics", href: "/dashboard/analytics", icon: Settings2 },
      { title: "System log", href: "/dashboard/systemlog", icon: Terminal },
      { title: "Maintenance", href: "/dashboard/maintenance", icon: LifeBuoy },
    ],
  },
];
function isCurrent(path: string | null, href: string) {
  return (
    path === href ||
    (href !== "/dashboard" && Boolean(path?.startsWith(href + "/")))
  );
}

function AdminNavigation({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Admin navigation"
      className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3 py-5"
    >
      {sections.map((section) => (
        <section key={section.title} aria-label={section.title}>
          <h2
            className={
              collapsed
                ? "sr-only"
                : "mb-2 px-3 text-sm font-medium text-muted-foreground"
            }
          >
            {section.title}
          </h2>
          <div className="space-y-1">
            {section.links.map(({ title, href, icon: Icon }) => {
              const active = isCurrent(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  title={collapsed ? title : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                  className={`flex min-h-11 items-center gap-3 rounded-md border px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${collapsed ? "justify-center" : ""} ${active ? "border-mainClr/15 bg-mainClr/10 text-mainClr dark:border-mainClrDark/15 dark:bg-mainClrDark/10 dark:text-mainClrDark" : "border-transparent text-muted-foreground hover:bg-lightLayout hover:text-lightText dark:hover:bg-hoverDark dark:hover:text-white"}`}
                >
                  <Icon aria-hidden="true" className="size-[18px] shrink-0" />
                  <span className={collapsed ? "sr-only" : ""}>{title}</span>
                  {active && !collapsed && (
                    <ChevronRight
                      aria-hidden="true"
                      className="ml-auto size-4"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </nav>
  );
}
function AdminSidebar({
  collapsed = false,
  onCollapse,
  onNavigate,
  mobile = false,
}: {
  collapsed?: boolean;
  onCollapse?: () => void;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  return (
    <>
      <div
        className={`flex min-h-24 items-center border-b border-borderLight px-4 dark:border-borderDark ${collapsed ? "justify-center" : "justify-between gap-2"}`}
      >
        {collapsed ? (
          <Link
            href="/dashboard"
            aria-label="Admin overview"
            className="flex size-11 items-center justify-center rounded-md bg-mainClr/10 text-mainClr dark:bg-mainClrDark/10 dark:text-mainClrDark"
          >
            <LayoutDashboard aria-hidden="true" className="size-5" />
          </Link>
        ) : (
          <div className="[&_a]:text-xl [&_svg]:size-8">
            <PlatformBrand />
          </div>
        )}
        {mobile ? (
          <Dialog.Close
            aria-label="Close admin navigation"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-lightLayout dark:hover:bg-hoverDark"
          >
            <X aria-hidden="true" className="size-5" />
          </Dialog.Close>
        ) : null}
      </div>
      <AdminNavigation collapsed={collapsed} onNavigate={onNavigate} />
      <div className="space-y-3 border-t border-borderLight p-3 dark:border-borderDark">
        <Link
          target="_blank"
          href="/"
          title={collapsed ? "View platform" : undefined}
          className={`flex min-h-11 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-lightLayout dark:hover:bg-hoverDark ${collapsed ? "justify-center" : ""}`}
        >
          <ArrowUpRight aria-hidden="true" className="size-[18px] shrink-0" />
          <span className={collapsed ? "sr-only" : ""}>View platform</span>
        </Link>
        {!mobile && (
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={onCollapse}
            className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-md border border-borderLight px-3 text-sm text-muted-foreground hover:bg-lightLayout dark:border-borderDark dark:hover:bg-hoverDark ${collapsed ? "justify-center" : ""}`}
          >
            {collapsed ? (
              <PanelLeftOpen aria-hidden="true" className="size-[18px]" />
            ) : (
              <PanelLeftClose aria-hidden="true" className="size-[18px]" />
            )}
            <span className={collapsed ? "sr-only" : ""}>Collapse sidebar</span>
          </button>
        )}
        {!collapsed && (
          <p className="px-3 text-sm text-muted-foreground">
            LearnQuest administration
          </p>
        )}
      </div>
    </>
  );
}

export default function Dashboard({
  children,
  firstName = "Admin",
  imageUrl = "",
}: {
  children: ReactNode;
  firstName?: string;
  imageUrl?: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const close = () => {
      if (media.matches) setMobileOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  const current = sections
    .flatMap((section) => section.links)
    .find((link) => isCurrent(pathname, link.href));
  const detail = pathname?.includes("/add")
    ? "Create"
    : pathname?.includes("/edit")
      ? "Edit"
      : null;
  return (
    <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
      <div className="flex min-h-dvh bg-lightLayout/60 text-lightText dark:bg-dark dark:text-white">
        <a
          href="#admin-content"
          className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-md bg-action px-5 py-3 text-sm text-action-foreground focus:translate-y-0"
        >
          Skip to admin content
        </a>
        <aside
          aria-label="Admin sidebar"
          className={`sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-borderLight bg-white dark:border-borderDark dark:bg-lightDark/30 lg:flex ${collapsed ? "w-20" : "w-[264px]"}`}
        >
          <AdminSidebar
            collapsed={collapsed}
            onCollapse={() => setCollapsed((value) => !value)}
          />
        </aside>
        <div className="min-w-0 flex-1">
          <header className="border-b border-borderLight bg-white dark:border-borderDark dark:bg-dark">
            <div className="mx-auto flex min-h-24 max-w-[1600px] items-center justify-between gap-3 px-5 md:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <Dialog.Trigger
                  aria-label="Open admin navigation"
                  className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-input text-muted-foreground lg:hidden"
                >
                  <Menu aria-hidden="true" className="size-5" />
                </Dialog.Trigger>
                <nav
                  aria-label="Breadcrumb"
                  className="flex min-w-0 items-center gap-2 text-sm"
                >
                  <span className="hidden text-muted-foreground sm:inline">
                    Administration
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="hidden size-3.5 shrink-0 text-muted-foreground sm:inline"
                  />
                  <span className="truncate font-medium">
                    {current?.title ?? "Dashboard"}
                  </span>
                  {detail && (
                    <>
                      <ChevronRight
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-muted-foreground"
                      />
                      <span className="text-muted-foreground">{detail}</span>
                    </>
                  )}
                </nav>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="hidden items-center gap-2 border-r border-borderLight pr-5 text-sm text-muted-foreground dark:border-borderDark xl:flex">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-4 text-mainClr dark:text-mainClrDark"
                  />
                  Admin workspace
                </span>
                <UserStatus
                  isStudent={false}
                  isLoggedIn
                  first_name={firstName}
                  role="admin"
                  image_url={imageUrl}
                />
              </div>
            </div>
          </header>
          <main
            id="admin-content"
            className="mx-auto min-h-[75dvh] max-w-[1600px] px-5 py-8 md:px-8 lg:py-10"
          >
            {children}
          </main>
          <footer className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-3 border-t border-borderLight px-5 py-6 text-sm text-muted-foreground dark:border-borderDark md:px-8">
            <span>LearnQuest administration</span>
            <span>Build better learning experiences.</span>
          </footer>
        </div>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(300px,90vw)] flex-col border-r border-borderLight bg-white text-lightText shadow-xl outline-none dark:border-borderDark dark:bg-dark dark:text-white lg:hidden">
          <Dialog.Title className="sr-only">Admin navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Choose a section of the LearnQuest admin workspace.
          </Dialog.Description>
          <AdminSidebar mobile onNavigate={() => setMobileOpen(false)} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

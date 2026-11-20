import PlatformBrand from "@/components/PlatformBrand";
import StudentNav from "@/components/StudentNav";
import UserStatus from "@/pages-content/Landing-Page/Header/UserStatus";
import getSession from "@/lib/getSession";
interface StudentProps {
  children: React.ReactNode;
}
async function Student({ children }: StudentProps) {
  const { loggedIn, userDataServer } = await getSession();
  const user = userDataServer?.[0];
  return (
    <div className="min-h-dvh bg-white text-lightText dark:bg-dark dark:text-white">
      <a
        href="#student-content"
        className="fixed top-2 left-4 z-50 -translate-y-24 rounded-md bg-mainClr px-5 py-3 text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="border-b border-borderLight dark:border-borderDark">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex min-h-24 items-center justify-between gap-3">
            <PlatformBrand />
            <UserStatus
              isStudent
              isLoggedIn={loggedIn ?? false}
              first_name={user?.first_name ?? ""}
              role={user?.role ?? ""}
              image_url={user?.image_url ?? ""}
            />
          </div>
          <StudentNav isLoggedIn={loggedIn ?? false} />
        </div>
      </header>
      <main
        id="student-content"
        className="mx-auto min-h-[70vh] max-w-[1440px] px-5 py-8 md:px-10 md:py-12  [&_textarea]:p-4 [&_button]:min-h-11  [&_:is(a,button,input,select,textarea):focus-visible]:outline-2 [&_:is(a,button,input,select,textarea):focus-visible]:outline-offset-4 [&_:is(a,button,input,select,textarea):focus-visible]:outline-mainClr dark:[&_:is(a,button,input,select,textarea):focus-visible]:outline-mainClrDark"
      >
        {children}
      </main>
      <footer className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-borderLight px-5 py-7 text-sm text-lightText/65 md:px-10 dark:border-borderDark dark:text-textDark">
        <span>LearnQuest. A little progress, every day.</span>
        <span>Your pace. Your path. Your possibilities.</span>
      </footer>
    </div>
  );
}

export default Student;

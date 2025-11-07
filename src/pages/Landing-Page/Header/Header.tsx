import UserStatus from "./UserStatus";
import Navs from "./Navs";
import useSession from "@/lib/getSession";
import Logo from "@/components/Logo";
export default async function Header({ isStudent = false }) {
  const { loggedIn, userDataServer } = await useSession();

  return (
    <div className="section relative">
      <div className={`${isStudent ? "" : "max-container"}`}>
        <div className="flex justify-between lg:gap-0 gap-5 items-center">
          {isStudent && <Logo />}
          {!isStudent && <Navs isStudent={isStudent} isLoggedIn={loggedIn} />}

          <UserStatus
            isStudent={isStudent}
            isLoggedIn={loggedIn ?? false}
            first_name={userDataServer?.[0]?.first_name}
            role={userDataServer?.[0]?.role}
            image_url={userDataServer?.[0]?.image_url}
          />
        </div>
      </div>
    </div>
  );
}

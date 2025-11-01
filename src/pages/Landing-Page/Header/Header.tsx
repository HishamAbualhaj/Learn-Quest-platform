import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import UserStatus from "./UserStatus";
import ThemeContext from "@/context/ThemeContext";
import Navs from "./Navs";
export default async function Header({ isStudent = false }) {
  // const [userDataClient, setUserDataClient] = useState({
  //   first_name: null,
  //   role: null,
  //   image_url: null,
  // });

  const res = await useFetch(`${API_BASE_URL}/session`, {}, "GET");

  console.log(res);
  return (
    <div className="section relative">
      <div className={`${isStudent ? "" : "max-container"}`}>
        <div className="flex justify-between lg:gap-0 gap-5 items-center">
          {!isStudent && (
            <Navs isStudent={isStudent} isLoggedIn={res.msg.isLoggedIn} />
          )}

          <ThemeContext>
            <UserStatus
              isStudent={isStudent}
              isLoggedIn={res.msg.isLoggedIn}
              first_name={res.msg.first_name}
              role={res.msg.role}
              image_url={res.msg.image_url}
            />
          </ThemeContext>
        </div>
      </div>
    </div>
  );
}

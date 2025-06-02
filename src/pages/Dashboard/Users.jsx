import { useEffect, useRef, useState } from "react";
import DeleteUser from "./DeleteUser";
import useFetch from "../../hooks/useFetch";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import API_BASE_URL from "../../config/config";
function Users() {
  const [users, setUsers] = useState([]);
  const [lastNode, setLastNode] = useState(null);
  const usersContainer = useRef();
  const { dataFetched, isFetching, hasNextPage, refetch } = useInfiniteScroll({
    fetchFn: (pagePara) => {
      return useFetch(`${API_BASE_URL}/getUsers`, { page: pagePara }, "POST");
    },
    queryKey: ["users"],
    scrollContainer: usersContainer,
    observedEle: lastNode,
    data_id: "student_id",
  });

  useEffect(() => {
    setUsers(dataFetched);
    console.log(dataFetched);
  }, [dataFetched]);
  const observeEle = (node) => {
    setLastNode(node);
  };
  const [deleteUserPopup, setdeleteUserPopup] = useState(false);

  const [userData, setUserData] = useState({});

  return (
    <>
      <div className="dark:text-white text-black font-semibold text-4xl ">
        Hello, Admin
      </div>
      <div className="dark:text-gray-400 text-lightText mt-2 ">
        Last Login was yesterday at 2:46 pm
      </div>
      {deleteUserPopup && (
        <DeleteUser
          {...{
            setdeleteUserPopup,
            id: userData.id,
            email: userData.email,
            refetch,
          }}
        />
      )}

      <div
        ref={usersContainer}
        className="xl:w-full lg:w-[850px] md:w-[600px] [450px]:w-[400px] w-[330px] mt-10 overflow-auto pr-5"
      >
        <table className="dark:text-gray-300 text-lightText w-full">
          <thead>
            <tr className="border-t border-b dark:border-borderDark border-borderLight">
              <td className="py-4 font-bold">User</td>
              <td className="font-bold">Email</td>
              <td className="whitespace-nowrap font-bold">Date joined</td>
              <td className="font-bold">Status</td>
              <td className="whitespace-nowrap xl:pr-0 pr-8 font-bold">
                Course joined
              </td>
              <td className="font-bold">Action</td>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                ref={users.at(-1) === user ? observeEle : null}
                key={user?.student_id}
                className="border-t border-b dark:border-borderDark border-borderLight"
              >
                <td className="py-4 xl:pr-0 pr-8 whitespace-nowrap">
                  {`${user?.first_name} ${user?.last_name}`}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {user?.email}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {user?.joined_at?.split("T")[0]}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  <div
                    className={`py-2 px-3 rounded-lg w-fit ${
                      user?.status_user
                        ? "dark:text-green-300 text-green-400 bg-green-400/20"
                        : "dark:text-red-300  text-red-400 bg-red-400/20"
                    }`}
                  >
                    {user?.status_user ? "Active" : "Inactive"}
                  </div>
                </td>
                <td className="whitespace-nowrap">{user?.course_joined}</td>
                <td className="whitespace-nowrap">
                  <div
                    onClick={() => {
                      setdeleteUserPopup(!deleteUserPopup);
                      setUserData({
                        id: user?.student_id,
                        email: user?.email,
                      });
                    }}
                    className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 md:px-0 px-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition"
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isFetching ? (
          <div className="dark:text-red-300 text-red-600 flex justify-center py-5 animate-syncPuls">
            Loading ...
          </div>
        ) : (
          !hasNextPage && (
            <div className="dark:text-red-300 text-red-600 flex justify-center py-5">
              No more users
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Users;

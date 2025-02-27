import { useEffect, useState } from "react";
import DeleteUser from "./DeleteUser";
import useFetch from "../../hooks/useFetch";
function Users() {
 

  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await useFetch("http://localhost:3002/getUsers", null, "GET");
      let arrOfCourses = res.msg.map((data) => {
        const {
          student_id,
          first_name,
          last_name,
          email,
          joined_at,
          role,
          status_user,
        } = data;
        const date = joined_at.split("T")[0];
        if (!(role === "admin")) {
          return {
            key: student_id,
            name: `${first_name} ${last_name}`,
            email: email,
            date: date,
            status: status_user ? "Active" : "Inactive",
            courses: "10",
            action: "Delete",
          };
        }
      });
      setUsers([...arrOfCourses]);
    })();
  }, []);

  const [deleteUserPopup, setdeleteUserPopup] = useState(false);

  const [idUser, setIdUser] = useState(null);
  useEffect(() => {
    console.log(idUser)
  }, [idUser]);
  return (
    <>
      <div className="dark:text-white text-black font-semibold text-4xl ">
        Hello, Admin
      </div>
      <div className="dark:text-gray-400 text-lightText mt-2 ">
        Last Login was yesterday at 2:46 pm
      </div>
      {deleteUserPopup && (
        <DeleteUser setdeleteUserPopup={setdeleteUserPopup} id={idUser} />
      )}
      <div className="xl:w-full lg:w-[850px] md:w-[600px] [450px]:w-[400px] w-[330px] mt-10 h-[650px] overflow-auto pr-5">
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
            {users.map(
              (user) =>
                user && (
                  <tr
                    key={user?.key}
                    className="border-t border-b dark:border-borderDark border-borderLight"
                  >
                    <td className="py-4 xl:pr-0 pr-8 whitespace-nowrap">
                      {user?.name}
                    </td>
                    <td className="xl:pr-0 pr-8 whitespace-nowrap">
                      {user?.email}
                    </td>
                    <td className="xl:pr-0 pr-8 whitespace-nowrap">
                      {user?.date}
                    </td>
                    <td className="xl:pr-0 pr-8 whitespace-nowrap">
                      <div
                        className={`py-2 px-3 rounded-lg w-fit ${
                          user?.status === "Active"
                            ? "dark:text-green-300 text-green-400 bg-green-400/20"
                            : "dark:text-red-300  text-red-400 bg-red-400/20"
                        }`}
                      >
                        {user?.status}
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{user?.courses}</td>
                    <td className="whitespace-nowrap">
                      <div
                        onClick={() => {
                          setdeleteUserPopup(!deleteUserPopup);
                          setIdUser(user?.key);
                        }}
                        id={user?.key}
                        className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 md:px-0 px-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition"
                      >
                        {user?.action}
                      </div>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;

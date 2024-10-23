import { useEffect, useState } from "react";

function Users() {
  const users = [
    {
      key: 1,
      name: "Hisham",
      email: "Hisham.raid@yahoo.com",
      date: "22 Dec 2024",
      status: "Active",
      courses: "10",
      action: "Delete",
    },
    {
      key: 2,
      name: "Mohammed",
      email: "m7md@gmail.com",
      date: "15 Dec 2024",
      status: "Inactive",
      courses: "2",
      action: "Delete",
    },
    {
      key: 3,
      name: "Ali",
      email: "ali123@gmail.com",
      date: "10 Dec 2024",
      status: "Active",
      courses: "5",
      action: "Delete",
    },
    {
      key: 4,
      name: "Sara",
      email: "sara.khan@yahoo.com",
      date: "08 Dec 2024",
      status: "Inactive",
      courses: "3",
      action: "Delete",
    },
    {
      key: 5,
      name: "Lina",
      email: "lina23@outlook.com",
      date: "05 Dec 2024",
      status: "Active",
      courses: "8",
      action: "Delete",
    },
    {
      key: 6,
      name: "Ahmed",
      email: "ahmed.j@gmail.com",
      date: "02 Dec 2024",
      status: "Inactive",
      courses: "1",
      action: "Delete",
    },
    {
      key: 7,
      name: "Fatima",
      email: "fatima.z@yahoo.com",
      date: "29 Nov 2024",
      status: "Active",
      courses: "7",
      action: "Delete",
    },
    {
      key: 8,
      name: "Omar",
      email: "omar_x@hotmail.com",
      date: "22 Nov 2024",
      status: "Inactive",
      courses: "4",
      action: "Delete",
    },
    {
      key: 9,
      name: "Mariam",
      email: "mariam_l@gmail.com",
      date: "18 Nov 2024",
      status: "Active",
      courses: "6",
      action: "Delete",
    },
    {
      key: 10,
      name: "Khaled",
      email: "khaled.mohammed@gmail.com",
      date: "15 Nov 2024",
      status: "Inactive",
      courses: "3",
      action: "Delete",
    },
    {
      key: 11,
      name: "Khaled",
      email: "khaled.mohammed@gmail.com",
      date: "15 Nov 2024",
      status: "Inactive",
      courses: "3",
      action: "Delete",
    },
  ];
  return (
    <>
      <div className="text-white font-semibold text-4xl px-5">Hello, Admin</div>
      <div className="text-gray-400 mt-2 px-5">
        Last Login was yesterday at 2:46 pm
      </div>
      <div className="xl:w-full lg:w-[850px] md:w-[600px] [450px]:w-[400px] w-[330px] mt-10 h-[650px] overflow-auto px-5">
        <table className="text-gray-300 w-full">
          <thead>
            <tr className="border-t border-b border-borderDark">
              <td className="py-4 font-bold">User</td>
              <td className="font-bold">Email</td>
              <td className="whitespace-nowrap font-bold">Date joined</td>
              <td className="font-bold">Status</td>
              <td className="whitespace-nowrap xl:pr-0 pr-8 font-bold">Course joined</td>
              <td  className="font-bold">Action</td>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.key}
                className="border-t border-b border-borderDark"
              >
                <td className="py-4 xl:pr-0 pr-8 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">{user.email}</td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">{user.date}</td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  <div
                    className={`py-2 px-3 rounded-lg w-fit ${
                      user.status === "Active"
                        ? "text-green-300 bg-green-400/20"
                        : "text-red-300 bg-red-400/20"
                    }`}
                  >
                    {user.status}
                  </div>
                </td>
                <td className="whitespace-nowrap">{user.courses}</td>
                <td className="whitespace-nowrap">
                  <div
                    id="1"
                    className="cursor-pointer bg-red-500/70 py-2 text-center rounded-md hover:bg-gray-800 hover:text-white transition"
                  >
                    {user.action}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;

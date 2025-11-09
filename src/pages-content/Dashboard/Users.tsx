"use client";
import { useState } from "react";
import TableScroll from "@/components/TableScroll";
import DeletePopUp from "@/components/DeletePopUp";
import { User } from "@/types";
function Users() {
  const [deleteUserPopup, setdeleteUserPopup] = useState<boolean>(false);

  const [userData, setUserData] = useState<
    (User & { refetch: () => void }) | null
  >();

  return (
    <>
      {deleteUserPopup && (
        <DeletePopUp
          {...{
            setDeletePopup: setdeleteUserPopup,
            id: String(userData?.student_id) ?? "",
            data_name: userData?.email ?? "",
            refetch: userData?.refetch ?? function () {},
            endpoint: "deleteUser",
            data_id: "user_id",
          }}
        />
      )}
      <TableScroll<User>
        title="Hello Admin"
        subtitle="Track users here ..."
        data_key="users"
        data_id="student_id"
        endpoint="getUsers"
        columns={[
          {
            key: "first_name",
            label: "User",
          },
          { key: "email", label: "email" },
          {
            key: "joined_at",
            label: "Date joined",
            render: (value) => value?.split("T")[0],
          },
          {
            key: "status_user",
            label: "Status",
            render: (value) => (
              <div
                className={`py-2 px-3 rounded-lg w-fit ${
                  value
                    ? "dark:text-green-300 text-green-400 bg-green-400/20"
                    : "dark:text-red-300 text-red-400 bg-red-400/20"
                }`}
              >
                {value ? "Active" : "Inactive"}
              </div>
            ),
          },
          {
            key: "course_joined",
            label: "Course Joined",
            render: (value) => value || 0,
          },
          { key: "action", label: "Action" },
        ]}
        customActions={(user, refetch) => (
          <div
            onClick={() => {
              setUserData({
                ...user,
                refetch,
              });
              setdeleteUserPopup(true);
            }}
            className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 px-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition"
          >
            Delete
          </div>
        )}
        Component={undefined}
      />
    </>
  );
}

export default Users;

"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Avatar from "@/components/shared/Avatar";
import TableScroll from "@/components/admin/TableScroll";
import DeletePopUp from "@/components/admin/DeletePopUp";
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
        title="Users"
        subtitle="Manage the people learning on your platform."
        data_key="users"
        data_id="student_id"
        endpoint="getUsers"
        columns={[
          {
            key: "first_name",
            label: "User",
            render: (_, user) => (
              <div className="flex min-w-44 items-center gap-3">
                <Avatar img={user.image_url} className="size-10 shrink-0" />
                <span className="font-semibold">
                  {user.first_name} {user.last_name}
                </span>
              </div>
            ),
          },
          { key: "email", label: "Email" },
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
                className={`py-2 px-3 rounded-md w-fit ${
                  value
                    ? "dark:text-green-300 text-green-700 bg-green-400/10"
                    : "dark:text-red-300 text-red-700 bg-red-400/10"
                }`}
              >
                {value ? "Active" : "Inactive"}
              </div>
            ),
          },
          {
            key: "course_joined",
            label: "Enrolled courses",
            render: (value) => value || 0,
          },
          { key: "action", label: "Action" },
        ]}
        customActions={(user, refetch) => (
          <Button
            variant="ghost"
            className="min-h-11 text-red-700 hover:bg-red-500/10 hover:text-red-700 dark:text-red-300"
            aria-label={`Delete ${user.email}`}
            onClick={() => {
              setUserData({ ...user, refetch });
              setdeleteUserPopup(true);
            }}
          >
            <Trash2 aria-hidden="true" />
            Delete
          </Button>
        )}
        Component={undefined}
      />
    </>
  );
}

export default Users;

import React, { useState } from "react";
import Avatar from "../Avatar";
import hisham from "../../assets/Screenshot_1.jpg";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const profile = [
  {
    key: 1,
    name: "First name",
    data: "Hisham",
  },
  {
    key: 2,
    name: "Last name",
    data: "Abualhaj",
  },
  {
    key: 3,
    name: "Email",
    data: "hisham.raid@yahoo.com",
  },
  {
    key: 4,
    name: "Birth Of Date",
    data: "14/08/2001",
  },
  {
    key: 5,
    name: "Gender",
    data: "Male",
  },
  {
    key: 6,
    name: "Joined At",
    data: "11/15/2024 7:44pm",
  },
  {
    key: 7,
    name: "Course Completed",
    data: "5",
  },
];
function Profile() {
  const [state, setState] = useState("Profile");
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="sm:px-5 px-1 flex items-center height-vh-adjust">
      <div className=" dark:bg-lightDark w-full bg-white border dark:border-borderDark flex items-center flex-col  box-shadow-light dark:box-shadow rounded-md h-[800px] overflow-auto">
        <div className="w-full p-5 flex justify-between">
          <FontAwesomeIcon
            onClick={() => {
              setState("Edit");
              setIsEdit(true);
            }}
            className="w-8 h-8 dark:text-gray-400 text-black cursor-pointer hover:text-black/50 dark:hover:text-white"
            icon={faGear}
          />
          {isEdit && (
            <FontAwesomeIcon
              onClick={() => {
                setState("Profile");
                setIsEdit(false);
              }}
              className="cursor-pointer w-8 h-8 hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          )}
        </div>
        <div className="">
          <Avatar img={hisham} className="h-[250px] w-[250px]" />
        </div>
        <div className="flex w-full flex-col gap-5 py-16 lg:px-16 md:px-8 sm:px-4 px-2">
          {state === "Profile" ? (
            profile.map((data) => (
              <div
                key={data.key}
                className="text-xl flex gap-2 border dark:border-borderDark p-4 rounded-md"
              >
                {data.name}: <div className="font-bold">{data.data}</div>
              </div>
            ))
          ) : (
            <EditProfile />
          )}
          {isEdit && (
            <div className="cursor-pointer dark:bg-gray-500/70 bg-none dark:border-none border  py-2 px-2 text-center rounded-md dark:hover:bg-gray-800 hover:bg-gray-800 text-black dark:text-white hover:text-white  transition">
              EDIT
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EditProfile() {
  return (
    <>
      {profile.map((data) => (
        <div
          key={data.key}
          className="text-xl items-center flex gap-2 border dark:border-borderDark p-4 rounded-md"
        >
          {data.name}:{" "}
          <div className="text-slate-300 flex-1">
            <input
              value={data.data}
              className="border dark:border-borderDark w-full"
              type="text"
            />
          </div>
        </div>
      ))}
    </>
  );
}
export default Profile;

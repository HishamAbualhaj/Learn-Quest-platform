import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import hisham from "../../assets/Screenshot_1.jpg";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../Hooks/useFetch";

function Profile() {
  const [state, setState] = useState("Profile");
  const [isEdit, setIsEdit] = useState(false);
  const [profileData, setProfileData] = useState([
    {
      key: 1,
      name: "First name",
      data: "first_name",
    },
    {
      key: 2,
      name: "Last name",
      data: "last_name",
    },
    {
      key: 3,
      name: "Email",
      data: "email",
    },
    {
      key: 4,
      name: "Birth Of Date",
      data: "date",
    },
    {
      key: 5,
      name: "Gender",
      data: "gender",
    },
    {
      key: 6,
      name: "Joined At",
      data: "join",
    },
    {
      key: 7,
      name: "Course Completed",
      data: "5",
    },
  ]);
  const [data, setData] = useState({});
  useEffect(() => {
    (async function fetchData() {
      const response = await useFetch(
        "http://localhost:3002/session",
        null,
        "GET"
      );
      let id = response.msg.userId;

      // after getting user id then fetch for data
      const user = {
        id: id,
      };
      (async () => {
        const res = await useFetch(
          "http://localhost:3002/getUserData",
          user,
          "POST"
        );
        console.log(res);
        if (res.msg.data) {
          const [
            { first_name, last_name, email, gender, joined_at, birthdate },
          ] = res.msg.data;

          const date = birthdate.split("T")[0];
          const join = joined_at.split("T")[0];
          setData({
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            joined_at: join,
            birthdate: date,
          });
          // const student_data = [
          // {
          //   key: 1,
          //   name: "First name",
          //   data: first_name,
          // },
          // {
          //   key: 2,
          //   name: "Last name",
          //   data: last_name,
          // },
          // {
          //   key: 3,
          //   name: "Email",
          //   data: email,
          // },
          // {
          //   key: 4,
          //   name: "Birth Of Date",
          //   data: date,
          // },
          // {
          //   key: 5,
          //   name: "Gender",
          //   data: gender,
          // },
          // {
          //   key: 6,
          //   name: "Joined At",
          //   data: join,
          // },
          // {
          //   key: 7,
          //   name: "Course Completed",
          //   data: "5",
          // },
          // ];
          // setProfileData(student_data);
        }
      })();
    })();
  }, []);
  function handleChange(e) {
    const { id, value } = e.target;

    // setProfileData();
    console.log("Updated profile data: ", value);
    // setProfileData(updatedProfileData);

    console.log(id, value);
  }

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);
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
            profileData.map((data) => (
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

  function EditProfile() {
    return (
      <>
        {profileData.map((obj) => (
          <div
            key={obj.key}
            className="text-xl items-center flex gap-2 border dark:border-borderDark p-4 rounded-md"
          >
            {obj.name}:
            <div className="text-slate-300 flex-1">
              <input
                id={obj.key}
                onChange={handleChange}
                className="border dark:border-borderDark w-full"
                type="text"
              />
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default Profile;

import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { faGear, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../Hooks/useFetch";
import ButtonAdmin from "../Dashboard/ButtonAdmin";
import Alert from "../Alert";
function Profile() {
  const [state, setState] = useState("Profile");
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState([
    {
      key: 1,
      name: "First name",
      data: "",
      inType: "text",
    },
    {
      key: 2,
      name: "Last name",
      data: "",
      inType: "text",
    },
    {
      key: 3,
      name: "Email",
      data: "",
      inType: "email",
    },
    {
      key: 4,
      name: "Birth Of Date",
      data: "",
      inType: "date",
    },
    {
      key: 5,
      name: "Gender",
      data: "",
      inType: "select",
    },
    {
      key: 6,
      name: "Joined At",
      data: "",
      inType: "date",
    },
    {
      key: 7,
      name: "Course Completed",
      data: "5",
    },
    {
      key: 8,
      name: "Image",
      data: null,
    },
  ]);

  useEffect(() => {
    if (!isEdit) {
      getData();
      async function getData() {
        let image_url_temp = "";
        const response = await useFetch(
          "http://localhost:3002/session",
          null,
          "GET"
        );
        let [{ student_id }] = response.msg.userData;
        setUserId(student_id);
        // after getting user id then fetch for data
        const user = {
          id: student_id,
        };

        const res = await useFetch(
          "http://localhost:3002/getUserData",
          user,
          "POST"
        );
        if (res.msg.data) {
          const [
            {
              first_name,
              last_name,
              email,
              gender,
              joined_at,
              birthdate,
              image_url,
            },
          ] = res.msg.data;
          image_url_temp = image_url;

          const date = birthdate.split("T")[0];
          const join = joined_at.split("T")[0];

          const values = [
            first_name,
            last_name,
            email,
            date,
            gender,
            join,
            "5",
            image_url,
          ];
          const arr = data.map((_, index) => {
            // Change all values as they are arranged at array above !
            data[index] = {
              ...data[index],
              data: values[index],
            };
            return data[index];
          });
          setData(arr);
        }
        setImageUrl(`http://localhost:3002/uploads/${image_url_temp}`);
      }
    }
  }, [isEdit]);

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
        {state === "Profile" ? (
          <div className="">
            <Avatar img={imageUrl} className="h-[250px] w-[250px]" />
          </div>
        ) : (
          <></>
        )}

        <div className="flex w-full flex-col gap-5 py-6 lg:px-16 md:px-8 sm:px-4 px-2">
          {state === "Profile" ? (
            data.map((data) =>
              data.key == 8 ? (
                <></>
              ) : (
                <div
                  key={data.key}
                  className="text-xl flex gap-2 border dark:border-borderDark p-4 rounded-md"
                >
                  {data.name}: <div className="font-bold">{data.data}</div>
                </div>
              )
            )
          ) : (
            <EditProfile />
          )}
        </div>
      </div>
    </div>
  );
  function EditProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [imageChange, setImageChange] = useState(false);
    const [alert, setAlert] = useState({
      status: "",
      msg: "",
      redirect: false,
    });

    const [dataProfile, setDataProfile] = useState(data);

    async function uploadImage() {
      //Specific case for uploading image, (No need to manually set Content-Type)
      const response = await fetch("http://localhost:3002/handleUploads", {
        method: "POST",
        body: file,
      });
      const res = await response.json();
      console.log(res);
    }

    const handleChange = (e) => {
      const { id, value } = e.target;
      const newProfile = dataProfile.map((obj, index) => {
        if (obj.key === Number(id)) {
          // Change the value of current input (obj)
          dataProfile[index] = {
            ...dataProfile[index],
            data: value,
          };
          return dataProfile[index];
        } else {
          return obj;
        }
      });
      setDataProfile(newProfile);
    };

    const handleImageChange = (e) => {
      const formdata = new FormData();
      formdata.append("image", e.target?.files[0]);
      formdata.append("id", userId);
      setFile(formdata);

      setImageChange(true);
      dataProfile[7] = {
        ...dataProfile[7],
        data: e.target?.files[0].name,
      };
      setDataProfile(dataProfile);
    };

    async function handleProfileEdit() {
      // setting data ready for server formate !
      const obj = {
        student_id: userId,
        first_name: dataProfile[0].data,
        last_name: dataProfile[1].data,
        email: dataProfile[2].data,
        birthdate: dataProfile[3].data,
        image_url: dataProfile[7].data,
        gender: dataProfile[4].data,
        isImageChange: imageChange,
      };

      setIsLoading(true);
      console.log(obj);

      {
        imageChange && (await uploadImage());
      }

      const res = await useFetch(
        "http://localhost:3002/updateUser",
        obj,
        "PUT"
      );
      console.log(res);
      setIsLoading(false);
      setAlert(res);
    }
    useEffect(() => {
      const timer = setTimeout(() => {
        if (alert.status) {
          setState("Profile");
          setIsEdit(false);
        }
        return () => {
          clearTimeout(timer);
        };
      }, 1500);
    }, [alert]);
    return (
      <div>
        <div className="w-fit mx-auto">
          <Avatar img={imageUrl} className="h-[250px] w-[250px]" />
          <div className="relative">
            <div className="right-0 absolute text-white -top-14 shadow-custom text-xl dark:bg-lightDark px-4 py-3 cursor-pointer rounded-[100%]">
              <FontAwesomeIcon icon={faUpload} />
            </div>
            <input
              id="image"
              onChange={handleImageChange}
              type="file"
              className="w-[52px] h-[52px] absolute right-0 -top-14 opacity-0"
            />
          </div>
        </div>

        {dataProfile.map((data) =>
          data.key == 8 ? (
            <></>
          ) : (
            <div
              key={data.key}
              className="text-xl items-center flex gap-2 border dark:border-borderDark p-4 rounded-md mt-5"
            >
              {data.name}:
              <div className="text-slate-300 flex-1">
                {data.inType === "select" ? (
                  <select
                    onChange={handleChange}
                    className="w-full"
                    id={data.key}
                  >
                    <option className="text-black" value="Male">
                      Male
                    </option>
                    <option className="text-black" value="Female">
                      Female
                    </option>
                  </select>
                ) : (
                  <input
                    id={data.key}
                    onChange={handleChange}
                    value={data.data || " "}
                    className="border dark:border-borderDark w-full"
                    type={data.inType}
                    disabled={data.key === 6}
                  />
                )}
              </div>
            </div>
          )
        )}
        {alert.status ? (
          <Alert msg={alert.msg} type="success" />
        ) : (
          <Alert msg={alert.msg} type="failed" />
        )}
        {isEdit &&
          (isLoading ? (
            <div>
              <ButtonAdmin text="LOADING ... " />
            </div>
          ) : (
            <div
              onClick={() => {
                handleProfileEdit();
              }}
            >
              <ButtonAdmin text="Edit Profile" />
            </div>
          ))}
      </div>
    );
  }
}

export default Profile;

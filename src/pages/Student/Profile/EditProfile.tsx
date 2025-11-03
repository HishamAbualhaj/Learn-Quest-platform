"use client";
import Alert from "@/components/Alert";
import Avatar from "@/components/Avatar";
import API_BASE_URL from "@/config/config";
import useFetch from "@/hooks/useFetch";
import ButtonAdmin from "@/pages/Dashboard/ButtonAdmin";
import { faGear, faUpload, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

interface EditProfileProps {
  data_profile: {
    key: number;
    name: string;
    data: string;
    inType?: string;
  }[];
  userId: string;
}
function EditProfile({ data_profile, userId }: EditProfileProps) {
  const [file, setFile] = useState<FormData>(new FormData());
  const [tempUrl, setTempUrl] = useState<boolean | string>(false);
  const [imageChange, setImageChange] = useState(false);
  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: string;
  } | null>(null);

  const [dataProfile, setDataProfile] = useState(data_profile);

  async function uploadImage() {
    //Specific case for uploading image, (No need to manually set Content-Type)
    const response = await fetch(`${API_BASE_URL}/handleUploads`, {
      method: "POST",
      body: file,
    });
    await response.json();
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    },
    []
  );

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const formdata = new FormData();
      formdata.append("image", e.target?.files ? e.target?.files[0] : "");
      formdata.append("id", userId);
      setFile(formdata);

      setImageChange(true);
      dataProfile[7] = {
        ...dataProfile[7],
        data: e.target?.files ? e.target?.files[0].name : "",
      };
      setDataProfile(dataProfile);
      if (e.target?.files) setTempUrl(URL.createObjectURL(e.target?.files[0]));
    },
    [file]
  );

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

  const { data, isPending, mutate } = useMutation({
    mutationFn: async () => {
      return await useFetch(`${API_BASE_URL}/updateUser`, obj, "PUT");
    },
    onSuccess: () => {
      handleImageUpload();
    },
  });

  async function handleImageUpload() {
    {
      imageChange && (await uploadImage());
    }
  }

  useEffect(() => {
    setAlert(data ?? null);
  }, [data]);

  return (
    <>
      <div className="sm:px-5 px-1">
        <div className="dark:bg-lightDark w-full bg-white border dark:border-borderDark border-borderLight box-shadow-light dark:box-shadow rounded-md h-[800px] overflow-auto">
          <div className="w-full p-5 flex justify-end">
            <Link href="profile">
              <FontAwesomeIcon
                className="text-xl w-10 h-10 dark:text-gray-400 text-black cursor-pointer hover:text-black/50 dark:hover:text-white"
                icon={faX}
              />
            </Link>
          </div>
          <div className="w-fit mx-auto pt-5">
            <Avatar
              isBlob={Boolean(tempUrl)}
              img={imageChange ? tempUrl : `${dataProfile[7].data}`}
              className="h-[250px] w-[250px]"
            />
            <div className="relative  cursor-pointer ">
              <div className="right-0 absolute text-white -top-14 shadow-custom text-xl dark:bg-lightDark bg-dark px-4 py-3 rounded-[100%]">
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
          <div className="py-6 lg:px-16 md:px-8 sm:px-4 px-2">
            {dataProfile.map((data) =>
              data.key == 8 ? (
                <></>
              ) : (
                <div
                  key={data.key}
                  className="text-xl items-center flex gap-2 border dark:border-borderDark border-borderLight p-4 rounded-md mt-5"
                >
                  {data.name}:
                  <div className="text-slate-300 flex-1">
                    {data.inType === "select" ? (
                      <select
                        onChange={handleChange}
                        className="w-full"
                        id={data.key.toString()}
                        value={data.data}
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
                        id={data.key.toString()}
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

            <div className="mt-5">
              {alert &&
                (alert?.status ? (
                  <Alert msg={alert?.msg} type="success" />
                ) : (
                  <Alert msg={alert?.msg} />
                ))}
            </div>
            {isPending ? (
              <div>
                <ButtonAdmin text="LOADING ... " />
              </div>
            ) : (
              <div
                onClick={() => {
                  mutate();
                }}
              >
                <ButtonAdmin text="Edit Profile" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;

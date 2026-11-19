"use client";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/form-input";
import PageIntro from "@/components/PageIntro";
import Alert from "@/components/Alert";
import Avatar from "@/components/Avatar";
import API_BASE_URL from "@/config/config";
import useFetch from "@/hooks/useFetch";

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
    [],
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
    [file],
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
      <PageIntro
        eyebrow="05 / MAKE IT YOURS"
        title="A little more you."
        description="Keep your details up to date so your learning space feels like home."
      />
      <>
        <div className="min-w-0">
          <div className="dark:bg-lightDark w-full bg-white border dark:border-borderDark border-borderLight box-shadow-light dark:box-shadow rounded-md min-h-[500px]">
            <div className="w-full p-5 flex justify-end">
              <Link href="/student/profile" aria-label="Back to your profile">
                <FontAwesomeIcon
                  className="text-xl w-10 h-10 dark:text-gray-400 text-black cursor-pointer hover:text-lightText/65 dark:hover:text-white"
                  icon={faX}
                />
              </Link>
            </div>
            <div className="w-fit mx-auto pt-5">
              <Avatar
                isBlob={Boolean(tempUrl)}
                img={imageChange ? String(tempUrl) : `${dataProfile[7].data}`}
                className="h-[120px] w-[120px] ring-8 ring-mainClr/10 dark:ring-mainClrDark/10"
              />
              <div className="relative  cursor-pointer ">
                <div className="right-0 absolute text-white -top-14 shadow-custom text-xl dark:bg-lightDark bg-dark px-4 py-3 rounded-md">
                  <FontAwesomeIcon icon={faUpload} />
                </div>
                <Input
                  aria-label="Upload a profile photo"
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
                    className="text-sm items-start flex flex-col gap-2 border dark:border-borderDark border-borderLight p-4 rounded-md mt-5"
                  >
                    <label htmlFor={data.key.toString()}>{data.name}</label>
                    <div className="w-full text-lightText dark:text-white">
                      {data.inType === "select" ? (
                        <FormSelect
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
                        </FormSelect>
                      ) : (
                        <Input
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
                ),
              )}

              <div className="mt-5">
                {alert &&
                  (alert?.status ? (
                    <Alert msg={alert?.msg} type="success" />
                  ) : (
                    <Alert msg={alert?.msg} />
                  ))}
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={() => mutate()}
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-mainClr px-6 text-sm font-semibold text-white transition hover:bg-mainClr/90 disabled:cursor-wait disabled:opacity-60 dark:bg-mainClr dark:text-white"
              >
                {isPending ? "Saving your details..." : "Save your changes"}
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default EditProfile;

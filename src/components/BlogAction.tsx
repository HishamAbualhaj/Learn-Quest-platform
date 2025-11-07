"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonAdmin from "../pages/Dashboard/ButtonAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import API_BASE_URL from "../config/config";
import Alert from "./Alert";
import Link from "next/link";
import { BlogType, User } from "@/types";
interface BlogActionProps {
  endpoint: string;
  blog_id: string;
  action: "add" | "edit";
  title: string;
  method: string;
  userData: User;
  blogDataResponse: BlogType | {};
}
function BlogAction({
  endpoint,
  blog_id,
  action,
  title,
  method,
  userData,
  blogDataResponse,
}: BlogActionProps) {
  const [blogData, setBlogData] = useState<BlogType | {}>(blogDataResponse);

  const [image, setImage] = useState<HTMLInputElement | null>(null);

  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: { id: number; msg: string } | string;
  } | null>(null);
  const inputs = [
    {
      key: 1,
      id: "title",
      title: "Title : ",
      inType: "text",
      placeholder: "Blog Title Here",
    },
    {
      key: 2,
      id: "subtitle",
      title: "Sub title : ",
      inType: "text",
      placeholder: "Blog Subtitle",
    },
  ];

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const updatedBlogData = {
        ...blogData,
        admin_id: userData.student_id,
        role: userData.role,
        email: userData.email,
      };
      const data = await useFetch<{ id: number; msg: string } | string>(
        `${API_BASE_URL}/${endpoint}`,
        updatedBlogData,
        method
      );
      const res = data.msg as unknown as { id: number; msg: string };
      const { id } = res;

      const currentId = action === "add" ? id : blog_id;

      if (image) {
        const formData = new FormData();
        formData.append("image", image.files![0]);
        formData.append("id", String(currentId));
        await uploadImage(formData);
      }
      return data;
    },
    onSuccess: (data) => {
      setAlert(data);
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
  async function uploadImage(file) {
    //Specific case for uploading image, (No need to manually set Content-Type)
    const response = await fetch(`${API_BASE_URL}/handleUploads`, {
      method: "POST",
      body: file,
      credentials: "include",
    });
    await response.json();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (typeof e === "string") {
      setBlogData((prev) => ({
        ...prev,
        content: e,
      }));

      return;
    }
    let { id, value } = e.target;

    if (
      id === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      value = e.target.files[0]?.name;
      setImage(e.target);

      setBlogData((prev) => ({
        ...prev,
        image_url: value,
      }));
      return;
    }
    setBlogData((prev) => ({ ...prev, [id]: value }));
  }
  return (
    <>
      <div className="rounded-sm  w-full overflow-auto h-[800px]">
        <div className="text-center dark:text-white text-black text-xl py-5 border-b dark:border-borderDark border-borderLight flex justify-between px-4">
          {title}
          <Link href="/dashboard/blogs">
            <FontAwesomeIcon
              className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          </Link>
        </div>

        <div className="p-3">
          {alert &&
            (alert.status ? (
              <Alert
                msg={typeof alert.msg === "string" ? alert.msg : alert.msg.msg}
                type="success"
              />
            ) : (
              <Alert
                msg={typeof alert.msg === "string" ? alert.msg : alert.msg.msg}
              />
            ))}
          {inputs.map((input) => (
            <div
              key={input.key}
              className="flex flex-col mt-2 dark:text-white text-lightText"
            >
              <label htmlFor={input.id}>{input.title}</label>
              <input
                onChange={handleChange}
                placeholder={input.placeholder}
                id={input.id}
                className="mt-2"
                type={input.inType}
                value={blogData[input.id]}
              />
            </div>
          ))}

          <div className="flex flex-col mt-2 dark:text-white text-lightText ">
            <label htmlFor="image">Image : </label>

            <div className="image-handle relative cursor-pointer mt-2">
              <div className="border_platform all rounded-md flex justify-center py-10">
                <div className="text-xl "> Upload image</div>
                <input
                  id="image"
                  onChange={handleChange}
                  type="file"
                  className="rounded-md w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* <ReactQuill
            theme="snow"
            value={blogData.content || ""}
            onChange={handleChange}
            className="quill-wrapper mt-5"
          /> */}
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
              <ButtonAdmin text={String(action).toUpperCase()} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogAction;

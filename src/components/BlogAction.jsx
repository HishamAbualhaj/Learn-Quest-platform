import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ButtonAdmin from "../pages/Dashboard/ButtonAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../hooks/useFetch";
import API_BASE_URL from "../config/config";
import Alert from "./Alert";
import { UserData } from "../context/UserDataContext";
function BlogAction({ endpoint, method, action, blog_id, title }) {
  const [blogData, setBlogData] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const [user_data, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState(null);
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
  const data_user = useContext(UserData);
  useEffect(() => {
    if (data_user) {
      const [{ student_id, role, email }] = data_user?.userData;
      setUserData({ student_id, role, email });
    }
  }, [data_user]);

  useEffect(() => {
    if (blog_id && user_data) {
      async function getData() {
        const res = await useFetch(
          `${API_BASE_URL}/getBlogData`,
          { blog_id },
          "POST"
        );
        const [blogDataFetched] = res.msg;

        setBlogData(blogDataFetched);

        setBlogData((pre) => ({
          ...pre,
          blog_id: Number(blog_id),
        }));
      }
      getData();
    }
  }, [blog_id, user_data]);

  const { data, isPending, mutate } = useMutation({
    mutationFn: async () => {
      const updatedBlogData = {
        ...blogData,
        admin_id: user_data.student_id,
        role: user_data.role,
        email: user_data.email,
      };
      const data = await useFetch(
        `${API_BASE_URL}/${endpoint}`,
        updatedBlogData,
        method
      );

      const { id } = data?.msg;

      const currentId = action === "add" ? id : blog_id;

      if (image) {
        const formData = new FormData();
        formData.append("image", image.files[0]);
        formData.append("id", currentId);
        await uploadImage(formData);
      }
      return data;
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

  function handleChange(e) {
    if (typeof e === "string") {
      setBlogData({
        ...blogData,
        content: e,
      });

      return;
    }
    let { id, value } = e.target;

    if (id === "image") {
      value = e.target.files[0]?.name;
      setImage(e.target);

      setBlogData({
        ...blogData,
        image_url: value,
      });
      return;
    }
    setBlogData((prev) => ({ ...prev, [id]: value }));
  }

  useEffect(() => {
    setAlert(data);
  }, [data]);

  useEffect(() => {
    console.log("Data for blog", blogData);
  }, [blogData]);
  return (
    <>
      <div className="rounded-sm  w-full overflow-auto h-[800px]">
        <div className="text-center dark:text-white text-black text-xl py-5 border-b dark:border-borderDark border-borderLight flex justify-between px-4">
          {title}
          <Link to="/dashboard/blogs">
            <FontAwesomeIcon
              className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          </Link>
        </div>

        <div className="p-3">
          {alert &&
            (alert.status ? (
              <Alert msg={alert.msg.msg} type="success" />
            ) : (
              <Alert msg={alert.msg} />
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
                value={blogData[input.id] || ""}
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

          <ReactQuill
            theme="snow"
            value={blogData.content || ""}
            onChange={handleChange}
            className="quill-wrapper mt-5"
          />
          {isPending ? (
            <div>
              <ButtonAdmin text="LOADING ... " />
            </div>
          ) : (
            <div onClick={mutate}>
              <ButtonAdmin text={String(action).toUpperCase()} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogAction;

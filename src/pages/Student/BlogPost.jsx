import { useContext, useEffect, useState } from "react";
import { UserData } from "../../context/UserDataContext";
import useFetch from "../../hooks/useFetch";
import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "../../config/config";

import { useLocation } from "react-router-dom";
import Comments from "./Comments";
function BlogPost() {
  const [user_data, setUserData] = useState(null);
  const [blog_id, setBlogId] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const blog_url = useLocation();

  useEffect(() => {
    const blog_data = blog_url.pathname.split("/").at(-1);
    const id = blog_data.split("-")[0];
    setBlogId(id);
  }, [blog_url]);

  const data_user = useContext(UserData);
  useEffect(() => {
    if (data_user) {
      const userDataArray = data_user?.userData;
      if (userDataArray) {
        const { student_id, email, first_name, image_url, role } =
          userDataArray[0];
        setUserData({
          student_id,
          blog_id,
          email,
          first_name,
          role,
        });
      }
    }
  }, [data_user]);

  const { data } = useQuery({
    queryFn: async () => {
      if (!blog_id) return;
      return await useFetch(
        `${API_BASE_URL}/getBlogData`,
        {
          blog_id,
        },
        "POST"
      );
    },
    queryKey: ["blog_data", blog_id],
    enabled: !!blog_id,
    refetchOnMount: true,
  });

  useEffect(() => {
    setBlogData(data?.msg?.[0]);
  }, [data]);
  return (
    <div className="bg-lightLayout dark:bg-gray-800/20 border_platform all xl:m-5 m-2 !mb-0">
      <div className="max-w-[1100px] mx-auto leading-8 py-10 sm:max-lg:px-8 px-5 ">
        <div className="">
          <h1 className="sm:text-[30px] text-2xl font-bold leading-10">
            {blogData?.title}
          </h1>
          <img
            className="lg:max-w-[650px] mt-5 mx-auto"
            src={`${API_BASE_URL}/uploads/${blogData?.image_url ?? ""}`}
            alt=""
          />
          <p className="text-lg mt-5">{blogData?.subtitle}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogData?.content }} />
      </div>

      {/* comments  */}
      <div className="m-5 rounded-md">
        <div className="font-semibold text-2xl">Comments</div>
        <div className="mt-3 p-5">
          <Comments
            {...{
              blog_title: blogData?.title,
              ...user_data,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

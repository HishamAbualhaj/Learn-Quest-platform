"use client";
import TableScroll from "@/components/TableScroll";
import ButtonAdmin from "./ButtonAdmin";
import DeletePopUp from "@/components/DeletePopUp";
import { useState } from "react";
import Link from "next/link";
import { BlogType } from "@/types";
function Blogs() {
  const [deleteBlogPopup, setdeleteBloPopup] = useState(false);

  const [blogData, setBlogData] = useState<
    (BlogType & { refetch: () => void }) | null
  >();
  return (
    <>
      {deleteBlogPopup && (
        <DeletePopUp
          {...{
            setDeletePopup: setdeleteBloPopup,
            id: String(blogData?.blog_id) ?? "",
            data_name: blogData?.title ?? "",
            refetch: blogData?.refetch ?? function () {},
            endpoint: "deleteBlog",
            data_id: "blog_id",
          }}
        />
      )}
      <TableScroll<BlogType>
        title="Blog"
        subtitle="Track blog here"
        data_key="blogs"
        data_id="blog_id"
        endpoint="getBlogData"
        columns={[
          { key: "title", label: "Title" },
          { key: "subtitle", label: "Subtitle" },
          { key: "action", label: "Action" },
        ]}
        customActions={(blog, refetch) => (
          <>
            <Link href={`/dashboard/blogs/edit/${blog?.blog_id}`}>
              <div className="cursor-pointer dark:bg-gray-500/70 bg-none dark:border-none border  py-2 px-2 text-center rounded-md dark:hover:bg-gray-800 hover:bg-gray-800 hover:text-white transition">
                Edit
              </div>
            </Link>
            <div
              onClick={() => {
                setdeleteBloPopup(!deleteBlogPopup);
                setBlogData({
                  ...blog,
                  refetch,
                });
              }}
              className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 px-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition lg:px-0"
            >
              Delete
            </div>
          </>
        )}
        Component={
          <Link href="/dashboard/blogs/add">
            <ButtonAdmin text="Add Blog" />
          </Link>
        }
      />
    </>
  );
}

export default Blogs;

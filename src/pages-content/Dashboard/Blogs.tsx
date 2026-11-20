"use client";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import TableScroll from "@/components/TableScroll";

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
        title="Journal"
        subtitle="Create and manage stories that keep your community inspired."
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
            <Button asChild variant="outline" className="min-h-11">
              <Link
                href={`/student/blog/${blog.blog_id}`}
                aria-label={`View ${blog.title}`}
              >
                <Eye aria-hidden="true" />
                View
              </Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <Link
                href={`/dashboard/blogs/edit/${blog.blog_id}`}
                aria-label={`Edit ${blog.title}`}
              >
                <Pencil aria-hidden="true" />
                Edit
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="min-h-11 text-red-700 hover:bg-red-500/10 hover:text-red-700 dark:text-red-300"
              aria-label={`Delete ${blog.title}`}
              onClick={() => {
                setBlogData({ ...blog, refetch });
                setdeleteBloPopup(true);
              }}
            >
              <Trash2 aria-hidden="true" />
              <span className="sr-only">Delete</span>
            </Button>
          </>
        )}
        Component={
          <Button asChild className="min-h-11">
            <Link href="/dashboard/blogs/add">
              <Plus aria-hidden="true" />
              Write post
            </Link>
          </Button>
        }
      />
    </>
  );
}

export default Blogs;

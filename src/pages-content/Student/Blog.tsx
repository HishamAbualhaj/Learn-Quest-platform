"use client"
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import { BlogType } from "@/types";
import Link from "next/link";
function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [lastNode, setLastNode] = useState<HTMLDivElement | null>(null);
  const blogsContainer = useRef<HTMLDivElement | null>(null);

  const { dataFetched, isFetching } = useInfiniteScroll<BlogType>({
    fetchFn: (pagePara) => {
      return useFetch<BlogType>(
        `${API_BASE_URL}/getBlogData`,
        {
          page: pagePara,
        },
        "POST"
      );
    },
    queryKey: ["blogs"],
    scrollContainer: blogsContainer,
    observedEle: lastNode,
    data_id: "blog_id",
  });
  const observedEle = (node: HTMLDivElement) => {
    setLastNode(node);
  };
  useEffect(() => {
    if (dataFetched) {
      setBlogs(dataFetched);
    }
  }, [dataFetched]);

  return (
    <div className="sm:px-5 px-3 py-10">
      <div className="text-4xl">Blog</div>
      <div
        ref={blogsContainer}
        className="grid p-5 dark:bg-lightDark 2xl:grid-cols-3 grid-cols-1 gap-3 mt-5 h-[680px] overflow-auto"
      >
        {!blogs.length && !isFetching ? (
          <div className="flex justify-center xl:text-4xl text-xl font-bold absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            No Blogs are available
          </div>
        ) : (
          blogs?.map((blog) => (
            <div
              ref={blogs.at(-1) === blog ? observedEle : null}
              key={blog.blog_id}
              className=" border dark:border-borderDark"
            >
              <div className="flex p-3 rounded-md gap-5 flex-col">
                <img
                  className=" max-lg:mx-auto  h-[400px] object-cover"
                  src={`${API_BASE_URL}/uploads/${blog.image_url ?? ""}`}
                />
                <div className="flex flex-col mt-5">
                  <div className="font-bold text-2xl">{blog.title}</div>
                  <div className="leading-8 text-lg text-black/50 mt-5 dark:text-white/50 max-w-[680px] line-clamp-4">
                    {blog.subtitle}
                  </div>
                  <div className="underline mt-5 text-purple-300">
                    Author : "Admin"
                  </div>
                  <Link
                    href={`${blog.blog_id}-${blog.title.replace(/\//g, "")}`}
                  >
                    <Button
                      margin="mt-4"
                      text="Read Now"
                      type={undefined}
                      textDarkClr={undefined}
                      hoverTextClr={undefined}
                      hoverDarkTextClr={undefined}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isFetching && (
        <div className="dark:text-red-300 xl:text-3xl lg:text-xl text-red-600 flex justify-center py-5 animate-syncPuls">
          Loading ...
        </div>
      )}
    </div>
  );
}

export default Blog;

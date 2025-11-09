"use client";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import useFetch from "@/hooks/useFetch";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import API_BASE_URL from "@/config/config";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Course } from "@/types";
function AllCourses() {
  const search_text = useSearchParams()?.get("search") || null;
  const select_data = useSearchParams()?.get("type") || null;

  const [fetchData, setFetchData] = useState({
    search_text: search_text,
    select_data: select_data,
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [lastNode, setLastNode] = useState<HTMLDivElement | null>(null);
  const coursesContainer = useRef<HTMLDivElement | null>(null);
  const { dataFetched, isFetching, refetch } = useInfiniteScroll<Course>({
    fetchFn: (pagePara: number) => {
      return useFetch<Course>(
        `${API_BASE_URL}/getCourses`,
        {
          page: pagePara,
          search_text: fetchData.search_text,
          select_data: fetchData.select_data,
        },
        "POST"
      );
    },
    queryKey: ["courses", fetchData.select_data],
    scrollContainer: coursesContainer,
    observedEle: lastNode,
    data_id: "course_id",
  });

  const observedEle = (node: HTMLDivElement) => {
    setLastNode(node);
  };
  useEffect(() => {
    if (dataFetched) {
      setCourses(dataFetched);
    }
  }, [dataFetched]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const setSearchPara = (params: {
    search?: string | null;
    type?: string | null;
  }) => {
    const current = new URLSearchParams(
      Array.from(searchParams?.entries() || [])
    );

    if (params.search !== undefined) {
      params.search
        ? current.set("search", params.search)
        : current.delete("search");
    }
    if (params.type !== undefined) {
      params.type ? current.set("type", params.type) : current.delete("type");
    }

    const query = current.toString();
    router.push(`?${query}`, { scroll: false });
  };

  return (
    <div className="sm:px-5 px-1 height-vh-adjust flex items-center">
      <div
        ref={coursesContainer}
        className=" bg-lightLayout dark:bg-lightDark py-10 overflow-auto h-[800px] flex-1"
      >
        <div className="md:px-5 px-2">
          <div className="flex items-center justify-between md:flex-row flex-col max-md:gap-5">
            <div className="font-semibold text-4xl">Courses</div>
            <div className="flex items-center gap-2 border dark:border-borderDark border-borderLight p-5 relative max-md:w-full max-sm:flex-col">
              <div className="absolute top-0 -translate-y-1/2 left-0 text-lg font-semibold px-5">
                Filter
              </div>
              <input
                onKeyDown={(e) => {
                  if (isFetching) return;
                  e.code === "Enter" ? refetch() : "";
                }}
                onChange={(e) => {
                  setFetchData((prev) => ({
                    ...prev,
                    search_text: e.target.value,
                  }));
                  setSearchPara({
                    search: e.target.value,
                    type: searchParams?.get("type") || null,
                  });
                }}
                className="border dark:border-borderDark border-borderLight  lg:w-[500px] xl:w-[700px] w-full rounded-md"
                type="text"
                placeholder="search by name"
              />
              <select
                onChange={(e) => {
                  if (isFetching) return;
                  setFetchData((prev) => ({
                    ...prev,
                    select_data: e.target.value,
                  }));
                  setSearchPara({
                    search: searchParams?.get("search") || null,
                    type: e.target.value,
                  });
                }}
                className="dark:bg-borderDark dark:border-none border  dark:text-white text-lightText focus:outline-none md:w-[200px] w-full p-2 text-lg appearance-none rounded-md"
                name="courses"
                id=""
              >
                <option className="text-black" value={""}>
                  Select Value
                </option>
                <option className="text-black" value={`Free`}>
                  Free
                </option>
                <option className="text-black" value={`Paid`}>
                  Paid
                </option>
                <option className="text-black" value={`Discount`}>
                  Discount
                </option>
                <option className="text-black" value={`Top-Rated`}>
                  Top Rated
                </option>
              </select>
              <FontAwesomeIcon
                onClick={() => {
                  if (isFetching) return;
                  refetch();
                }}
                className="text-lg sm:px-3 cursor-pointer bg-black/20 rounded-sm py-3 max-sm:w-full"
                icon={faMagnifyingGlass}
              />
            </div>
          </div>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-5 gap-8  mt-5">
            {!courses.length && !isFetching ? (
              <div className="w-full text-center xl:text-4xl text-xl font-bold md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
                No courses are available
              </div>
            ) : (
              courses?.map((course) => (
                <div
                  ref={courses.at(-1) === course ? observedEle : null}
                  key={course.course_id}
                  className="border dark:border-borderDark border-borderLight rounded-xl bg-white dark:bg-dark"
                >
                  <div>
                    <img
                      className="rounded-tr-xl rounded-tl-xl xl:w-[500px] w-full h-[300px] object-cover"
                      src={`${API_BASE_URL}/uploads/${course.image_url ?? ""}`}
                      alt=""
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold lg:text-xl line-clamp-1">
                        {course.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          className="text-yellow-400"
                          icon={faStar}
                        />
                        <div className="text-yellow-400">
                          {course.stars || 0.0}
                        </div>
                      </div>
                    </div>
                    <div className="text-black/50 leading-7 dark:text-white/50 mt-5 line-clamp-4  max-w-[400px]">
                      {course.description}
                    </div>
                    <div className="mt-5 flex gap-2 flex-wrap">
                      {course.tabs?.split(",").map((category, i) => (
                        <div
                          key={i}
                          className="bg-lightLayout min-w-10 text-center dark:bg-lightDark text-[13px] w-fit px-2 py-2 rounded-xl border dark:border-borderDark border-borderLight"
                        >
                          {category}
                        </div>
                      ))}
                    </div>
                    <div className="text-lg mt-4 flex gap-2">
                      Price :
                      {Boolean(course.discount) && (
                        <div className="line-through dark:text-white/50 text-black/40">
                          {course.discount} $
                        </div>
                      )}
                      <div className="">
                        {Boolean(course.price)
                          ? course.price
                          : course.price + " $"}
                      </div>
                    </div>
                    <Link href={`/student/allcourses/${course.course_id}`}>
                      <Button
                        text="Join Now"
                        type={undefined}
                        textDarkClr={undefined}
                        hoverTextClr={undefined}
                        hoverDarkTextClr={undefined}
                      />
                    </Link>
                  </div>
                </div>
              ))
            )}

            {isFetching && (
              <>
                <Loader />
                <Loader />
                <Loader />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCourses;

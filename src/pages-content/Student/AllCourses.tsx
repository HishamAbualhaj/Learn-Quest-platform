"use client";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/form-input";
import { imageUrl } from "@/lib/imageUrl";
import PageIntro from "@/components/PageIntro";
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
        "POST",
      );
    },
    queryKey: ["courses", fetchData.select_data],
    viewportRoot: true,
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
      Array.from(searchParams?.entries() || []),
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
    <>
      <PageIntro
        eyebrow="01 / FOLLOW YOUR CURIOSITY"
        title="Find your next spark."
        description="Explore practical courses and build skills for wherever you want to go."
      />
      <div className="min-w-0">
        <div ref={coursesContainer} className="relative min-w-0 flex-1">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-6 xl:flex-row flex-col max-md:gap-5">
              <div className="font-semibold text-lg">Course library</div>
              <div className="flex items-center gap-2 border dark:border-borderDark border-borderLight p-5 relative max-md:w-full max-sm:flex-col">
                <div className="absolute top-0 -translate-y-1/2 left-3 bg-white px-2 text-sm font-semibold tracking-wider text-mainClr dark:bg-lightDark dark:text-mainClrDark">
                  Filter
                </div>
                <Input
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
                  className="border dark:border-borderDark border-borderLight  md:w-full lg:w-[260px] xl:w-[360px] w-full rounded-md"
                  type="text"
                  aria-label="Search courses"
                  placeholder="Find your next course"
                />
                <FormSelect
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
                  aria-label="Filter courses"
                  name="courses"
                  id=""
                >
                  <option className="text-black" value={""}>
                    All courses
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
                </FormSelect>
                <button
                  type="button"
                  aria-label="Search courses"
                  onClick={() => {
                    if (isFetching) return;
                    refetch();
                  }}
                  className="text-lg sm:px-3 cursor-pointer bg-black/20 rounded-md py-3 max-sm:w-full"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {!courses.length && !isFetching ? (
                <div className="w-full text-center text-lg font-medium col-span-full rounded-md border border-dashed border-borderLight bg-white py-24 dark:border-borderDark dark:bg-lightDark">
                  No courses here yet. Explore a new interest or try another
                  search.
                </div>
              ) : (
                courses?.map((course) => (
                  <div
                    ref={courses.at(-1) === course ? observedEle : null}
                    key={course.course_id}
                    className="overflow-hidden rounded-md border border-borderLight bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-borderDark dark:bg-lightDark"
                  >
                    <div>
                      <img
                        className="rounded-tr-md rounded-tl-md w-full h-[220px] object-cover"
                        src={imageUrl(course.image_url ?? "", "/web.jpg")}
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
                      <div className="text-lightText/65 leading-7 dark:text-textDark mt-5 line-clamp-4  max-w-[400px]">
                        {course.description}
                      </div>
                      <div className="mt-5 flex gap-2 flex-wrap">
                        {course.tabs?.split(",").map((category, i) => (
                          <div
                            key={i}
                            className="bg-lightLayout min-w-10 text-center dark:bg-lightDark text-sm w-fit px-2 py-2 rounded-md border dark:border-borderDark border-borderLight"
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                      <div className="text-lg mt-4 flex gap-2">
                        Price :
                        {Boolean(course.discount) && (
                          <div className="line-through dark:text-textDark text-black/40">
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
                          bgClr="bg-mainClr"
                          bgDarkClr="dark:bg-mainClr"
                          hoverBgClr="hover:bg-mainClr/90"
                          hoverDarkBgClr="dark:hover:bg-mainClr/90"
                          text="Join Now"
                          type={undefined}
                          textDarkClr="dark:text-white"
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
    </>
  );
}

export default AllCourses;

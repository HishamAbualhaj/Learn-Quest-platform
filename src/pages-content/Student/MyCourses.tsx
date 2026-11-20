"use client";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/form-input";
import { imageUrl } from "@/lib/imageUrl";
import PageIntro from "@/components/layout/PageIntro";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/shared/Button";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import Loader from "@/components/feedback/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { EnrolledCourse, User } from "@/types";
import Link from "next/link";
function MyCourses({ userData }: { userData: User }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSearchPara = (params: {
    search?: string | null;
    type?: string | null;
    page?: string | null;
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

  const [arr, setArr] = useState<number[]>([]);

  const page = useSearchParams()?.get("page") || 1;

  const [currentPagePara, setCurrentPage] = useState<number>(Number(page));

  const [fetchData, setFetchData] = useState({
    page: currentPagePara,
    search_text: searchParams?.get("search") || null,
    select_data: searchParams?.get("type") || null,
  });

  const [courses, setCourses] = useState<EnrolledCourse[]>([]);

  const [maxPage, setMaxPage] = useState(1);
  const { data, isFetching, refetch } = useQuery({
    queryFn: async () => {
      if (!userData.student_id) return;
      return await useFetch(
        `${API_BASE_URL}/getEnrolledCourses`,
        {
          page: currentPagePara,
          student_id: userData.student_id,
          search_text:
            fetchData.search_text === "null" ? null : fetchData.search_text,
          select_data:
            fetchData.select_data === "null" ? null : fetchData.select_data,
        },
        "POST",
      );
    },
    queryKey: ["enrolled_courses", currentPagePara, fetchData.select_data],
    enabled: !!userData.student_id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    let tempArr: number[] = [];

    let numberOfElemets = 5;

    let value = currentPagePara / numberOfElemets;

    let currentCycle = Math.ceil(value);

    let maxNum = currentCycle * numberOfElemets;
    let minNum = currentCycle * numberOfElemets - numberOfElemets;

    let startValue = minNum + 1;

    for (let i = startValue; i <= maxNum; i++) {
      tempArr.push(i);
    }

    setArr(tempArr);
  }, [currentPagePara]);

  useEffect(() => {
    if (data) {
      const [currentCourses = [], countArr = []] = Array.isArray(data?.msg)
        ? data.msg
        : [];
      const count = countArr?.[0]?.["COUNT(*)"] ?? 0;
      setMaxPage(count);

      setCourses(currentCourses);
    }
  }, [data]);

  return (
    <>
      <PageIntro
        eyebrow="02 / A LITTLE PROGRESS, EVERY DAY"
        title="Your next chapter."
        description="Pick up where you left off. Every lesson is another step forward."
      />
      <div className="min-w-0">
        <div className="relative min-w-0 flex-1">
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-6 xl:flex-row flex-col max-md:gap-5">
              <div className="font-semibold text-lg">Your course library</div>
              <div className="flex items-center gap-2 border dark:border-borderDark p-5 relative max-md:w-full max-sm:flex-col">
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
                      page: String(currentPagePara),
                      search: e.target.value,
                      type: searchParams?.get("type") || null,
                    });
                  }}
                  className="border dark:border-borderDark md:w-full lg:w-[260px] xl:w-[360px] w-full rounded-md"
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
                      page: String(currentPagePara),
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
                  <option className="text-black" value={"Completed"}>
                    Completed
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
              {!courses?.length && !isFetching ? (
                <div className="w-full text-center text-lg font-medium col-span-full rounded-md border border-dashed border-borderLight bg-white py-24 dark:border-borderDark dark:bg-lightDark">
                  No courses here yet. Explore a new interest or try another
                  search.
                </div>
              ) : (
                courses?.map((course) => (
                  <div
                    key={course.course_id}
                    className="overflow-hidden rounded-md border border-borderLight bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-borderDark dark:bg-lightDark"
                  >
                    <div>
                      <img
                        className="rounded-tr-md rounded-tl-md w-full h-[220px] object-cover"
                        src={imageUrl(course.image_url, "/web.jpg")}
                        alt="Image Course Preview"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold lg:text-xl line-clamp-1">
                          {course.title}
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="dark:text-white text-md">{`${
                            course.stars || 0
                          }`}</div>
                          <FontAwesomeIcon
                            className="text-yellow-400"
                            icon={faStar}
                          />
                        </div>
                      </div>
                      <div className="text-lightText/65 leading-7 dark:text-textDark mt-5 line-clamp-4  max-w-[400px]">
                        {course.description}
                      </div>
                      <div className="mt-5 flex gap-2 flex-wrap">
                        {course.tabs.split(",").map((category) => (
                          <div
                            key={Math.random()}
                            className="bg-lightLayout min-w-10 text-center dark:bg-lightDark text-sm w-fit px-2 py-2 rounded-md border dark:border-borderDark "
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center mt-5 gap-2">
                        <div className=" w-full h-2 border dark:border-borderDark rounded-md ">
                          <div
                            style={{ width: `${course.progress}%` }}
                            className={`bg-green-400 h-full rounded-md`}
                          ></div>
                        </div>
                        <div className="">{course.progress}</div>
                      </div>

                      {Number(course.progress) === 100 ? (
                        <div className="flex items-center text-center gap-2 mt-5">
                          <div className="bg-green-700/70 py-2 rounded-md flex-1 text-white">
                            Completed !
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <Link href={`/student/allcourses/${course.course_id}`}>
                        <Button
                          bgClr="bg-mainClr"
                          bgDarkClr="dark:bg-mainClr"
                          hoverBgClr="hover:bg-mainClr/90"
                          hoverDarkBgClr="dark:hover:bg-mainClr/90"
                          text="Go to course"
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
                  <Loader />
                </>
              )}
            </div>
            {Boolean(courses.length) && (
              <div className="flex justify-center items-center gap-5 mt-10 ">
                <FontAwesomeIcon
                  onClick={() => {
                    if (!isFetching) {
                      if (currentPagePara === 1) return;
                      setSearchPara({
                        page: String(currentPagePara - 1),
                        search: fetchData.search_text,
                        type: fetchData.select_data,
                      });
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                  className={`bg-gray-500/20 p-4 rounded-md hover:bg-slate-400 cursor-pointer ${
                    currentPagePara === 1
                      ? "bg-gray-500/10 opacity-45 cursor-default hover:bg-gray-500/10"
                      : ""
                  }`}
                  icon={faArrowLeft}
                />
                <div className="flex justify-center gap-4 text-lightText dark:text-white">
                  {arr.map((num) => {
                    {
                      return num > Math.ceil(maxPage / 4) ? (
                        <></>
                      ) : (
                        <div
                          onClick={() => {
                            if (!isFetching) {
                              setSearchPara({ page: String(num) });
                              setCurrentPage(Number(num));
                            }
                          }}
                          key={num}
                          className={`bg-gray-500/20 py-2 px-4 rounded-md hover:bg-slate-400 cursor-pointer ${
                            (Number(searchParams?.get("page")) || 1) === num
                              ? "bg-purple-700 text-white"
                              : ""
                          }`}
                        >
                          {num}
                        </div>
                      );
                    }
                  })}
                </div>
                <FontAwesomeIcon
                  onClick={() => {
                    if (!isFetching) {
                      if (currentPagePara >= Math.ceil(maxPage / 4)) return;
                      setSearchPara({
                        page: String(currentPagePara + 1),
                        search: fetchData.search_text,
                        type: fetchData.select_data,
                      });
                      setCurrentPage((prev) => prev + 1);
                    }
                  }}
                  className={`bg-gray-500/20 p-4 rounded-md hover:bg-slate-400 cursor-pointer ${
                    Number(searchParams?.get("page")) === Math.ceil(maxPage / 4)
                      ? "bg-gray-500/10 opacity-45 cursor-default hover:bg-gray-500/10"
                      : ""
                  }`}
                  icon={faArrowRight}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourses;

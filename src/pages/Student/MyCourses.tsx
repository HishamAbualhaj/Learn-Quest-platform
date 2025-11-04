"use client";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";
import { UserData } from "@/context/UserDataContext";
import Loader from "@/components/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { EnrolledCourse } from "@/types";
import Link from "next/link";
function MyCourses() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSearchPara = (params: {
    search?: string | null;
    type?: string | null;
    page?: string | null;
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

  const [arr, setArr] = useState<number[]>([]);

  const page = useSearchParams()?.get("page") || 1;

  const [currentPagePara, setCurrentPage] = useState<number>(Number(page));

  const [studentId, setStudentId] = useState();

  const [fetchData, setFetchData] = useState({
    page: currentPagePara,
    search_text: searchParams?.get("search") || null,
    select_data: searchParams?.get("type") || null,
  });
  const user_data = useContext(UserData);
  useEffect(() => {
    if (user_data) {
      setStudentId(user_data?.userData?.[0]?.student_id ?? null);
    }
  }, [user_data]);

  const [courses, setCourses] = useState<EnrolledCourse[]>([]);

  const [maxPage, setMaxPage] = useState(1);
  const { data, isFetching, refetch } = useQuery({
    queryFn: async () => {
      if (!studentId) return;
      return await useFetch(
        `${API_BASE_URL}/getEnrolledCourses`,
        {
          page: currentPagePara,
          student_id: studentId,
          search_text:
            fetchData.search_text === "null" ? null : fetchData.search_text,
          select_data:
            fetchData.select_data === "null" ? null : fetchData.select_data,
        },
        "POST"
      );
    },
    queryKey: ["enrolled_courses", currentPagePara, fetchData.select_data],
    enabled: !!studentId,
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
    <div className="sm:px-5 height-vh-adjust px-1 flex items-center">
      <div className=" bg-lightLayout dark:bg-lightDark py-10 overflow-auto h-[800px] flex-1">
        <div className="md:px-5 px-2">
          <div className="flex items-center justify-between md:flex-row flex-col max-md:gap-5">
            <div className="font-semibold text-4xl">My Courses</div>
            <div className="flex items-center gap-2 border dark:border-borderDark p-5 relative max-md:w-full max-sm:flex-col">
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
                    page: String(currentPagePara),
                    search: e.target.value,
                    type: searchParams?.get("type") || null,
                  });
                }}
                className="border dark:border-borderDark lg:w-[500px] xl:w-[700px] w-full rounded-md"
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
                    page: String(currentPagePara),
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
                <option className="text-black" value={"Completed"}>
                  Completed
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
            {!courses?.length && !isFetching ? (
              <div className="w-full text-center xl:text-4xl text-xl font-bold md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2">
                No courses are available
              </div>
            ) : (
              courses?.map((course) => (
                <div
                  key={course.course_id}
                  className="border dark:border-borderDark rounded-xl bg-white dark:bg-dark"
                >
                  <div>
                    <img
                      className="rounded-tr-xl rounded-tl-xl xl:w-[500px] w-full h-[300px] object-cover"
                      src={`${API_BASE_URL}/uploads/${course.image_url}`}
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
                    <div className="text-black/50 leading-7 dark:text-white/50 mt-5 line-clamp-4  max-w-[400px]">
                      {course.description}
                    </div>
                    <div className="mt-5 flex gap-2 flex-wrap">
                      {course.tabs.split(",").map((category) => (
                        <div
                          key={Math.random()}
                          className="bg-lightLayout min-w-10 text-center dark:bg-lightDark text-[13px] w-fit px-2 py-2 rounded-xl border dark:border-borderDark "
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
                    <Link
                      href={`/student/CoursePage/${
                        course.course_id
                      }-${course.title.replace(/[\s/]/g, "")}`}
                    >
                      <Button
                        text="Go to course"
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
  );
}

export default MyCourses;

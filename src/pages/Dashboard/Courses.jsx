import { useEffect, useState, useRef } from "react";
import DeleteCourse from "./DeleteCourse";
import { Link } from "react-router-dom";
import ButtonAdmin from "./ButtonAdmin";
import useFetch from "../../hooks/useFetch";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import API_BASE_URL from "../../config/config";
function Courses() {
  const [courses, setCourses] = useState([]);
  const [lastNode, setLastNode] = useState(null);
  const coursesContainer = useRef();
  const { dataFetched, isFetching, hasNextPage } = useInfiniteScroll({
    fetchFn: (pagePara) => {
      return useFetch(`${API_BASE_URL}/getCourses`, { page: pagePara }, "POST");
    },
    queryKey: ["courses"],
    scrollContainer: coursesContainer,
    observedEle: lastNode,
    data_id: "course_id",
  });

  useEffect(() => {
    setCourses(dataFetched);
  }, [dataFetched]);

  const observeEle = (node) => {
    setLastNode(node);
  };

  const [deleteCoursePopup, setdeleteCoursePopup] = useState(false);

  const [courseData, setCourseData] = useState({});

  return (
    <>
      <div className="flex items-center justify-between sm:flex-row flex-col">
        <div>
          <div className="dark:text-white text-black font-semibold text-4xl">
            Course Panel
          </div>
          <div className="dark:text-gray-400 text-lightText mt-2">
            Track courses and manage them
          </div>
        </div>
        <Link to="add">
          <ButtonAdmin text="Add Course" />
        </Link>
      </div>
      {deleteCoursePopup && (
        <DeleteCourse
          {...{
            setdeleteCoursePopup: setdeleteCoursePopup,
            id: courseData.id,
            title: courseData.title,
          }}
        />
      )}

      <div
        ref={coursesContainer}
        className="xl:w-full lg:w-[850px] md:w-[600px] [450px]:w-[400px] w-[330px] mt-10 h-[650px] overflow-auto px-5"
      >
        <table className="dark:text-gray-300 text-lightText w-full table-auto">
          <thead>
            <tr className="border-t border-b dark:border-borderDark border-lightBorder">
              <th className="py-4 text-left font-bold">Name</th>
              <th className="font-bold text-left">Category</th>
              <th className="whitespace-nowrap font-bold text-left">Price</th>
              <th className="font-bold text-left">Lessons</th>
              <th className="whitespace-nowrap xl:pr-0 pr-8 font-bold text-left">
                Date Created
              </th>
              <th className="font-bold text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                ref={courses.at(-1) === course ? observeEle : null}
                key={course?.course_id}
                className="border-t border-b dark:border-borderDark border-lightBorder"
              >
                <td className="py-4 xl:pr-0 pr-8 whitespace-nowrap">
                  {course?.title}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {course?.category}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {course?.price}
                </td>
                <td className="whitespace-nowrap">{0}</td>
                <td className="whitespace-nowrap">
                  {course?.created_date.split("T")[0]}
                </td>
                <td className="whitespace-nowrap p-2 flex flex-col gap-2">
                  <Link to={`edit/${course?.course_id}`} state={2}>
                    <div className="cursor-pointer dark:bg-gray-500/70 bg-none dark:border-none border  py-2 px-2 text-center rounded-md dark:hover:bg-gray-800 hover:bg-gray-800 hover:text-white transition">
                      Edit
                    </div>
                  </Link>
                  <div
                    onClick={() => {
                      setdeleteCoursePopup(!deleteCoursePopup);
                      setCourseData({
                        id: course?.course_id,
                        title: course?.title,
                      });
                    }}
                    className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 px-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition lg:px-0"
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isFetching ? (
          <div className="dark:text-red-300 text-red-600 flex justify-center py-5 animate-syncPuls">
            Loading ...
          </div>
        ) : (
          !hasNextPage && (
            <div className="dark:text-red-300 text-red-600 flex justify-center py-5">
              No more courses
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Courses;

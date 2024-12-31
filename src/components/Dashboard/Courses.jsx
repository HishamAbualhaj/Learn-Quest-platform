import { useEffect, useState } from "react";
import DeleteCourse from "./DeleteCourse";
import { Link } from "react-router-dom";
import ButtonAdmin from "./ButtonAdmin";
import useFetch from "../Hooks/useFetch";
function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await useFetch(
        "http://localhost:3002/getCourses",
        null,
        "GET"
      );
      let arrOfCourses = res.msg.map((data) => {
        const { course_id, title, category, price, created_date } = data;
        console.log(course_id, title, category, price, created_date);
        return {
          key: course_id,
          name: title,
          type: category,
          price: price,
          lessons: 0,
          date: created_date,
          action: ["Edit", "Delete"],
        };
      });
      setCourses([...arrOfCourses]);
    })();
  }, []);
  const [deleteCoursePopup, setdeleteCoursePopup] = useState(false);

  const [idCourse, setIdCourse] = useState(null);

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
          setdeleteCoursePopup={setdeleteCoursePopup}
          id={idCourse}
        />
      )}
      <div className="xl:w-full lg:w-[850px] md:w-[600px] [450px]:w-[400px] w-[330px] mt-10 h-[600px] overflow-auto px-5">
        <table className="dark:text-gray-300 text-lightText w-full">
          <thead>
            <tr className="border-t border-b dark:border-borderDark border-lightBorder">
              <td className="py-4 font-bold">Name</td>
              <td className="font-bold">Category</td>
              <td className="whitespace-nowrap font-bold">Price</td>
              <td className="font-bold">Lessons</td>
              <td className="whitespace-nowrap xl:pr-0 pr-8 font-bold">
                Date Created
              </td>
              <td className="font-bold">Action</td>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course.key}
                className="border-t border-b dark:border-borderDark border-lightBorder"
              >
                <td className="py-4 xl:pr-0 pr-8 whitespace-nowrap">
                  {course.name}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {course.type}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {course.price}
                </td>
                <td className="whitespace-nowrap">{course.lessons}</td>
                <td className="whitespace-nowrap">{course.date}</td>
                <td className="whitespace-nowrap p-2 flex flex-col gap-2">
                  <Link to={`edit/${course.key}`} state={2}>
                    <div
                      id={course.key}
                      onClick={() => {
                        setIdCourse(course.key);
                      }}
                      className="cursor-pointer dark:bg-gray-500/70 bg-none dark:border-none border  py-2 px-2 text-center rounded-md dark:hover:bg-gray-800 hover:bg-gray-800 hover:text-white transition"
                    >
                      {course.action[0]}
                    </div>
                  </Link>
                  <div
                    onClick={() => {
                      setdeleteCoursePopup(!deleteCoursePopup);
                      setIdCourse(course.key);
                    }}
                    id={course.key}
                    className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition md:px-0 px-2 "
                  >
                    {course.action[1]}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Courses;

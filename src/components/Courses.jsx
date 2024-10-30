import { useState } from "react";
import DeleteCourse from "./DeleteCourse";
import { Link } from "react-router-dom";
function Courses() {
  const courses = [
    {
      key: 1,
      name: "JavaScript Essentials",
      type: "Programming",
      price: 50,
      lessons: 15,
      date: "2024-05-12",
      action: ["Edit", "Delete"],
    },
    {
      key: 2,
      name: "Advanced CSS & Sass",
      type: "Design",
      price: 40,
      lessons: 20,
      date: "2024-06-25",
      action: ["Edit", "Delete"],
    },
    {
      key: 3,
      name: "Python for Data Science",
      type: "Data Science",
      price: 70,
      lessons: 30,
      date: "2024-03-10",
      action: ["Edit", "Delete"],
    },
    {
      key: 4,
      name: "React Development Bootcamp",
      type: "Programming",
      price: 100,
      lessons: 25,
      date: "2024-07-01",
      action: ["Edit", "Delete"],
    },
    {
      key: 5,
      name: "UI/UX Design Fundamentals",
      type: "Design",
      price: 45,
      lessons: 18,
      date: "2024-04-14",
      action: ["Edit", "Delete"],
    },
    {
      key: 6,
      name: "Machine Learning with Python",
      type: "Data Science",
      price: 85,
      lessons: 35,
      date: "2024-08-10",
      action: ["Edit", "Delete"],
    },
    {
      key: 7,
      name: "Full Stack Web Development",
      type: "Programming",
      price: 120,
      lessons: 40,
      date: "2024-09-05",
      action: ["Edit", "Delete"],
    },
    {
      key: 8,
      name: "Digital Marketing 101",
      type: "Marketing",
      price: 30,
      lessons: 12,
      date: "2024-11-20",
      action: ["Edit", "Delete"],
    },
    {
      key: 9,
      name: "Intro to Cybersecurity",
      type: "Security",
      price: 60,
      lessons: 22,
      date: "2024-02-18",
      action: ["Edit", "Delete"],
    },
    {
      key: 10,
      name: "Cloud Computing with AWS",
      type: "Cloud Computing",
      price: 90,
      lessons: 28,
      date: "2024-10-07",
      action: ["Edit", "Delete"],
    },
  ];

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
          <div className="dark:bg-gray-500 bg-none dark:text-white dark:border-none border  text-black font-semibold rounded-md py-2 px-4 dark:hover:bg-gray-800 hover:bg-gray-800 hover:text-white transition cursor-pointer sm:mt-0 mt-5 max-sm:w-full text-center">
            Add Course
          </div>
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
                  <Link to={`edit/${course.name}`} state={2}>
                    <div
                      id={course.key}
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

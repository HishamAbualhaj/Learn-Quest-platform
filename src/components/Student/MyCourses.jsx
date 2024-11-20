import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import web from "../../assets/web.jpg";
import ui from "../../assets/uiux.jpg";
import cyber from "../../assets/cyber.jpg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
function MyCourses() {
  const mycourses = [
    {
      id: 1,
      title: "Web Development for Beginners",
      description:
        "Kickstart your web development journey with this beginner-friendly course. Learn the fundamentals of HTML, CSS, and JavaScript, and build your first website. Ideal for those with no prior experience.",
      categories: ["Web Technologies", "Front End", "IT"],
      image: web,
      progress: "100%",
      completed: true,
    },
    {
      id: 2,
      title: "UI/UX Design Essentials",
      description:
        "Master the art of creating user-centered designs. This course will guide you through the principles of UI/UX design, including wireframing, prototyping, and user testing, to ensure great user experiences.",
      categories: ["UI/UX", "Front End", "DESIGN"],
      image: ui,
      progress: "70%",
      completed: false,
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
      progress: "40%",
      completed: false,
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
      progress: "60%",
      completed: false,
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
      progress: "15%",
      completed: false,
    },
  ];
  return (
    <div className="sm:px-5 px-1 mt-10">
      <div className=" bg-lightLayout dark:bg-lightDark py-10 overflow-auto h-[800px]">
        <div className="md:px-5 px-2">
          <div className="flex items-center justify-between md:flex-row flex-col max-md:gap-5">
            <div className="font-[600] text-4xl">My Courses</div>
            <div className="flex items-center gap-2 border dark:border-borderDark p-5 relative max-md:w-full max-sm:flex-col">
              <div className="absolute top-0 -translate-y-1/2 left-0 text-lg font-semibold px-5">
                Filter
              </div>
              <input
                className="border dark:border-borderDark lg:w-[700px] w-full rounded-md"
                type="text"
                placeholder="search by name"
              />
              <select
                className="dark:bg-borderDark dark:border-none border  dark:text-white text-lightText focus:outline-none md:w-[200px] w-full p-2 text-lg appearance-none rounded-md"
                name="courses"
                id=""
              >
                <option className="text-black" value={`Free`}>
                  Completed
                </option>
                <option className="text-black" value={`Top Rated`}>
                  Top Rated
                </option>
              </select>
              <FontAwesomeIcon
                className="text-lg sm:px-3 cursor-pointer bg-black/20 rounded-sm py-3 max-sm:w-full"
                icon={faMagnifyingGlass}
              />
            </div>
          </div>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-5 gap-8  mt-5">
            {mycourses.map((course) => (
              <div
                key={course.id}
                className="border dark:border-borderDark rounded-xl bg-white dark:bg-dark"
              >
                <div>
                  <img
                    className="rounded-tr-xl rounded-tl-xl xl:w-[500px] w-full h-[300px] object-cover"
                    src={course.image}
                    alt=""
                  />
                </div>
                <div className="p-5">
                  <div className="font-[600] lg:text-xl line-clamp-1">
                    {course.title}
                  </div>
                  <div className="text-black/50 leading-7 dark:text-white/50 mt-5 line-clamp-4  max-w-[400px]">
                    {course.description}
                  </div>
                  <div className="mt-5 flex gap-2 flex-wrap">
                    {course.categories.map((category) => (
                      <div className="bg-lightLayout min-w-10 text-center dark:bg-lightDark text-[13px] w-fit px-2 py-2 rounded-xl border dark:border-borderDark ">
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-5 gap-2">
                    <div className=" w-full h-2 border border-borderDark rounded-md ">
                      <div
                        style={{ width: `${course.progress}` }}
                        className={`bg-green-400 h-full rounded-md`}
                      ></div>
                    </div>
                    <div className="">{course.progress}</div>
                  </div>
                  {course.completed && (
                    <div className="flex items-center text-center gap-2 mt-5">
                      <div className="bg-green-700/70 py-2 rounded-md flex-1 text-white">
                        Completed !
                      </div>
                      <Button props="flex-1" margin="mt-0" text="Get Certificate" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCourses;

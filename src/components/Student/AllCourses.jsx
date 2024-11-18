import React from "react";
import web from "../../assets/web.jpg";
import ui from "../../assets/uiux.jpg";
import cyber from "../../assets/cyber.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
function AllCourses() {
  const courses = [
    {
      id: 1,
      title: "Web Development for Beginners",
      description:
        "Kickstart your web development journey with this beginner-friendly course. Learn the fundamentals of HTML, CSS, and JavaScript, and build your first website. Ideal for those with no prior experience.",
      categories: ["Web Technologies", "Front End", "IT"],
      image: web,
      star: "5.0",
      price: "20.99",
      isDiscount: [true, "30.99"],
    },
    {
      id: 2,
      title: "UI/UX Design Essentials",
      description:
        "Master the art of creating user-centered designs. This course will guide you through the principles of UI/UX design, including wireframing, prototyping, and user testing, to ensure great user experiences.",
      categories: ["UI/UX", "Front End", "DESIGN"],
      image: ui,
      star: "5.0",
      price: "15.99",
      isDiscount: [false, "40.99"],
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
      star: "5.0",
      price: "15.99",
      isDiscount: [true, "40.99"],
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
      star: "4.5",
      price: "Free",
      isDiscount: [false, "40.99"],
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
      star: "4.0",
      price: "15.99",
      isDiscount: [true, "40.99"],
    },
  ];
  return (
    <div className="sm:px-5 px-1">
      <div className=" bg-lightLayout dark:bg-lightDark py-10 mt-10 overflow-auto h-[800px]">
        <div className="md:px-5 px-2">
          <div className="flex items-center justify-between md:flex-row flex-col max-md:gap-5">
            <div className="font-[600] text-4xl">Courses</div>
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
                  Free
                </option>
                <option className="text-black" value={`Paid`}>
                  Paid
                </option>
                <option className="text-black" value={`Discount`}>
                  Discount
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
            {courses.map((course) => (
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
                  <div className="flex items-center justify-between">
                    <div className="font-[600] lg:text-xl line-clamp-1">
                      {course.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        className="text-yellow-400"
                        icon={faStar}
                      />
                      <div className="text-yellow-400">{course.star}</div>
                    </div>
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
                  <div className="text-lg mt-4 flex gap-2">
                    Price :
                    {course.isDiscount[0] && (
                      <div className="line-through dark:text-white/50 text-black/40">
                        {course.isDiscount[1]} $
                      </div>
                    )}
                    <div className="">
                      {course.price === "Free"
                        ? course.price
                        : course.price + " $"}
                    </div>
                  </div>
                  <div className="btn mt-4 p-2 rounded-md dark:bg-purple-700/40 w-fit cursor-pointer dark:hover:bg-purple-700 bg-purple-600 text-white hover:bg-purple-700 transition">
                    Join Now
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCourses;

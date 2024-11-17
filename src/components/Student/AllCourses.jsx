import React from "react";
import web from "../../assets/web.jpg";
import ui from "../../assets/uiux.jpg";
import cyber from "../../assets/cyber.jpg";

function AllCourses() {
  const courses = [
    {
      id: 1,
      title: "Web Development for Beginners",
      description:
        "Kickstart your web development journey with this beginner-friendly course. Learn the fundamentals of HTML, CSS, and JavaScript, and build your first website. Ideal for those with no prior experience.",
      categories: ["Web Technologies", "Front End", "IT"],
      image: web,
    },
    {
      id: 2,
      title: "UI/UX Design Essentials",
      description:
        "Master the art of creating user-centered designs. This course will guide you through the principles of UI/UX design, including wireframing, prototyping, and user testing, to ensure great user experiences.",
      categories: ["UI/UX", "Front End", "DESIGN"],
      image: ui,
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: cyber,
    },
  ];
  return (
    <div className="section bg-lightLayout dark:bg-lightDark py-10 mt-10 overflow-auto h-[800px]">
      <div className="max-container">
        <div className="flex items-center justify-between md:flex-row flex-col max-md:">
          <div className="font-[600] text-4xl">Courses</div>
          <input className="border dark:border-borderDark lg:w-[700px] rounded-md" type="text" placeholder="search" />
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
              <div className="p-5 max-w-[400px]">
                <div className="font-[600] lg:text-xl">{course.title}</div>
                <div className="text-black/50 leading-7 dark:text-white/50 mt-5 line-clamp-4">
                  {course.description}
                </div>
                <div className="mt-5 flex gap-2 flex-wrap">
                  {course.categories.map((category) => (
                    <div className="bg-lightLayout min-w-10 text-center dark:bg-lightDark text-[13px] w-fit px-2 py-2 rounded-xl border dark:border-borderDark ">
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllCourses;

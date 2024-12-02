import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonAdmin from "./ButtonAdmin";
export default function EditCourse({ setActiveStatus }) {
  const category = [
    { id: 1, name: "Introduction to Computer Science" },
    { id: 2, name: "Web Development with HTML, CSS, and JavaScript" },
    { id: 3, name: "Data Structures and Algorithms" },
    { id: 4, name: "Database Management Systems" },
    { id: 5, name: "Object-Oriented Programming with Java" },
    { id: 6, name: "Cloud Computing Fundamentals" },
    { id: 7, name: "Cybersecurity Basics" },
    { id: 8, name: "Mobile App Development with React Native" },
    { id: 9, name: "Machine Learning and Artificial Intelligence" },
    { id: 10, name: "DevOps and Continuous Integration/Delivery" },
  ];
  const courses = {
    id: 1,
    title: "Introduction to Computer Science",
    price: 100,
    discount: 20,
    description: "Learn the basics of computer science.",
    category: "Computer Science",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        subTitle: "Introduction",
        lessonUrl: "https://example.com/lesson1",
      },
      {
        id: 2,
        title: "Lesson 2",
        subTitle: "Basics of Programming",
        lessonUrl: "https://example.com/lesson2",
      },
      {
        id: 3,
        title: "Lesson 3",
        subTitle: "Data Structures",
        lessonUrl: "https://example.com/lesson3",
      },
      {
        id: 4,
        title: "Lesson 4",
        subTitle: "Algorithms",
        lessonUrl: "https://example.com/lesson4",
      },
    ],
  };
  const inputs = [
    {
      key: 1,
      title: "Title : ",
      inputdata: courses.title,
      inType: "text",
    },
    {
      key: 2,
      title: "Price : ",
      inputdata: courses.price,
      inType: "number",
    },
    {
      key: 3,
      title: "Discount : ",
      inputdata: courses.discount,
      inType: "number",
    },
  ];
  return (
    <div>
      <div className="rounded-sm w-full h-[800px] overflow-auto">
        <div className="text-center dark:text-white text-lightText text-xl py-5 border-b border-borderDark flex justify-between px-4">
          Edit Course Details
          <Link to="/dashboard/courses">
            <FontAwesomeIcon
              className="cursor-pointer  hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          </Link>
        </div>

        <div className="p-3">
          {/* <div className="bg-red-500/20 text-center py-2 rounded-sm text-red-400">
            Something went wrong
          </div>
          <div className="bg-green-500/20 text-center py-2 rounded-sm text-green-400">
            Successfully Added !
          </div> */}
          {inputs.map((input) => (
            <div
              key={input.key}
              className="flex flex-col mt-2 dark:text-white text-lightText"
            >
              <label htmlFor="">{input.title}</label>
              <input value={input.inputdata} className="mt-2" type={input.inType} />
            </div>
          ))}

          <div className="flex flex-col mt-2 dark:text-white text-lightText">
            <label htmlFor="">Description : </label>
            <textarea value={courses.description} className="mt-2" />
          </div>

          <div className="flex flex-col mt-2 dark:text-white text-lightText gap-2">
            <label htmlFor="">Category : </label>

            <select
              className="bg-transparent border dark:border-[#888] border-borderLight rounded-sm dark:text-white text-lightText focus:outline-none p-2 text-lg appearance-none w-full mt-2"
              name="courses"
              id=""
            >
              {category.map((category) => (
                <option
                  className="text-black"
                  key={category.id}
                  id={category.id}
                  value={`${category.name}`}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {courses.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="mt-5 border dark:border-borderDark rounded-md p-3 relative dark:text-white text-lightText"
            >
              <div className="absolute top-0 -translate-y-1/2 left-3 text-lg font-semibold">
                Lesson {lesson.id}
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <div>
                  <div className="flex flex-col gap-2">
                    <div>Title: </div>
                    <input
                      className="w-full"
                      type="text"
                      placeholder="Lessson title"
                      value={lesson.title}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <div>Sub Title: </div>
                    <input
                      className="w-full"
                      type="text"
                      placeholder="Lessson sub title"
                      value={lesson.subTitle}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <div>Lesson Url: </div>
                    <input
                      className="w-full"
                      type="text"
                      placeholder="Lessson url"
                      value={lesson.lessonUrl}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <ButtonAdmin text="EDIT" />
        </div>
      </div>
    </div>
  );
}

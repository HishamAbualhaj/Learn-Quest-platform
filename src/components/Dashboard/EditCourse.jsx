import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function EditCourse({ setActiveStatus }) {
  const inputs = [
    {
      key: 1,
      title: "Title : ",
      inType: "text",
    },
    {
      key: 2,
      title: "Price : ",
      inType: "number",
    },
    {
      key: 3,
      title: "Discount : ",
      inType: "number",
    },
  ];
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
  return (
    <div>
      <div className="rounded-sm w-full h-[700px] overflow-auto">
        <div className="text-center dark:text-white text-lightText text-xl py-5 border-b border-borderDark flex justify-between px-4">
          Edit Course Details
          <Link to="/courses">
            <FontAwesomeIcon
              className="cursor-pointer  hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          </Link>
        </div>

        <div className="form p-3">
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
              <input
                className="mt-2 border dark:border-textDark/40 border-borderLight rounded-sm w-full"
                type={input.inType}
              />
            </div>
          ))}

          <div className="flex flex-col mt-2 dark:text-white text-lightText">
            <label htmlFor="">Description : </label>
            <textarea className="mt-2 border dark:border-textDark/40 border-borderLight rounded-sm w-full" />
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

          <div className="dark:bg-gray-500 dark:border-none border  dark:text-white text-lightText font-semibold rounded-sm p-2 hover:bg-gray-800 hover:text-white transition cursor-pointer text-center mt-3">
            EDIT
          </div>
        </div>
      </div>
    </div>
  );
}

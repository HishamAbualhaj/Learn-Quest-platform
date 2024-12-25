import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonAdmin from "./ButtonAdmin";
export default function AddCourse() {
  const inputs = [
    {
      key: 1,
      id: "title",
      title: "Title : ",
      inType: "text",
      placeholder: "Course Title Here",
    },
    {
      key: 2,
      id: "price",
      title: "Price : ",
      inType: "number",
      placeholder: "50",
    },
    {
      key: 3,
      id: "discount",
      title: "Discount : ",
      inType: "number",
      placeholder: "20%",
    },
    {
      key: 4,
      id: "tabs",
      title: "Tabs : ",
      inType: "text",
      placeholder: "UI/UX FRONT-END etc ...",
    },
  ];

  const [courseData, setCourseData] = useState({
    title: "",
    price: "",
    discount: "",
    category: "",
    image: "",
    description: "",
    tabs: [""],
    materials: [
      {
        title: "",
        subtitle: "",
        url: "",
      },
    ],
  });

  useEffect(() => {
    console.log(courseData);
  }, [courseData]);

  function handleChange(e) {
    let { id, value } = e.target;
    if (id === "image") {
      value = e.target.files[0]?.name;
    }
    if(id === 'tabs') {
      value = value.split(' ')
    }
    setCourseData({
      ...courseData,
      [id]: value,
    });
  }
  // handle lesson change
  function handleLessonChange(e, lesson_id) {
    const { id, value } = e.target;
    const updateMaterial = [...courseData.materials];
    // update prev value for each lesson
    updateMaterial[lesson_id - 1] = {
      ...updateMaterial[lesson_id - 1],
      [id]: value,
    };
    setCourseData({
      ...courseData,
      materials: updateMaterial,
    });
  }
  const [lessons, setLessons] = useState([1]);
  function addLesson() {
    setLessons([...lessons, lessons.at(-1) + 1]);
    // add new object value for new lesson
    setCourseData({
      ...courseData,
      materials: [
        ...courseData.materials,
        {
          title: "",
          subtitle: "",
          url: "",
        },
      ],
    });
  }
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
      <div className="rounded-sm  w-full overflow-auto h-[800px]">
        <div className="text-center dark:text-white text-white text-xl py-5 border-b dark:border-borderDark border-borderLight flex justify-between px-4">
          Add Course Details
          <Link to="/dashboard/courses">
            <FontAwesomeIcon
              className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          </Link>
        </div>

        <div className="p-3">
          {/* <div className="bg-red-500/20 text-center py-2 rounded-sm text-red-400">
            Something went wrong
          </div>
          <div className="bg-green-500/20 text-center py-2 rounded-sm text-green-400 mt-5">
            Successfully Added !
          </div> */}
          {inputs.map((input) => (
            <div
              key={input.key}
              className="flex flex-col mt-2 dark:text-white text-lightText"
            >
              <label htmlFor={input.id}>{input.title}</label>
              <input
                onChange={handleChange}
                placeholder={input.placeholder}
                id={input.id}
                className="mt-2"
                type={input.inType}
              />
            </div>
          ))}

          <div className="flex flex-col mt-2 dark:text-white text-lightText gap-2">
            <label htmlFor="">Category : </label>

            <select
              onChange={handleChange}
              className="bg-transparent border dark:border-[#888] border-borderLight rounded-sm dark:text-white text-lightText focus:outline-none p-2 text-lg appearance-none w-full mt-2"
              name="courses"
              id="category"
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

          <div className="flex flex-col mt-2 dark:text-white text-lightText ">
            <label htmlFor="image">Image : </label>

            <div className="image-handle relative cursor-pointer mt-2">
              <div className="border_platform all rounded-md flex justify-center py-10">
                <div className="text-xl "> Upload image</div>
                <input
                  id="image"
                  onChange={handleChange}
                  type="file"
                  className="rounded-md w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mt-2 dark:text-white text-lightText ">
              <label htmlFor="">Videos : </label>

              <div
                onClick={() => {
                  addLesson();
                }}
              >
                <ButtonAdmin text="Add Lesson" />
              </div>
            </div>
            {lessons.map((id) => (
              <div
                key={id}
                className="mt-5 border dark:border-borderDark rounded-md p-3 relative dark:text-white"
              >
                <div className="absolute top-0 -translate-y-1/2 left-3 text-lg font-semibold">
                  Lesson {id}
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <div className="flex flex-col gap-2">
                      <div>Title: </div>
                      <input
                        onChange={(e) => {
                          handleLessonChange(e, id);
                        }}
                        id="title"
                        className="w-full"
                        type="text"
                        placeholder="Lessson title"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <div>Sub Title: </div>
                      <input
                        onChange={(e) => {
                          handleLessonChange(e, id);
                        }}
                        id="subtitle"
                        className="w-full"
                        type="text"
                        placeholder="Lessson sub title"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <div>Lesson Url: </div>
                      <input
                        onChange={(e) => {
                          handleLessonChange(e, id);
                        }}
                        id="url"
                        className="w-full"
                        type="text"
                        placeholder="Lessson url"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-2 dark:text-white text-lightText">
            <label htmlFor="description">Description : </label>
            <textarea
              id="description"
              onChange={handleChange}
              className="mt-2"
            />
          </div>
          <ButtonAdmin text="ADD" />
        </div>
      </div>
    </div>
  );
}

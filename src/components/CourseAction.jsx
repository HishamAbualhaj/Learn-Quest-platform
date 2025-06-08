import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ButtonAdmin from "../pages/Dashboard/ButtonAdmin";
import useFetch from "../hooks/useFetch";
import Alert from "./Alert";
import { UserData } from "../context/UserDataContext";
import API_BASE_URL from "../config/config";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
export default function CourseAction({
  endpoint,
  course_id,
  action,
  title,
  method,
}) {
  const [alert, setAlert] = useState(null);
  const [user_data, setUserData] = useState(null);
  const [image, setImage] = useState(null);

  const data_user = useContext(UserData);
  useEffect(() => {
    if (data_user) {
      const [{ student_id, role, email }] = data_user?.userData;
      setUserData({ student_id, role, email });
    }
  }, [data_user]);
  let defaultData = {
    title: "",
    price: "",
    discount: "",
    category: "",
    image_url: "",
    description: "",
    tabs: [""],
    materials: [],
  };
  const [courseData, setCourseData] = useState(defaultData);

  useEffect(() => {
    if (course_id && user_data) {
      async function getData() {
        const res = await useFetch(
          `${API_BASE_URL}/getCourseData`,
          { course_id: course_id, ...user_data },
          "POST"
        );
        const { msg } = res.msg;

        const [courseDataFetched, courseMaterial] = msg;

        setCourseData(courseDataFetched);

        addLessonForEdit(courseMaterial);

        setCourseData((pre) => ({
          ...pre,
          course_id: Number(course_id),
        }));
      }
      getData();
    }
  }, [course_id, user_data]);

  useEffect(() => {
    console.log("Course data chagned", courseData);
  }, [courseData]);
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

  const { data, isPending, mutate } = useMutation({
    mutationFn: async () => {
      const updatedCourseData = {
        ...courseData,
        student_id: user_data.student_id,
        role: user_data.role,
        email: user_data.email,
      };
      const data = await useFetch(
        `${API_BASE_URL}/${endpoint}`,
        updatedCourseData,
        method
      );

      const { id } = data?.msg;

      console.log("data from add course ", data);
      const currentId = action === "add" ? id : course_id;

      if (image) {
        const formData = new FormData();
        formData.append("image", image.files[0]);
        formData.append("id", currentId);
        await uploadImage(formData);
      }

      return data;
    },
  });

  useEffect(() => {
    setAlert(data);
  }, [data]);

  async function uploadImage(file) {
    //Specific case for uploading image, (No need to manually set Content-Type)
    const response = await fetch(`${API_BASE_URL}/handleUploads`, {
      method: "POST",
      body: file,
      credentials: "include",
    });
    await response.json();
  }

  function handleChange(e) {
    let { id, value } = e.target;
    if (id === "image") {
      value = e.target.files[0]?.name;
      setImage(e.target);

      setCourseData({
        ...courseData,
        image_url: value,
      });

      return;
    }
    if (id === "tabs") {
      value = value.split(" ");
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
  function addLessonForEdit(courseMaterials) {
    let courseMaterialsArr = [];
    let count = 1;
    courseMaterialsArr = courseMaterials.map((obj) => {
      const { title, subtitle, url } = obj;
      const updateMaterial = {
        lesson_count: count,
        id: obj.material_id || obj.id,
        title: title,
        subtitle: subtitle,
        url: url,
      };
      count += 1;

      return updateMaterial;
    });
    setCourseData((prev) => ({
      ...prev,
      materials: courseMaterialsArr,
    }));
  }
  function addLesson() {
    // add new object value for new lesson
    setCourseData({
      ...courseData,
      materials: [
        ...courseData.materials,
        {
          lesson_count: (courseData.materials.at(-1)?.lesson_count || 0) + 1,
          id: Math.round(Math.random() * 10000),
          title: "",
          subtitle: "",
          url: "",
        },
      ],
    });
  }
  function deleteLesson(id) {
    let courseMaterialsArr = courseData.materials.filter(
      (obj) => id !== obj.id
    );

    addLessonForEdit(courseMaterialsArr);
  }
  return (
    <div>
      <div className="rounded-sm  w-full overflow-auto h-[800px]">
        <div className="text-center dark:text-white text-black text-xl py-5 border-b dark:border-borderDark border-borderLight flex justify-between px-4">
          {title}
          <Link to="/dashboard/courses">
            <FontAwesomeIcon
              className="cursor-pointer hover:bg-gray-500/20 transition py-1 px-2 rounded-sm"
              icon={faXmark}
            />
          </Link>
        </div>

        <div className="p-3">
          {alert &&
            (alert.status ? (
              <Alert msg={alert.msg.msg} type="success" />
            ) : (
              <Alert msg={alert.msg} />
            ))}

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
                value={courseData[input.id] || ""}
              />
            </div>
          ))}

          <div className="flex flex-col mt-2 dark:text-white text-lightText gap-2">
            <label htmlFor="category">Category : </label>

            <select
              onChange={handleChange}
              className="bg-transparent border dark:border-[#888] border-borderLight rounded-sm dark:text-white text-lightText focus:outline-none p-2 text-lg appearance-none w-full mt-2"
              name="courses"
              id="category"
              value={courseData?.category || ""}
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
                <div className="text-xl ">Upload image</div>
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
            <div className="h-[450px] overflow-auto border-2 dark:border-borderDark rounded-md p-4 mt-2">
              {courseData.materials.map((obj) => (
                <div
                  key={obj.id}
                  className="mt-5 border dark:border-borderDark rounded-md p-3 relative dark:text-white"
                >
                  <div className="flex justify-end">
                    <div
                      onClick={() => {
                        deleteLesson(obj.id);
                      }}
                      className=" dark:bg-borderDark bg-borderLight w-fit p-2 rounded-md cursor-pointer text-red-300 hover:text-red-500"
                    >
                      <FontAwesomeIcon className="transition" icon={faTrash} />
                    </div>
                  </div>
                  <div className="absolute top-0 -translate-y-1/2 left-3 text-lg font-semibold">
                    Lesson {obj.lesson_count}
                  </div>
                  <div className="flex flex-col gap-3 mt-3">
                    <div>
                      <div className="flex flex-col gap-2">
                        <div>Title: </div>
                        <input
                          onChange={(e) => {
                            handleLessonChange(e, obj.lesson_count);
                          }}
                          id="title"
                          className="w-full"
                          type="text"
                          placeholder="Lessson title"
                          value={obj.title}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <div>Sub Title: </div>
                        <input
                          onChange={(e) => {
                            handleLessonChange(e, obj.lesson_count);
                          }}
                          id="subtitle"
                          className="w-full"
                          type="text"
                          placeholder="Lessson sub title"
                          value={obj.subtitle}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2">
                        <div>Lesson Url: </div>
                        <input
                          onChange={(e) => {
                            handleLessonChange(e, obj.lesson_count);
                          }}
                          id="url"
                          className="w-full"
                          type="text"
                          placeholder="Lessson url"
                          value={obj.url}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col mt-2 dark:text-white text-lightText">
            <label htmlFor="description">Description : </label>
            <textarea
              id="description"
              onChange={handleChange}
              className="mt-2"
              value={courseData.description || ""}
            />
          </div>
          {isPending ? (
            <div>
              <ButtonAdmin text="LOADING ... " />
            </div>
          ) : (
            <div onClick={mutate}>
              <ButtonAdmin text={String(action).toUpperCase()} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

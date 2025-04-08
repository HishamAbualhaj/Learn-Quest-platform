import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import ButtonAdmin from "./ButtonAdmin";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Alert from "../../components/Alert";
function EditCourse() {
  const location = useLocation();
  const [courseId, setCourseId] = useState(null);
  // handle file change for uploading
  const [file, setFile] = useState(null);
  useEffect(() => {
    //getting course id for edit
    const id = location.pathname.split("/").at(-1);
    setCourseId(id);
  }, []);
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
    if (courseId) {
      setCourseData((pre) => {
        return {
          ...pre,
          course_id: courseId,
        };
      });
      async function getData() {
        const res = await useFetch(
          "http://localhost:3002/getCourseData",
          { course_id: courseId },
          "POST"
        );
        const { msg } = res.msg;
        const [courseDataFetched, courseMaterial] = msg;
        Object.entries(courseDataFetched).forEach(([id, value]) => {
          setCourseData((pre) => {
            return {
              ...pre,
              [id]: value,
            };
          });
        });
        addLessonForEdit(courseMaterial);
      }
      getData();
    }
  }, [courseId]);

  const [alert, setAlert] = useState({ status: "", msg: "", redirect: false });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ status: null, msg: "" });
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

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
  const inputs = [
    {
      key: 1,
      id: "title",
      title: "Title : ",
      inType: "text",
    },
    {
      key: 2,
      id: "price",
      title: "Price : ",
      inType: "number",
    },
    {
      key: 3,
      id: "discount",
      title: "Discount : ",
      inType: "number",
    },
    {
      key: 4,
      id: "tabs",
      title: "Tabs : ",
      inType: "text",
    },
  ];

  async function editData() {
    setIsLoading(true);
    if (file) {
      await uploadImage();
    }
    const updatedCourseData = {
      ...courseData,
      image_url: file ? courseData.image_url : null,
    };
    const res = await useFetch(
      "http://localhost:3002/updateCourse",
      updatedCourseData,
      "PUT"
    );
    setIsLoading(false);
    setAlert(res);
  }

  useEffect(() => {
    console.log(courseData);
  }, [courseData]);

  async function uploadImage() {
    //Specific case for uploading image, (No need to manually set Content-Type)
    const response = await fetch("http://localhost:3002/handleUploads", {
      method: "POST",
      body: file,
    });
    await response.json();
  }

  function handleChange(e) {
    let { id, value } = e.target;
    if (id === "image") {
      const formdata = new FormData();
      value = e.target.files[0]?.name;
      formdata.append("image", e.target.files[0]);
      formdata.append("id", courseId);
      setCourseData({
        ...courseData,
        image_url: value,
      });
      setFile(formdata);
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
    const arrOfObjs = [...courseData.materials];
    let currentIndex = 0;
    // getting the input we are typing into (current element) from the array of objs
    const arr = arrOfObjs.find((obj, index) => {
      if (obj.id === lesson_id) {
        currentIndex = index;
        return true;
      }
    });
    arrOfObjs[currentIndex] = {
      ...arr,
      [id]: value,
    };

    setCourseData((prev) => {
      return {
        ...prev,
        materials: arrOfObjs,
      };
    });
  }
  function addLessonForEdit(courseMaterials) {
    let courseMaterialsArr = [];
    courseMaterials.forEach((obj) => {
      const { title, subtitle, url } = obj;
      const updateMaterial = {
        id: obj.material_id,
        title: title,
        subtitle: subtitle,
        url: url,
      };
      courseMaterialsArr = [...courseMaterialsArr, updateMaterial];
    });
    setCourseData((prev) => {
      return {
        ...prev,
        materials: courseMaterialsArr,
      };
    });
  }
  function addLesson() {
    // add new object value for new lesson
    setCourseData({
      ...courseData,
      materials: [
        ...courseData.materials,
        {
          id: Math.round(Math.random() * 10000),
          title: "",
          subtitle: "",
          url: "",
        },
      ],
    });
  }

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
          {alert.status ? (
            <Alert msg={alert.msg} type="success" />
          ) : (
            <Alert msg={alert.msg} type="failed" />
          )}
          {inputs.map((input) => (
            <div
              key={input.key}
              className="flex flex-col mt-2 dark:text-white text-lightText"
            >
              <label htmlFor={input.key}>{input.title}</label>
              <input
                onChange={handleChange}
                id={input.id}
                value={courseData[input.id] || ""}
                className="mt-2"
                type={input.inType}
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
                <div className="text-xl "> Update Course Image</div>
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
            {courseData.materials.map((obj) => (
              <div
                key={obj.id}
                className="mt-5 border dark:border-borderDark rounded-md p-3 relative dark:text-white"
              >
                <div className="absolute top-0 -translate-y-1/2 left-3 text-lg font-semibold">
                  Lesson
                </div>
                <div className="flex flex-col gap-3 mt-3">
                  <div>
                    <div className="flex flex-col gap-2">
                      <div>Title: </div>
                      <input
                        onChange={(e) => {
                          handleLessonChange(e, obj.id);
                        }}
                        id="title"
                        className="w-full"
                        type="text"
                        placeholder="Lessson title"
                        value={obj.title || " "}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <div>Sub Title: </div>
                      <input
                        onChange={(e) => {
                          handleLessonChange(e, obj.id);
                        }}
                        id="subtitle"
                        className="w-full"
                        type="text"
                        placeholder="Lessson sub title"
                        value={obj.subtitle || " "}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-2">
                      <div>Lesson Url: </div>
                      <input
                        onChange={(e) => {
                          handleLessonChange(e, obj.id);
                        }}
                        id="url"
                        className="w-full"
                        type="text"
                        placeholder="Lessson url"
                        value={obj.url || " "}
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
              value={courseData.description || ""}
            />
          </div>

          {isLoading ? (
            <div>
              <ButtonAdmin text="LOADING ... " />
            </div>
          ) : (
            <div onClick={editData}>
              <ButtonAdmin text="EDIT" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditCourse;

import { useState } from "react";
import { Link } from "react-router-dom";
import ButtonAdmin from "./ButtonAdmin";
import TableScroll from "../../components/TableScroll";
import DeletePopUp from "../../components/DeletePopUp";
function Courses() {
  const [deleteCoursePopup, setdeleteCoursePopup] = useState(false);

  const [courseData, setCourseData] = useState({});

  return (
    <>
      {deleteCoursePopup && (
        <DeletePopUp
          {...{
            setDeletePopup: setdeleteCoursePopup,
            id: courseData.id,
            data_name: courseData.title,
            refetch: courseData.refetch,
            endpoint: "deleteCourse",
            data_id: "course_id",
          }}
        />
      )}
      <TableScroll
        title="Course Panel"
        subtile="Track courses and manage them"
        data_key="courses"
        data_id="course_id"
        endpoint="getCoursesAdmin"
        columns={[
          { key: "title", label: "Name" },
          { key: "category", label: "Category" },
          { key: "price", label: "Price" },
          { key: "lessons", label: "Lessons", render: (value) => value || "0" },
          {
            key: "created_date",
            label: "Date Created",
            render: (value) => value?.split("T")[0],
          },
          { key: "action", label: "Action" },
        ]}
        customActions={(course, refetch) => (
          <>
            <Link to={`edit/${course?.course_id}`} state={2}>
              <div className="cursor-pointer dark:bg-gray-500/70 bg-none dark:border-none border  py-2 px-2 text-center rounded-md dark:hover:bg-gray-800 hover:bg-gray-800 hover:text-white transition">
                Edit
              </div>
            </Link>
            <div
              onClick={() => {
                setdeleteCoursePopup(!deleteCoursePopup);
                setCourseData({
                  id: course?.course_id,
                  title: course?.title,
                  refetch,
                });
              }}
              className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 px-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition lg:px-0"
            >
              Delete
            </div>
          </>
        )}
        Component={() => (
          <Link to="add">
            <ButtonAdmin text="Add Course" />
          </Link>
        )}
      />
    </>
  );
}

export default Courses;

"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ButtonAdmin from "./ButtonAdmin";
import TableScroll from "../../components/TableScroll";
import DeletePopUp from "../../components/DeletePopUp";
import { Course } from "@/types";
import Link from "next/link";
function Courses() {
  const [deleteCoursePopup, setdeleteCoursePopup] = useState<boolean>(false);

  const [courseData, setCourseData] = useState<
    (Course & { refetch: () => void }) | null
  >();

  return (
    <>
      {deleteCoursePopup && (
        <DeletePopUp
          {...{
            setDeletePopup: setdeleteCoursePopup,
            id: String(courseData?.course_id) ?? "",
            data_name: courseData?.title ?? "",
            refetch: courseData?.refetch ?? function () {},
            endpoint: "deleteCourse",
            data_id: "course_id",
          }}
        />
      )}
      <TableScroll<Course>
        title="Course Panel"
        subtitle="Track courses and manage them"
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
            <Link href={`/dashboard/courses/edit/${course?.course_id}`}>
              <div className="cursor-pointer dark:bg-gray-500/70 bg-none dark:border-none border  py-2 px-2 text-center rounded-md dark:hover:bg-gray-800 hover:bg-gray-800 hover:text-white transition">
                Edit
              </div>
            </Link>
            <div
              onClick={() => {
                setdeleteCoursePopup(!deleteCoursePopup);
                setCourseData({
                  ...course,
                  refetch,
                });
              }}
              className="cursor-pointer border dark:border-red-500/70 border-red-300/70 dark:text-white text-lightText py-2 px-2 text-center rounded-md hover:bg-red-500/70 hover:text-white transition lg:px-0"
            >
              Delete
            </div>
          </>
        )}
        Component={
          <Link href="/dashboard/courses/add">
            <ButtonAdmin text="Add Course" props={""} />
          </Link>
        }
      />
    </>
  );
}

export default Courses;

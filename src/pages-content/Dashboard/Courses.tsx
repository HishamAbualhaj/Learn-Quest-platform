"use client";
import ContentVisibility from "@/components/admin/ContentVisibility";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import TableScroll from "@/components/admin/TableScroll";
import DeletePopUp from "@/components/admin/DeletePopUp";
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
        title="Courses"
        subtitle="Shape your catalog, refine lessons, and create your next course."
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
            label: "Created",
            render: (value) => value?.split("T")[0],
          },
          {
            key: "published",
            label: "Visibility",
            render: (_, item) => (
              <ContentVisibility
                kind="courses"
                id={item.course_id}
                value={item}
              />
            ),
          },
          { key: "action", label: "Action" },
        ]}
        customActions={(course, refetch) => (
          <>
            <Button asChild variant="outline" className="min-h-11">
              <Link
                href={`/student/allcourses/${course.course_id}`}
                aria-label={`View ${course.title}`}
              >
                <Eye aria-hidden="true" />
                View
              </Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <Link
                href={`/dashboard/courses/edit/${course.course_id}`}
                aria-label={`Edit ${course.title}`}
              >
                <Pencil aria-hidden="true" />
                Edit
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="min-h-11 text-red-700 hover:bg-red-500/10 hover:text-red-700 dark:text-red-300"
              aria-label={`Delete ${course.title}`}
              onClick={() => {
                setCourseData({ ...course, refetch });
                setdeleteCoursePopup(true);
              }}
            >
              <Trash2 aria-hidden="true" />
              <span className="sr-only">Delete</span>
            </Button>
          </>
        )}
        Component={
          <Button asChild className="min-h-11">
            <Link href="/dashboard/courses/add">
              <Plus aria-hidden="true" />
              Create course
            </Link>
          </Button>
        }
      />
    </>
  );
}

export default Courses;

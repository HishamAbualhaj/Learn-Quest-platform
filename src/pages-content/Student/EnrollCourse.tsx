"use client";
import Button from "@/components/Button";
import API_BASE_URL from "@/config/config";
import useFetch from "@/hooks/useFetch";
import { Course, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

function EnrollCourse({
  user_data,
  courseData,
}: {
  user_data: User;
  courseData: Course;
}) {
  useEffect(() => {
    console.log("user_data", user_data, "courseData", courseData);
  }, []);
  const { mutateAsync, isPending, error, data } = useMutation({
    mutationFn: async () => {
      return await useFetch(
        `${API_BASE_URL}/enrollCourse`,
        {
          student_id: user_data?.student_id,
          course_id: courseData.course_id,
          course_title: courseData.title,
          first_name: user_data?.first_name,
          email: user_data?.email,
        },
        "PUT"
      );
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.error("Error ", error);
    },
  });
  return (
    <div
      onClick={async () => {
        await mutateAsync();
        console.log(data);
      }}
      className="p-5"
    >
      <Button
        isloading={isPending}
        props="px-4 py-3 text-xl !mt-0"
        text={`Enroll Today  – ${courseData.price} $`}
        type={undefined}
        textDarkClr={undefined}
        hoverTextClr={undefined}
        hoverDarkTextClr={undefined}
      />
    </div>
  );
}

export default EnrollCourse;

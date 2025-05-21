import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import API_BASE_URL from "../../config/config";
function CourseVideos({
  student_id,
  course_id,
  lessons,
  email,
  first_name,
  material_id,
  title,
  subtitle,
  isCompleted,
  url,
  setVideoUrl,
  isEnrolled,
  refetch,
}) {
  const [checked, setChecked] = useState(isCompleted);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await useFetch(
        `${API_BASE_URL}/completeCourse`,
        {
          user_id: student_id,
          course_id: course_id,
          lessons: lessons,
          email: email,
          first_name: first_name,
          id: material_id,
          value: isCompleted,
          title: title,
        },
        "PUT"
      );
    },
    onSuccess: () => {
      setChecked((prev) => !prev);
      refetch();
    },
  });

  return (
    <div className="flex items-center lg:gap-5 gap-2 dark:hover:bg-gray-500/20 hover:bg-lightLayout/10">
      {isEnrolled && (
        <div className="lg:pl-4 pl-2 ">
          {!isPending ? (
            <div
              onClick={() => {
                mutate();
              }}
              className={`min-w-5 min-h-5 rounded-full flex items-center justify-center border-[2px] border-gray-400 ${
                checked ? "bg-green-400/90 border-none" : "bg-none"
              }  cursor-pointer`}
            >
              {Boolean(checked) && (
                <div className="border-2 border-white border-t-0 border-r-0 -rotate-45 w-[13px] h-[7px] mb-1"></div>
              )}
            </div>
          ) : (
            <svg
              className="mr-3 -ml-1 size-5 animate-spin dark:text-white text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </div>
      )}

      <div
        onClick={() => {
          if (isEnrolled) {
            setVideoUrl(url);
          } else {
            Boolean(url) ? setVideoUrl(url) : "";
          }
        }}
        className={`text-lg border_platform b relative sm:p-6 p-4 ${
          !isEnrolled && !Boolean(url) ? "cursor-not-allowed" : "cursor-pointer"
        } flex-1`}
      >
        {title}
        <div className="ml-5 text-sm mt-2 dark:text-white/50 text-black/50 line-clamp-1">
          {subtitle}
        </div>
        {!isEnrolled && !Boolean(url) && (
          <div className="absolute top-0 left-0  bg-purple-800/20 z-10  dark:text-purple-300 text-white w-full h-full lg:text-md text-sm flex gap-3 justify-center items-center">
            <div className="dark:bg-purple-600 bg-purple-500 p-2 rounded-md">
              You are not Enrolled <FontAwesomeIcon icon={faLock} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseVideos;

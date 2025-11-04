"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHandHoldingDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";

import CourseVideos from "./CourseVideos";
import Review from "./Review";
import { Course, CourseMaterial, User } from "@/types";
import EnrollCourse from "./EnrollCourse";
interface CoursePageProps {
  user_data: User;
  courseData: Course;
  courseVideos: CourseMaterial[];
  isEnrolled: boolean;
}
function CoursePage({
  courseData,
  courseVideos,
  isEnrolled,
  user_data,
}: CoursePageProps) {
  const [isTranslate, setIsTranslate] = useState(false);

  const [videoUrl, setVideoUrl] = useState(null);

  return (
    <>
      {courseData ? (
        <div className=" px-5 relative overflow-hidden">
          <div className="flex items-center justify-between  py-3">
            <div className="text-2xl font-bold">{courseData.title}</div>
            <FontAwesomeIcon
              onClick={() => {
                setIsTranslate(!isTranslate);
              }}
              className="text-2xl dark:text-white cursor-pointer xl:hidden! self-end py-2"
              icon={faBars}
            />
          </div>
          <div className="flex justify-between border dark:border-borderDark border-borderLight p-5 gap-5">
            <div className="bg-gray-400 flex-1 w-full h-[700px]">
              {videoUrl && (
                <iframe width="100%" height="100%" src={videoUrl}></iframe>
              )}
            </div>
            <div
              className={`
          ${
            isTranslate ? "translate-x-0!" : ""
          } transition xl:relative absolute xl:max-w-[600px] max-xl:translate-x-full right-0 max-h-[800px] sm:min-w-[500px] flex flex-col border_platform all xl:dark:bg-gray-800/40 dark:bg-gray-700 bg-gray-300 xl:bg-lightLayout overflow-auto top-12 xl:top-0`}
            >
              {courseVideos.map((video) => (
                <CourseVideos
                  {...courseData}
                  key={video.material_id}
                  {...user_data}
                  lessons={courseData.lessons}
                  {...video}
                  setVideoUrl={setVideoUrl}
                  isEnrolled={isEnrolled}
                  refetch={() => {}}
                  url={video.url}
                />
              ))}
            </div>
          </div>
          <div className="border_platform all mt-5">
            <div className="flex justify-between xl:flex-row flex-col-reverse">
              <div className="xl:py-16 py-12 xl:pl-10 px-8">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    className="dark:text-white text-2xl border p-3 rounded-[50%]"
                    icon={faUser}
                  />
                  <div className="font-semibold">
                    ADMIN
                    <div className="text-black/50 dark:text-white/50 font-normal">
                      Professional web developer
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="leading-8 text-xl max-w-[900px]">
                    {courseData.description}
                  </div>
                </div>
              </div>
              {!isEnrolled && (
                <div className="border_platform all h-fit m-5">
                  <ul>
                    <li className="flex items-center gap-2 text-lg border_platform b p-5">
                      <FontAwesomeIcon icon={faHandHoldingDollar} />
                      30 Days Money Guarantee
                    </li>
                    <li className="flex items-center gap-2 text-lg border_platform b mt-2 p-5">
                      <FontAwesomeIcon icon={faCcVisa} />
                      Secure Payment Gateway
                    </li>
                  </ul>
                  <EnrollCourse user_data={user_data} courseData={courseData} />
                </div>
              )}
            </div>

            {/* reviews  */}
            <Review
              {...{
                course_title: courseData.title,
                course_id: String(courseData.course_id),
                ...user_data,
              }}
            />
            {/* reviews  */}
          </div>
        </div>
      ) : (
        <div className="h-screen text-2xl flex justify-center mt-10">
          No Course Found
        </div>
      )}
    </>
  );
}

export default CoursePage;

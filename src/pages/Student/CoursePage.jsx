import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHandHoldingDollar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";

import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { UserData } from "../../context/UserDataContext";
import CourseVideos from "./CourseVideos";
import Review from "./Review";
import API_BASE_URL from "../../config/config";
function CoursePage() {
  const [isTranslate, setIsTranslate] = useState(false);
  const [course_id, setCourseId] = useState(null);
  const [user_data, setUserData] = useState(null);

  const [videoUrl, setVideoUrl] = useState(null);

  const [courseVideos, setCourseVideos] = useState(null);

  const course_url = useLocation();

  const data_user = useContext(UserData);

  useEffect(() => {
    const course_data = course_url.pathname.split("/").at(-1);
    const id = course_data.split("-")[0];
    setCourseId(id);
  }, [course_url.pathname]);

  useEffect(() => {
    if (data_user && course_id) {
      const userDataArray = data_user?.userData;
      if (userDataArray) {
        const { student_id, email, first_name, image_url, role } =
          userDataArray?.[0] ?? {
            student_id: null,
            email: null,
            first_name: null,
            image_url: null,
            role,
          };
        setUserData({
          student_id,
          course_id,
          email,
          first_name,
          image_url,
          role,
        });
      }
    }
  }, [data_user, course_id]);

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (!user_data || !user_data.course_id) return [];
      return await useFetch(
        `${API_BASE_URL}/getCourseData`,
        {
          ...user_data,
        },
        "POST"
      );
    },
    queryKey: ["videos"],
    enabled: !!user_data && !!course_id,
    refetchOnMount: true,
  });

  const [enrolled, setEnrolled] = useState(data?.msg?.enrolled || null);
  useEffect(() => {
    if (!isLoading && data) {
      const safeMsg = data?.msg?.msg ?? [];
      const [
        courseVideos = [],
        courseMaterial = [],
        courseMaterialAllowedUrl = [],
      ] = safeMsg;

      const mergedMaterials = [
        ...courseMaterial,
        ...courseMaterialAllowedUrl,
      ].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

      setCourseVideos([courseVideos, mergedMaterials]);

      setEnrolled(data?.msg?.enrolled);
    }
  }, [isLoading, data]);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async () => {
      return await useFetch(
        `${API_BASE_URL}/enrollCourse`,
        {
          student_id: user_data?.student_id,
          course_id: course_id,
          course_title: courseVideos?.[0].title,
          first_name: user_data?.first_name,
          email: user_data?.email,
        },
        "PUT"
      );
    },
    onSuccess: () => {
      setEnrolled(true);
      refetch();
    },
    onError: () => {
      console.error("Error ", error);
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {data?.status ? (
        <div className=" px-5 relative overflow-hidden">
          <div className="flex items-center justify-between  py-3">
            <div className="text-2xl font-bold">{courseVideos?.[0].title}</div>
            <FontAwesomeIcon
              onClick={() => {
                setIsTranslate(!isTranslate);
              }}
              className="text-2xl dark:text-white cursor-pointer xl:hidden self-end py-2"
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
            isTranslate ? "!translate-x-0" : ""
          } transition xl:relative absolute xl:max-w-[600px] max-xl:translate-x-full right-0 max-h-[800px] sm:min-w-[500px] flex flex-col border_platform all xl:dark:bg-gray-800/40 dark:bg-gray-700 bg-gray-300 xl:bg-lightLayout overflow-auto top-12 xl:top-0`}
            >
              {courseVideos?.[1].map((video) => (
                <CourseVideos
                  key={video.material_id}
                  {...user_data}
                  lessons={courseVideos?.[0].lessons}
                  {...video}
                  setVideoUrl={setVideoUrl}
                  isEnrolled={enrolled}
                  refetch={refetch}
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
                    {courseVideos?.[0].description}
                  </div>
                </div>
              </div>
              {!enrolled && (
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
                  <div
                    onClick={async () => {
                      await mutateAsync();
                    }}
                    className="p-5"
                  >
                    <Button
                      isloading={isPending}
                      props="px-4 py-3 text-xl !mt-0"
                      text={`Enroll Today  – ${courseVideos?.[0].price} $`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* reviews  */}
            <Review
              {...{
                course_title: courseVideos?.[0].title,
                ...user_data,
              }}
            />
            {/* reviews  */}
          </div>
        </div>
      ) : (
        <div className="h-[100vh] text-2xl flex justify-center mt-10">
          No Course Found
        </div>
      )}
    </>
  );
}

export default CoursePage;

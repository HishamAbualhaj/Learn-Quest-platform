import {
  faBezierCurve,
  faBook,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Feature() {
  const features = [
    {
      id: 1,
      title: "Expert-Led Courses",
      subTitle:
        "Gain knowledge from industry experts and experienced instructors in each field",
      icon: faBook,
    },
    {
      id: 2,
      title: "Personalized Learning Paths",
      subTitle:
        "Receive course recommendations tailored to your skill level and career goals.",
      icon: faBezierCurve,
    },
    {
      id: 3,
      title: "Flexible Schedules",
      subTitle:
        "Learn at your own pace, with courses available anytime, anywhere.",
      icon: faCalendarDays,
    },
  ];
  return (
    <div className="section bg-lightLayout dark:bg-lightDark  lg:py-16 py-10">
      <div className="max-container">
        <div className="flex lg:flex-row flex-col justify-between lg:gap-0 gap-5">
          {features.map((feature) => (
            <div className="flex flex-col gap-2">
              <div className="">
                <FontAwesomeIcon
                  className="text-mainClr/90 bg-mainClr/10 lg:p-5 p-4 rounded-full lg:text-xl text-lg"
                  icon={feature.icon}
                />
              </div>
              <div className="font-[600] lg:text-2xl text-xl">
                {feature.title}
              </div>
              <div className="text-black/50 max-w-[400px] dark:text-white/50">
                {feature.subTitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feature;

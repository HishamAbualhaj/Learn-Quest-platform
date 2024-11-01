import React from "react";
import hisham from "../assets/hisham.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
function Reviews() {
  const courses = [
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
  return (
    <>
      <div className="flex items-center md:flex-row flex-col justify-between">
        <div className="text">
          <div className="dark:text-white text-lightText font-semibold text-4xl ">Reviews</div>
          <div className="dark:text-gray-400 text-lightText mt-2 ">See all reviews for courses</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="dark:text-white text-lightText text-xl">Select Course</div>
          <select
            className="dark:bg-borderDark dark:border-none border  dark:text-white text-lightText focus:outline-none md:w-[500px] w-full p-2 text-lg appearance-none"
            name="courses"
            id=""
          >
            {courses.map((course) => (
              <option className="text-black" key={course.id} id={course.id} value={`${course.name}`}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 p-3 xl:max-h-[700px] max-h-[600px] overflow-auto gap-5 mt-5">
        <Review
          image={hisham}
          stars={[1, 2, 3, 4, 5]}
          text={
            "The platform is amazing! The course content is well-organized, and the instructors are highly knowledgeable. I completed a UI/UX design course, and it exceeded my expectations. The interactive quizzes and Fassignments made the learning experience engaging and fun."
          }
        />
         <Review
          image={hisham}
          stars={[1, 2, 3, 4, 5]}
          text={
            "The platform is amazing! The course content is well-organized, and the instructors are highly knowledgeable. I completed a UI/UX design course, and it exceeded my expectations. The interactive quizzes and Fassignments made the learning experience engaging and fun."
          }
        />
         <Review
          image={hisham}
          stars={[1, 2, 3, 4, 5]}
          text={
            "The platform is amazing! The course content is well-organized, and the instructors are highly knowledgeable. I completed a UI/UX design course, and it exceeded my expectations. The interactive quizzes and Fassignments made the learning experience engaging and fun."
          }
        />
          <Review
          image={hisham}
          stars={[1, 2, 3, 4, 5]}
          text={
            "The platform is amazing! The course content is well-organized, and the instructors are highly knowledgeable. I completed a UI/UX design course, and it exceeded my expectations. The interactive quizzes and Fassignments made the learning experience engaging and fun."
          }
        />
          <Review
          image={hisham}
          stars={[1, 2, 3, 4, 5]}
          text={
            "The platform is amazing! The course content is well-organized, and the instructors are highly knowledgeable. I completed a UI/UX design course, and it exceeded my expectations. The interactive quizzes and Fassignments made the learning experience engaging and fun."
          }
        />
      </div>
    </>
  );
}

function Review({ image, stars, text }) {
  return (
    <div className="flex gap-5 dark:bg-lightDark bg-white dark:shadow-none box-shadow p-5 rounded-md xl:flex-row flex-col dark:border-none border ">
      <div className="h-fit rounded-[50%]">
        <img
          className="rounded-[50%] object-cover h-[80px] w-[80px]"
          src={image}
          alt=""
        />
      </div>
      <div>
        <div className="dark:text-white text-lightText text-xl">Hisham Alhaj</div>
        <div className="flex gap-2 mt-4">
          {stars.map(() => (
            <FontAwesomeIcon key={Math.random()} className="text-yellow-400" icon={faStar} />
          ))}
        </div>
        <div className="dark:text-gray-300 text-lightText max-w-[500px] mt-4 md:text-lg text-md">
          {text}
        </div>
      </div>
    </div>
  );
}
export default Reviews;

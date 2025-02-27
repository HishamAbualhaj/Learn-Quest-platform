import React from "react";
import hisham from "../../assets/hisham.jpg";
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

  const reviews = [
    {
      id: 1,
      name: "Sarah T.",
      text: "I had no prior experience in AI, but this course made it so easy to understand. The lessons are structured perfectly for beginners, and the examples are practical. The instructor’s explanations of machine learning algorithms were clear and engaging. Now, I’ve built my first AI-powered chatbot! Highly recommended for anyone just starting in AI.",
      image: hisham,
      stars: 5,
    },
    {
      id: 2,
      name: "James R.",
      text: "As someone already familiar with AI concepts, I was looking for something more advanced. This course didn’t disappoint! The deep dive into neural networks and reinforcement learning was particularly helpful for my ongoing projects. However, I would have appreciated a bit more focus on hyperparameter tuning.",
      image: hisham,
      stars: 4,
    },
    {
      id: 3,
      name: "Linda M.",
      text: "This course changed my career trajectory. I was a graphic designer, and now I’ve transitioned into AI development. The mentorship and real-world projects included in the curriculum gave me the confidence to land a job as a Junior AI Engineer. The section on deploying AI models was a game-changer for me.",
      image: hisham,
      stars: 5,
    },
    {
      id: 4,
      name: "Ahmed K.",
      text: "As a small business owner, I took this course to understand how AI can optimize my operations. It was amazing to learn how to implement AI for customer segmentation and demand forecasting. The lessons are practical, and the tools recommended are cost-effective. Now, I use AI to improve my business processes, and it’s been transformative!",
      image: hisham,
      stars: 5,
    },
    {
      id: 5,
      name: "Emily J.",
      text: "This course was a perfect supplement to my university studies. The practical projects helped me solidify the theoretical concepts I learned in class. I especially liked the hands-on sections on natural language processing and computer vision. Thanks to this course, my final-year AI project received top marks!",
      image: hisham,
      stars: 5,
    },
  ];
  return (
    <>
      <div className="flex items-center md:flex-row flex-col justify-between">
        <div className="text">
          <div className="dark:text-white text-lightText font-semibold text-4xl ">
            Reviews
          </div>
          <div className="dark:text-gray-400 text-lightText mt-2 ">
            See all reviews for courses
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="dark:text-white text-lightText text-xl">
            Select Course
          </div>
          <select className="md:w-[500px] w-full text-lg" name="courses" id="">
            {courses.map((course) => (
              <option
                className="text-black"
                key={course.id}
                id={course.id}
                value={`${course.name}`}
              >
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 p-3 xl:max-h-[700px] max-h-[600px] overflow-auto gap-5 mt-5">
        {reviews.map((review) => (
          <Review
            key={review.id}
            name={review.name}
            image={review.image}
            stars={review.stars}
            text={review.text}
          />
        ))}
      </div>
    </>
  );
}

function Review({ image, stars, text ,name }) {
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
        <div className="dark:text-white text-lightText text-xl">
          {name}
        </div>
        <div className="flex gap-2 mt-4">
          {[...Array(stars)].map(() => (
            <FontAwesomeIcon
              key={Math.random()}
              className="text-yellow-400"
              icon={faStar}
            />
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

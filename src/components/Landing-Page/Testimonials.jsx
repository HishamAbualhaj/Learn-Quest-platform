import React from "react";
import person from "../../assets/person.png";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah L.",
      title: "Marketing Specialist",
      review:
        "This platform has been a game-changer for my career. The courses are well-structured, and the instructors are extremely knowledgeable. I was able to apply what I learned immediately at work!",
      stars: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      name: "James M.",
      title: "Software Engineer",
      review:
        "I loved the hands-on projects and real-world examples. It made learning so much more enjoyable and relevant. I feel more confident in my skills now!",
      stars: [1, 2, 3, 4, 5],
    },
    {
      id: 3,
      name: "Priya K.",
      title: "Data Analyst",
      review:
        "The ability to learn at my own pace was essential for me. The courses are easy to follow, and I could fit them around my busy schedule. Highly recommended!",
      stars: [1, 2, 3, 4, 5],
    },
  ];

  return (
    <div className="section">
      <div className="max-container py-14">
        <div className="font-[600] lg:text-2xl text-xl">
          What Our Learners Are Saying
        </div>
        <div className="text-black/50 max-w-[600px] dark:text-white/50 mt-2">
          Discover how our courses have transformed careers and helped people
          achieve their goals.
        </div>
        <div className="flex xl:flex-row flex-col xl:gap-5 gap-10 mt-5">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="border rounded-full p-3">
                  <img className="w-[40px] h-[40px]" src={person} alt="" />
                </div>
                <div>
                  <div className="text">{testimonial.name}</div>
                  <div className="text-black/50 max-w-[600px] dark:text-white/50">
                    {testimonial.title}
                  </div>
                </div>
              </div>
              <div className="text-black/50 max-w-[600px] dark:text-white/50 line-clamp-3">
                {testimonial.review}
              </div>
              <div className="flex gap-1">
                {testimonial.stars.map(() => (
                  <FontAwesomeIcon className="text-yellow-400 " icon={faStar} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;

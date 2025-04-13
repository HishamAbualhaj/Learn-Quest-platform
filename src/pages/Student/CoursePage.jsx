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
import Person from "../../assets/Screenshot_1.jpg";
import Avatar from "../../components/Avatar";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import { UserData } from "../../context/UserDataContext";
import CourseVideos from "./CourseVideos";
import Review from "./Review";
function CoursePage() {
  const [isTranslate, setIsTranslate] = useState(false);
  const [course_id, setCourseId] = useState(null);
  const [user_data, setUserData] = useState(null);

  const [videoUrl, setVideoUrl] = useState(null);

  const [enrolled, setEnrolled] = useState(null);
  const course_url = useLocation();

  const data_user = useContext(UserData);

  useEffect(() => {
    const course_data = course_url.pathname.split("/").at(-1);
    const id = course_data.split("-")[0];
    setCourseId(id);
  }, [course_url]);

  useEffect(() => {
    if (data_user) {
      const userDataArray = data_user?.userData;

      const { student_id, email, first_name, role } = userDataArray[0];
      setUserData({ student_id, email, first_name, role });
    }
  }, [data_user]);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      if (!course_id || !user_data) return;
      return await useFetch(
        "http://localhost:3002/getCourseData",
        {
          course_id: course_id,
          user_data: user_data,
        },
        "POST"
      );
    },
    queryKey: ["videos"],
    enabled: !!course_id && !!user_data,
  });
  const [courseVideos, setCourseVideos] = useState(null);

  useEffect(() => {
    if (!isLoading && data) {
      const arr = [...(data?.msg?.msg[1] || []), ...(data?.msg?.msg[2] || [])];

      arr.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

      setCourseVideos([data?.msg?.msg[0], arr]);
      setEnrolled(data?.msg?.enrolled);
    }
  }, [isLoading, data]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      return await useFetch(
        "http://localhost:3002/enrollCourse",
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
    },
    onError: () => {
      console.log("Error ", error);
    },
  });
  // const courseVideos = [
  //   {
  //     key: 1,
  //     title: "Introduction to Artificial Intelligence",
  //     subtitle: "Overview of AI: History, Applications, and Future Trends",
  //   },
  //   {
  //     key: 2,
  //     title: "Understanding Machine Learning",
  //     subtitle:
  //       "Types of Machine Learning: Supervised, Unsupervised, and Reinforcement Learning",
  //   },
  //   {
  //     key: 3,
  //     title: "Deep Learning Basics",
  //     subtitle: "Introduction to Neural Networks and Key Concepts",
  //   },
  //   {
  //     key: 4,
  //     title: "Data Preprocessing for AI Models",
  //     subtitle: "Techniques for Cleaning, Transforming, and Normalizing Data",
  //   },
  //   {
  //     key: 5,
  //     title: "Building Your First AI Model",
  //     subtitle:
  //       "A Step-by-Step Guide to Creating and Training a Simple AI Model",
  //   },
  //   {
  //     key: 6,
  //     title: "Natural Language Processing (NLP) Fundamentals",
  //     subtitle: "Text Analysis and Sentiment Detection with AI",
  //   },
  //   {
  //     key: 7,
  //     title: "Computer Vision Essentials",
  //     subtitle:
  //       "Image Recognition and Object Detection Using Convolutional Neural Networks",
  //   },
  //   {
  //     key: 8,
  //     title: "AI Ethics and Bias",
  //     subtitle:
  //       "Understanding Ethical Challenges and Reducing Bias in AI Systems",
  //   },
  //   {
  //     key: 9,
  //     title: "Deploying AI Models",
  //     subtitle: "Introduction to Model Deployment in Real-World Applications",
  //   },
  //   {
  //     key: 10,
  //     title: "Future of AI",
  //     subtitle:
  //       "Emerging Trends, Tools, and Career Opportunities in Artificial Intelligence",
  //   },
  // ];
  const courseContent = [
    {
      key: "key-topics",
      title: "Key Topics Covered",
      data: [
        {
          title: "Introduction to AI",
          description: "History, concepts, and applications.",
        },
        {
          title: "Machine Learning",
          description: "Algorithms, evaluation, and optimization.",
        },
        {
          title: "Deep Learning",
          description: "Neural networks, CNNs, RNNs.",
        },
        {
          title: "Natural Language Processing (NLP)",
          description: "Text processing and chatbots.",
        },
        {
          title: "Computer Vision",
          description: "Image recognition and object detection.",
        },
        {
          title: "AI Tools and Frameworks",
          description: "TensorFlow, PyTorch, and more.",
        },
        {
          title: "Ethical AI",
          description: "Bias, fairness, and responsible development.",
        },
        {
          title: "AI in Practice",
          description: "Real-world applications and projects.",
        },
      ],
    },
    {
      key: "learning-objectives",
      title: "Learning Objectives",
      data: [
        "Understand the fundamental principles and methods of AI.",
        "Build and evaluate machine learning models.",
        "Work with modern AI tools and technologies to create practical solutions.",
        "Analyze ethical considerations and societal impacts of AI.",
        "Apply AI concepts to real-world projects in various domains.",
      ],
    },
    {
      key: "who-should-enroll",
      title: "Who Should Enroll?",
      data: [
        "Students and professionals seeking an introduction to AI.",
        "Software developers and data scientists looking to upskill.",
        "Anyone interested in understanding the potential and limitations of AI.",
      ],
    },
    {
      key: "prerequisites",
      title: "Prerequisites",
      data: [
        "Basic knowledge of programming (preferably Python).",
        "Familiarity with linear algebra, probability, and statistics is helpful but not mandatory.",
      ],
    },
    {
      key: "course-format",
      title: "Course Format",
      data: [
        { title: "Duration", description: "8–12 weeks" },
        { title: "Mode", description: "Online or in-person" },
        {
          title: "Activities",
          description:
            "Lectures, hands-on labs, quizzes, and capstone projects",
        },
        {
          title: "Assessment",
          description:
            "Individual assignments, group projects, and final evaluation",
        },
      ],
    },
    {
      key: "why-take-course",
      title: "Why Take This Course?",
      data: [
        "Artificial Intelligence is transforming industries and shaping the future. This course equips learners with the knowledge and skills to harness the power of AI, opening up opportunities for careers in cutting-edge fields like data science, robotics, and AI research.",
      ],
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah T.",
      text: "I had no prior experience in AI, but this course made it so easy to understand. The lessons are structured perfectly for beginners, and the examples are practical. The instructor’s explanations of machine learning algorithms were clear and engaging. Now, I’ve built my first AI-powered chatbot! Highly recommended for anyone just starting in AI.",
      image: "Person1.png",
      stars: 5,
    },
    {
      id: 2,
      name: "James R.",
      text: "As someone already familiar with AI concepts, I was looking for something more advanced. This course didn’t disappoint! The deep dive into neural networks and reinforcement learning was particularly helpful for my ongoing projects. However, I would have appreciated a bit more focus on hyperparameter tuning.",
      image: "Person2.png",
      stars: 4,
    },
    {
      id: 3,
      name: "Linda M.",
      text: "This course changed my career trajectory. I was a graphic designer, and now I’ve transitioned into AI development. The mentorship and real-world projects included in the curriculum gave me the confidence to land a job as a Junior AI Engineer. The section on deploying AI models was a game-changer for me.",
      image: "Person3.png",
      stars: 5,
    },
    {
      id: 4,
      name: "Ahmed K.",
      text: "As a small business owner, I took this course to understand how AI can optimize my operations. It was amazing to learn how to implement AI for customer segmentation and demand forecasting. The lessons are practical, and the tools recommended are cost-effective. Now, I use AI to improve my business processes, and it’s been transformative!",
      image: "Person4.png",
      stars: 5,
    },
    {
      id: 5,
      name: "Emily J.",
      text: "This course was a perfect supplement to my university studies. The practical projects helped me solidify the theoretical concepts I learned in class. I especially liked the hands-on sections on natural language processing and computer vision. Thanks to this course, my final-year AI project received top marks!",
      image: "Person5.png",
      stars: 5,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data?.status ? (
        <div className=" px-5 relative overflow-hidden">
          <div className="flex items-center justify-between  py-3">
            <div className="text-2xl font-bold">
              {courseVideos && courseVideos[0].title}
              {/* {courseVideos && courseVideos?.[0].title} */}
            </div>
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
              {courseVideos &&
                courseVideos[1].map((video) => (
                  <CourseVideos
                    key={video.material_id}
                    {...user_data}
                    {...video}
                    setVideoUrl={setVideoUrl}
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
                    {courseVideos && courseVideos[0].description}
                  </div>

                  {/* TESTING DATA  */}
                  {courseContent.map((content) => (
                    <div className="mt-10">
                      <div key={content.key} className="font-bold text-xl">
                        {content.title}
                      </div>
                      <ul>
                        {content.data.map((data) =>
                          typeof data === "object" ? (
                            <div className="lg:ml-8 mt-2">
                              <li className="list-decimal font-semibold">
                                {data.title}
                              </li>
                              <div className="list-disc mt-2 ">
                                {data.description}
                              </div>
                            </div>
                          ) : (
                            <li className="list-disc lg:ml-8 mt-2 max-w-[900px]">
                              {data}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                  {/* TESTING DATA  */}
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
                    onClick={() => {
                      mutate();
                    }}
                    className="p-5"
                  >
                    <Button
                      isloading={isPending}
                      props="px-4 py-3 text-xl !mt-0"
                      text={`Enroll Today  – ${
                        courseVideos && courseVideos[0].price
                      } $`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* reviews  */}
            <div className="m-5 rounded-md">
              <div className="font-semibold text-2xl">Reviews</div>
              <div className="mt-3 p-5">
                <div className="flex gap-5">
                  <Avatar className={"h-[50px] w-[50px]"} img={Person} />
                  <div className="flex flex-1 gap-2">
                    <input
                      placeholder="Write a review"
                      className="w-full rounded-sm"
                      type="text"
                    />
                    <select className="px-5" name="" id="">
                      <option className="text-black" value="1">
                        1
                      </option>
                      <option className="text-black" value="2">
                        2
                      </option>
                      <option className="text-black" value="3">
                        3
                      </option>
                      <option className="text-black" value="4">
                        4
                      </option>
                      <option className="text-black" value="5">
                        5
                      </option>
                    </select>
                  </div>
                </div>
                <div className="border_platform l pl-5">
                  {reviews.map((review) => (
                    <Review
                      key={review.id}
                      name={review.name}
                      image={review.image}
                      text={review.text}
                      stars={review.stars}
                    />
                  ))}
                </div>
              </div>
            </div>
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

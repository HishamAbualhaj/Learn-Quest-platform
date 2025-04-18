import { faPaperPlane, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import Person from "../../assets/Screenshot_1.jpg";
import Avatar from "../../components/Avatar";
import { useEffect, useState } from "react";
import Alert from "../../components/Alert";
function Review(user_data) {
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

  const [alert, setAlert] = useState(null);

  const [closeButton, setCloseButton] = useState(false);
  const [review_data, setReviewData] = useState({
    review_text: "",
    stars: 1,
  });
  const { mutate, isPending, data, error } = useMutation({
    mutationFn: async () => {
      return await useFetch(
        `${API_BASE_URL}/addReview`,
        {
          ...user_data,
          ...review_data,
        },
        "POST"
      );
    },
    onSuccess: () => {
      console.log("Result", data);
    },
    onError: () => {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    if (data) {
      setCloseButton(false);
      setAlert(data);
    }
  }, [data]);

  useEffect(() => {
    if (closeButton) {
      setAlert(null);
    }
  }, [closeButton]);
  function handleChange(e) {
    const { id, value } = e.target;
    setReviewData((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <>
      <div className="m-5 rounded-md">
        {alert ? (
          alert?.status ? (
            <Alert
              msg={alert.msg}
              type="success"
              setCloseButton={setCloseButton}
            />
          ) : (
            <Alert msg={alert.msg} setCloseButton={setCloseButton} />
          )
        ) : (
          <></>
        )}

        <div className="font-semibold text-2xl">Reviews</div>
        <div className="mt-3 p-5">
          <div className="flex gap-5">
            <Avatar className={"h-[50px] w-[50px]"} img={Person} />
            <div className="flex flex-1 gap-2">
              <input
                required
                id="review_text"
                onChange={handleChange}
                placeholder="Write a review"
                className="w-full rounded-sm"
                type="text"
                value={review_data?.review_text}
              />
              <div className="flex gap-2">
                <select
                  onChange={handleChange}
                  className="px-5"
                  name=""
                  id="stars"
                >
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
                {isPending ? (
                  <></>
                ) : (
                  <FontAwesomeIcon
                    onClick={() => {
                      mutate();
                    }}
                    className="p-4 text-lg text-white  cursor-pointer bg-gray-500 hover:bg-gray-800 hover:text-white transition"
                    icon={faPaperPlane}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="border_platform l px-5 h-[700px] mt-10 overflow-auto">
            {reviews.map((review) => (
              <ReviewData
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
    </>
  );
}
function ReviewData({ name, image, text, stars }) {
  return (
    <>
      <div className="flex justify-between mt-5">
        <div className="flex items-center gap-5">
          <Avatar className={"h-[50px] w-[50px]"} img={image} />
          <div className="text-lg">{name}</div>
        </div>
        <div className="flex items-center gap-2">
          {[...Array(stars)].map(() => (
            <FontAwesomeIcon
              key={Math.random()}
              className="text-yellow-400"
              icon={faStar}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 lg:ml-8 dark:text-white/50 text-black/50 max-w-[900px]">
        {text}
      </div>
    </>
  );
}
export default Review;

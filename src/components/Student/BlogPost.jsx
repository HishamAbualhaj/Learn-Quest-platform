import React from "react";
import Ai from "../../assets/blog/artical.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Person from "../../assets/Screenshot_1.jpg";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
function BlogPost() {
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
    <div className="bg-lightLayout dark:bg-gray-800/20 border_platform all xl:m-5 m-2 !mb-0">
      <div className="max-w-[1100px] mx-auto leading-8 py-10 sm:max-lg:px-8 px-5 ">
        <div className="">
          <h1 className="sm:text-[30px] text-2xl font-bold leading-10">
            The Evolution of Artificial Intelligence: Where Are We Now?
          </h1>
          <img className="lg:max-w-[650px] mt-5 mx-auto" src={Ai} alt="" />
          <p className="text-lg mt-5">
            Artificial Intelligence (AI) has come a long way since its
            conceptual origins in the mid-20th century. From simple rule-based
            systems to advanced machine learning algorithms, AI has transformed
            industries and reshaped how we interact with technology. But where
            exactly are we now, and where are we heading?
          </p>
          <div className="mt-10 font-semibold text-2xl">
            A Brief History of AI
          </div>
          <div className="text-lg mt-3">
            AI’s journey began with the creation of algorithms that could mimic
            logical reasoning. Early milestones include:
          </div>
          <div className="list-disc flex flex-col gap-2 mt-3">
            <li>
              <div className="font-semibold inline">1956:</div> The term
              "artificial intelligence" was coined at the Dartmouth Conference,
              marking AI as a distinct research field.
            </li>
            <li>
              <div className="font-semibold inline">1980s:</div> The emergence
              of expert systems aimed to simulate human decision-making using
              predefined rules.
            </li>
            <li>
              <div className="font-semibold inline">2000s:</div> Machine
              learning and big data took center stage, allowing AI to improve
              itself through experience.
            </li>
          </div>
          <div className="text-lg mt-5">
            Today, AI has reached a stage where it not only learns from data but
            also applies this knowledge to complex, real-world scenarios.
          </div>
          <div className="mt-10 font-semibold text-2xl">
            Key Advancements in AI
          </div>
          <div className="list-decimal flex flex-col gap-2 mt-3">
            <li>
              <div className="text-lg inline font-semibold">Deep Learning</div>
              <div className="list-disc ml-10">
                <li>
                  Using neural networks with many layers, AI can recognize
                  patterns in vast datasets. Applications range from facial
                  recognition to autonomous driving.
                </li>
                <li>
                  Companies like OpenAI and Google DeepMind have developed
                  groundbreaking systems like ChatGPT and AlphaFold.
                </li>
              </div>
            </li>
            <li>
              <div className="text-lg inline font-semibold">
                Natural Language Processing (NLP)
              </div>
              <div className="list-disc ml-10">
                <li>
                  Tools like chatbots and virtual assistants (e.g., Siri, Alexa)
                  rely on NLP to understand and respond to human language.
                </li>
                <li>
                  Models like GPT-4 have made conversational AI more human-like
                  and versatile.
                </li>
              </div>
            </li>
            <li>
              <div className="text-lg inline font-semibold">
                AI in Healthcare
              </div>
              <div className="list-disc ml-10">
                <li>
                  AI-powered tools diagnose diseases, predict patient outcomes,
                  and even develop treatment plans.
                </li>
                <li>
                  For example, IBM Watson assists doctors in analyzing medical
                  data faster and more accurately.
                </li>
              </div>
            </li>
          </div>
          <div className="mt-10 font-semibold text-2xl">
            Current Applications of AI
          </div>
          <div className="list-disc flex flex-col gap-2 mt-3">
            <li>
              <div className="font-semibold inline-block">
                Business and Automation:
              </div>{" "}
              Automating repetitive tasks like data entry, customer service, and
              inventory management.
            </li>
            <li>
              <div className="font-semibold inline-block">Finance:</div> Fraud
              detection, algorithmic trading, and credit scoring.
            </li>
            <li>
              <div className="font-semibold inline-block">Entertainment:</div>{" "}
              AI curates personalized recommendations on platforms like Netflix
              and Spotify.
            </li>
          </div>
        </div>
      </div>

      {/* comments  */}
      <div className="m-5 rounded-md">
        <div className="font-semibold text-2xl">Comments</div>
        <div className="mt-3 p-5">
          <div className="flex gap-5">
            <Avatar className={"h-[50px] w-[50px]"} img={Person} />
            <div className="flex flex-1 gap-2">
              <input
                placeholder="Write a comment"
                className="w-full rounded-sm"
                type="text"
              />
            </div>
          </div>
          <div className="border_platform l pl-5">
            {reviews.map((review) => (
              <Comment
                key={review.id}
                name={review.name}
                image={review.image}
                text={review.text}
              />
            ))}
          </div>
        </div>
      </div>
      {/* comments  */}
    </div>
  );

  function Comment({ name, image, text}) {
    return (
      <>
        <div className="flex justify-between mt-5">
          <div className="flex items-center gap-5">
            <Avatar className={"h-[50px] w-[50px]"} img={image} />
            <div className="text-lg">{name}</div>
          </div>
        </div>
        <div className="mt-3 lg:ml-8 dark:text-white/50 text-black/50 max-w-[900px]">
          {text}
        </div>
      </>
    );
  }
}

export default BlogPost;

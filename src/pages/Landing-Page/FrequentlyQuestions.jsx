import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
function FrequentlyQuestions() {
  const faqs = [
    {
      id: 1,
      question: "How do I enroll in a course?",
      answer:
        "Simply browse through our course catalog, select the course you’re interested in, and click “Enroll Now.” You’ll be guided through the registration and payment process. Once completed, you’ll have instant access to the course content.",
    },
    {
      id: 2,
      question:
        "Can I access the course materials after completing the course?",
      answer:
        "Yes! Once you’ve completed a course, you’ll have lifetime access to all materials, including any future updates or additional resources added by instructors.",
    },
    {
      id: 3,
      question: "Are there any prerequisites for enrolling in courses?",
      answer:
        "Some courses may have prerequisites, which are listed in the course details. Most beginner courses, however, require no prior knowledge and are open to anyone interested.",
    },
    {
      id: 4,
      question: "What happens if I’m not satisfied with the course?",
      answer:
        "We offer a 30-day money-back guarantee on all courses. If you’re not satisfied with your purchase, reach out to our support team within 30 days of enrollment for a full refund.",
    },
    {
      id: 5,
      question: "Do I receive a certificate after completing a course?",
      answer:
        "Yes! After successfully completing all course requirements, you will receive a certificate of completion that you can download or share on platforms like LinkedIn.",
    },
    {
      id: 6,
      question:
        "How can I contact the instructor if I have questions during the course?",
      answer:
        "You can use the course discussion forum to post questions or reach out to the instructor directly through the messaging feature. Our instructors are responsive and eager to help you succeed.",
    },
    {
      id: 7,
      question: "Are courses self-paced, or do they follow a set schedule?",
      answer:
        "All courses are self-paced, allowing you to learn on your own schedule. There are no deadlines, so you can progress through the material at a pace that suits you.",
    },
    {
      id: 8,
      question: "Can I access the platform on mobile devices?",
      answer:
        "Yes, our platform is fully responsive and accessible on any device, including smartphones and tablets. You can learn anytime, anywhere.",
    },
  ];

  return (
    <div className="section py-16">
      <div className="max-container flex justify-center">
        <div className="max-w-[750px]">
          <div className="font-[600] lg:text-2xl text-xl">
            Frequently asked questions
          </div>
          <div className="text-black/50 max-w-[600px] dark:text-white/50 mt-2">
            Find answers to the most common questions about our application
          </div>
          <div className="flex flex-col ">
            {faqs.map((question) => (
              <Question
                key={question.id}
                question={question.question}
                answer={question.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Question({ question, answer }) {
  const [activeQ, setActiveQ] = useState(false);
  return (
    <div className="border-t dark:border-borderDark mt-5">
      <div className="flex flex-col gap-2">
        <div
          onClick={() => {
            setActiveQ(!activeQ);
          }}
          className="flex items-center justify-between cursor-pointer dark:hover:bg-white/20 hover:bg-lightLayout py-3 px-3"
        >
          <div className="text-lg">{question}</div>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
        {activeQ && (
          <div className="ml-5 text-[16px] leading-8 dark:text-white/50 max-w-[650px]">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}
export default FrequentlyQuestions;

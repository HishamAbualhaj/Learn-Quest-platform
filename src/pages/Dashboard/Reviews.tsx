"use client";
import { forwardRef, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import ReviewCard from "../../components/ReviewCard";
import { Course, ReviewType } from "@/types";
import { FetchResponse } from "@/hooks/useFetchServer";
function Reviews({ courses }: { courses: Course[] }) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [course_id, setCourseId] = useState<string | null>(null);

  const reviewContainer = useRef<HTMLDivElement | null>(null);
  const [lastNode, setLastNode] = useState(null);

  const { dataFetched } = useInfiniteScroll<ReviewType>({
    fetchFn: (pageParam) => {
      if (!course_id) return {} as Promise<FetchResponse<ReviewType>>;
      return useFetch(
        `${API_BASE_URL}/getReviews`,
        { page: pageParam, course_id: course_id },
        "POST"
      );
    },
    queryKey: ["admin_reviews", course_id],
    scrollContainer: reviewContainer,
    observedEle: lastNode,
    data_id: "review_id",
  });

  useEffect(() => {
    if (dataFetched) {
      setReviews(dataFetched);
    }
  }, [dataFetched]);

  const observeEle = (node) => {
    setLastNode(node);
  };
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
          <select
            onChange={(e) => {
              setReviews([]);
              setCourseId(e.target.value);
            }}
            className="md:w-[500px] w-full text-lg"
            name="courses"
            id=""
          >
            <option className="text-black" value={""}>
              Select Course
            </option>
            {courses.map((course) => (
              <option
                className="text-black"
                key={course.course_id}
                value={course.course_id}
              >
                {course.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        ref={reviewContainer}
        className="grid md:grid-cols-2 grid-cols-1 p-3 xl:max-h-[700px] max-h-[600px] overflow-auto gap-5 mt-5"
      >
        {reviews.length ? (
          reviews.map((review) => (
            <Review
              ref={reviews.at(-1) === review ? observeEle : null}
              key={review.review_id}
              name={review.first_name}
              image={review.image_url}
              text={review.review_text}
              stars={review.stars}
              date={review.review_date}
            />
          ))
        ) : course_id ? (
          <div className="text-xl dark:text-white">No Reviews Found</div>
        ) : (
          <div className="text-xl dark:text-white">Select course </div>
        )}
      </div>
    </>
  );
}
type ReviewDataProps = {
  name: string;
  image: string;
  text: string;
  date: string;
  stars: number;
};
const Review = forwardRef<HTMLDivElement, ReviewDataProps>(function Review(
  { image, stars, text, name, date },
  ref
) {
  return (
    <div
      ref={ref}
      className="flex gap-5 dark:bg-lightDark bg-white dark:shadow-none box-shadow p-5 rounded-md xl:flex-row flex-col dark:border-none border "
    >
      <ReviewCard review={{ image, stars, text, name, date }}>
        <ReviewCard.Avatar />
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            <ReviewCard.username />
            <ReviewCard.Stars />
          </div>
          <div className="flex flex-col">
            <div className="wrap-break-word max-w-[600px]">
              <ReviewCard.Text />
            </div>
            <ReviewCard.Date />
          </div>
        </div>
      </ReviewCard>
    </div>
  );
});
{
}
export default Reviews;

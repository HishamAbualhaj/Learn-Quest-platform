import { faPaperPlane, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import API_BASE_URL from "../../config/config";
import Person from "../../assets/Screenshot_1.jpg";
import Avatar from "../../components/Avatar";
import { forwardRef, useEffect, useRef, useState } from "react";
import Alert from "../../components/Alert";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import ReviewCard from "../../components/ReviewCard";
function Review(user_data) {

  const [reviews, setReviews] = useState([]);
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState(null);
  const [closeButton, setCloseButton] = useState(false);
  const [review_data, setReviewData] = useState({
    review_text: "",
    stars: 1,
  });

  const reviewData = useMutation({
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
    onError: () => {
      console.error("Error", reviewData.data);
    },
  });

  useEffect(() => {
    if (reviewData.data) {
      setCloseButton(false);
      setAlert(reviewData.data);
    }
  }, [reviewData.data]);

  useEffect(() => {
    if (closeButton) {
      setAlert(null);
    }
  }, [closeButton]);

  function handleChange(e) {
    const { id, value } = e.target;
    setReviewData((prev) => ({ ...prev, [id]: value }));
  }

  const [lastNode, setLastNode] = useState(null);
  const reviewContainer = useRef();

  const { isFetchingNextPage, dataFetched, hasNextPage } = useInfiniteScroll({
    fetchFn: (pageParam) => {
      return useFetch(
        `${API_BASE_URL}/getReviews`,
        { page: pageParam, course_id: user_data.course_id },
        "POST"
      );
    },
    queryKey: ["reviews", user_data.course_id],
    scrollContainer: reviewContainer,
    observedEle: lastNode,
    data_id: "review_id",
  });

  useEffect(() => {
    setReviews(dataFetched);
  }, [dataFetched]);

  const observeEle = (node) => {
    setLastNode(node);
  };
  return (
    <>
      <div className="m-5 rounded-md">
        {alert &&
          (alert?.status ? (
            <Alert msg={alert.msg} type="success" />
          ) : (
            <Alert msg={alert.msg} />
          ))}

        <div className="font-semibold text-2xl">Reviews</div>
        <div className="mt-3 p-5">
          <div className="flex gap-5">
            <Avatar
              className={"h-[50px] w-[50px]"}
              img={`${API_BASE_URL}/uploads/${user_data.image_url}`}
            />
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
                {reviewData.isPending ? (
                  <></>
                ) : (
                  <FontAwesomeIcon
                    onClick={async () => {
                      await reviewData?.mutateAsync();
                      queryClient.invalidateQueries(["reviews"]);
                    }}
                    className="p-4 text-lg text-white  cursor-pointer bg-gray-500 hover:bg-gray-800 hover:text-white transition"
                    icon={faPaperPlane}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            ref={reviewContainer}
            className="border_platform l px-5 h-[700px] mt-10 overflow-auto"
          >
            {reviews?.map((review) => (
              <ReviewData
                ref={reviews.at(-1) === review ? observeEle : null}
                key={review.review_id}
                name={review.first_name}
                image={review.image_url}
                text={review.review_text}
                stars={review.stars}
                date={review.review_date}
              />
            ))}
            {isFetchingNextPage ? (
              <div className="border_platform b pb-5">
                <div className="flex justify-between mt-5 items-center">
                  <div className="flex items-center gap-5">
                    <div className=" bg-gray-500/20 rounded-[50%] animate-syncPuls">
                      <div className="h-14 w-14"></div>
                    </div>
                    <div className="w-[150px] bg-gray-500/20 h-10 rounded-md animate-syncPuls"></div>
                  </div>

                  <div className="w-[150px] h-[30px] bg-gray-500/20 rounded-md animate-syncPuls"></div>
                </div>
                <div className="flex xl:items-center justify-between xl:flex-row flex-col">
                  <div className="mt-3 lg:ml-8 xl:w-[800px] lg:w-[500] h-[150px] rounded-md bg-gray-500/20 animate-syncPuls"></div>
                  <div className="mt-5 text-sm lg:ml-8 w-[150px] rounded-md h-[30px] bg-gray-500/20 animate-syncPuls"></div>
                </div>
              </div>
            ) : (
              !hasNextPage && (
                <div className="text-2xl flex justify-center mt-5 py-10 font-bold ">
                  No more reviews
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const ReviewData = forwardRef(function ReviewData(
  { name, image, text, stars, date },
  ref
) {
  return (
    <>
      <div ref={ref} className="border_platform b pb-5">
        <ReviewCard review={{ name, image, text, stars, date }}>
          <div className="flex justify-between mt-5 ">
            <div className="flex items-center gap-5">
              <ReviewCard.Avatar />
              <ReviewCard.username />
            </div>
            <ReviewCard.Stars />
          </div>
          <div className="flex xl:items-center justify-between xl:flex-row flex-col">
            <div className="max-w-[1350px] break-words">
              <ReviewCard.Text />
            </div>
            <ReviewCard.Date />
          </div>
        </ReviewCard>
      </div>
    </>
  );
});

export default Review;

{
}

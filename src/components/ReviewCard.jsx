import React, { createContext, useContext } from "react";
import API_BASE_URL from "../config/config";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewCardContext = createContext();

function useReviewCardContext() {
  const context = useContext(ReviewCardContext);
  if (!context) {
    return <></>;
  }
  return context;
}
function ReviewCard({ children, review }) {
  return (
    <ReviewCardContext.Provider value={review}>
      {children}
    </ReviewCardContext.Provider>
  );
}

ReviewCard.Avatar = () => {
  const { image } = useReviewCardContext();
  return <Avatar img={image} className={"h-[50px] w-[50px]"} />;
};
ReviewCard.username = () => {
  const { name } = useReviewCardContext();
  return <div className="text-lg dark:text-white text-lightText">{name}</div>;
};
ReviewCard.Stars = () => {
  const { stars } = useReviewCardContext();
  return (
    <div className="flex items-center gap-2">
      {[...Array(stars)].map(() => (
        <FontAwesomeIcon
          key={Math.random()}
          className="text-yellow-400"
          icon={faStar}
        />
      ))}
    </div>
  );
};

ReviewCard.Text = () => {
  const { text } = useReviewCardContext();
  return (
    <div className="mt-3 lg:ml-8 dark:text-white/50 text-black leading-8">
      {text}
    </div>
  );
};

ReviewCard.Date = () => {
  const { date } = useReviewCardContext();
  return (
    <div className="dark:text-white/50 text-black/50 mt-5 text-sm lg:ml-8">{`${
      date?.split("T")[0]
    } - ${date?.split("T")[1].split(".")[0]}`}</div>
  );
};
export default ReviewCard;

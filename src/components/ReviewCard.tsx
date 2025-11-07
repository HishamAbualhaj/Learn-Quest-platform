import { createContext, ReactNode, useContext } from "react";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ReviewType } from "@/types";
interface ReviewCardProps {
  review: {
    image: string;
    name: string;
    text: string;
    date: string;
    stars: number;
  };
  children: ReactNode;
}
const ReviewCardContext = createContext<{
  image: string;
  name: string;
  text: string;
  date: string;
  stars: number;
} | null>(null);

function useReviewCardContext() {
  const context = useContext(ReviewCardContext);
  if (!context) {
    return;
  }
  return context;
}
function ReviewCard({ children, review }: ReviewCardProps) {
  return (
    <ReviewCardContext.Provider value={review}>
      {children}
    </ReviewCardContext.Provider>
  );
}

ReviewCard.Avatar = () => {
  const { image } = useReviewCardContext() ?? { image: "" };
  return <Avatar img={image} className={"h-[50px] w-[50px]"} />;
};
ReviewCard.username = () => {
  const { name } = useReviewCardContext() ?? { name: "" };
  return <div className="text-lg dark:text-white text-lightText">{name}</div>;
};
ReviewCard.Stars = () => {
  const { stars } = useReviewCardContext() ?? { stars: 0 };
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
  const { text } = useReviewCardContext() ?? { text: "" };
  return (
    <div className="mt-3 lg:ml-8 dark:text-white/50 text-black leading-8">
      {text}
    </div>
  );
};

ReviewCard.Date = () => {
  const { date } = useReviewCardContext() ?? { date: "" };
  return (
    <div className="dark:text-white/50 text-black/50 mt-5 text-sm lg:ml-8">{`${
      date?.split("T")[0]
    } - ${date?.split("T")[1].split(".")[0]}`}</div>
  );
};
export default ReviewCard;

"use client";
import { forwardRef, useRef, useState, useEffect, ChangeEvent } from "react";
import API_BASE_URL from "@/config/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useFetch from "@/hooks/useFetch";
import Avatar from "@/components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Alert from "@/components/Alert";
import ReviewCard from "@/components/ReviewCard";
import { CommentType, User } from "@/types";

function Comments(user_data: User & { blog_id: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment_text, setCommentText] = useState("");
  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: string;
  } | null>(null);
  const queryClient = useQueryClient();
  const commentData = useMutation({
    mutationFn: async () => {
      return await useFetch(
        `${API_BASE_URL}/addComment`,
        {
          ...user_data,
          comment_text,
        },
        "POST"
      );
    },
    onSuccess: (data) => {
      setAlert(
        data
          ? {
              ...data,
              msg: Array.isArray(data.msg) ? data.msg.join(", ") : data.msg,
            }
          : null
      );
      queryClient.invalidateQueries({
        queryKey: ["comments", user_data.blog_id],
      });
      setCommentText("");
    },
    onError: () => {
      console.error("Error", commentData.data);
    },
  });
  const [lastNode, setLastNode] = useState<HTMLDivElement | null>(null);
  const commentContainer = useRef<HTMLDivElement | null>(null);

  const { isFetchingNextPage, dataFetched, hasNextPage } =
    useInfiniteScroll<CommentType>({
      fetchFn: (pageParam) => {
        return useFetch(
          `${API_BASE_URL}/getComments`,
          { page: pageParam, blog_id: user_data.blog_id },
          "POST"
        );
      },
      queryKey: ["comments", user_data.blog_id],
      scrollContainer: commentContainer,
      observedEle: lastNode,
      data_id: "comment_id",
    });

  useEffect(() => {
    setComments(dataFetched);
  }, [dataFetched]);

  const observeEle = (node: HTMLDivElement) => {
    setLastNode(node);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCommentText(value);
  };
  return (
    <>
      {alert &&
        (alert?.status ? (
          <Alert msg={alert.msg} type="success" />
        ) : (
          <Alert msg={alert.msg} />
        ))}

      <div className="flex gap-5 mt-3">
        <Avatar className={"h-[50px] w-[50px]"} img={user_data.image_url} />
        <div className="flex md:flex-row flex-col flex-1 gap-2">
          <input
            onKeyDown={async (e) => {
              if (!comment_text) return;
              if (e.key === "Enter") {
                await commentData?.mutateAsync();
              }
            }}
            required
            id="review_text"
            onChange={handleChange}
            placeholder="Write a comment"
            className="w-full rounded-sm"
            type="text"
            value={comment_text}
          />
          <div className="flex justify-end gap-2">
            {commentData.isPending ? (
              <></>
            ) : (
              <FontAwesomeIcon
                onClick={async () => {
                  if (!comment_text) return;
                  await commentData?.mutateAsync();
                }}
                className="p-4 text-lg text-white  cursor-pointer bg-gray-500 hover:bg-gray-800 hover:text-white transition"
                icon={faPaperPlane}
              />
            )}
          </div>
        </div>
      </div>
      <div
        ref={commentContainer}
        className="border_platform l px-5 h-[700px] md:mt-10 mt-3 overflow-auto"
      >
        {comments.map((comment) => (
          <ReviewData
            ref={comments.at(-1) === comment ? observeEle : null}
            key={comment?.comment_id}
            name={comment?.first_name}
            image={comment?.image_url}
            text={comment?.comment_text}
            date={comment?.created_date}
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
            </div>
            <div className="flex xl:items-center justify-between xl:flex-row flex-col">
              <div className="mt-3 lg:ml-8 xl:w-[800px] lg:w-[500] h-[150px] rounded-md bg-gray-500/20 animate-syncPuls"></div>
              <div className="mt-5 text-sm lg:ml-8 w-[150px] rounded-md h-[30px] bg-gray-500/20 animate-syncPuls"></div>
            </div>
          </div>
        ) : (
          !hasNextPage && (
            <div className="text-2xl flex justify-center mt-5 py-10 font-bold ">
              No more comments
            </div>
          )
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
};

const ReviewData = forwardRef<HTMLDivElement, ReviewDataProps>(
  function ReviewData({ name, image, text, date }, ref) {
    let stars = 0;
    return (
      <>
        <div ref={ref} className="border_platform b pb-5">
          <ReviewCard review={{ name, image, text, date, stars }}>
            <div className="flex justify-between mt-5 ">
              <div className="flex items-center gap-5">
                <ReviewCard.Avatar />
                <ReviewCard.username />
              </div>
            </div>
            <div className="flex xl:items-center justify-between xl:flex-row flex-col">
              <div className="max-w-[1350px] wrap-break-word">
                <ReviewCard.Text />
              </div>
              <ReviewCard.Date />
            </div>
          </ReviewCard>
        </div>
      </>
    );
  }
);
export default Comments;

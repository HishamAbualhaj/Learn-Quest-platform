import { BlogType, User } from "@/types";
import Comments from "./Comments";
import API_BASE_URL from "@/config/config";
interface BlogPostProps {
  blogData: BlogType;
  userData: User & { blog_id: string };
}
function BlogPost({ blogData, userData }: BlogPostProps) {
  return (
    <div className="bg-lightLayout dark:bg-gray-800/20 border_platform all xl:m-5 m-2 !mb-0">
      <div className="max-w-[1100px] mx-auto leading-8 py-10 sm:max-lg:px-8 px-5 ">
        <div className="">
          <h1 className="sm:text-[30px] text-2xl font-bold leading-10">
            {blogData?.title}
          </h1>
          <img
            className="lg:max-w-[650px] mt-5 mx-auto"
            src={`${API_BASE_URL}/uploads/${blogData?.image_url ?? ""}`}
            alt=""
          />
          <p className="text-lg mt-5">{blogData?.subtitle}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogData?.content }} />
      </div>

      {/* comments  */}
      <div className="m-5 rounded-md">
        <div className="font-semibold text-2xl">Comments</div>
        <div className="mt-3 p-5">
          <Comments
            {...{
              blog_title: blogData?.title,
              ...userData,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

import BlogAction from "@/components/BlogAction";
import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getSession from "@/lib/getSession";
import { BlogType } from "@/types";
async function EditBlog({ blog_id }: { blog_id: string }) {
  const { userDataServer } = await getSession();
  const res = await useFetchServer<BlogType>(
    `${API_BASE_URL}/getBlogData`,
    { blog_id: blog_id, ...userDataServer[0] },
    "POST"
  );
  const blog = res.msg[0];

  return (
    <BlogAction
      action="edit"
      endpoint="updateBlog"
      method="PUT"
      blog_id={blog_id}
      title="Edit Blog Details"
      userData={userDataServer[0]}
      blogDataResponse={typeof blog === "string" ? {} : res.msg[0]}
    />
  );
}

export default EditBlog;

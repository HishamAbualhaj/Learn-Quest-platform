import BlogAction from "@/components/BlogAction";
import getSession from "@/lib/getSession";
async function AddBlog() {
  const { userDataServer } = await getSession();
  return (
    <BlogAction
      action="add"
      endpoint="addBlog"
      method="POST"
      blog_id=""
      title="Add Blog Details"
      userData={userDataServer[0]}
      blogDataResponse={{}}
    />
  );
}

export default AddBlog;

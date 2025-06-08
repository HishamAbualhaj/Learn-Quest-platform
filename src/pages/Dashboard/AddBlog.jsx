import BlogAction from "../../components/BlogAction";

function AddBlog() {
  return (
    <BlogAction
      action="add"
      endpoint="addBlog"
      method="POST"
      blog_id={null}
      title="Add Blog Details"
    />
  );
}

export default AddBlog;

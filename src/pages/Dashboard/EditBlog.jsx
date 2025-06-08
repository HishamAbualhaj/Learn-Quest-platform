import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import BlogAction from "../../components/BlogAction";
function EditBlog() {
  const location = useLocation();
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    //getting course id for edit
    const id = location.pathname.split("/").at(-1);
    setBlogId(id);
  }, []);

  return (
    <BlogAction
      action="edit"
      endpoint="updateBlog"
      method="PUT"
      blog_id={blogId}
      title="Edit Blog Details"
    />
  );
}

export default EditBlog;

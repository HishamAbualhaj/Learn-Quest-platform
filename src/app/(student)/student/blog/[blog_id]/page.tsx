import API_BASE_URL from "@/config/config";
import useFetchServer from "@/hooks/useFetchServer";
import getSession from "@/lib/getSession";
import BlogPost from "@/pages-content/Student/BlogPost";

const page = async ({ params }: { params: Promise<{ blog_id: string }> }) => {
  const user = (await getSession()).userDataServer;
  const { blog_id } = await params;
  const res = await useFetchServer(
    `${API_BASE_URL}/getBlogData`,
    {
      blog_id,
    },
    "POST"
  );
  const blog_data = res.msg[0];

  return (
    <BlogPost
      blogData={blog_data}
      userData={{ ...user[0], blog_id: blog_id }}
    />
  );
};

export default page;

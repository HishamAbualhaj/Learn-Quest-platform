import EditBlog from "@/pages/Dashboard/EditBlog";

const page = async ({ params }: { params: Promise<{ blog_id: string }> }) => {
  const { blog_id } = await params;
  return <EditBlog blog_id={blog_id} />;
};

export default page;

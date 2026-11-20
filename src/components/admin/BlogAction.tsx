"use client";
import { backendFetch } from "@/lib/backendStatus";
import PublicationControls from "./PublicationControls";
import { Input } from "@/components/ui/form-input";

import { Button } from "@/components/ui/button";
import {
  AdminHeading,
  AdminNotice,
  adminPanel,
} from "@/components/admin/AdminPage";
import { ArrowLeft, Save } from "lucide-react";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useFetch from "@/hooks/useFetch";
import API_BASE_URL from "@/config/config";

import Link from "next/link";
import { BlogType, User } from "@/types";
interface BlogActionProps {
  endpoint: string;
  blog_id: string;
  action: "add" | "edit";
  title: string;
  method: string;
  userData: User;
  blogDataResponse: BlogType | {};
}
function BlogAction({
  endpoint,
  blog_id,
  action,
  title,
  method,
  userData,
  blogDataResponse,
}: BlogActionProps) {
  const [blogData, setBlogData] = useState<Partial<BlogType>>({
    published: false,
    featured: false,
    ...blogDataResponse,
  });

  const [image, setImage] = useState<HTMLInputElement | null>(null);

  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: { id: number; msg: string } | string;
  } | null>(null);
  const inputs = [
    {
      key: 1,
      id: "title",
      title: "Title : ",
      inType: "text",
      placeholder: "Blog Title Here",
    },
    {
      key: 2,
      id: "subtitle",
      title: "Sub title : ",
      inType: "text",
      placeholder: "Blog Subtitle",
    },
  ];

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const updatedBlogData = {
        ...blogData,
        ...(action === "edit" && !image?.files?.[0]
          ? { image_url: undefined }
          : {}),
        admin_id: userData.student_id,
        role: userData.role,
        email: userData.email,
      };
      const data = await useFetch<{ id: number; msg: string } | string>(
        `${API_BASE_URL}/${endpoint}`,
        updatedBlogData,
        method,
      );
      const res = data.msg as unknown as { id: number; msg: string };
      const { id } = res;

      const currentId = action === "add" ? id : blog_id;

      if (data.status && image?.files?.[0]) {
        const formData = new FormData();
        formData.append("image", image.files![0]);
        formData.append("id", String(currentId));
        await uploadImage(formData);
      }
      return data;
    },
    onSuccess: (data) => {
      setAlert(data);
    },
    onError: (error) => {
      setAlert({
        status: false,
        redirect: false,
        msg: error.message || "Unable to save this post. Please try again.",
      });
    },
  });
  async function uploadImage(file) {
    //Specific case for uploading image, (No need to manually set Content-Type)
    const response = await backendFetch(`${API_BASE_URL}/handleUploads`, {
      method: "POST",
      body: file,
      credentials: "include",
    });
    await response.json();
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (typeof e === "string") {
      setBlogData((prev) => ({
        ...prev,
        content: e,
      }));

      return;
    }
    let { id, value } = e.target;

    if (
      id === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      value = e.target.files[0]?.name;
      setImage(e.target);

      setBlogData((prev) => ({
        ...prev,
        image_url: value,
      }));
      return;
    }
    setBlogData((prev) => ({ ...prev, [id]: value }));
  }
  return (
    <>
      <AdminHeading
        title={action === "add" ? "Write a journal post" : "Edit journal post"}
        description="Share useful ideas, practical guidance, and stories with your learners."
        actions={
          <Button asChild variant="outline" className="min-h-11">
            <Link href="/dashboard/blogs">
              <ArrowLeft aria-hidden="true" />
              Back to journal
            </Link>
          </Button>
        }
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className={`${adminPanel} space-y-6 p-5 md:p-8`}
      >
        <div>
          <h2 className="text-xl font-semibold">A story worth sharing</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start with a clear title, then make every paragraph count.
          </p>
        </div>
        {alert && (
          <AdminNotice
            message={typeof alert.msg === "string" ? alert.msg : alert.msg.msg}
            success={alert.status}
          />
        )}
        <PublicationControls
          value={blogData}
          disabled={isPending}
          onChange={(flags) => setBlogData((prev) => ({ ...prev, ...flags }))}
        />
        {inputs.map((input) => (
          <div key={input.key}>
            <label
              className="mb-2 block text-sm font-medium"
              htmlFor={input.id}
            >
              {input.id === "title" ? "Post title" : "Subtitle"}
            </label>
            <Input
              onChange={handleChange}
              placeholder={input.placeholder}
              id={input.id}
              className="min-h-11 w-full"
              type="text"
              required={input.id === "title"}
              value={blogData[input.id] ?? ""}
            />
          </div>
        ))}
        <div className="rounded-md border border-dashed border-input bg-lightLayout/50 p-5 dark:bg-dark/40">
          <label htmlFor="image" className="block text-sm font-medium">
            Cover image
          </label>
          <p className="mt-2 mb-4 text-sm text-muted-foreground">
            Choose a cover that sets the tone for your story.
          </p>
          <Input
            id="image"
            onChange={handleChange}
            type="file"
            accept="image/*"
            className="min-h-11 w-full"
          />
          {blogData.image_url && (
            <p className="mt-3 text-sm break-all text-muted-foreground">
              Selected: {blogData.image_url}
            </p>
          )}
        </div>
        <section aria-labelledby="post-content-label">
          <h2 id="post-content-label" className="mb-3 text-sm font-medium">
            Post content
          </h2>
          <div className="admin-editor overflow-hidden rounded-md border border-input bg-control">
            <RichTextEditor
              value={blogData.content || ""}
              onChange={(content) =>
                setBlogData((prev) => ({ ...prev, content }))
              }
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Use headings and short paragraphs to keep your story easy to read.
          </p>
        </section>
        <div className="flex flex-wrap justify-end gap-3 border-t border-borderLight pt-6 dark:border-borderDark">
          <Button asChild variant="outline" className="min-h-11">
            <Link href="/dashboard/blogs">Cancel</Link>
          </Button>
          <Button className="min-h-11" type="submit" disabled={isPending}>
            <Save aria-hidden="true" />
            {isPending
              ? "Saving post..."
              : action === "add"
                ? "Publish post"
                : "Save changes"}
          </Button>
        </div>
      </form>
    </>
  );
}
export default BlogAction;

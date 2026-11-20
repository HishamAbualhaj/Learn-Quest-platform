"use client";
import PublicationControls from "./PublicationControls";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/form-input";
import { ChangeEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  AdminHeading,
  AdminNotice,
  adminPanel,
} from "@/components/admin/AdminPage";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import useFetch from "@/hooks/useFetch";

import API_BASE_URL from "@/config/config";
import { useMutation } from "@tanstack/react-query";
import { Course, CourseDataResponse, CourseMaterial, User } from "@/types";
import Link from "next/link";

interface CourseActionProps {
  endpoint: string;
  course_id: string;
  action: "add" | "edit";
  title: string;
  method: string;
  userData: User;
  courseDataResponse?: CourseDataResponse;
}

export default function CourseAction({
  endpoint,
  course_id,
  action,
  title,
  method,
  userData,
  courseDataResponse,
}: CourseActionProps) {
  const inputs = [
    {
      key: 1,
      id: "title",
      title: "Title : ",
      inType: "text",
      placeholder: "Course Title Here",
    },
    {
      key: 2,
      id: "price",
      title: "Price : ",
      inType: "number",
      placeholder: "50",
    },
    {
      key: 3,
      id: "discount",
      title: "Discount : ",
      inType: "number",
      placeholder: "20%",
    },
    {
      key: 4,
      id: "tabs",
      title: "Tabs : ",
      inType: "text",
      placeholder: "UI/UX FRONT-END etc ...",
    },
  ];
  const category = [
    { id: 1, name: "Introduction to Computer Science" },
    { id: 2, name: "Web Development with HTML, CSS, and JavaScript" },
    { id: 3, name: "Data Structures and Algorithms" },
    { id: 4, name: "Database Management Systems" },
    { id: 5, name: "Object-Oriented Programming with Java" },
    { id: 6, name: "Cloud Computing Fundamentals" },
    { id: 7, name: "Cybersecurity Basics" },
    { id: 8, name: "Mobile App Development with React Native" },
    { id: 9, name: "Machine Learning and Artificial Intelligence" },
    { id: 10, name: "DevOps and Continuous Integration/Delivery" },
  ];
  const [alert, setAlert] = useState<{
    redirect: boolean;
    status: boolean;
    msg: { id: number; msg: string } | string;
  } | null>(null);

  const [image, setImage] = useState<HTMLInputElement | null>(null);

  const course =
    typeof courseDataResponse?.msg !== "string"
      ? courseDataResponse?.msg?.[0]
      : ({} as Course);
  const courseMaterial =
    typeof courseDataResponse?.msg !== "string"
      ? courseDataResponse?.msg?.[1]
      : [];
  const [courseData, setCourseData] = useState<
    Course & { materials: CourseMaterial[] }
  >({
    published: Boolean(course?.published),
    featured: Boolean(course?.featured),
    course_id: course?.course_id ?? 0,
    title: course?.title ?? "",
    description: course?.description ?? "",
    price: course?.price ?? 0,
    discount: course?.discount ?? 0,
    category: course?.category ?? "",
    image_url: course?.image_url ?? "",
    tabs: course?.tabs ?? "",
    stars: course?.stars ?? 0,
    lessons: course?.lessons ?? 0,
    created_date: course?.created_date ?? "",
    materials: courseMaterial ?? [],
  });

  useEffect(() => {
    if (typeof courseDataResponse?.msg !== "string")
      addLessonForEdit(courseDataResponse?.msg?.[1] ?? []);

    setCourseData((pre) => ({
      ...pre,
      course_id: Number(course_id),
    }));
  }, []);

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const updatedCourseData = {
        ...courseData,
        ...(action === "edit" && !image?.files?.[0]
          ? { image_url: undefined }
          : {}),
        student_id: userData.student_id,
        role: userData.role,
        email: userData.email,
      };
      const data = await useFetch<{ id: number; msg: string } | string>(
        `${API_BASE_URL}/${endpoint}`,
        updatedCourseData,
        method,
      );
      const res = data.msg as unknown as { id: number; msg: string };

      const { id } = res;

      const currentId = action === "add" ? id : course_id;

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
        msg: error.message || "Unable to save this course. Please try again.",
      });
    },
  });

  async function uploadImage(file: FormData) {
    //Specific case for uploading image, (No need to manually set Content-Type)
    const response = await fetch(`${API_BASE_URL}/handleUploads`, {
      method: "POST",
      body: file,
      credentials: "include",
    });
    await response.json();
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    let { id, value } = e.target;
    if (
      id === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const file = e.target.files[0];

      if (!file) return;
      value = file.name;
      setImage(e.target);

      setCourseData({
        ...courseData,
        image_url: value,
      });

      return;
    }

    let tabsValue: string[] | null = null;

    if (id === "tabs") {
      tabsValue = value.split(" ");
    }
    setCourseData({
      ...courseData,
      [id]: tabsValue ? tabsValue : value,
    });
  }

  // handle lesson change
  function handleLessonChange(id: string, value: string, lesson_id: number) {
    const updateMaterial = [...courseData.materials];
    // update prev value for each lesson
    updateMaterial[lesson_id - 1] = {
      ...updateMaterial[lesson_id - 1],
      [id]: value,
    };
    setCourseData({
      ...courseData,
      materials: updateMaterial,
    });
  }

  function addLessonForEdit(courseMaterials: CourseMaterial[]) {
    let courseMaterialsArr: CourseMaterial[] = [];
    let count = 1;
    courseMaterialsArr = courseMaterials.map((obj) => {
      const { title, subtitle, url } = obj;
      const updateMaterial = {
        lesson_count: count,
        material_id: obj.material_id,
        title: title,
        subtitle: subtitle,
        url: url,
        isCompleted: 0,
        created_date: "",
      };
      count += 1;

      return updateMaterial;
    });
    setCourseData((prev) => ({
      ...prev,
      materials: courseMaterialsArr,
    }));
  }
  function addLesson() {
    // add new object value for new lesson
    setCourseData({
      ...courseData,
      materials: [
        ...courseData.materials,
        {
          lesson_count: (courseData.materials.at(-1)?.lesson_count || 0) + 1,
          material_id: String(Math.round(Math.random() * 10000)),
          title: "",
          subtitle: "",
          url: "",
          isCompleted: 0,
          created_date: "",
        },
      ],
    });
  }
  function deleteLesson(id: string) {
    let courseMaterialsArr = courseData.materials.filter(
      (obj) => id !== obj.material_id,
    );

    addLessonForEdit(courseMaterialsArr);
  }
  return (
    <div>
      <AdminHeading
        title={action === "add" ? "Create a course" : "Edit course"}
        description="Build a focused learning experience, from the first lesson to the final takeaway."
        actions={
          <Button asChild variant="outline" className="min-h-11">
            <Link href="/dashboard/courses">
              <ArrowLeft aria-hidden="true" />
              Back to courses
            </Link>
          </Button>
        }
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
        className={`${adminPanel} w-full p-5 md:p-8`}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Course essentials</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Give learners a clear picture of what they will learn.
            </p>
          </div>
          {alert && (
            <AdminNotice
              message={
                typeof alert.msg === "string" ? alert.msg : alert.msg.msg
              }
              success={alert.status}
            />
          )}
          <PublicationControls
            value={courseData}
            disabled={isPending}
            onChange={(flags) =>
              setCourseData((prev) => ({ ...prev, ...flags }))
            }
          />
          <div className="grid gap-5 md:grid-cols-2">
            {inputs.map((input) => (
              <div
                key={input.key}
                className={input.id === "title" ? "md:col-span-2" : ""}
              >
                <label
                  htmlFor={input.id}
                  className="mb-2 block text-sm font-medium"
                >
                  {input.title.replace(" : ", "")}
                </label>
                <Input
                  onChange={handleChange}
                  placeholder={input.placeholder}
                  id={input.id}
                  className="min-h-11 w-full"
                  type={input.inType}
                  min={input.inType === "number" ? 0 : undefined}
                  required={input.id === "title"}
                  value={
                    Array.isArray(courseData[input.id])
                      ? courseData[input.id].join(" ")
                      : (courseData[input.id] ?? "")
                  }
                />
                {input.id === "tabs" && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Separate course tags with spaces.
                  </p>
                )}
              </div>
            ))}
          </div>
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium"
            >
              Category
            </label>
            <FormSelect
              onChange={handleChange}
              className="w-full"
              id="category"
              value={courseData.category || ""}
              required
            >
              <option value="" disabled>
                Choose a course category
              </option>
              {category.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </FormSelect>
          </div>
          <div className="rounded-md border border-dashed border-input bg-lightLayout/50 p-5 dark:bg-dark/40">
            <label htmlFor="image" className="block text-sm font-medium">
              Course cover
            </label>
            <p className="mt-2 mb-4 text-sm text-muted-foreground">
              Choose an image that brings this course to life.
            </p>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full min-h-11"
            />
            {courseData.image_url && (
              <p className="mt-3 text-sm break-all text-muted-foreground">
                Selected: {courseData.image_url}
              </p>
            )}
          </div>
          <section className="border-t border-borderLight pt-6 dark:border-borderDark">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2
                  id="course-curriculum-heading"
                  className="text-xl font-semibold"
                >
                  Course curriculum
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {courseData.materials.length} lessons in this learning path
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="ml-auto min-h-11 shrink-0"
                onClick={addLesson}
              >
                <Plus aria-hidden="true" />
                Add lesson
              </Button>
            </div>
            <div
              role="region"
              aria-labelledby="course-curriculum-heading"
              tabIndex={0}
              className="h-[500px] space-y-5 overflow-y-auto overscroll-contain rounded-md border border-input p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {!courseData.materials.length && (
                <p className="rounded-md border border-dashed border-input p-6 text-sm text-muted-foreground">
                  Add your first lesson to start building the curriculum.
                </p>
              )}
              {courseData.materials.map((obj) => (
                <fieldset
                  key={obj.material_id}
                  className="rounded-md border border-input bg-lightLayout/40 p-5 dark:bg-dark/30"
                >
                  <legend className="px-2 text-sm font-semibold">
                    Lesson {obj.lesson_count}
                  </legend>
                  <div className="mb-4 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="min-h-11 text-red-700 dark:text-red-300"
                      aria-label={`Delete lesson ${obj.lesson_count}`}
                      onClick={() => deleteLesson(obj.material_id)}
                    >
                      <Trash2 aria-hidden="true" />
                      Remove lesson
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { key: "title", label: "Lesson title" },
                      { key: "subtitle", label: "Lesson summary" },
                      { key: "url", label: "Video URL" },
                    ].map((field) => (
                      <div
                        key={field.key}
                        className={field.key === "url" ? "md:col-span-2" : ""}
                      >
                        <label
                          htmlFor={`lesson-${obj.material_id}-${field.key}`}
                          className="mb-2 block text-sm font-medium"
                        >
                          {field.label}
                        </label>
                        <Input
                          id={`lesson-${obj.material_id}-${field.key}`}
                          onChange={(e) =>
                            handleLessonChange(
                              field.key,
                              e.target.value,
                              obj.lesson_count,
                            )
                          }
                          type={field.key === "url" ? "url" : "text"}
                          value={obj[field.key] ?? ""}
                          placeholder={field.label}
                          className="min-h-11 w-full"
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </section>
          <div className="border-t border-borderLight pt-6 dark:border-borderDark">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Course description
            </label>
            <Textarea
              id="description"
              onChange={handleChange}
              className="min-h-40"
              value={courseData.description || ""}
              placeholder="What will learners take away from this course?"
            />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-borderLight pt-6 dark:border-borderDark">
            <Button asChild variant="outline" className="min-h-11">
              <Link href="/dashboard/courses">Cancel</Link>
            </Button>
            <Button className="min-h-11" type="submit" disabled={isPending}>
              <Save aria-hidden="true" />
              {isPending
                ? "Saving course..."
                : action === "add"
                  ? "Create course"
                  : "Save changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

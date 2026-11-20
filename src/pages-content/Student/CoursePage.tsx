"use client";
import PageIntro from "@/components/layout/PageIntro";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Check,
  ChevronDown,
  LockKeyhole,
  Play,
  Sparkles,
} from "lucide-react";
import CourseVideos from "./CourseVideos";
import Review from "./Review";
import { Course, CourseMaterial, User } from "@/types";
import EnrollCourse from "./EnrollCourse";

interface CoursePageProps {
  user_data: Partial<User>;
  courseData: Course;
  courseVideos: CourseMaterial[];
  isEnrolled: boolean;
}
export default function CoursePage({
  courseData,
  courseVideos,
  isEnrolled,
  user_data,
}: CoursePageProps) {
  const router = useRouter();
  const [lessonsOpen, setLessonsOpen] = useState(true);
  const [selected, setSelected] = useState<{
    id: string;
    title: string;
    url: string;
  } | null>(null);
  const previewCount = courseVideos.filter((lesson) =>
    Boolean(lesson.url),
  ).length;
  if (!courseData?.title)
    return (
      <PageIntro
        eyebrow="YOUR LEARNING SPACE"
        title="Course not found."
        description="Head back to the course library to find your next step."
      />
    );
  return (
    <>
      <PageIntro
        eyebrow="YOUR NEXT CHAPTER"
        title={courseData.title}
        description="A little curiosity. Practical skills. A new way forward."
      />
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-10">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-md border border-borderLight bg-dark dark:border-borderDark">
            <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-mainClr/25 via-dark to-dark">
              {selected ? (
                <iframe
                  title={selected.title}
                  allowFullScreen
                  className="absolute inset-0 size-full"
                  src={selected.url}
                />
              ) : (
                <div className="max-w-md px-6 py-8 text-center text-white">
                  <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-md border border-white/15 bg-white/5 text-mainClrDark">
                    <Play aria-hidden="true" className="size-6" />
                  </span>
                  <p className="text-lg font-medium tracking-tight sm:text-2xl">
                    {isEnrolled
                      ? "Your next step starts here."
                      : "A new skill is within reach."}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/65 sm:text-sm">
                    {isEnrolled
                      ? "Choose a lesson from the course content to start learning."
                      : previewCount > 0
                        ? "Try a free preview, or enroll to unlock the complete course."
                        : "Explore the lessons below, then enroll when you are ready to begin."}
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <BookOpen aria-hidden="true" className="size-3.5" />
                {selected?.title ?? "Your learning space"}
              </span>
              <span className="rounded-md bg-white/5 px-2.5 py-1 text-sm text-mainClrDark">
                {isEnrolled ? "Course access unlocked" : "Course introduction"}
              </span>
            </div>
          </div>
          <section className="mt-8 border-b border-borderLight pb-8 dark:border-borderDark">
            <span className="text-sm font-semibold tracking-[1.5px] text-mainClr dark:text-mainClrDark">
              MAKE ROOM FOR SOMETHING NEW
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              About this course
            </h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-8 text-lightText/65 dark:text-textDark">
              {courseData.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {courseData.tabs?.split(",").map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-borderLight bg-lightLayout px-3 py-1.5 text-sm text-mainClr dark:border-borderDark dark:bg-mainClrDark/5 dark:text-mainClrDark"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </section>
        </div>
        <aside className="min-w-0 space-y-6">
          <section className="overflow-hidden rounded-md border border-borderLight bg-white dark:border-borderDark dark:bg-lightDark/40">
            <button
              type="button"
              aria-expanded={lessonsOpen}
              aria-controls="course-lessons"
              onClick={() => setLessonsOpen((open) => !open)}
              className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-5 text-left"
            >
              <span>
                <span className="block text-sm font-semibold">
                  Course content
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {courseVideos.length} lessons
                  {!isEnrolled && previewCount > 0
                    ? ` / ${previewCount} free previews`
                    : ""}
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`size-4 text-muted-foreground transition-transform ${lessonsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              id="course-lessons"
              hidden={!lessonsOpen}
              role="region"
              aria-label="Course lessons"
              tabIndex={0}
              className="max-h-[600px] overflow-y-auto overscroll-contain focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-mainClr dark:focus-visible:outline-mainClrDark"
            >
              {!isEnrolled && (
                <div className="mx-4 mb-3 flex items-start gap-2 rounded-md bg-lightLayout px-3 py-3 dark:bg-hoverDark">
                  <LockKeyhole
                    aria-hidden="true"
                    className="mt-0.5 size-3.5 shrink-0 text-mainClr dark:text-mainClrDark"
                  />
                  <p className="text-sm leading-5 text-muted-foreground">
                    Locked lessons are included when you enroll.{" "}
                    {previewCount > 0
                      ? "Free previews are ready to explore."
                      : "Browse the course outline to see what is ahead."}
                  </p>
                </div>
              )}
              <ol>
                {courseVideos.map((video, index) => (
                  <CourseVideos
                    {...courseData}
                    {...user_data}
                    {...video}
                    student_id={user_data.student_id}
                    email={user_data.email}
                    first_name={user_data.first_name}
                    key={video.material_id}
                    number={index + 1}
                    lessons={courseData.lessons}
                    setVideoUrl={(url: string) =>
                      setSelected({
                        id: video.material_id,
                        title: video.title,
                        url,
                      })
                    }
                    isActive={selected?.id === video.material_id}
                    isEnrolled={isEnrolled}
                    refetch={() => router.refresh()}
                    url={video.url}
                  />
                ))}
              </ol>
              {!courseVideos.length && (
                <p className="px-5 pb-6 text-sm leading-6 text-muted-foreground">
                  The lesson outline will appear here when course materials are
                  available.
                </p>
              )}
            </div>
          </section>
          {!isEnrolled && (
            <section
              id="enrollment"
              className="scroll-mt-6 rounded-md border border-mainClr/20 bg-mainClr/5 p-6 dark:border-mainClrDark/20 dark:bg-mainClrDark/5"
            >
              <span className="flex items-center gap-2 text-sm font-semibold tracking-wider text-mainClr dark:text-mainClrDark">
                <Sparkles aria-hidden="true" className="size-3.5" />
                YOUR NEXT STEP
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight">
                Unlock the whole journey.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Go from exploring to doing, one lesson at a time.
              </p>
              <p className="mt-5 text-3xl font-semibold tracking-tight">
                {Number(courseData.price) > 0
                  ? `$${Number(courseData.price).toFixed(2)}`
                  : "Free"}
                <span className="ml-2 text-sm font-normal tracking-normal text-muted-foreground">
                  course enrollment
                </span>
              </p>
              <ul className="mt-5 space-y-3 text-sm text-lightText/75 dark:text-textDark">
                {[
                  "Unlock every course lesson",
                  "Learn at your own pace",
                  "Track your progress as you go",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-mainClr dark:text-mainClrDark"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <EnrollCourse user_data={user_data} courseData={courseData} />
            </section>
          )}
        </aside>
      </div>
      <section className="mt-10 border-t border-borderLight pt-4 dark:border-borderDark">
        <Review
          {...{
            course_title: courseData.title,
            course_id: String(courseData.course_id),
            ...user_data,
          }}
        />
      </section>
    </>
  );
}

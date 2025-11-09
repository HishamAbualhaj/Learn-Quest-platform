function CoursePreview() {
  const courses = [
    {
      id: 1,
      title: "Web Development for Beginners",
      description:
        "Kickstart your web development journey with this beginner-friendly course. Learn the fundamentals of HTML, CSS, and JavaScript, and build your first website. Ideal for those with no prior experience.",
      categories: ["Web Technologies", "Front End", "IT"],
      image: "web.jpg",
    },
    {
      id: 2,
      title: "UI/UX Design Essentials",
      description:
        "Master the art of creating user-centered designs. This course will guide you through the principles of UI/UX design, including wireframing, prototyping, and user testing, to ensure great user experiences.",
      categories: ["UI/UX", "Front End", "DESIGN"],
      image: "uiux.jpg",
    },
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      description:
        "Gain a solid foundation in cybersecurity. This course covers essential concepts such as network security, cryptography, threat detection, and best practices for protecting information systems. Perfect for beginners looking to start a career in cybersecurity",
      categories: ["Cybersecurity", "Security", "Computer Science"],
      image: "cyber.jpg",
    },
  ];
  return (
    <div className="section bg-lightLayout dark:bg-lightDark py-14">
      <div className="max-container">
        <div className="font-semibold lg:text-4xl text-xl">Our Courses</div>
        <div className="text-black/50 max-w-[600px] dark:text-white/50 mt-2">
          Learn at your own pace with our expertly crafted courses designed to
          take your skills to the next level.
        </div>
        <div className="xl:flex xl:justify-between grid min-[800px]:grid-cols-2 grid-cols-1 xl:gap-5 gap-8  mt-5">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border dark:border-borderDark border-borderLight rounded-xl bg-white dark:bg-dark"
            >
              <div>
                <img
                  className="rounded-tr-xl rounded-tl-xl xl:w-[500px] w-full h-[300px] object-cover"
                  src={`/${course.image}`}
                  alt=""
                />
              </div>
              <div className="p-5 max-w-[400px]">
                <div className="font-medium lg:text-xl">{course.title}</div>
                <div className="text-black/50 leading-7 dark:text-white/50 mt-5 line-clamp-4">
                  {course.description}
                </div>
                <div className="mt-5 flex gap-2 flex-wrap">
                  {course.categories.map((category,i) => (
                    <div key={i} className="bg-lightLayout min-w-10 text-center dark:bg-lightDark text-[13px] w-fit px-2 py-2 rounded-xl border dark:border-borderDark border-borderLight">
                      {category}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePreview;

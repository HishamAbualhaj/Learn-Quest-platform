function Courses() {
  const courses = [
    {
      name: "JavaScript Essentials",
      type: "Programming",
      price: 50,
      lessons: 15,
      date: "2024-05-12",
      action: ["Edit", "Delete"],
    },
    {
      name: "Advanced CSS & Sass",
      type: "Design",
      price: 40,
      lessons: 20,
      date: "2024-06-25",
      action: ["Edit", "Delete"],
    },
    {
      name: "Python for Data Science",
      type: "Data Science",
      price: 70,
      lessons: 30,
      date: "2024-03-10",
      action: ["Edit", "Delete"],
    },
    {
      name: "React Development Bootcamp",
      type: "Programming",
      price: 100,
      lessons: 25,
      date: "2024-07-01",
      action: ["Edit", "Delete"],
    },
    {
      name: "UI/UX Design Fundamentals",
      type: "Design",
      price: 45,
      lessons: 18,
      date: "2024-04-14",
      action: ["Edit", "Delete"],
    },
    {
      name: "Machine Learning with Python",
      type: "Data Science",
      price: 85,
      lessons: 35,
      date: "2024-08-10",
      action: ["Edit", "Delete"],
    },
    {
      name: "Full Stack Web Development",
      type: "Programming",
      price: 120,
      lessons: 40,
      date: "2024-09-05",
      action: ["Edit", "Delete"],
    },
    {
      name: "Digital Marketing 101",
      type: "Marketing",
      price: 30,
      lessons: 12,
      date: "2024-11-20",
      action: ["Edit", "Delete"],
    },
    {
      name: "Intro to Cybersecurity",
      type: "Security",
      price: 60,
      lessons: 22,
      date: "2024-02-18",
      action: ["Edit", "Delete"],
    },
    {
      name: "Cloud Computing with AWS",
      type: "Cloud Computing",
      price: 90,
      lessons: 28,
      date: "2024-10-07",
      action: ["Edit", "Delete"],
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between ">
        <div>
          <div className="text-white font-semibold text-4xl px-5">
            Course Panel
          </div>
          <div className="text-gray-400 mt-2 px-5">
            Track courses and manage them
          </div>
        </div>

        <div className="bg-gray-500 text-white font-semibold rounded-md p-2 hover:bg-gray-800 hover:text-white transition cursor-pointer">
          Add course
        </div>
      </div>
      <div className="xl:w-full lg:w-[850px] md:w-[600px] [450px]:w-[400px] w-[330px] mt-10 h-[650px] overflow-auto px-5">
        <table className="text-gray-300 w-full">
          <thead>
            <tr className="border-t border-b border-borderDark">
              <td className="py-4 font-bold">Name</td>
              <td className="font-bold">Type</td>
              <td className="whitespace-nowrap font-bold">Price</td>
              <td className="font-bold">Lessons</td>
              <td className="whitespace-nowrap xl:pr-0 pr-8 font-bold">
                Date Created
              </td>
              <td className="font-bold">Action</td>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course.key}
                className="border-t border-b border-borderDark"
              >
                <td className="py-4 xl:pr-0 pr-8 whitespace-nowrap">
                  {course.name}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {course.type}
                </td>
                <td className="xl:pr-0 pr-8 whitespace-nowrap">
                  {course.price}
                </td>
                <td className="whitespace-nowrap">{course.lessons}</td>
                <td className="whitespace-nowrap">{course.date}</td>
                <td className="whitespace-nowrap p-2 flex flex-col gap-2">
                  <div
                    id="1"
                    className="cursor-pointer bg-gray-500/70 py-2 px-2 text-center rounded-md hover:bg-gray-800 hover:text-white transition"
                  >
                    {course.action[0]}
                  </div>
                  <div
                    id="1"
                    className="cursor-pointer bg-red-500/70 py-2 px-2 text-center rounded-md hover:bg-gray-800 hover:text-white transition"
                  >
                    {course.action[1]}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Courses;

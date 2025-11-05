import getSession from "@/lib/getSession";
import EditProfile from "@/pages/Student/Profile/EditProfile";

const page = async () => {
  const data = [
    {
      key: 1,
      name: "First name",
      data: "",
      inType: "text",
    },
    {
      key: 2,
      name: "Last name",
      data: "",
      inType: "text",
    },
    {
      key: 3,
      name: "Email",
      data: "",
      inType: "email",
    },
    {
      key: 4,
      name: "Birth Of Date",
      data: "",
      inType: "date",
    },
    {
      key: 5,
      name: "Gender",
      data: "Male",
      inType: "select",
    },
    {
      key: 6,
      name: "Joined At",
      data: "",
      inType: "date",
    },
    {
      key: 7,
      name: "Course Joined",
      data: "5",
    },
    {
      key: 8,
      name: "Image",
      data: "",
    },
  ];
  const { userDataServer } = await getSession();

  const [
    {
      first_name,
      last_name,
      email,
      gender,
      joined_at,
      birthdate,
      image_url,
      course_joined,
      student_id,
    },
  ] = userDataServer;

  let date = new Date(birthdate).toLocaleDateString("en-GB").split("/");

  let dateFormate = `${date[2]}-${date[1]}-${date[0]}`;

  const join = joined_at.split("T")[0];

  const values = [
    first_name,
    last_name,
    email,
    dateFormate,
    gender,
    join,
    course_joined || "0",
    image_url,
  ];

  const arr = data.map((_, index) => {
    // Change all values as they are arranged at array above !
    data[index] = {
      ...data[index],
      data: values[index],
    };
    return data[index];
  });
  return <EditProfile data_profile={arr} userId={String(student_id)} />;
};

export default page;

import Avatar from "@/components/Avatar";
import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import getSession from "@/lib/getSession";
async function Profile() {
  const { loggedIn, userDataServer } = await getSession();

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
      data: null,
    },
  ];

  let image_url_temp = "";
  let arr: {
    key: number;
    name: string;
    data: string | null;
    inType?: string;
  }[];
  if (userDataServer.length > 0) {
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
      },
    ] = userDataServer;

    image_url_temp = image_url;

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
    arr = data.map((_, index) => {
      // Change all values as they are arranged at array above !
      data[index] = {
        ...data[index],
        data: values[index],
      };
      return data[index];
    });
  } else {
    arr = [];
  }
  image_url_temp = image_url_temp ? image_url_temp : "/person.png";

  return (
    <div className="sm:px-5 px-1">
      <div className=" dark:bg-lightDark w-full bg-white border dark:border-borderDark border-borderLight flex items-center flex-col  box-shadow-light dark:box-shadow rounded-md h-[800px] overflow-auto">
        <div className="w-full p-5 flex justify-between">
          <Link href="editprofile">
            <FontAwesomeIcon
              className="text-xl w-10 h-10 dark:text-gray-400 text-black cursor-pointer hover:text-black/50 dark:hover:text-white"
              icon={faGear}
            />
          </Link>
        </div>

        <div className="">
          <Avatar img={image_url_temp} className="h-[250px] w-[250px]" />
        </div>

        <div className="flex w-full flex-col gap-5 py-6 lg:px-16 md:px-8 sm:px-4 px-2">
          {arr.map((data) =>
            data.key == 8 ? (
              <></>
            ) : (
              <div
                key={data.key}
                className="text-xl flex gap-2 border dark:border-borderDark border-borderLight p-4 rounded-md"
              >
                {data.name}: <div className="font-bold">{data.data}</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;

import { useEffect, useState } from "react";
import google from "../assets/google.svg";
import Alert from "./Alert";

function Signup() {
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  }, [alert]);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    status_user: false,
    email: "",
    password: "",
    gender: "",
    birthdate: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = response.json();
      result.then((data) => {
        console.log(data.message);
        data.message ? setAlert("success") : setAlert("error");
      });
    } catch (error) {
      console.error("Error signing up:", error);
      setAlert("error");
    }
  }

  return (
    <div className="dark:bg-dark bg-lightLayout md:px-0 px-5 relative">
      <div className="dark:text-white text-lightText text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-10 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl">
        {alert === "error" ? (
          <div className="absolute  md:w-[500px] w-[400px] left-1/2 -translate-x-1/2 top-[50px]">
            <Alert msg="Something went wrong" type="succe" />
          </div>
        ) : alert === "success" ? (
          <div className="absolute  md:w-[500px] w-[400px] left-1/2 -translate-x-1/2 top-[50px]">
            <Alert msg="Signed up successfully" type="success" />
          </div>
        ) : (
          <></>
        )}
        <div className="lg:text-4xl text-2xl font-bold">Sign up free</div>
        <div className="dark:text-textDark text-lightText mt-2">
          No credit card required
        </div>
        <div className="mt-6 py-3 cursor-pointer  flex gap-2 items-center justify-center border dark:border-textDark/40 border-borderLight rounded-md">
          <img className="w-7 h-7" src={google} alt="" />
          <div className="dark:text-white text-lightDark">
            Sign up with Google
          </div>
        </div>

        <div className="dark:text-textDark text-lightText mt-8 flex items-center gap-3">
          <div className="dark:bg-textDark bg-lightText h-[1px] w-1/2"></div>
          OR
          <div className="dark:bg-textDark bg-lightText h-[1px] w-1/2"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 mt-6">
            <div className="flex flex-col flex-1">
              <label htmlFor="first_name">First name</label>
              <input
                id="first_name"
                onChange={handleChange}
                className="mt-2 border rounded-md w-full"
                type="text"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="last_name">Last name</label>
              <input
                id="last_name"
                onChange={handleChange}
                className="mt-2 border rounded-md w-full"
                type="text"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="text"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="gender">Gender</label>
            <select
              className="mt-2 border rounded-md w-full"
              onChange={handleChange}
              name=""
              id="gender"
            >
              <option className="text-black" value="Male">
                Male
              </option>
              <option className="text-black" value="Female">
                Female
              </option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="password"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="birthdate">Date of Birth</label>
            <input
              id="birthdate"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="date"
            />
          </div>

          <button
            type="submit"
            className="w-full hover:bg-purple-900 transition bg-purple-700 rounded-md py-4 text-center mt-8 text-white font-semibold cursor-pointer"
          >
            Sign up
          </button>
        </form>

        <div className="text-darkText mt-3 flex gap-2 items-center">
          Already have an account?
          <div className="text-lightBtn underline ">
            <a href="login">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

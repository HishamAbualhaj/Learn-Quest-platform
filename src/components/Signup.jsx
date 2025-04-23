import { useEffect, useState } from "react";
import google from "../assets/google.svg";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import useFetch from "../hooks/useFetch";
import API_BASE_URL from "../config/config";
import { useMutation } from "@tanstack/react-query";
function Signup() {
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  // useEffect(() => {
  //   alert?.redirect && navigate("/login");
  // }, [alert]);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    status_user: false,
    email: "",
    password: "",
    gender: "Male",
    birthdate: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  }
  const [closeButton, setCloseButton] = useState(false);
  useEffect(() => {
    if (closeButton) {
      setAlert(null);
    }
  }, [closeButton]);

  const { mutate, isPending, data } = useMutation({
    mutationFn: async () => {
      return await useFetch(`${API_BASE_URL}/signup`, userData, "POST");
    },
  });

  useEffect(() => {
    setAlert(data);
  }, [data]);

  return (
    <div className="dark:bg-dark bg-lightLayout md:px-0 px-5 h-[100vh]">
      <div className="dark:text-white text-lightText text-2xl max-md:justify-center pt-5 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-5 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl relative">
        {alert &&
          (alert?.status ? (
            <Alert
              msg={alert.msg}
              type="success"
              setCloseButton={setCloseButton}
            />
          ) : (
            <Alert msg={alert?.msg} setCloseButton={setCloseButton} />
          ))}

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <div className="flex gap-2 mt-6">
            <div className="flex flex-col flex-1">
              <label htmlFor="first_name">First name</label>
              <input
                required
                id="first_name"
                onChange={handleChange}
                className="mt-2 border rounded-md w-full"
                type="text"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="last_name">Last name</label>
              <input
                required
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
              required
              id="email"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="email"
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
              required
              id="password"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="password"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="birthdate">Date of Birth</label>
            <input
              required
              id="birthdate"
              onChange={handleChange}
              className="mt-2 border rounded-md w-full"
              type="date"
            />
          </div>
          <Button
            type="submit"
            text="Sign up"
            loadingText="Loading"
            isloading={isPending}
            padding="py-4 w-full font-semibold"
          />
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

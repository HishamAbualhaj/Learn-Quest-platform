import google from "../assets/google.svg";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useFetch from "./Hooks/useFetch";
import Alert from "./Alert";
function Login() {
  const [alert, setAlert] = useState({ status: "", msg: "", redirect: false });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dataFetched = useLoaderData();
  useEffect(() => {
    dataFetched ? navigate("/") : "";
  }, []);
  useEffect(() => {
    {
      alert.redirect && navigate("/");
    }
    const timer = setTimeout(() => {
      setAlert({ status: null, msg: "" });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
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
    setIsLoading(true);
    const response = await useFetch(
      "http://localhost:3002/login",
      userData,
      "POST"
    );
    setIsLoading(false);
    setAlert(response);
    console.log(response);
  }

  return (
    <div className="dark:bg-dark bg-lightLayout h-[100vh] md:px-0 px-5">
      <div className="dark:text-white text-lightText text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-10 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl">
        {alert.status &&
          (alert.status ? (
            <Alert msg={alert.msg} type="success" />
          ) : (
            <Alert msg={alert.msg} type="failed" />
          ))}
        <div className="lg:text-4xl text-2xl font-bold">Welcome</div>
        <div className="dark:text-textDark text-lightText mt-2">
          Log in to your account
        </div>
        <div className="mt-6 py-3 cursor-pointer  flex gap-2 items-center justify-center border dark:border-textDark/40 border-borderLight rounded-md">
          <img className="w-7 h-7" src={google} alt="" />
          <div className="dark:text-white text-lightDark">
            Log in with Google
          </div>
        </div>

        <div className="dark:text-textDark text-lightText mt-8 flex items-center gap-3">
          <div className="dark:bg-textDark bg-lightText h-[1px] w-1/2"></div>
          OR
          <div className="dark:bg-textDark bg-lightText h-[1px] w-1/2"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-4">
            <label htmlFor="email">Email</label>
            <input
              required
              onChange={handleChange}
              id="email"
              className="mt-2 border rounded-md w-full"
              type="email"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="password">Password</label>
            <input
              required
              onChange={handleChange}
              id="password"
              className="mt-2 border rounded-md w-full"
              type="password"
            />
            <div className="text-lightBtn mt-2 underline ">
              <a href="forgotpassword">Forgot password?</a>
            </div>
          </div>
          <Button
            type="submit"
            text="Login"
            loadingText="Loading"
            isloading={isLoading}
            padding="py-4 w-full font-semibold"
          />
        </form>

        <div className="text-darkText mt-3 flex gap-2 items-center">
          Already have an account?
          <div className="text-lightBtn underline ">
            <a href="signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

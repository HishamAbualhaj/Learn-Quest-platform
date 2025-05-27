import google from "../assets/google.svg";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Alert from "../../components/Alert";
import { useMutation } from "@tanstack/react-query";
import API_BASE_URL from "../../config/config";
function Login() {
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    alert?.redirect && navigate("/");
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

  const { mutate, isPending, data } = useMutation({
    mutationFn: async () => {
      return await useFetch(`${API_BASE_URL}/login`, userData, "POST");
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });

  useEffect(() => {
    setAlert(data);
  }, [data]);

  return (
    <div className="dark:bg-dark bg-lightLayout h-[100vh] md:px-0 px-5">
      <div className="dark:text-white text-lightText text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-10 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl">
        {alert &&
          (alert?.status ? (
            <Alert msg={alert?.msg} type="success" />
          ) : (
            <Alert msg={alert?.msg} />
          ))}
        <div className="lg:text-4xl text-2xl font-bold">Welcome</div>
        <div className="dark:text-textDark text-lightText mt-2">
          Log in to your account
        </div>
        <div className="mt-6 py-3 cursor-pointer  flex gap-2 items-center justify-center border dark:border-textDark/40 border-borderLight rounded-md">
          <img className="w-7 h-7" src={google} alt="" />
          <div
            onClick={() => {
              window.open(`${API_BASE_URL}/auth/google`, "_self");
            }}
            className="dark:text-white text-lightDark"
          >
            Log in with Google
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
            isloading={isPending}
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

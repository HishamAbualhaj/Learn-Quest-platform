import google from "../assets/google.svg";

function Signup() {
  return (
    <div className="bg-dark h-[100vh]  md:px-0 px-5">
      <div className="text-white text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-10 bg-login text-white rounded-xl">
        <div className="lg:text-4xl text-2xl font-bold">Sign up free</div>
        <div className="text-darkText mt-2">No credit card required</div>
        <div className="mt-6 py-3 cursor-pointer  flex gap-2 items-center justify-center border border-darkText/40 rounded-md">
          <img className="w-7 h-7" src={google} alt="" />
          <div className="text-white">Sign up with Google</div>
        </div>

        <div className="text-darkText mt-8 flex items-center gap-3">
          <div className="bg-darkText h-[1px] w-1/2"></div>
          OR
          <div className="bg-darkText h-[1px] w-1/2"></div>
        </div>

        <div className="flex gap-2 mt-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="">First name</label>
            <input
              className="mt-2 border border-darkText/40 rounded-md w-full"
              type="text"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="">Last name</label>
            <input
              className="mt-2 border border-darkText/40 rounded-md w-full"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="">Email</label>
          <input
            className="mt-2 border border-darkText/40 rounded-md w-full"
            type="text"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="">Password</label>
          <input
            className="mt-2 border border-darkText/40 rounded-md w-full"
            type="password"
          />
          {/* <div className="text-lightBtn mt-2 underline ">
            <a href="">Forgot password?</a>
          </div> */}
        </div>
        <div className="flex flex-col mt-4">
          <label htmlFor="">Date of Birth</label>
          <input
            className="mt-2 border border-darkText/40 rounded-md w-full"
            type="date"
          />
        </div>

        <div className="hover:bg-purple-900 transition bg-purple-700 rounded-md py-4 text-center mt-8 text-white font-semibold cursor-pointer">
          Sign up
        </div>
        <div className="text-darkText mt-3 flex gap-2 items-center">
          Already have an account?
          <div className="text-lightBtn underline ">
            <a href="">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

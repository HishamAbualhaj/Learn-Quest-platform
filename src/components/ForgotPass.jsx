import React from "react";

function ForgotPass() {
  return (
    <>
      <div className="dark:bg-dark bg-lightLayout h-[100vh] md:px-0 px-5 ">
        <div className="dark:text-white text-lightText text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
          LEARN <div className="text-purple-600">QUEST</div>
        </div>
        <div className="mx-auto max-w-[500px] p-7 mt-48 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl">
          <div className="lg:text-4xl text-2xl">Forgot password</div>
          <div className="dark:text-textDark text-lightText mt-2">
            Reset password
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="">Email</label>
            <input className="mt-2 border rounded-md w-full" type="text" />
          </div>

          <div className="hover:bg-purple-900 transition bg-purple-700 rounded-md py-4 text-center mt-8 text-white font-semibold cursor-pointer">
            Send Code To Reset
          </div>
        </div>
      </div>
      {/* <ConfirmPass />
      <VerifyCode /> */}
    </>
  );
}

function ConfirmPass() {
  return (
    <div className="dark:bg-dark bg-lightLayout h-[100vh] md:px-0 px-5 ">
      <div className="dark:text-white text-lightText text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-48 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl">
        <div className="lg:text-4xl text-2xl">Confirm password</div>
        <div className="dark:text-textDark text-lightText mt-2">
          Reset password
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="">Password</label>
          <input className="mt-2 border rounded-md w-full" type="password" />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="">Confirm Password</label>
          <input className="mt-2 border rounded-md w-full" type="password" />
        </div>

        <div className="hover:bg-purple-900 transition bg-purple-700 rounded-md py-4 text-center mt-8 text-white font-semibold cursor-pointer">
          Reset
        </div>
      </div>
    </div>
  );
}

function VerifyCode() {
  return (
    <div className="dark:bg-dark bg-lightLayout h-[100vh] md:px-0 px-5 ">
      <div className="dark:text-white text-lightText text-2xl  max-md:justify-center pt-10 pl-0 md:pl-10 font-bold flex gap-1">
        LEARN <div className="text-purple-600">QUEST</div>
      </div>
      <div className="mx-auto max-w-[500px] p-7 mt-48 dark:bg-loginDark bg-white dark:shadow-none shadow-custom dark:text-white text-lightText rounded-xl">
        <div className="lg:text-4xl text-2xl">Verify code</div>
        <div className="dark:text-textDark text-lightText mt-2">
          Code sent to your email
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="">Code</label>
          <input className="mt-2 border rounded-md w-full" type="password" />
        </div>

        <div className="hover:bg-purple-900 transition bg-purple-700 rounded-md py-4 text-center mt-8 text-white font-semibold cursor-pointer">
          Verify
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;

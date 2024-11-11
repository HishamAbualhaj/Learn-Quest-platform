import React from "react";

function Hero() {
  return (
    <div className="section xl:py-24 py-20">
      <div className="max-container flex items-center justify-between xl:flex-row flex-col xl:gap-0 gap-10">
        <div className="flex flex-col gap-5">
          <div className="text-[50px] font-[600] max-w-[700px]">
            Learning made easy for everyone
          </div>
          <div className="text-[20px] dark:text-white/50 text-black/50 max-w-[800px]">
            Start learning at your own pace with courses designed to fit your
            schedule. Whether you're just beginning or looking to deepen your
            knowledge, our platform offers engaging and accessible content.
          </div>
          <div className="flex items-start gap-2 lg:flex-row flex-col">
            <div className="xl:text-xl cursor-pointer rounded-md border dark:bg-mainClrDark dark:border-mainClrDark border-mainClr bg-mainClr dark:text-black text-white xl:px-5 xl:py-3 px-4 py-2 font-[600] transition hover:bg-mainClrDark hover:text-black hover:border-mainClrDark">
              Sign up
            </div>
            <div className="xl:text-xl cursor-pointer border rounded-md dark:border-mainClrDark border-lightBtn text-mainClr dark:text-white xl:px-5 xl:py-3 px-4 py-2 font-[600]">
              Join a course
            </div>
          </div>
        </div>
        <img
          className="lg:max-w-[600px] rounded-lg"
          src="../../src/assets/hero.jpg"
          alt="Person studying"
        />
      </div>
    </div>
  );
}

export default Hero;

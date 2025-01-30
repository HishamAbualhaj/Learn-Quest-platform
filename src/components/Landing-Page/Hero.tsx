import React, { useEffect, useState } from "react";
import Button from "./Button";

function Hero({ data }) {
  const [isLoggedIn, setIsLogged] = useState(false);
  useEffect(() => {
    if (data) {
      let reDirected = data.loggedIn;
      setIsLogged(reDirected);
    } else {
      setIsLogged(true);
    }
  }, [data]);
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
          {!isLoggedIn && (
            <div className="flex items-start gap-2 lg:flex-row flex-col">
              <Button outlined={false} text="Sign up" size="xl" url={""} />
              <Button outlined={true} text="Join a course" size="xl" url={""} />
            </div>
          )}
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

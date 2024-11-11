import React from "react";
import Button from "./Button";
function FeatureDetails() {
  return (
    <div className="section">
      <div className="max-container flex justify-between items-center lg:flex-row flex-col lg:gap-0 gap-10">
        <div className="py-10 flex flex-col gap-5">
          <div className="font-[600] lg:text-2xl text-xl">
            Everything you need to reach your learning goals
          </div>
          <div className="text-black/50 max-w-[600px] dark:text-white/50">
            Explore and track your progress in one place with interactive tools,
            comprehensive analytics, and personalized recommendations to help
            you succeed.
          </div>
          <Button outlined={true} text="All Courses" size="xl" url={""}/>
        </div>
        <img src="../../src/assets/goals.jpg" alt="" />
      </div>
    </div>
  );
}

export default FeatureDetails;

import Button from "./Button";
function FeatureDetails() {
  return (
    <div className="section max-lg:py-16">
      <div className="max-container flex justify-between items-center lg:flex-row flex-col lg:gap-0 gap-10">
        <div className="py-10 flex flex-col gap-5">
          <div className="font-semibold lg:text-4xl text-xl">
            Everything you need to reach your learning goals
          </div>
          <div className="text-black/50 max-w-[600px] dark:text-white/50">
            Explore and track your progress in one place with interactive tools,
            comprehensive analytics, and personalized recommendations to help
            you succeed.
          </div>
          <Button
            outlined={true}
            text="All Courses"
            size="xl"
            url="/student/allcourses"
          />
        </div>
        <img src={`/goals.jpg`} alt="" />
      </div>
    </div>
  );
}

export default FeatureDetails;

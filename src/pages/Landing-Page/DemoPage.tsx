import Button from "./Button";
function DemoPage() {
  return (
    <div className="section bg-lightLayout dark:bg-lightDark py-12">
      <div className="max-container ">
        <div className="flex justify-between xl:flex-row flex-col xl:gap-0 gap-5">
          <div>
            <div className="font-semibold lg:text-4xl text-xl">Our Platform</div>
            <div className="text-black/50 max-w-[600px] dark:text-white/50 mt-2 leading-7">
              Our platform is designed to make learning effortless and
              inspiring, with personalized recommendations, interactive content,
              and 24/7 access to courses crafted by top industry experts.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              outlined={true}
              text="Join a course"
              size="xl"
              url="/student/allcourses"
            />
            <Button outlined={false} text="Sign up" size="xl" url="/signup" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoPage;

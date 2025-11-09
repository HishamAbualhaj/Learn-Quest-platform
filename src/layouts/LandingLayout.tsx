import Header from "../pages-content/Landing-Page/Header/Header";
import Hero from "../pages-content/Landing-Page/Hero";
import Feature from "../pages-content/Landing-Page/Feature";
import FeatureDetails from "../pages-content/Landing-Page/FeatureDetails";
import Testimonials from "../pages-content/Landing-Page/Testimonials";
import CoursePreview from "../pages-content/Landing-Page/CoursePreview";
import FrequentlyQuestions from "../pages-content/Landing-Page/FrequentlyQuestions";
import DemoPage from "../pages-content/Landing-Page/DemoPage";
import Footer from "../pages-content/Landing-Page/Footer";

function Landing() {
  return (
    <>
      <Header />
      <Hero data={undefined} />
      <Feature />
      <FeatureDetails />
      <Testimonials />
      <CoursePreview />
      <FrequentlyQuestions />
      <DemoPage />
      <Footer />
    </>
  );
}
export default Landing;

import React from "react";
import Header from "../pages/Landing-Page/Header/Header";
import Hero from "../pages/Landing-Page/Hero";
import Feature from "../pages/Landing-Page/Feature";
import FeatureDetails from "../pages/Landing-Page/FeatureDetails";
import Testimonials from "../pages/Landing-Page/Testimonials";
import CoursePreview from "../pages/Landing-Page/CoursePreview";
import FrequentlyQuestions from "../pages/Landing-Page/FrequentlyQuestions";
import DemoPage from "../pages/Landing-Page/DemoPage";
import Footer from "../pages/Landing-Page/Footer";

function Landing() {
  return (
    <>
      <Header />
      <Hero />
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

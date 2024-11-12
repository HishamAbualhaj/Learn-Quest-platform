import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Feature from "./Feature";
import FeatureDetails from "./FeatureDetails";
import Testimonials from "./Testimonials";
import CoursePreview from "./CoursePreview";
import FrequentlyQuestions from './FrequentlyQuestions'
import DemoPage from "./DemoPage";
import Footer from "./Footer";
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

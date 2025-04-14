import React, { useState, useEffect, createContext } from "react";
import Header from "../pages/Landing-Page/Header";
import Hero from "../pages/Landing-Page/Hero";
import Feature from "../pages/Landing-Page/Feature";
import FeatureDetails from "../pages/Landing-Page/FeatureDetails";
import Testimonials from "../pages/Landing-Page/Testimonials";
import CoursePreview from "../pages/Landing-Page/CoursePreview";
import FrequentlyQuestions from "../pages/Landing-Page/FrequentlyQuestions";
import DemoPage from "../pages/Landing-Page/DemoPage";
import Footer from "../pages/Landing-Page/Footer";

import ThemeContext from "../context/ThemeContext";
function Landing() {
  const [activeDrop, setActiveDrop] = useState(false);
  useEffect(() => {
    setActiveDrop(activeDrop);
  }, [activeDrop]);

  return (
    <div
      onClick={() => {
        setActiveDrop(false);
      }}
    >
      <Header sendData={setActiveDrop} activeDrop={activeDrop} />
      <Hero />
      <Feature />
      <FeatureDetails />
      <Testimonials />
      <CoursePreview />
      <FrequentlyQuestions />
      <DemoPage />
      <Footer />
    </div>
  );
}
export default Landing;

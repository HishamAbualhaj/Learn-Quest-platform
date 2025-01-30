import React, { useState, useEffect } from "react";
import useFetch from "../Hooks/useFetch";
import Header from "./Header";
import Hero from "./Hero";
import Feature from "./Feature";
import FeatureDetails from "./FeatureDetails";
import Testimonials from "./Testimonials";
import CoursePreview from "./CoursePreview";
import FrequentlyQuestions from "./FrequentlyQuestions";
import DemoPage from "./DemoPage";
import Footer from "./Footer";
import { useLoaderData } from "react-router-dom";
function Landing() {
  const userDataResponse = useLoaderData();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(userDataResponse);
  }, []);

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
      <Header
        data={userData}
        sendData={setActiveDrop}
        activeDrop={activeDrop}
      />
      <Hero data={userData} />
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

import React from "react";
import Slider from "../components/Home_Slider/Slider";
import Announcment from "../components/Home_Announcment/Announcment";
import HighlyRated from "../components/Highly_Rated_DR/HighlyRated";
import Departmets from "../components/Specialization/Departmets";

const Home = (props) => {
  return (
    <>
      <Slider />
      <Announcment />
      <Departmets />
      <HighlyRated />
    </>
  );
};

export default Home;

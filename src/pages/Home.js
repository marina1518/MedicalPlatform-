import React from "react";
import Slider from "../components/Slider";
import Announcment from "../components/Announcment";
import HighlyRated from "../components/HighlyRated";
import Departmets from "../components/Departmets";

const Home = () => {
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

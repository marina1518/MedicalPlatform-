import React from "react";
import Slider from "../components/Home_Slider/Slider";

import HighlyRated from "../components/Highly_Rated_DR/HighlyRated";
import Departmets from '../components/Specialization/Departmets';

const Home = () => {
  return (
    <>
      <Slider />
      <Departmets />
      <HighlyRated />
    </>
  );
};

export default Home;

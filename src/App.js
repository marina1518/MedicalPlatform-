import React,{useEffect,useState} from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import './App.css';
import Appadmin from './pages/Applicationadmin/Appadmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import {useSelector} from 'react-redux'
import Doctorscards from "./pages/Doctorspeacialiazation";
import { useNavigate } from "react-router-dom";
import Adminhospital from "./pages/HospitalAdmin/Adminhospital";

function App() {

  let navigate = useNavigate();
  const [clicked_department , setclicked_department] = useState("")
  const alan_key = "b94fcad9e16e84e2cfb67521c2729b4b2e956eca572e1d8b807a3e2338fdd0dc/stage";
useEffect(()=>{
alanBtn({
  key: alan_key , 
  onCommand : ({command , chosen_department})=>{
   switch(command){
     case "DepartmentDoctors" :
        console.log(chosen_department);
        setclicked_department(chosen_department)
         navigate(`/Doctors/1`);
        //navigate('/Doctors/1')
     default :
        break   
   }
  }
})
},[])


   const chosencomp = useSelector(state => state.sidebarcomp)
   console.log(chosencomp);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/appadmin" element={<Appadmin />}> </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Doctors/:specializationid" element={<Doctorscards />}></Route>
        <Route path="/hospitaladmin" element={<Adminhospital />}> </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;

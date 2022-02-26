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
import Adminclinic from "./pages/profiles/clinicadmin";
import Login from './pages/Login & Sign Up/login_f'
import Signup from "./pages/Login & Sign Up/signup";
import Ph_admin from './pages/profiles/pharmacy_admin';
import Profile from './pages/profiles/profile';
import Dr_Profile from './pages/profiles/dr_profile' ;
import Clinicdoctor from './pages/profiles/clinic_dr_profile';
import Privateroute from "./components/PrivateRoutes/Privateroute";
import Privateuser from "./components/PrivateRoutes/Privateuser";
import Privateclinicadmin from "./components/PrivateRoutes/Privateclinicadmin";
import Privatehospitaladmin from "./components/PrivateRoutes/Privatehospitaladmin";
import Privatepharmacyadmin from "./components/PrivateRoutes/Privatepharmacyadmin";
import Privatedoctor from "./components/PrivateRoutes/Privatedoctor";
import ScrollToTop from "./components/ScrollToTop/Scrolltop";
import HospitalsPage from './pages/HospitalsPage/HospitalsPage'
import DoctorsHospitals from "./pages/DoctorsHospitals";
import Chatbotui from "./components/ChatBotUI/Chatbotui";
function App() {

  let navigate = useNavigate();
  const [clicked_department , setclicked_department] = useState("")
  const alan_key = "b94fcad9e16e84e2cfb67521c2729b4b2e956eca572e1d8b807a3e2338fdd0dc/stage";
  var greetingWasSaid = false;
//var alanBtnInstance = alanBtn({ });
useEffect(()=>{
var alanBtnInstance = alanBtn({
  key: alan_key , 
  onButtonState: async function(status) {
    if (status === 'ONLINE') {
      if (!this.greetingWasSaid) {
        await alanBtnInstance.activate();
        alanBtnInstance.playText("Hello! I'm Alan. How can I help you?");
        this.greetingWasSaid = true
      }
    }
  },
  onCommand : ({command , department})=>{
   switch(command){
     case "DepartmentDoctors" :
        console.log(department);
        setclicked_department(department)
         navigate(`/Doctors/${department}`);
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
      <ScrollToTop>
        <div className="body">
      <Routes>
        {/*<Route path="/appadmin" element={<Appadmin />}> </Route>*/}
        <Route path="/" element={<Home />}></Route>
        <Route path="/Doctors/:Deptname" element={<Doctorscards />}></Route>
        {/*<Route path="/hospitaladmin" element={<Adminhospital />}> </Route>*/}
        {/*<Route path="/pharmacyadmin" element={<Ph_admin />}> </Route>*/}
        <Route path="/login" element={<Login/>}> </Route>
        <Route path="/signup" element={<Signup/>}> </Route>
        <Route path="/Entities/:entity" element={<HospitalsPage/>}> </Route>
        <Route path="/clinicdoctor/:doctorid" element={<Clinicdoctor/>}> </Route>
        <Route path="/DoctorsEntity/:entityname"e element={<DoctorsHospitals/>}> </Route>
        {/*<Route path="/user" element={<Profile/>} > </Route>*/}
        {/*<Route path="/doctor" element={<Dr_Profile/>}> </Route>*/}
        {/*<Route path="/clinicdoctor" element={<Clinicdoctor/>}> </Route>*/}
        <Route path="/doctor"  element={ <Privatedoctor> <Clinicdoctor />  </Privatedoctor> }/> 
        <Route path="/pharmacyadmin"  element={ <Privatepharmacyadmin> <Ph_admin />  </Privatepharmacyadmin> }/> 
        <Route path="/hospitaladmin"  element={ <Privatehospitaladmin> <Adminhospital />  </Privatehospitaladmin> }/> 
        <Route path="/clinicadmin"  element={ <Privateclinicadmin> <Adminclinic />  </Privateclinicadmin> }/> 
        <Route path="/clinicdoctor"  element={  <Clinicdoctor /> }/> 
        <Route path="/appadmin"  element={ <Privateroute> <Appadmin />  </Privateroute> }/>    
        <Route path="/user"  element={ <Privateuser> <Profile/>  </Privateuser> }/>       
      </Routes>
      <Chatbotui />
      <Footer />
      </div>
      </ScrollToTop>
    </>
  );
}

export default App;
